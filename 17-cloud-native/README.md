# 17 云计算、虚拟化与云原生

[← 回到路线](../README.md)

云服务模型、虚拟机与 Hypervisor、容器、Docker / OCI、Kubernetes、服务网格、CI/CD、IaC、自动扩缩容、Serverless、边缘计算。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

部署是全栈每天都碰的事。镜像为什么这么大，Pod 为什么一直重启，环境变量在哪一层被覆盖，答案都在这一层。它建立在 [07 操作系统](../07-operating-systems/README.md) 的 Namespace 和 Cgroups 之上：容器不是轻量虚拟机，是被隔离的进程。

## 建议顺序

1. **云计算基础** — IaaS / PaaS / SaaS，公有云、私有云、混合云。知道自己用的平台替你管了哪一层。
2. **虚拟化与容器** — 虚拟机和容器的隔离边界不同。Docker 镜像分层、OCI 标准。
3. **Kubernetes** — Pod、Deployment、Service、Ingress。先在本地起一个集群，部署一个自己的服务。
4. **流量与网格** — 服务发现、负载均衡、Gateway、Service Mesh。
5. **交付** — CI/CD、Infrastructure as Code、配置与密钥管理。
6. **弹性** — 自动扩缩容、云存储、云网络。
7. **新形态** — Serverless、边缘计算、多集群。前端常用的边缘函数就在这里。

## 书和课

- [Kubernetes 官方文档](https://kubernetes.io/zh-cn/docs/home/)，中文
- Docker 官方的入门教程
- 《Kubernetes in Action》

demo：把 TCP demo 打成一个最小镜像，看每一层多大；在本地集群里删掉一个 Pod，看它被重新拉起。
