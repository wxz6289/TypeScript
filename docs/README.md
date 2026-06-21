# TypeScript 官方文档核心整理

本目录按 [TypeScript 官方文档](https://www.typescriptlang.org/docs/) 与 [Handbook 导言](https://www.typescriptlang.org/docs/handbook/intro.html) 的体系，对**核心概念**做结构化摘录与示例补充，便于系统学习与速查。

> **官方入口**：[typescriptlang.org/docs](https://www.typescriptlang.org/docs/)  
> **Handbook**：[The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## 《Effective TypeScript》第二版（读书整理）

与官方手册互补的**实践向**笔记（非原文摘录）：[`effective-typescript/README.md`](./effective-typescript/README.md) · [第一版与第二版对照](./effective-typescript/第一版与第二版对照.md)

---

## 阅读顺序建议

| 序号 | 文档 | 侧重 |
|------|------|------|
| 1 | [00-定位与目标](./00-定位与目标.md) | 为何需要 TS、Handbook 与 Reference 分工 |
| 2 | [01-基础](./01-基础.md) | 注解、推断、`strict`、基本类型 |
| 3 | [02-日常类型](./02-日常类型.md) | `object`、联合、字面量、可选、`readonly` |
| 4 | [03-收窄](./03-收窄.md) | 类型守卫、`in`、`instanceof`、判别联合 |
| 5 | [04-函数与对象](./04-函数与对象.md) | 函数类型、重载、索引签名、接口与 type |
| 6 | [05-类型编程](./05-类型编程.md) | 泛型、`keyof`、`typeof`、条件与映射类型 |
| 7 | [06-类与模块](./06-类与模块.md) | 类、`implements`、ESM/CJS 要点 |
| 8 | [07-工程与配置](./07-工程与配置.md) | `tsconfig`、`tsc`、严格选项 |
| 9 | [08-声明文件与 JS 互操作](./08-声明文件与JS互操作.md) | `.d.ts`、JSDoc、`allowJs` |
| 10 | [09-仓库实践与入门速查](./09-仓库实践与入门速查.md) | 安装、`tsc`、本地项目、迁移与速查 |

---

## 深度专题（supplements）

在 00–09 体系之外，下列文档对单一主题做更展开说明，并链接到 [`base/`](../base/) 示例代码：

| 文档 | 对应 Handbook | 本地示例 |
|------|---------------|----------|
| [generic-type.md](./supplements/generic-type.md) | 05 泛型 | `universal-type.ts`, `db-operate.ts` |
| [overload.md](./supplements/overload.md) | 04 函数重载 | `function.ts`, `overload-fn.ts` |
| [interface-class.md](./supplements/interface-class.md) | 06 类与接口 | `interface-class.ts` |
| [infer.md](./supplements/infer.md) | 05 条件类型 | `infer.ts`, `condition-type.ts` |
| [variance.md](./supplements/variance.md) | 类型兼容 | （概念文） |

早期零散笔记 [`00.md`](./00.md) 内容已合并进 00–01，保留作历史参考。

---

## 与官方的关系

- **Handbook**：面向日常开发的连贯教程；本整理与之章节大致对应。  
- **Reference**：单点深入（如 Utility Types、Declaration Merging）；正文点到为止，细节请回官方 Reference。  
- **非目标**（与官方 Handbook 一致）：不替代 JS 基础课、不展开与 webpack/vite 等工具链的逐项集成。

---

## 本地项目

仓库结构、安装、`tsconfig` 速查与 JS 迁移步骤见 [09-仓库实践与入门速查](./09-仓库实践与入门速查.md)；根目录 [`README.md`](../README.md) 为仓库入口索引。
