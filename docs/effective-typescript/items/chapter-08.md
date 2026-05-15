# Chapter 8 · Items 65–71（Type Declarations and `@types`）

---

## Item 65 — Put TypeScript and `@types` in `devDependencies`

**问题**：库类型打进生产依赖。  
**要点**：运行时不需要 `typescript`/`@types`；库发布另有 `types` 字段策略。  
**示例**：`npm i -D typescript @types/node`

---

## Item 66 — Understand the Three Versions Involved in Type Declarations

**问题**：「装的是 2.x 类型但跑的是 1.x 库」类错配。  
**要点**：区分：库版本、类型包版本、`@types` 维护版本。  
**示例**：锁定 major 对齐并在 CI 检测。

---

## Item 67 — Export All Types That Appear in Public APIs

**问题**：调用方无法命名返回类型。  
**要点**：导出 `Request`/`Response` 等公共形状。  
**示例**：`export type { User };`

---

## Item 68 — Use TSDoc for API Comments

**问题**：注释与类型重复或过时。  
**要点**：TSDoc 标签、`@example`；与类型分工。  
**示例**：`/** @returns 规范化后的绝对 URL */`

---

## Item 69 — Provide a Type for `this` in Callbacks if It's Part of Their API

**问题**：库要求 `this` 上下文，TS 默认 `any`。  
**要点**：`function (this: Foo) {}` 或声明回调接口。  
**示例**：

```ts
function onClick(this: HTMLElement, ev: MouseEvent) {
  this.innerHTML = '';
}
```

---

## Item 70 — Mirror Types to Sever Dependencies

**问题**：重型依赖仅用到极小 API。  
**要点**：复制最小类型形状，切断 `@types` 传递依赖。  
**示例**：自建 `interface MinimalStripe { ... }` 而非引入巨型声明。

---

## Item 71 — Use Module Augmentation to Improve Types

**问题**：第三方类型缺字段或错误。  
**要点**：`declare module 'pkg' { interface Foo { ... } }` 局部增强。  
**示例**：给无类型的全局插件补声明。
