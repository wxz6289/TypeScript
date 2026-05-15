# Chapter 9 · Items 72–78（Writing and Running Your Code）

---

## Item 72 — Prefer ECMAScript Features to TypeScript Features

**问题**：使用过时 TS-only 运行时特性。  
**要点**：类、模块、私有字段等以标准为准；TS 创新主要在类型层。  
**示例**：用 `#field` 或标准 class 字段策略替代历史 workaround。

---

## Item 73 — Use Source Maps to Debug TypeScript

**问题**：断点打在 emit 行对不上源码。  
**要点**：`sourceMap`；Node `--enable-source-maps`。  
**示例**：`tsconfig` 中 `"sourceMap": true`。

---

## Item 74 — Know How to Reconstruct Types at Runtime

**问题**：以为类型能守护反序列化。  
**要点**：schema 校验（zod 等）再断言到 TS 类型。  
**示例**：

```ts
import { z } from 'zod';
const S = z.object({ id: z.string() });
type T = z.infer<typeof S>;
```

---

## Item 75 — Understand the DOM Hierarchy

**问题**：事件目标类型过宽/过窄。  
**要点**：`EventTarget` vs `Element` vs `HTMLElement`；正确使用泛型事件。  
**示例**：`document.getElementById('x')` 可能为 `null`。

---

## Item 76 — Create an Accurate Model of Your Environment

**问题**：Node 里用 DOM lib 或反之。  
**要点**：`lib`、`types`、条件类型分环境入口。  
**示例**：分离 `tsconfig.browser.json` / `tsconfig.node.json`。

---

## Item 77 — Understand the Relationship Between Type Checking and Unit Testing

**问题**：用测试替代类型或反之。  
**要点**：类型抓组合爆炸不变量；测试抓行为与回归。  
**示例**：核心纯函数给完整类型 + 少量属性测试。

---

## Item 78 — Pay Attention to Compiler Performance

**问题**：全量 `tsc` 极慢。  
**要点**：`include` 收紧、`skipLibCheck`、project references、拆包。  
**示例**：monorepo 用 references 增量构建。
