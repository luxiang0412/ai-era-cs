# 一个写在 UDP 上的可靠传输

真 TCP 太完整，不适合第一次动手。这里只留四件事：序号、累积确认、超时重传、固定大小的滑动窗口。丢包由中间的 UDP 中继来模拟，协议代码本身不知道「随机数」。

和真 TCP 的差别：

| | 这个 demo | 真 TCP |
| --- | --- | --- |
| 编号 | 一条消息一个序号 | 字节流上的偏移 |
| 确认 | 累积 ACK | 累积 ACK，还可以有 SACK |
| 重传 | 超时后只补窗口最左边的洞 | 超时、重复 ACK、SACK 恢复 |
| 窗口 | 固定 | 接收窗口，再被拥塞窗口卡住 |
| 连接 | 没有握手，直接传数据 | 三次握手、四次挥手 |
| 承载 | UDP 数据报 | IP 上的 TCP 段 |

握手和挥手在 [`../viz/handshake.html`](../viz/handshake.html)。窗口滑动在 [`../viz/sliding-window.html`](../viz/sliding-window.html)。规则的文字版在 [`../README.md`](../README.md)。

## 怎么跑

只需要 Node.js，没有依赖。在这个目录：

```bash
node simulate.js
node selfcheck.js
```

`simulate.js` 会在本机起三个 UDP 套接字：发送方、接收方，以及一个会丢包的中继。默认丢包率 0.2，窗口 4，把「丢了也要按顺序送到」这几个字送过去。

正常结束时长这样：

```text
交付完成｜原文「丢了也要按顺序送到」｜首次发送 9｜重传 2｜丢弃 3｜用时 800ms
```

重传次数跟随机种子有关，句子本身不该缺字、不该乱序。

## 建议试的实验

先看默认日志。找一行 `丢失`，再找后面同一个 seq 的 `重传`。如果丢的是中间某个字，接收方会先 `缓存` 后面的，等洞补上再连续 `交付`。

```bash
# 不丢包。重传应该是 0，用来对照
node simulate.js --loss 0

# 窗口收成 1，退化成停等。跟默认窗口比一下用时
node simulate.js --loss 0 --window 1

# 丢得更狠，日志里缓存和补发会更密
node simulate.js --loss 0.4

# 超时设得比网络还快，会出现没丢也重传
node simulate.js --loss 0 --rto 30

# 指定丢掉 seq=2 的第一次发送，方便对着日志讲
node simulate.js --loss 0 --drop-seq 2
```

程序会打印中继端口。另开一个终端可以看真正的 UDP 包（被中继丢掉的那些不会出现在接收方一侧）：

```bash
sudo tcpdump -i lo -n udp port <中继端口>
```

`selfcheck.js` 不睡觉等时钟。它用虚拟时间覆盖：无丢包、停等、丢数据和丢 ACK、窗口上限、乱序缓存，再用真 UDP 跑两小段。改完协议就跑它。

## 故意改坏

读 [`protocol.js`](protocol.js) 时可以试一刀，然后跑 `node selfcheck.js`，看哪一条先红：

- 接收方在 `seq > expected` 时直接交付，乱序那条测试会失败。
- 发送方在 `pump` 里去掉窗口判断，在途数量会超过上限。
- 超时后把 `base` 换成别的序号重传，洞补不上，交付会缺字。

改坏、看失败、再改回来。这一轮比多读一遍定义有用。
