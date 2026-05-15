# Chapter 7 · Items 59–64（TypeScript Recipes）

---

## Item 59 — Use Never Types to Perform Exhaustiveness Checking

**问题**：`switch` 漏分支运行时才发现。  
**要点**：`default` 收束到 `never`；缺 case 即编译错。  
**示例**：

```ts
function assertNever(x: never): never {
  throw new Error(x);
}
```

---

## Item 60 — Know How to Iterate Over Objects

**问题**：`Object.keys` 返回 `string[]` 丢键联合。  
**要点**：`keyof` 辅助、`Object.entries` 与类型断言边界；或 `Map`。  
**示例**：

```ts
function keys<K extends string>(o: Record<K, unknown>): K[] {
  return Object.keys(o) as K[];
}
```

---

## Item 61 — Use Record Types to Keep Values in Sync

**问题**：两个并行对象易不同步。  
**要点**：`Record<K,V>`、从单一映射派生。  
**示例**：

```ts
const labels = { a: 'A', b: 'B' } as const;
type K = keyof typeof labels;
```

---

## Item 62 — Use Rest Parameters and Tuple Types to Model Variadic Functions

**问题**：变参 + 回调类型难写。  
**要点**：元组 rest、条件类型提取参数列表。  
**示例**：

```ts
type Tail<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never;
```

---

## Item 63 — Use Optional Never Properties to Model Exclusive Or

**问题**：两个可选字段「二选一」无法用可选表达。  
**要点**：用 `never` 禁止同时出现。  
**示例**：

```ts
type XOR =
  | { mode: 'a'; a: string; b?: never }
  | { mode: 'b'; b: string; a?: never };
```

---

## Item 64 — Consider Brands for Nominal Typing

**问题**：结构类型下 `UserId` 与 `OrderId` 都是 `string` 混用。  
**要点**：交叉 `string & { __brand: 'UserId' }` 等 brand。  
**示例**：

```ts
type UserId = string & { __brand: 'UserId' };
function userId(id: string): UserId {
  return id as UserId;
}
```
