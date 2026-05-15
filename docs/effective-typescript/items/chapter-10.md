# Chapter 10 · Items 79–83（Modernization and Migration）

---

## Item 79 — Write Modern JavaScript

**问题**：迁移时仍写 ES3 风格。  
**要点**：`import/export`、class、`const/let`；减少历史互操作负担。  
**示例**：

```ts
export const VERSION = 2;
```

---

## Item 80 — Use `@ts-check` and JSDoc to Experiment with TypeScript

**问题**：大仓不能一次性改 `.ts`。  
**要点**：`.js` 顶部 `@ts-check` + JSDoc 渐进获得类型。  
**示例**：

```js
// @ts-check
/** @param {number} x */
export function double(x) {
  return x * 2;
}
```

---

## Item 81 — Use `allowJs` to Mix TypeScript and JavaScript

**问题**：同项目 `.ts` 与 `.js` 共存。  
**要点**：`allowJs`；逐步替换；注意 `checkJs` 强度。  
**示例**：`"allowJs": true` 于 `tsconfig.json`。

---

## Item 82 — Convert Module by Module Up Your Dependency Graph

**问题**：从叶到根还是从根到叶？  
**要点**：自底向上：先无依赖模块，减少类型涟漪。  
**示例**：先迁移 `utils/`，再迁移引用它的 `features/`。

---

## Item 83 — Don't Consider Migration Complete Until You Enable `noImplicitAny`

**问题**：`strict` 未开就认为迁移结束。  
**要点**：`noImplicitAny` 是底线里程碑；最终目标 `strict`。  
**示例**：CI 中逐步打开 `strict` 子开关并修红。
