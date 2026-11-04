# 23 嵌入式、物联网与机器人

[← 回到路线](../README.md)

微控制器、固件、RTOS、嵌入式 Linux、外设总线、传感器与执行器、低功耗、MQTT、边缘设备、机器人运动学与控制、SLAM、具身智能。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

这是离硬件最近的一科，也是 AI 走进物理世界的地方。没有操作系统、内存以 KB 计、错过时限就是故障，这些约束会逼你把 [05](../05-computer-architecture/README.md) 和 [07](../07-operating-systems/README.md) 学过的东西重新落地。按兴趣深入，不要求和核心科类同样深。

## 建议顺序

1. **嵌入式基础** — 微处理器和微控制器、MCU 架构、固件开发。
2. **实时系统** — RTOS、中断、优先级。「实时」是说可预测，不是说快。
3. **嵌入式 Linux 与驱动** — 设备树、驱动、交叉编译。
4. **外设与总线** — GPIO、UART、SPI、I2C、CAN。用逻辑分析仪看一次波形。
5. **传感器与功耗** — 采样、滤波、执行器、低功耗设计。
6. **物联网** — 架构、MQTT、边缘计算。
7. **机器人** — 运动学、控制、定位导航、SLAM、感知。
8. **具身智能** — 模型怎么驱动真实的身体。接 [24–26](../24-artificial-intelligence-machine-learning/README.md)。

## 书和课

- Elecia White《Making Embedded Systems》
- Lynch, Park《Modern Robotics》
- Thrun 等《Probabilistic Robotics》，定位和 SLAM

demo：用一块开发板点灯、读传感器，再通过 MQTT 推到一个网页上实时显示。
