# 第 8 章 · 类型声明与 `@types`（Type Declarations and `@types`）

对应原书第 8 章（O'Reilly 预览可见 **Item 65: Put TypeScript and `@types` in `devDependencies`** 等）。

---

## 1. 本章目标

建立 **npm 依赖与类型包** 的心智模型：谁该进 `dependencies` / `devDependencies`、如何消费与编写声明文件、如何贡献高质量类型。

---

## 2. `dependencies` vs `devDependencies`（简版规则）

| 放入 | 典型内容 |
|------|----------|
| `dependencies` | **运行时** `import` 的库（如 `lodash`） |
| `devDependencies` | **仅开发与类型检查**：`typescript`、`@types/*`、测试、构建器 |

> 若你发布的是**库**：对「类型是否随包分发」另有考量（`types` 字段、`exports`）——以原书 Item 为准细读。

---

## 3. 自己写 `.d.ts` 的时机

- 给内部 legacy JS 包补类型。  
- 给无类型的 npm 包本地 shim（优先查 DefinitelyTyped 是否已有 `@types/foo`）。

---

## 4. `declare module` 与通配导入

```ts
declare module '*.svg' {
  const src: string;
  export default src;
}
```

---

## 5. TSDoc 与类型信息去重

- 公共 API 用 **TSDoc** 写行为、边界、复杂度；避免把「参数已是 `string`」再写一遍。  
- `@template`、`@param` 等与泛型配合（见原书 **Item 68** 附近主题）。

---

## 6. 自检清单

- [ ] CI 安装是否使用 `npm ci` 且不会错误地把 `typescript` 打进生产镜像？  
- [ ] `@types` 版本是否与运行时库主版本大致同步？

下一章：[ch09-编写与运行代码](./ch09-编写与运行代码.md)。
