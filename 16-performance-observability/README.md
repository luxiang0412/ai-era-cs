# 16 性能工程、可靠性与可观测性

[← 回到路线](../README.md)

延迟与吞吐、CPU / 内存 / I/O / 网络分析、Profiling 与火焰图、缓存、基准测试、日志 / 指标 / 追踪、OpenTelemetry、SLO、SRE、故障复盘。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

「慢」和「挂了」是线上最常见的两句话。先量，再猜：没有数据的优化多半在优化错的地方。可观测性是让系统自己告诉你发生了什么，而不是靠登录机器翻日志。

## 建议顺序

1. **性能基础** — 延迟和吞吐量，平均值和 P99。数量级先背一张表：内存、SSD、同机房、跨洋各要多久。
2. **分析工具** — CPU、内存、I/O、网络分别用什么看。Profiling 和火焰图先会读。前端对照浏览器 Performance 面板。
3. **优化手段** — 缓存设计、并发优化、基准测试。每一次优化前后都要有数字。
4. **可观测性三件套** — 日志回答「这一次发生了什么」，指标回答「整体健不健康」，追踪回答「这一次请求走过哪些服务」。先把日志里的请求 ID 串起来。
5. **OpenTelemetry** — 统一的采集标准，知道 span、trace、metric 的关系。
6. **SLI / SLO / SLA** — 用用户感受定义「健康」，用错误预算决定什么时候停下来修。
7. **SRE 与故障** — 告警、诊断、容量规划、灾备、故障演练、事故复盘。

## 书和课

- Brendan Gregg《性能之巅》（Systems Performance），以及他的 [火焰图页面](https://www.brendangregg.com/flamegraphs.html)
- Google [SRE 系列书](https://sre.google/books/)，在线免费
- [OpenTelemetry 文档](https://opentelemetry.io/docs/)

demo：给一个 Node 服务加上请求 ID 和耗时日志，再生成一张火焰图，找出最慢的函数。
