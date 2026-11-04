# AI 时代学计算机基础

一个给自己用的学习仓库。我做前端和全栈，日常写页面、接口、部署，很多底层的词只停留在听过。这里把计算机基础补到能判断的程度：出了问题知道往哪一层看，读到一个词知道它大概在干什么。

动画站：[https://luxiang0412.github.io/ai-era-cs/](https://luxiang0412.github.io/ai-era-cs/)（要先按文末打开 GitHub Pages）。本地直接打开仓库根目录的 [index.html](index.html) 也行。

## 怎么学

不追求闭卷手写出一个操作系统或 TCP 栈。样板代码可以让 AI 写。要练的是判断：这段行为正不正常，瓶颈大概在哪，这个抽象漏了什么。

每一节按同一个循环：

1. **读概念。** 先看一句话版，再用一个生活里的类比把画面立住，最后才看细节。细节读不进去就回到类比，不要在术语里打转。
2. **跑一个小 demo。** 让 AI 写一个能跑的最小实现。我负责提问、运行、看输出，然后故意改坏：把丢包率拉高，把窗口改成 1，把超时改得比网络还短。看它怎么错，比看它怎么对有用。
3. **看它动。** 协议、调度、树这种东西，静图不够。做成能暂停、能单步的动画，对着画面问「这一步如果丢了会怎样」。

三层讲解的空表格在 [`_template/`](_template/README.md)。成品样例是 [TCP](08-computer-networks/tcp/README.md)：能读、能跑、能点。

## 知识地图

五大板块，27 个科类。每个科类下的完整子类、横向专题和分层说明在 [knowledge-map.md](knowledge-map.md)。

| 板块 | 科类 |
| --- | --- |
| A. 计算基础 | [00 工具与开发环境](00-tools/README.md)、[01 数学基础](01-mathematics/README.md)、[02 编程基础](02-programming-fundamentals/README.md)、[03 数据结构与算法](03-data-structures-algorithms/README.md)、[04 计算理论](04-theory-of-computation/README.md) |
| B. 计算机系统 | [05 计算机组成](05-computer-architecture/README.md)、[06 系统级编程](06-systems-programming/README.md)、[07 操作系统](07-operating-systems/README.md)、[08 计算机网络](08-computer-networks/README.md)、[09 数据库](09-database-systems/README.md)、[10 分布式系统](10-distributed-systems/README.md) |
| C. 软件工程与基础设施 | [11 编程语言与编译器](11-programming-languages-compilers/README.md)、[12 软件工程](12-software-engineering/README.md)、[13 软件架构](13-software-architecture/README.md)、[14 测试工程](14-software-testing/README.md)、[15 安全](15-computer-security/README.md)、[16 性能与可观测性](16-performance-observability/README.md)、[17 云原生](17-cloud-native/README.md)、[18 数据工程](18-data-engineering/README.md) |
| D. 计算机应用领域 | [19 Web 与客户端](19-web-client/README.md)、[20 图形学与多媒体](20-computer-graphics-multimedia/README.md)、[21 人机交互](21-human-computer-interaction/README.md)、[22 并行与高性能计算](22-parallel-high-performance-computing/README.md)、[23 嵌入式、IoT 与机器人](23-embedded-iot-robotics/README.md) |
| E. 人工智能与智能系统 | [24 人工智能与机器学习](24-artificial-intelligence-machine-learning/README.md)、[25 深度学习与生成式 AI](25-deep-learning-generative-ai/README.md)、[26 LLM 与 Agent 系统](26-llm-agent-systems/README.md) |

## 建议顺序

不要从 00 填到 26 再回头。数学尤其不要囤着，用到再往深里补。不同层要求的深度也不一样：

| 顺序 | 目录 | 怎么用 |
| --- | --- | --- |
| 1 | [00 工具与开发环境](00-tools/README.md) | 终端、Git、调试。后面的 demo 都从这里启动 |
| 2 | [01 数学基础](01-mathematics/README.md)、[02 编程基础](02-programming-fundamentals/README.md) | 先离散，再线性代数里的向量和矩阵。微积分和概率先知道地图。编程基础把天天在用的东西讲清楚 |
| 3 | [03 数据结构与算法](03-data-structures-algorithms/README.md) | 结构和复杂度。写业务、读源码都会碰到 |
| 4 | [05 计算机组成](05-computer-architecture/README.md)、[06 系统级编程](06-systems-programming/README.md) | 程序怎么变成指令，进程的内存长什么样。这两块挨着看 |
| 5 | [07 操作系统](07-operating-systems/README.md) | 进程、锁、文件、终端。容器之前先看这个 |
| 6 | [08 计算机网络](08-computer-networks/README.md) | 从分层到 HTTP、TLS。TCP 是全仓库的样例 |
| 7 | [09 数据库](09-database-systems/README.md) | SQL 背后的索引、事务、存储 |
| 8 | [04 计算理论](04-theory-of-computation/README.md)、[11 编程语言与编译器](11-programming-languages-compilers/README.md) | 状态机、文法、解释器。核心基础到这里收尾 |
| 系统与工程 | [10 分布式系统](10-distributed-systems/README.md)、[12 软件工程](12-software-engineering/README.md)、[13 软件架构](13-software-architecture/README.md)、[14 测试工程](14-software-testing/README.md)、[15 安全](15-computer-security/README.md)、[16 性能与可观测性](16-performance-observability/README.md)、[17 云原生](17-cloud-native/README.md)、[18 数据工程](18-data-engineering/README.md) | 要有实际工程理解。做到相关的事之前打开 |
| 专业领域 | [19 Web 与客户端](19-web-client/README.md)、[20 图形学与多媒体](20-computer-graphics-multimedia/README.md)、[21 人机交互](21-human-computer-interaction/README.md)、[22 并行与高性能计算](22-parallel-high-performance-computing/README.md)、[23 嵌入式、IoT 与机器人](23-embedded-iot-robotics/README.md) | 按兴趣和项目深入。19 是我的主场，可以随时拿前面学到的回来重看 |
| AI 体系 | [24 人工智能与机器学习](24-artificial-intelligence-machine-learning/README.md)、[25 深度学习与生成式 AI](25-deep-learning-generative-ai/README.md)、[26 LLM 与 Agent 系统](26-llm-agent-systems/README.md) | 学反向传播时回到链式法则，学模型时回到概率。26 会重用 12–16 的工程知识 |

05 和 06 没有严格先后。Nand2Tetris 偏自己造一块 CPU，CS:APP 偏 C 程序在机器上怎么跑。我打算用 05 建立图像，用 06 对着真实程序看。

## 进度

把 `[ ]` 改成 `[x]`，表示这一节能自己讲清楚，并且跑过或改过对应的 demo。只读完不算。这里只列主干子主题，完整清单见 [knowledge-map.md](knowledge-map.md)，其中 ★ 是必须讲清的，☆ 知道就行。

### 00 工具与开发环境

| 进度 | 子主题 |
| --- | --- |
| [ ] | 终端 |
| [ ] | Shell |
| [ ] | Git |
| [ ] | 编辑器 |
| [ ] | 调试 |
| [ ] | 正则 |
| [ ] | 构建与包管理 |
| [ ] | SSH 与远程开发 |
| [ ] | 容器基础使用 |
| [ ] | AI Coding 工具 |

### 01 数学 · 离散

| 进度 | 子主题 |
| --- | --- |
| [ ] | 逻辑 |
| [ ] | 集合 |
| [ ] | 证明 |
| [ ] | 图论 |
| [ ] | 组合 |

### 01 数学 · 线性代数

| 进度 | 子主题 |
| --- | --- |
| [ ] | 向量 |
| [ ] | 矩阵 |
| [ ] | 变换 |
| [ ] | 特征值 |
| [ ] | SVD |

### 01 数学 · 微积分

| 进度 | 子主题 |
| --- | --- |
| [ ] | 导数 |
| [ ] | 梯度 |
| [ ] | 链式法则 |

### 01 数学 · 概率与统计

| 进度 | 子主题 |
| --- | --- |
| [ ] | 概率 |
| [ ] | 分布 |
| [ ] | 贝叶斯 |
| [ ] | 统计与 A/B 测试 |

### 01 数学 · 其他

| 进度 | 子主题 |
| --- | --- |
| [ ] | 信息论 |
| [ ] | 数值分析 |
| [ ] | 最优化 |

### 02 编程基础

| 进度 | 子主题 |
| --- | --- |
| [ ] | 类型与表达式 |
| [ ] | 函数、作用域与闭包 |
| [ ] | 值语义与引用语义 |
| [ ] | 错误处理 |
| [ ] | 并发与异步基础 |
| [ ] | 编程范式 |

### 03 数据结构与算法

| 进度 | 子主题 |
| --- | --- |
| [ ] | 数组与链表 |
| [ ] | 栈与队列 |
| [ ] | 哈希 |
| [ ] | 树 |
| [ ] | 堆 |
| [ ] | 图 |
| [ ] | 排序 |
| [ ] | 二分 |
| [ ] | 递归 |
| [ ] | 动态规划 |
| [ ] | 贪心 |
| [ ] | 复杂度分析 |
| [ ] | 高级数据结构 |

### 04 计算理论

| 进度 | 子主题 |
| --- | --- |
| [ ] | 有限状态机 |
| [ ] | 正则语言 |
| [ ] | 上下文无关文法 |
| [ ] | 图灵机与可计算性 |
| [ ] | P 与 NP |

### 05 计算机组成

| 进度 | 子主题 |
| --- | --- |
| [ ] | 二进制编码 |
| [ ] | 逻辑门 |
| [ ] | CPU |
| [ ] | 指令集 |
| [ ] | 流水线 |
| [ ] | 缓存 |
| [ ] | 内存层次 |
| [ ] | GPU 架构基础 |

### 06 系统级编程

| 进度 | 子主题 |
| --- | --- |
| [ ] | 编译链接 |
| [ ] | 内存布局 |
| [ ] | 异常 |
| [ ] | 虚拟内存 |
| [ ] | 系统调用 |
| [ ] | I/O 多路复用 |
| [ ] | 线程与同步原语 |
| [ ] | Socket 编程 |

### 07 操作系统

| 进度 | 子主题 |
| --- | --- |
| [ ] | 进程与线程 |
| [ ] | 调度 |
| [ ] | 并发与锁 |
| [ ] | 内存管理 |
| [ ] | 文件系统 |
| [ ] | I/O |
| [ ] | 终端和 PTY |
| [ ] | 容器 |
| [ ] | 虚拟化 |

### 08 计算机网络

| 进度 | 子主题 |
| --- | --- |
| [ ] | 分层模型 |
| [ ] | IP |
| [ ] | TCP / UDP |
| [ ] | DNS |
| [ ] | HTTP/1、HTTP/2、HTTP/3 |
| [ ] | TLS |
| [ ] | SSH |
| [ ] | WebSocket |
| [ ] | QUIC |
| [ ] | 代理与抓包 |

### 09 数据库

| 进度 | 子主题 |
| --- | --- |
| [ ] | 关系模型 |
| [ ] | SQL |
| [ ] | B+ 树索引 |
| [ ] | LSM-Tree |
| [ ] | 事务 |
| [ ] | MVCC |
| [ ] | 存储引擎 |
| [ ] | KV 存储 |
| [ ] | 搜索与倒排索引 |
| [ ] | 向量数据库 |

### 10 分布式系统

| 进度 | 子主题 |
| --- | --- |
| [ ] | CAP |
| [ ] | 一致性 |
| [ ] | 复制 |
| [ ] | 分片 |
| [ ] | Raft |
| [ ] | 分布式事务 |
| [ ] | 消息队列 |
| [ ] | 幂等 |

### 11 编程语言与编译器

| 进度 | 子主题 |
| --- | --- |
| [ ] | 词法 |
| [ ] | 语法分析 |
| [ ] | AST |
| [ ] | 解释器 |
| [ ] | 类型 |
| [ ] | 代码生成 |
| [ ] | GC 与运行时 |
| [ ] | WebAssembly |

### 12 软件工程

| 进度 | 子主题 |
| --- | --- |
| [ ] | 设计原则 |
| [ ] | 设计模式 |
| [ ] | 重构 |
| [ ] | 代码审查 |
| [ ] | API 设计 |
| [ ] | AI 辅助开发 |

### 13 软件架构

| 进度 | 子主题 |
| --- | --- |
| [ ] | 架构风格 |
| [ ] | 模块边界 |
| [ ] | DDD |
| [ ] | CQRS 与事件溯源 |
| [ ] | 系统设计 |
| [ ] | ADR |

### 14 测试工程

| 进度 | 子主题 |
| --- | --- |
| [ ] | 测试策略 |
| [ ] | 单元与集成 |
| [ ] | 端到端 |
| [ ] | 属性测试 |
| [ ] | 模糊测试 |
| [ ] | AI 与 Agent 评测 |

### 15 安全

| 进度 | 子主题 |
| --- | --- |
| [ ] | 密码学基础 |
| [ ] | 认证与授权 |
| [ ] | Web 安全 |
| [ ] | 系统安全 |
| [ ] | 供应链安全 |
| [ ] | 威胁建模 |
| [ ] | AI 与 Agent 安全 |

### 16 性能与可观测性

| 进度 | 子主题 |
| --- | --- |
| [ ] | 延迟与吞吐 |
| [ ] | Profiling |
| [ ] | 缓存设计 |
| [ ] | 日志、指标、追踪 |
| [ ] | SLO |
| [ ] | 故障复盘 |

### 17 云原生

| 进度 | 子主题 |
| --- | --- |
| [ ] | 虚拟机与容器 |
| [ ] | Docker / OCI |
| [ ] | Kubernetes |
| [ ] | CI/CD |
| [ ] | IaC |
| [ ] | Serverless 与边缘 |

### 18 数据工程

| 进度 | 子主题 |
| --- | --- |
| [ ] | ETL / ELT |
| [ ] | 批处理与流处理 |
| [ ] | 仓库、湖、湖仓 |
| [ ] | 数据格式 |
| [ ] | 数据质量与治理 |

### 19 Web 与客户端

| 进度 | 子主题 |
| --- | --- |
| [ ] | Event Loop |
| [ ] | 浏览器架构 |
| [ ] | 渲染原理 |
| [ ] | JS 引擎 |
| [ ] | Node.js 运行时 |
| [ ] | 前端框架原理 |
| [ ] | Service Worker 与 Web Workers |
| [ ] | CORS / CSP |
| [ ] | SSR / CSR / SSG |
| [ ] | Web 性能 |
| [ ] | 移动与桌面客户端 |

### 20 图形学与多媒体

| 进度 | 子主题 |
| --- | --- |
| [ ] | 光栅化 |
| [ ] | 坐标变换 |
| [ ] | 着色器 |
| [ ] | WebGL / WebGPU |
| [ ] | 图像处理 |
| [ ] | 音视频编解码 |

### 21 人机交互

| 进度 | 子主题 |
| --- | --- |
| [ ] | 认知与心智模型 |
| [ ] | 交互设计原则 |
| [ ] | 可用性测试 |
| [ ] | 无障碍 |
| [ ] | AI 产品交互 |

### 22 并行与高性能计算

| 进度 | 子主题 |
| --- | --- |
| [ ] | 并行模型 |
| [ ] | SIMD |
| [ ] | 数据局部性 |
| [ ] | GPU 与 CUDA |
| [ ] | 大模型训练与推理加速 |

### 23 嵌入式、IoT 与机器人

| 进度 | 子主题 |
| --- | --- |
| [ ] | MCU 与固件 |
| [ ] | RTOS |
| [ ] | 外设总线 |
| [ ] | MQTT |
| [ ] | 机器人运动学 |
| [ ] | SLAM |

### 24 人工智能与机器学习

| 进度 | 子主题 |
| --- | --- |
| [ ] | 搜索与规划 |
| [ ] | 知识表示 |
| [ ] | 机器学习基础 |
| [ ] | 经典模型 |
| [ ] | 模型评估 |
| [ ] | 信息检索与推荐 |
| [ ] | 强化学习 |

### 25 深度学习与生成式 AI

| 进度 | 子主题 |
| --- | --- |
| [ ] | 神经网络 |
| [ ] | 反向传播 |
| [ ] | CNN 与 RNN |
| [ ] | Transformer |
| [ ] | 生成模型 |
| [ ] | 分布式训练与量化 |

### 26 LLM 与 Agent 系统

| 进度 | 子主题 |
| --- | --- |
| [ ] | LLM 基础 |
| [ ] | 训练与对齐 |
| [ ] | 推理与部署 |
| [ ] | Prompt 与工具调用 |
| [ ] | RAG |
| [ ] | Agent 原理 |
| [ ] | Agent Runtime 与 Harness |
| [ ] | Sandbox 与权限 |
| [ ] | Agent 评测 |

## 每个主题目录长什么样

做到动手那一节时，按 [`_template/`](_template/README.md) 往下长。现在只有 [TCP](08-computer-networks/tcp/README.md) 是满的：

| 文件 | 作用 |
| --- | --- |
| `README.md` | 三层讲解：一句话版、生活类比版、深入细节版，加上动手实验和自测题 |
| `demo/` | 能跑的小程序。规则、传输、自测分开 |
| `viz/` | 单文件 HTML 动画，浏览器直接打开 |
| `notes.md` | 踩坑、好问题、「原来如此」 |

其余主题目前只有一份 README：为什么学、子主题从哪到哪、书和课。不要为了填满目录去造空文件夹。子主题的七个学习单元（概念、动画、demo、实验、真实世界、自测、资料）见 [`_template/`](_template/README.md)。

## 书和课

选课以 [CS 自学指南](https://csdiy.wiki/) 为目录。这个仓库只负责把「读过」变成「跑过、看过、问过」。

| 主题 | 材料 |
| --- | --- |
| 工具 | [MIT Missing Semester](https://missing.csail.mit.edu/)（[中文译本](https://missing-semester-cn.github.io/)） |
| 线性代数 | [3Blue1Brown《线性代数的本质》](https://www.3blue1brown.com/topics/linear-algebra) |
| 微积分 | [3Blue1Brown《微积分的本质》](https://www.3blue1brown.com/topics/calculus)，用到链式法则时再看 |
| 数据结构与算法 | Sedgewick《算法（第 4 版）》，[配套站点](https://algs4.cs.princeton.edu/home/)；Princeton Algorithms |
| 组成 | [Nand2Tetris](https://www.nand2tetris.org/)，《计算机系统要素》 |
| 系统级编程 | 《深入理解计算机系统》（CS:APP），[CMU 15-213](https://www.cs.cmu.edu/~213/) |
| 操作系统 | [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/)，《操作系统导论》；[MIT 6.1810](https://pdos.csail.mit.edu/6.1810/)；[南京大学蒋炎岩操作系统课](https://jyywiki.cn/) |
| 网络 | Kurose《计算机网络：自顶向下方法》；[Stanford CS144](https://cs144.github.io/) |
| 数据库 | [CMU 15-445](https://15445.courses.cs.cmu.edu/)；Kleppmann《数据密集型应用系统设计》（[DDIA](https://dataintensive.net/)） |
| 编译器 | [Crafting Interpreters](https://craftinginterpreters.com/) |
| 分布式 | [MIT 6.5840](https://pdos.csail.mit.edu/6.5840/) |
| 图形 | [WebGL Fundamentals](https://webglfundamentals.org/)，之后再看 WebGPU |
| 编程基础 | [CS 61A](https://cs61a.org/)，[Composing Programs](https://www.composingprograms.com/) |
| 计算理论 | Sipser《计算理论导引》 |
| 软件架构与系统设计 | 《A Philosophy of Software Design》；[System Design Primer](https://github.com/donnemartin/system-design-primer) |
| 性能与可观测性 | Brendan Gregg《性能之巅》；Google [SRE 系列书](https://sre.google/books/) |
| Web 与浏览器 | [MDN](https://developer.mozilla.org/zh-CN/)；[Inside look at modern web browser](https://developer.chrome.com/blog/inside-browser-part1) |
| 并行计算 | [CMU 15-418](https://www.cs.cmu.edu/~418/) |
| 机器学习 | [动手学深度学习](https://zh.d2l.ai/)；反向传播回到上面的链式法则 |
| LLM 与 Agent | Karpathy [Zero to Hero](https://karpathy.ai/zero-to-hero.html)；[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) |

## 本地看动画

在仓库根目录：

```bash
python3 -m http.server 8080
```

浏览器打开 <http://localhost:8080/> 。TCP 那一节的协议 demo 另说，见 [08-computer-networks/tcp/demo](08-computer-networks/tcp/demo/README.md)：

```bash
cd 08-computer-networks/tcp/demo
node simulate.js
node selfcheck.js
```

## 打开 GitHub Pages

站点地址是 <https://luxiang0412.github.io/ai-era-cs/> 。仓库设置里要自己开一次：

1. 把包含 `.github/workflows/pages.yml` 的提交合并进 `main`。工作流只在 `main` 上部署。
2. 打开仓库的 Settings → Pages。
3. Build and deployment 的 Source 选 **GitHub Actions**。不要同时再选 “Deploy from a branch”，两套会抢同一份站点。
4. 推到 `main` 之后，Actions 里的 “Deploy GitHub Pages” 成功，Pages 页会给出网址。
5. 首页是仓库根的 `index.html`，动画仍放在各自的 `viz/` 里，工作流按同样的相对路径拷贝出去。

如果暂时不想用 Actions，也可以把 Source 设成 Deploy from branch → `main` → `/ (root)`。根目录的 `index.html` 和 `08-computer-networks/tcp/viz/` 的相对链接同样能工作。两种选一种就行。
