# 22 并行计算与高性能计算

[← 回到路线](../README.md)

并行模型、多线程、SIMD 与向量化、GPU 与 CUDA、OpenMP、MPI、数据局部性、负载均衡、大模型训练与推理加速。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

单核不再变快，性能来自同时做很多事。大模型训练和推理就是这一科最大的应用：为什么要 GPU，为什么显存不够，为什么批大一点吞吐就高。它建立在 [05 的缓存和多核](../05-computer-architecture/README.md) 之上。

## 建议顺序

1. **并行基础** — 并行模型、Amdahl 定律：串行的那一段决定上限。
2. **CPU 并行** — 多线程、SIMD、向量化、OpenMP。
3. **数据局部性** — 访问顺序改一下，速度能差十倍。先自己量一次按行和按列遍历矩阵。
4. **GPU 并行** — GPU 架构、CUDA、OpenCL。线程块、共享内存、合并访存。
5. **分布式并行** — MPI、同步与通信、负载均衡、并行调度。
6. **数值计算** — 高性能线性代数库在做什么。
7. **AI 加速** — 数据并行、模型并行、流水线并行；推理时的批处理和算子融合。接 [25](../25-deep-learning-generative-ai/README.md) 和 [26](../26-llm-agent-systems/README.md)。

## 书和课

- [CMU 15-418](https://www.cs.cmu.edu/~418/)，并行计算机体系结构与编程
- 《Programming Massively Parallel Processors》（大规模并行处理器编程实战）

demo：按行和按列遍历一个大矩阵，对比耗时；用 Web Workers 把一个计算拆成四份。
