# AI 时代学计算机基础

一个给自己用的学习仓库。我做前端和全栈，日常写页面、接口、部署，很多底层的词只停留在听过。这里把计算机基础补到能判断的程度：出了问题知道往哪一层看，读到一个词知道它大概在干什么。

动画站：[https://luxiang0412.github.io/ai-era-cs/](https://luxiang0412.github.io/ai-era-cs/)（要先按文末打开 GitHub Pages）。本地直接打开仓库根目录的 [index.html](index.html) 也行。

## 怎么学

不追求闭卷手写出一个操作系统或 TCP 栈。样板代码可以让 AI 写。要练的是判断：这段行为正不正常，瓶颈大概在哪，这个抽象漏了什么。

每一节按同一个循环：

1. **读概念。** 先看一句话版，再用一个生活里的类比把画面立住，最后才看细节。细节读不进去就回到类比，不要在术语里打转。
2. **跑一个小 demo。** 让 AI 写一个能跑的最小实现。我负责提问、运行、看输出，然后故意改坏：把丢包率拉高，把窗口改成 1，把超时改得比网络还短。看它怎么错，比看它怎么对有用。
3. **看它动。** 协议、调度、树这种东西，静图不够。做成能暂停、能单步的动画，对着画面问「这一步如果丢了会怎样」。

三层讲解的空表格在 [`_template/`](_template/README.md)。成品样例是 [TCP](06-network/tcp/README.md)：能读、能跑、能点。

## 建议顺序

不要从 00 填到 13 再回头。数学尤其不要囤着，用到再往深里补。

| 顺序 | 目录 | 怎么用 |
| --- | --- | --- |
| 1 | [00 工具](00-tools/README.md) | 终端、Git、调试。后面的 demo 都从这里启动 |
| 2 | [01 数学](01-math/README.md) | 先离散，再线性代数里的向量和矩阵。微积分和概率先知道地图 |
| 3 | [02 数据结构与算法](02-dsa/README.md) | 结构和复杂度。写业务、读源码都会碰到 |
| 4 | [03 计算机组成](03-architecture/README.md)、[04 系统级编程](04-system/README.md) | 程序怎么变成指令，进程的内存长什么样。这两块挨着看 |
| 5 | [05 操作系统](05-os/README.md) | 进程、锁、文件、终端。容器之前先看这个 |
| 6 | [06 网络](06-network/README.md) | 从分层到 HTTP、TLS。TCP 是全仓库的样例 |
| 7 | [07 数据库](07-database/README.md) | SQL 背后的索引、事务、存储 |
| 之后按兴趣 | [08 编译器](08-compiler/README.md)、[09 分布式](09-distributed/README.md)、[10 安全](10-security/README.md)、[11 图形](11-graphics/README.md)、[12 软件工程](12-software-eng/README.md)、[13 AI](13-ai/README.md) | 做相关的事之前再开。学反向传播时回到链式法则，学模型时回到概率 |

03 和 04 没有严格先后。Nand2Tetris 偏自己造一块 CPU，CS:APP 偏 C 程序在机器上怎么跑。我打算用 03 建立图像，用 04 对着真实程序看。

## 进度

把 `[ ]` 改成 `[x]`，表示这一节能自己讲清楚，并且跑过或改过对应的 demo。只读完不算。

### 00 工具

| 进度 | 子主题 |
| --- | --- |
| [ ] | 终端 |
| [ ] | Shell |
| [ ] | Git |
| [ ] | 编辑器 |
| [ ] | 调试 |
| [ ] | 正则 |

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

### 01 数学 · 概率

| 进度 | 子主题 |
| --- | --- |
| [ ] | 概率 |
| [ ] | 分布 |
| [ ] | 贝叶斯 |
| [ ] | 信息论 |

### 02 数据结构与算法

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

### 03 计算机组成

| 进度 | 子主题 |
| --- | --- |
| [ ] | 二进制编码 |
| [ ] | 逻辑门 |
| [ ] | CPU |
| [ ] | 指令集 |
| [ ] | 流水线 |
| [ ] | 缓存 |
| [ ] | 内存层次 |

### 04 系统级编程

| 进度 | 子主题 |
| --- | --- |
| [ ] | 编译链接 |
| [ ] | 内存布局 |
| [ ] | 异常 |
| [ ] | 虚拟内存 |

### 05 操作系统

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

### 06 网络

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

### 07 数据库

| 进度 | 子主题 |
| --- | --- |
| [ ] | 关系模型 |
| [ ] | SQL |
| [ ] | B+ 树索引 |
| [ ] | 事务 |
| [ ] | MVCC |
| [ ] | 存储引擎 |
| [ ] | KV 存储 |

### 08 编译器

| 进度 | 子主题 |
| --- | --- |
| [ ] | 词法 |
| [ ] | 语法分析 |
| [ ] | AST |
| [ ] | 解释器 |
| [ ] | 类型 |
| [ ] | 代码生成 |

### 09 分布式

| 进度 | 子主题 |
| --- | --- |
| [ ] | CAP |
| [ ] | 一致性 |
| [ ] | 复制 |
| [ ] | 分片 |
| [ ] | Raft |
| [ ] | 分布式事务 |

### 10 安全

| 进度 | 子主题 |
| --- | --- |
| [ ] | 密码学基础 |
| [ ] | 认证与授权 |
| [ ] | Web 安全 |
| [ ] | 系统安全 |
| [ ] | 供应链安全 |

### 11 图形

| 进度 | 子主题 |
| --- | --- |
| [ ] | 光栅化 |
| [ ] | 坐标变换 |
| [ ] | 着色器 |
| [ ] | WebGL / WebGPU |

### 12 软件工程

| 进度 | 子主题 |
| --- | --- |
| [ ] | 设计模式 |
| [ ] | 架构 |
| [ ] | 测试 |
| [ ] | 可观测性 |
| [ ] | 系统设计 |

### 13 AI

| 进度 | 子主题 |
| --- | --- |
| [ ] | 机器学习基础 |
| [ ] | 神经网络 |
| [ ] | 反向传播 |
| [ ] | Transformer |
| [ ] | LLM |
| [ ] | Agent 原理 |

## 每个主题目录长什么样

做到动手那一节时，按 [`_template/`](_template/README.md) 往下长。现在只有 [TCP](06-network/tcp/README.md) 是满的：

| 文件 | 作用 |
| --- | --- |
| `README.md` | 三层讲解：一句话版、生活类比版、深入细节版，加上动手实验和自测题 |
| `demo/` | 能跑的小程序。规则、传输、自测分开 |
| `viz/` | 单文件 HTML 动画，浏览器直接打开 |
| `notes.md` | 踩坑、好问题、「原来如此」 |

其余主题目前只有一份 README：为什么学、子主题从哪到哪、书和课。不要为了填满目录去造空文件夹。

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
| 机器学习 | [动手学深度学习](https://zh.d2l.ai/)；反向传播回到上面的链式法则 |

## 本地看动画

在仓库根目录：

```bash
python3 -m http.server 8080
```

浏览器打开 <http://localhost:8080/> 。TCP 那一节的协议 demo 另说，见 [06-network/tcp/demo](06-network/tcp/demo/README.md)：

```bash
cd 06-network/tcp/demo
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

如果暂时不想用 Actions，也可以把 Source 设成 Deploy from branch → `main` → `/ (root)`。根目录的 `index.html` 和 `06-network/tcp/viz/` 的相对链接同样能工作。两种选一种就行。
