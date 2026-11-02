/**
 * 简化版可靠传输。
 *
 * 和真 TCP 的差别，读 demo 之前先记住：
 * - 这里一条消息占一个序号。真 TCP 的序号是字节流里的偏移。
 * - 确认是累积的：ack = N 表示序号 N 之前的都收到了，请从 N 继续。
 * - 超时只重传最早那个没被确认的报文（窗口左沿的洞）。
 * - 接收方会把乱序报文先收着，等洞补上再按序交给上层。
 * - 窗口大小固定。真 TCP 还要再被拥塞窗口卡一层。
 * - 没有握手和挥手，那些放在 viz/handshake.html。
 *
 * 协议本身不负责丢包。丢包是外面的信道做的：内存里的虚拟链路，或者 simulate.js 里的 UDP 中继。
 */

export function createVirtualClock() {
  let now = 0;
  let order = 0;
  let nextId = 1;
  /** @type {{id:number, at:number, order:number, fn:Function}[]} */
  const items = [];

  function schedule(fn, ms) {
    const id = nextId++;
    items.push({ id, at: now + ms, order: order++, fn });
    return id;
  }

  function clear(id) {
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) items.splice(index, 1);
  }

  function popNext() {
    if (items.length === 0) return null;
    let best = 0;
    for (let i = 1; i < items.length; i++) {
      const candidate = items[i];
      const current = items[best];
      if (
        candidate.at < current.at ||
        (candidate.at === current.at && candidate.order < current.order)
      ) {
        best = i;
      }
    }
    return items.splice(best, 1)[0];
  }

  function run(limit = 20000) {
    let steps = 0;
    while (steps < limit) {
      const event = popNext();
      if (!event) break;
      now = event.at;
      event.fn();
      steps++;
    }
    return { steps, now, pending: items.length };
  }

  return {
    now: () => now,
    schedule,
    clear,
    run,
  };
}

export function createSender({
  windowSize,
  rto,
  now,
  schedule,
  clear,
  transmit,
  onEvent = () => {},
}) {
  if (windowSize < 1) throw new Error("窗口至少为 1");
  if (rto <= 0) throw new Error("超时时间必须大于 0");

  let base = 0;
  let nextSeq = 0;
  const queue = [];
  const slots = new Map();
  let timer = null;
  let retransmits = 0;
  let dataSends = 0;
  let peak = 0;

  function inFlight() {
    return nextSeq - base;
  }

  function notePeak() {
    const n = inFlight();
    if (n > peak) peak = n;
    if (n > windowSize) {
      throw new Error(`窗口被突破：在途 ${n}，上限 ${windowSize}`);
    }
  }

  function arm() {
    if (timer != null) {
      clear(timer);
      timer = null;
    }
    if (base >= nextSeq) return;
    const slot = slots.get(base);
    const wait = Math.max(0, rto - (now() - slot.lastSent));
    timer = schedule(onTimeout, wait);
  }

  function onTimeout() {
    timer = null;
    if (base >= nextSeq || !slots.has(base)) return;
    const slot = slots.get(base);
    slot.retries += 1;
    slot.lastSent = now();
    retransmits += 1;
    onEvent({
      type: "retransmit",
      seq: base,
      payload: slot.payload,
      retries: slot.retries,
    });
    transmit({ type: "DATA", seq: base, payload: slot.payload });
    arm();
  }

  function pump() {
    while (queue.length > 0 && nextSeq < base + windowSize) {
      const payload = queue.shift();
      const seq = nextSeq;
      nextSeq += 1;
      slots.set(seq, { payload, lastSent: now(), retries: 0 });
      dataSends += 1;
      onEvent({ type: "send", seq, payload });
      transmit({ type: "DATA", seq, payload });
      notePeak();
    }
    arm();
  }

  function enqueue(payload) {
    queue.push(payload);
    pump();
  }

  function receive(packet) {
    if (!packet || packet.type !== "ACK") return;
    onEvent({ type: "ack", ack: packet.ack });
    if (packet.ack <= base || packet.ack > nextSeq) return;
    for (let seq = base; seq < packet.ack; seq++) slots.delete(seq);
    base = packet.ack;
    onEvent({ type: "slide", base });
    pump();
  }

  function stop() {
    if (timer != null) clear(timer);
    timer = null;
  }

  function stats() {
    return {
      retransmits,
      dataSends,
      peakInFlight: peak,
      base,
      nextSeq,
      inFlight: inFlight(),
      queued: queue.length,
    };
  }

  return { enqueue, receive, stop, stats };
}

export function createReceiver({ transmit, onEvent = () => {} }) {
  let expected = 0;
  const buffer = new Map();
  const delivered = [];

  function deliver(seq, payload) {
    delivered.push({ seq, payload });
    onEvent({ type: "deliver", seq, payload });
  }

  function sendAck() {
    onEvent({ type: "ack-send", ack: expected });
    transmit({ type: "ACK", ack: expected });
  }

  function receive(packet) {
    if (!packet || packet.type !== "DATA") return;
    const { seq, payload } = packet;
    if (seq === expected) {
      deliver(seq, payload);
      expected += 1;
      while (buffer.has(expected)) {
        deliver(expected, buffer.get(expected));
        buffer.delete(expected);
        expected += 1;
      }
    } else if (seq > expected) {
      if (!buffer.has(seq)) buffer.set(seq, payload);
      onEvent({ type: "buffer", seq, expected });
    } else {
      onEvent({ type: "duplicate", seq, expected });
    }
    sendAck();
  }

  return {
    receive,
    get delivered() {
      return delivered;
    },
  };
}

/**
 * 在虚拟时钟上把发送方和接收方接起来。
 * shouldDrop(dir, packet, nth) 返回 true 则这一次发送消失。
 * dir 为 "forward"（数据方向）或 "back"（确认方向）。
 * nth 从 1 开始，按方向 + 类型 + 序号/确认号计数。
 */
export function runScenario({
  payloads,
  windowSize = 4,
  rto = 200,
  shouldDrop = () => false,
  delay = () => 40,
  limit = 20000,
}) {
  const clock = createVirtualClock();
  const events = [];
  const attempts = new Map();

  function emit(event) {
    events.push({ ...event, t: clock.now() });
  }

  let sender;
  let receiver;

  function route(dir, packet) {
    const key = [
      dir,
      packet.type,
      packet.seq ?? "",
      packet.ack ?? "",
    ].join("|");
    const nth = (attempts.get(key) || 0) + 1;
    attempts.set(key, nth);
    emit({
      type: "tx",
      dir,
      packetType: packet.type,
      seq: packet.seq,
      ack: packet.ack,
      nth,
    });
    if (shouldDrop(dir, packet, nth)) {
      emit({
        type: "drop",
        dir,
        packetType: packet.type,
        seq: packet.seq,
        ack: packet.ack,
        nth,
      });
      return;
    }
    const wait = delay(dir, packet, nth);
    clock.schedule(() => {
      emit({
        type: "rx",
        dir,
        packetType: packet.type,
        seq: packet.seq,
        ack: packet.ack,
      });
      if (dir === "forward") receiver.receive(packet);
      else sender.receive(packet);
    }, wait);
  }

  sender = createSender({
    windowSize,
    rto,
    now: () => clock.now(),
    schedule: clock.schedule,
    clear: clock.clear,
    transmit: (packet) => route("forward", packet),
    onEvent: emit,
  });
  receiver = createReceiver({
    transmit: (packet) => route("back", packet),
    onEvent: emit,
  });

  for (const payload of payloads) sender.enqueue(payload);
  const run = clock.run(limit);
  sender.stop();

  return {
    delivered: receiver.delivered.map((item) => ({ ...item })),
    events,
    stats: sender.stats(),
    run,
  };
}
