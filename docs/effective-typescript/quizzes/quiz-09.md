# 第 9 章自测

**Q1** 为什么说「把类型检查全交给 ESLint」不现实？  
**思路**：语义与可判定性；TS 是类型系统真相源。

**Q2** `@typescript-eslint/consistent-type-imports` 解决什么问题？  
**思路**：值/类型导入分离、打包与循环依赖。

**Q3** 何时 `eslint-disable-next-line` 可接受？  
**思路**：第三方误报 + 工单链接；禁止无注释裸禁。

**Q4** 在 monorepo 里如何统一 TS + ESLint 版本？  
**思路**：root 依赖、workspace 协议、CI 锁版本。

**Q5** `tsc --noEmit` 与 `eslint` 在 CI 中并行还是串行更合理？  
**思路**：并行省时间；失败都需可见。
