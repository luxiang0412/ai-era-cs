# 20 图形学与多媒体

[← 回到路线](../README.md)

光栅化、坐标变换、着色器、WebGL / WebGPU。把「屏幕上的一个像素是谁算出来的」走通。完整子类见 [知识地图](../knowledge-map.md)。

## 为什么要学

Canvas 2D 够画图表。再往下，变换、相机、光照，都是同一套坐标和插值。线性代数的几何图像在 [这里](../01-mathematics/linear-algebra/README.md) 用得上。做可视化的时候，知道 GPU 在并行地为每个顶点、每个像素跑一小段程序，就不会把一切都丢进主线程。

## 建议顺序

1. **光栅化** — 连续的三角形变成离散的像素。先理解「覆盖到哪些像素」，抗锯齿是这个离散化的修补。
2. **坐标变换** — 模型自己的坐标，到世界，到相机，到裁剪空间，再到屏幕。每一步是一个矩阵。顺序反了，图像会飞。
3. **着色器** — 顶点着色器处理每个顶点，片段着色器处理每个像素。数据从顶点插值到像素。颜色从哪来：可以是纹理，也可以是光照公式。
4. **WebGL / WebGPU** — 先用 WebGL 把一个三角形画出来，再把上面的变换接进去。[WebGL Fundamentals](https://webglfundamentals.org/) 的前几章够入门。WebGPU 是更新的接口，资源声明更明确，适合在 WebGL 的图像已经有了之后再看，不要两套同时从零开始。

## 书和课

- [WebGL Fundamentals](https://webglfundamentals.org/)
- 想补光栅化和坐标时，Scratchapixel 的对应章节可以当字典
- 矩阵部分回到 [3Blue1Brown 线性代数](https://www.3blue1brown.com/topics/linear-algebra)

demo 就一个可拖拽的三角形：滑块改旋转，高亮当前用的是哪一个矩阵。着色器那一节再把颜色从「写死的红」改成「跟像素坐标有关」。
