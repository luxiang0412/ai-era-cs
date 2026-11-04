# 01 数学基础

[← 回到路线](../README.md)

只学后面用得上的那几块：离散、线性代数、微积分、概率。不是把数学专业重读一遍。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

前端和全栈看起来离数学远。做到这些地方会撞上：动画和图形是向量和矩阵，推荐和模型是概率，反向传播是链式法则，算法分析是计数和证明。公式本身可以让 AI 推，自己要有的是图像：这个符号在说哪一种变化。

不要按教科书从第一章囤到最后一章。离散和线性代数的前半段先建立语言，微积分和概率做成地图，写到 [24–26 AI](../24-artificial-intelligence-machine-learning/README.md) 和 [20 图形学](../20-computer-graphics-multimedia/README.md) 时再折回来。

## 建议顺序

1. [离散](discrete/README.md) — 逻辑、集合、证明、图、计数。后面说「当且仅当」「归纳」时不发懵。
2. [线性代数](linear-algebra/README.md) — 向量、矩阵、变换。优先看 3Blue1Brown，先有几何，再对公式。
3. [微积分](calculus/README.md) — 导数、梯度、链式法则。为梯度下降和反向传播准备。
4. [概率](probability/README.md) — 条件概率、分布、贝叶斯、一点点信息论。训练模型和读指标时用。

## 书和课

- 线性代数：[3Blue1Brown《线性代数的本质》](https://www.3blue1brown.com/topics/linear-algebra)
- 微积分：[3Blue1Brown《微积分的本质》](https://www.3blue1brown.com/topics/calculus)
- 离散和概率：先用 CS 自学指南里对应课程的前几讲，[csdiy.wiki](https://csdiy.wiki/)。具体书在各子目录里。

每块目录里再拆由浅入深的子主题。做 demo 时优先做「能拖动的小画面」：一个向量被矩阵乘了以后指向哪，一条损失曲线沿着梯度往哪走。
