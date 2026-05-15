# 第 8 章自测

**Q1** 模块边界上，为何「导出类型」与「导出值」要分开考虑？  
**思路**：`import type` 擦除；避免运行时循环依赖。

**Q2** `namespace` 在现代 TS 中的定位？  
**思路**：遗留与声明合并；新代码优先 ES 模块。

**Q3** 三斜线指令仍可能出现在哪些文件？  
**思路**：`.d.ts`、全局 augment、老工具链。

**Q4** 如何为无类型的 npm 包补最小 `declare module`？  
**思路**：ambient module + 渐进精确化。

**Q5** `export =` 与 `esModuleInterop` 的关系？  
**思路**：CommonJS 默认导出互操作。
