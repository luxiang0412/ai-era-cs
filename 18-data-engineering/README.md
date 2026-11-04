# 18 数据工程

[← 回到路线](../README.md)

数据生命周期、ETL / ELT、批处理与流处理、数据仓库 / 数据湖 / Lakehouse、数据格式、Kafka、Spark / Flink、调度、数据质量与治理、Feature Store。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

产品做大以后，数据从业务库流到报表、推荐、模型训练。埋点丢了一半、报表和后台数字对不上、训练数据里混进了测试账号，都是这一层的问题。AI 应用的效果很大程度取决于数据管道。

## 建议顺序

1. **数据生命周期** — 采集、清洗、存储、使用、归档。
2. **ETL 与 ELT** — 先转换再加载，还是先加载再转换。
3. **批处理与流处理** — 按天跑一次和来一条处理一条。窗口、迟到数据、恰好一次。
4. **存储形态** — 数据仓库、数据湖、Lakehouse。行存和列存的差别和 [09 数据库](../09-database-systems/README.md) 里的列式数据库对上。
5. **数据格式** — JSON、CSV、Parquet、Avro、ORC。各自为谁优化。
6. **工具链** — Kafka、Spark、Flink、工作流调度。
7. **治理** — 数据质量、血缘、元数据、隐私与安全。
8. **服务模型** — Feature Store，把特征同时给训练和线上用。接 [24](../24-artificial-intelligence-machine-learning/README.md)。

## 书和课

- Joe Reis, Matt Housley《Fundamentals of Data Engineering》
- 《数据密集型应用系统设计》第 10、11 章，批处理和流处理

demo：用 DuckDB 读一个 Parquet 文件，和同样数据的 CSV 比较查询速度和文件大小。
