# 19 Web、移动与客户端开发

[← 回到路线](../README.md)

HTML、CSS、JavaScript、TypeScript、DOM、Event Loop、浏览器架构与渲染、V8 与 Node.js、Service Worker、Web Workers、CORS / CSP、前端框架原理、SSR / CSR / SSG、Web 性能、前端工程化，以及移动端和桌面客户端。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

这是我的主场，但会用框架不等于知道浏览器在干什么。页面卡顿、白屏、跨域报错、构建产物越来越大，排查都要落到浏览器的进程、渲染流水线和网络加载上。这一科是拿前面学到的 OS、网络、编译器知识回来重新看日常工作。

## 建议顺序

1. **三件套再看一遍** — HTML 语义、CSS 层叠与布局、JavaScript 语言本身、TypeScript 类型。
2. **DOM 与 Event Loop** — 宏任务、微任务、渲染时机。和 [07](../07-operating-systems/README.md) 的调度对照：单线程怎么做到不卡。
3. **浏览器架构** — 多进程模型、站点隔离。
4. **渲染原理** — DOM 树、CSSOM、Layout、Paint、Composite。知道哪种改动会触发重排。
5. **JS 引擎与 Node.js** — V8 的解析、JIT、GC，和 [11 编译器](../11-programming-languages-compilers/README.md) 接上。Node 是同一个引擎加上 libuv 的事件循环，底下是 [06 的 I/O 多路复用](../06-systems-programming/README.md)。
6. **网络加载与存储** — 资源优先级、缓存、Web Storage、Service Worker、PWA。
7. **并行与扩展** — Web Workers、WebAssembly。
8. **安全机制** — 同源策略、CORS、CSP。和 [15](../15-computer-security/README.md) 的 XSS / CSRF 对着看。
9. **前端框架原理** — 组件模型、响应式、虚拟 DOM、状态管理。自己写一个 50 行的响应式系统，再去看 React 和 Vue 各自做了什么取舍。
10. **渲染模式与工程化** — SSR / CSR / SSG、Web 性能优化、构建系统。
11. **移动与桌面客户端** — iOS / Android 的基本模型、React Native / Flutter、Electron / Tauri。按项目需要再深入，先知道它们和浏览器差在哪：没有 URL、要发版审核、要考虑离线。

## 书和课

- [MDN](https://developer.mozilla.org/zh-CN/)
- Chrome 团队的 [Inside look at modern web browser](https://developer.chrome.com/blog/inside-browser-part1) 系列
- [web.dev](https://web.dev/) 上的性能和渲染文章

demo：一个最小响应式系统（依赖收集 + 触发更新）；一页动画演示宏任务和微任务的执行顺序；改一个元素的 `width` 和 `transform`，在 Performance 面板对比重排。
