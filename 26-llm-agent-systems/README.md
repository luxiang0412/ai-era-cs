# 26 LLM 与 Agent 系统

[← 回到路线](../README.md)

LLM 原理、推理与部署、Prompt 与结构化输出、RAG、Agent Loop、Agent Runtime 与 Harness、评测与安全。完整子类见 [知识地图](../knowledge-map.md)。这是 AI 时代单独拎出来的一科，不放在机器学习下面。

## 为什么要学

会调 API 和会看它为什么胡说，是两件事。做产品时要判断：是上下文里没给够事实、工具描述写糊了、还是循环根本没有停的条件。这一层又是一个完整的软件系统：有运行时、权限、沙箱、日志、评测，前面 [12–16](../12-software-engineering/README.md) 的工程知识在这里全部重用。

## 建议顺序

1. **LLM 基础** — 训练目标多半是预测下一个 token。Tokenization、Embedding、Transformer 架构，对照 [25](../25-deep-learning-generative-ai/README.md) 看。
2. **训练流程** — 预训练、指令微调（SFT）、偏好对齐（RLHF / DPO）。每一步改变的是模型的哪一种行为。
3. **上下文与采样** — 上下文窗口是它这一次能看见的全部。采样温度改变的是「有多愿意选不那么高的概率」。它不是在数据库里查询，除非你另外接了工具。
4. **推理与部署** — KV Cache、量化、Speculative Decoding、Continuous Batching、分布式推理、模型路由。知道一次请求的延迟和成本花在哪。
5. **Prompt 与工具调用** — Prompt Engineering、Structured Output、Function Calling。工具描述就是接口文档。
6. **RAG** — 向量检索与混合检索、重排序、GraphRAG。先问检索回来的东西对不对，再问模型答得好不好。
7. **Agent 原理** — 一个循环：模型产出要调用的工具和参数，程序真的去调用，把结果塞回上下文，再问模型。它会错，是因为某一步的观察是错的、工具描述是糊的，或者循环没有停的条件。先把这个循环画出来，再谈框架。
8. **Agent 工程** — Planning、Memory、多 Agent 协作、Runtime、Harness、MCP 与 Connector、Workflow 编排。
9. **安全与可控** — Sandbox 与执行隔离、权限、Human-in-the-loop。和 [15 安全](../15-computer-security/README.md)、[07 的容器隔离](../07-operating-systems/README.md) 是同一套思路。
10. **评测与可观测** — Benchmark、Trace。没有评测就没法知道改 prompt 是变好还是变坏，接 [14 测试](../14-software-testing/README.md)。

## 书和课

- Andrej Karpathy 的 [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)，从零写一个小 GPT
- Anthropic 的 [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)，讲 workflow 和 agent 的区别
- [Model Context Protocol](https://modelcontextprotocol.io/) 规范
- 想看训练和推理系统的全貌，再上 Stanford CS336

demo：一个只有两个假工具（查时间、加数字）的 Agent 循环，故意把工具结果写错，看模型怎么跟着错；一个最小 RAG，把检索结果打印出来再喂给模型。
