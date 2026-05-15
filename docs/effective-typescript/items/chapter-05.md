# Chapter 5 · Items 43–49（Unsoundness and the `any` Type）

---

## Item 43 — Use the Narrowest Possible Scope for `any` Types

**问题**：`any` 泄漏到全文件。  
**要点**：块级、函数内；立刻封装为 `unknown` 或具体类型。  
**示例**：

```ts
function run(json: string) {
  const v: any = JSON.parse(json);
  return v as unknown;
}
```

---

## Item 44 — Prefer More Precise Variants of `any` to Plain `any`

**问题**：`any` 是唯一逃生口。  
**要点**：`any[]`、`Record<string, unknown>` 等略窄形式有时更安全。  
**示例**：`function keys(x: Record<string, unknown>) { return Object.keys(x); }`

---

## Item 45 — Hide Unsafe Type Assertions in Well-Typed Functions

**问题**：调用点到处 `as`。  
**要点**：把断言封进小函数，外层签名精确。  
**示例**：

```ts
function parseUser(json: string): User {
  const v: unknown = JSON.parse(json);
  if (!isUser(v)) throw new Error('bad');
  return v;
}
```

---

## Item 46 — Use `unknown` Instead of `any` for Values with an Unknown Type

**问题**：外部数据直接当对象用。  
**要点**：`unknown` 强制先校验。  
**示例**：见 Item 45。

---

## Item 47 — Prefer Type-Safe Approaches to Monkey Patching

**问题**：给 `globalThis` 挂字段无类型。  
**要点**：`declare global` + 初始化守卫；模块封装。  
**示例**：

```ts
declare global {
  interface Window {
    __APP_CFG__?: { api: string };
  }
}
```

---

## Item 48 — Avoid Soundness Traps

**问题**：双重断言、可变数组协变等制造「假安全」。  
**要点**：了解常见 unsound 角；测试补洞。  
**示例**：避免 `(x as unknown as Foo)` 链式滥用。

---

## Item 49 — Track Your Type Coverage to Prevent Regressions in Type Safety

**问题**：`any` 与 `@ts-ignore` 偷偷增长。  
**要点**：type-coverage 工具、lint 规则、CI 统计。  
**示例**：在 CI 跑 `type-coverage --detail`（若采用该工具）。
