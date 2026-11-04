# 14 软件测试与质量工程

[← 回到路线](../README.md)

测试策略、单元 / 集成 / 端到端、契约测试、属性测试、模糊测试、变异测试、性能与混沌测试、CI、AI 与 Agent 评测。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

测试的价值是在你改坏的时候变红。数量多不代表有用：一堆只覆盖成功路径的测试，挡不住真正的回归。AI 写代码以后，测试是你验收它的主要手段。

## 建议顺序

1. **测试策略** — 测试金字塔，每一层花多少成本、挡哪一类错。
2. **单元与集成** — 单元测试盯一个函数，集成测试盯几段接在一起。先会读失败信息，再增加数量。测试要能在你改坏协议或边界时变红，像 TCP demo 里的 [`selfcheck.js`](../08-computer-networks/tcp/demo/README.md)。
3. **端到端与 API** — E2E、UI 测试、API 测试、契约测试。前端用 Playwright 一类工具，脆弱的选择器是最常见的坑。
4. **找边界的测试** — 属性测试（随机生成输入，验证不变量）、模糊测试、变异测试（故意改坏代码，看测试抓不抓得到）。
5. **性能与并发** — 压力、负载、并发测试。和 [16](../16-performance-observability/README.md) 一起做。
6. **混沌工程** — 在可控范围内注入故障。
7. **CI 与发布** — 覆盖率、自动化测试、回归、发布验证。
8. **AI 评测** — 模型和 Agent 的输出不确定，要用评测集和打分来代替断言。接 [26](../26-llm-agent-systems/README.md)。

## 书和课

- Kent Beck《测试驱动开发》
- [Software Engineering at Google](https://abseil.io/resources/swe-book) 测试相关的几章
- 属性测试：[fast-check](https://fast-check.dev/)（JavaScript）或 Hypothesis（Python）的文档

demo：给一个排序函数写属性测试；对它做一次手工变异，看哪个测试变红。
