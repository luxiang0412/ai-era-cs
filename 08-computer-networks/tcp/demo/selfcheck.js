/**
 * 自测：虚拟时钟上的行为要稳定，本机 UDP 上要真能跑通。
 * 运行：node selfcheck.js
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runScenario } from "./protocol.js";

const here = path.dirname(fileURLToPath(import.meta.url));
let failed = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`✗ ${name}`);
    console.log(`  ${error.stack || error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function payloadsOf(text) {
  return [...text];
}

function deliveredText(result) {
  return result.delivered.map((item) => item.payload).join("");
}

function assertInOrder(result, text) {
  const got = deliveredText(result);
  assert(got === text, `交付内容是「${got}」，期望「${text}」`);
  result.delivered.forEach((item, index) => {
    assert(item.seq === index, `第 ${index} 条的序号是 ${item.seq}`);
  });
  const seqs = result.delivered.map((item) => item.seq);
  assert(new Set(seqs).size === seqs.length, "应用层收到了重复数据");
}

check("无丢包：按序交付，不重传", () => {
  const text = "可靠传输";
  const result = runScenario({
    payloads: payloadsOf(text),
    windowSize: 4,
    rto: 200,
    delay: () => 40,
  });
  assertInOrder(result, text);
  assert(result.stats.retransmits === 0, `不该重传，实际 ${result.stats.retransmits}`);
  assert(result.stats.dataSends === [...text].length, "发送次数应等于消息数");
  assert(result.stats.peakInFlight <= 4, "在途超过窗口");
  assert(result.run.pending === 0, "结束后还有定时器");
});

check("窗口为 1 时退化成停等，在途从不超过 1", () => {
  const text = "停等协议";
  const result = runScenario({
    payloads: payloadsOf(text),
    windowSize: 1,
    rto: 200,
    delay: () => 30,
  });
  assertInOrder(result, text);
  assert(result.stats.peakInFlight === 1, `峰值在途是 ${result.stats.peakInFlight}`);
  assert(result.stats.retransmits === 0, "无丢包不应重传");
});

check("丢掉一个数据报文后会重传，洞补上时缓存的数据一起交付", () => {
  const text = "丢了也要按序";
  const result = runScenario({
    payloads: payloadsOf(text),
    windowSize: 4,
    rto: 200,
    delay: () => 40,
    shouldDrop(dir, packet, nth) {
      return dir === "forward" && packet.type === "DATA" && packet.seq === 2 && nth === 1;
    },
  });
  assertInOrder(result, text);
  assert(result.stats.retransmits >= 1, "应该出现重传");
  const drops = result.events.filter((event) => event.type === "drop" && event.seq === 2);
  assert(drops.length === 1, "seq=2 应只丢第一次");

  const holeFill = result.events.find(
    (event) => event.type === "deliver" && event.seq === 2,
  );
  assert(holeFill, "没有交付 seq=2");
  const sameInstant = result.events.filter(
    (event) => event.type === "deliver" && event.t === holeFill.t && event.seq > 2,
  );
  assert(
    sameInstant.length > 0,
    "补洞时，已经缓存的后续报文应该在同一时刻按序交付",
  );
});

check("确认报文丢失会触发重传，应用层不重复", () => {
  const text = "确认丢了";
  const result = runScenario({
    payloads: payloadsOf(text),
    windowSize: 4,
    rto: 200,
    delay: () => 40,
    shouldDrop(dir, packet, nth) {
      return dir === "back" && packet.type === "ACK" && nth === 1;
    },
  });
  assertInOrder(result, text);
  assert(result.stats.retransmits >= 1, "ACK 全丢时发送方应该超时重传");
  const dupDelivers = result.events.filter((event) => event.type === "duplicate");
  assert(dupDelivers.length > 0, "接收方应该看到重复报文并丢掉");
});

check("在途数量能打满窗口，但不会超过", () => {
  const text = "窗口要打满啊朋友";
  const result = runScenario({
    payloads: payloadsOf(text),
    windowSize: 3,
    rto: 500,
    delay: () => 50,
  });
  assertInOrder(result, text);
  assert(result.stats.peakInFlight === 3, `峰值在途是 ${result.stats.peakInFlight}，应打满 3`);
});

check("人为延迟造成乱序，交付顺序仍然正确", () => {
  const text = "乱序也不怕";
  const result = runScenario({
    payloads: payloadsOf(text),
    windowSize: 4,
    rto: 2000,
    delay(dir, packet) {
      if (dir === "forward" && packet.type === "DATA" && packet.seq === 1) return 400;
      return 40;
    },
  });
  assertInOrder(result, text);
  assert(result.stats.retransmits === 0, "这次只是迟到，不是丢失，不应重传");
  assert(
    result.events.some((event) => event.type === "buffer"),
    "应出现乱序缓存",
  );
});

function runUdp(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["simulate.js", ...args], {
      cwd: here,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    const killer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`UDP 场景超时：${args.join(" ")}\n${stdout}\n${stderr}`));
    }, 10000);
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => {
      clearTimeout(killer);
      reject(error);
    });
    child.on("exit", (code) => {
      clearTimeout(killer);
      resolve({ code, stdout, stderr });
    });
  });
}

const udpJobs = [
  {
    name: "本机 UDP、无丢包，能把整句送到",
    args: ["--loss", "0", "--count", "6", "--window", "4", "--rto", "300", "--timeout", "4000"],
    expect(output) {
      assert(output.code === 0, `退出码 ${output.code}\n${output.stdout}`);
      assert(output.stdout.includes("交付完成"), output.stdout);
      assert(output.stdout.includes("重传 0"), `应无重传\n${output.stdout}`);
    },
  },
  {
    name: "本机 UDP、指定报文丢一次，能重传并交付完成",
    args: [
      "--loss",
      "0",
      "--drop-seq",
      "2",
      "--count",
      "8",
      "--window",
      "4",
      "--rto",
      "300",
      "--timeout",
      "4000",
    ],
    expect(output) {
      assert(output.code === 0, `退出码 ${output.code}\n${output.stdout}`);
      assert(output.stdout.includes("交付完成"), output.stdout);
      assert(output.stdout.includes("重传"), output.stdout);
      assert(!output.stdout.includes("重传 0"), `应该重传\n${output.stdout}`);
    },
  },
];

for (const job of udpJobs) {
  try {
    const output = await runUdp(job.args);
    job.expect(output);
    console.log(`✓ ${job.name}`);
  } catch (error) {
    failed += 1;
    console.log(`✗ ${job.name}`);
    console.log(`  ${error.stack || error.message}`);
  }
}

if (failed > 0) {
  console.log(`\n${failed} 项没过`);
  process.exit(1);
}
console.log("\n全部通过");
