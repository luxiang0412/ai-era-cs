# 13 软件架构与系统设计

[← 回到路线](../README.md)

分层、模块化单体、微服务、事件驱动、六边形与 Clean Architecture、DDD、CQRS、高可用与可扩展、系统设计方法、ADR。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

架构图容易画满。有用的是边界和取舍：模块边界在哪，依赖朝哪个方向，什么可以丢、什么不能丢。全栈做到一定规模，每一次「要不要拆服务」「要不要上消息队列」都是这一科的问题。

## 建议顺序

1. **架构基础** — 先是模块边界和依赖方向，再谈分层。单体里边界清楚，往往比过早拆服务好。
2. **常见风格** — 分层、模块化单体、微服务、事件驱动、插件化。拆开的理由是独立部署和故障隔离，不是图更好看。
3. **领域建模** — 六边形、Clean Architecture、DDD、领域模型与业务本体。让业务词汇直接出现在代码里。
4. **读写与事件** — CQRS、Event Sourcing。知道它们解决什么、又带来什么复杂度。
5. **服务治理** — API Gateway、多租户、服务治理。
6. **系统设计** — 从一个具体问题开始：谁在用、读写比例、什么可以丢、什么不能丢。容量、缓存、队列、数据库，按这个约束往上加，而不是把所有组件画满。
7. **高可用与扩展** — 容量规划、冗余、降级。和 [16](../16-performance-observability/README.md)、[10 分布式](../10-distributed-systems/README.md) 接上。
8. **决策记录** — 写 ADR：当时的约束、考虑过的方案、为什么选这个。

## 书和课

- Mark Richards, Neal Ford《软件架构：架构模式、特征及实践指南》
- Kleppmann《数据密集型应用系统设计》（[DDIA](https://dataintensive.net/)）
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- 系统设计：先把 [09](../09-database-systems/README.md) 和 [10](../10-distributed-systems/README.md) 的词用准，再做题。题是练习拆解，不是背架构图

demo：拿自己一个项目写一份 ADR；画出一个短链服务从单机到加缓存、加分片的三版设计。
