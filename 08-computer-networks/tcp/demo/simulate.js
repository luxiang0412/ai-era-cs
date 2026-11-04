/**
 * 在本机 UDP 上跑同一套协议。
 *
 * 三个套接字：发送方、接收方，以及中间的丢包中继。
 * 中继按概率（或按 --drop-seq）把数据报丢掉，其余原样转发。
 * 被丢掉的报文不会出现在接收方的套接字上，发送方只能靠超时发现。
 *
 *   node simulate.js
 *   node simulate.js --loss 0.3 --window 1
 *   node simulate.js --drop-seq 2
 */
import dgram from "node:dgram";
import { createSender, createReceiver } from "./protocol.js";

const TEXT = "丢了也要按顺序送到";

function parseArgs(argv) {
  const options = {
    loss: 0.2,
    window: 4,
    count: [...TEXT].length,
    rto: 400,
    timeout: 8000,
    seed: 1,
    dropSeq: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    const value = argv[i + 1];
    if (key === "--help" || key === "-h") {
      options.help = true;
      break;
    }
    if (value == null || value.startsWith("--")) {
      throw new Error(`缺少 ${key} 的值`);
    }
    i += 1;
    if (key === "--loss") options.loss = Number(value);
    else if (key === "--window") options.window = Number(value);
    else if (key === "--count") options.count = Number(value);
    else if (key === "--rto") options.rto = Number(value);
    else if (key === "--timeout") options.timeout = Number(value);
    else if (key === "--seed") options.seed = Number(value);
    else if (key === "--drop-seq") options.dropSeq = Number(value);
    else throw new Error(`不认识的参数 ${key}`);
  }
  if (Number.isNaN(options.loss) || options.loss < 0 || options.loss > 1) {
    throw new Error("--loss 要在 0 到 1 之间");
  }
  if (!Number.isInteger(options.window) || options.window < 1) {
    throw new Error("--window 要是正整数");
  }
  if (!Number.isInteger(options.count) || options.count < 1) {
    throw new Error("--count 要是正整数");
  }
  return options;
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return function random() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function bind(socket) {
  return new Promise((resolve, reject) => {
    const onError = (error) => reject(error);
    socket.once("error", onError);
    socket.bind(0, "127.0.0.1", () => {
      socket.off("error", onError);
      resolve(socket.address().port);
    });
  });
}

function pad(text, width) {
  const visible = [...text].length;
  if (visible >= width) return text;
  return text + " ".repeat(width - visible);
}

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  console.log(`用法: node simulate.js [选项]

  --loss <0-1>     每个报文的丢弃概率，默认 0.2
  --drop-seq <n>   额外丢掉序号为 n 的数据报文一次（方便对照日志）
  --window <n>     滑动窗口大小，默认 4
  --count <n>      发送前 n 个字，默认整句
  --rto <ms>       超时重传，默认 400
  --timeout <ms>   整次运行的上限，默认 8000
  --seed <n>       丢包随机种子，默认 1
`);
  process.exit(0);
}

const payloads = [];
const source = [...TEXT];
for (let i = 0; i < options.count; i++) {
  payloads.push(source[i % source.length]);
}

const started = Date.now();
const random = mulberry32(options.seed);
const droppedSeqs = new Set();
let drops = 0;
let finished = false;

const senderSock = dgram.createSocket("udp4");
const receiverSock = dgram.createSocket("udp4");
const relaySock = dgram.createSocket("udp4");

function log(message) {
  const t = `${Date.now() - started}ms`.padStart(7, " ");
  console.log(`${t}  ${message}`);
}

function sendTo(socket, packet, port) {
  const bytes = Buffer.from(JSON.stringify(packet));
  socket.send(bytes, port, "127.0.0.1");
}

let senderPort = 0;
let receiverPort = 0;
let relayPort = 0;
let sender;
let receiver;

function maybeFinish() {
  if (finished) return;
  if (receiver.delivered.length < payloads.length) return;
  finished = true;
  const stats = sender.stats();
  const text = receiver.delivered.map((item) => item.payload).join("");
  const elapsed = Date.now() - started;
  sender.stop();
  clearTimeout(watchdog);
  console.log(
    `\n交付完成｜原文「${text}」｜首次发送 ${stats.dataSends}｜重传 ${stats.retransmits}｜丢弃 ${drops}｜用时 ${elapsed}ms`,
  );
  closeAll(0);
}

function fail(reason) {
  if (finished) return;
  finished = true;
  const got = receiver ? receiver.delivered.map((item) => item.payload).join("") : "";
  const stats = sender ? sender.stats() : { retransmits: 0 };
  console.log(
    `\n未完成｜${reason}｜交付 ${got.length}/${payloads.length}「${got}」｜重传 ${stats.retransmits}｜丢弃 ${drops}`,
  );
  if (sender) sender.stop();
  clearTimeout(watchdog);
  closeAll(1);
}

function closeAll(code) {
  for (const socket of [senderSock, receiverSock, relaySock]) {
    try {
      socket.close();
    } catch {
      // 已经关过就不管
    }
  }
  setTimeout(() => process.exit(code), 20);
}

const watchdog = setTimeout(() => fail("超过 --timeout"), options.timeout);

sender = createSender({
  windowSize: options.window,
  rto: options.rto,
  now: () => Date.now(),
  schedule: (fn, ms) => setTimeout(fn, ms),
  clear: (id) => clearTimeout(id),
  transmit(packet) {
    sendTo(senderSock, packet, relayPort);
  },
  onEvent(event) {
    if (event.type === "send") log(`${pad("发出", 4)} DATA seq=${event.seq} 「${event.payload}」`);
    if (event.type === "retransmit") {
      log(`${pad("重传", 4)} DATA seq=${event.seq} 「${event.payload}」 第 ${event.retries} 次补发`);
    }
    if (event.type === "ack") log(`${pad("确认", 4)} 收到 ACK ${event.ack}`);
    if (event.type === "slide") log(`${pad("滑动", 4)} 窗口左沿 → ${event.base}`);
  },
});

receiver = createReceiver({
  transmit(packet) {
    sendTo(receiverSock, packet, relayPort);
  },
  onEvent(event) {
    if (event.type === "deliver") {
      log(`${pad("交付", 4)} seq=${event.seq} 「${event.payload}」`);
      maybeFinish();
    } else if (event.type === "buffer") {
      log(`${pad("缓存", 4)} seq=${event.seq} 先到了，还缺 seq=${event.expected}`);
    } else if (event.type === "duplicate") {
      log(`${pad("重复", 4)} seq=${event.seq} 已经交付过，只补一个 ACK ${event.expected}`);
    }
  },
});

function shouldDrop(packet) {
  if (packet.type === "DATA" && options.dropSeq != null && packet.seq === options.dropSeq) {
    if (!droppedSeqs.has(packet.seq)) {
      droppedSeqs.add(packet.seq);
      return true;
    }
  }
  return random() < options.loss;
}

relaySock.on("message", (bytes, rinfo) => {
  let packet;
  try {
    packet = JSON.parse(bytes.toString());
  } catch {
    return;
  }
  const fromSender = rinfo.port === senderPort;
  const dir = fromSender ? "forward" : "back";
  if (shouldDrop(packet)) {
    drops += 1;
    const name = packet.type === "DATA" ? `DATA seq=${packet.seq}` : `ACK ack=${packet.ack}`;
    log(`${pad("丢失", 4)} ${name}（${dir === "forward" ? "去往接收方" : "去往发送方"}）`);
    return;
  }
  const dest = fromSender ? receiverPort : senderPort;
  relaySock.send(bytes, dest, "127.0.0.1");
});

senderSock.on("message", (bytes) => {
  try {
    sender.receive(JSON.parse(bytes.toString()));
  } catch {
    // 忽略坏报文
  }
});

receiverSock.on("message", (bytes) => {
  try {
    receiver.receive(JSON.parse(bytes.toString()));
  } catch {
    // 忽略坏报文
  }
});

for (const socket of [senderSock, receiverSock, relaySock]) {
  socket.on("error", (error) => fail(error.message));
}

try {
  senderPort = await bind(senderSock);
  receiverPort = await bind(receiverSock);
  relayPort = await bind(relaySock);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(
  `发送 ${payloads.length} 个字，窗口 ${options.window}，丢包率 ${options.loss}` +
    (options.dropSeq == null ? "" : `，并必丢一次 seq=${options.dropSeq}`) +
    `，超时 ${options.rto}ms`,
);
console.log(`中继 UDP 127.0.0.1:${relayPort}`);
console.log(`抓包示例: sudo tcpdump -i lo -n udp port ${relayPort}`);
console.log("");

for (const payload of payloads) sender.enqueue(payload);
