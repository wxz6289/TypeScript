# Chapter 1 · Items 1–5（Getting to Know TypeScript）

---

## Item 1 — Understand the Relationship Between TypeScript and JavaScript

**问题**：把 TS 当成「另一门语言」还是「带类型的 JS」？  
**要点**：TS 是 JS 的超集；类型信息擦除后不改变运行时语义；学习曲线主要在类型系统。  
**示例**：

```ts
const n: number = 1;
// 编译后无 `: number`；运行时仍是普通 JS
```

---

## Item 2 — Know Which TypeScript Options You're Using

**问题**：团队对「严格程度」没有共识。  
**要点**：至少明确 `strict`、`module`、`moduleResolution`、`target`；新人入职先读 `tsconfig`。  
**示例**：在 CI 中固定 `tsc --noEmit` 与本地一致。

---

## Item 3 — Understand That Code Generation Is Independent of Types

**问题**：以为改类型会改变运行结果。  
**要点**：类型检查与 emit 是两条线；`noEmit` 只做检查；类型不参与 `if`。  
**示例**：

```ts
function f(x: number) {
  return x; // 类型与 return 的 JS 语义独立
}
```

---

## Item 4 — Get Comfortable with Structural Typing

**问题**：为什么「名字不同」也能赋值？  
**要点**：看形状是否兼容；与名义类型语言习惯不同。  
**示例**：

```ts
type Pt = { x: number; y: number };
const p = { x: 1, y: 2 };
function use(pt: Pt) {}
use(p);
```

---

## Item 5 — Limit Use of the `any` Type

**问题**：到处 `any` 关掉检查。  
**要点**：边界用 `unknown`；`any` 限制范围与寿命；公共 API 禁止泄漏 `any`。  
**示例**：

```ts
function safeParse(s: string): unknown {
  return JSON.parse(s);
}
```
