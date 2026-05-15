# Chapter 2 · Items 6–17（TypeScript's Type System）

---

## Item 6 — Use Your Editor to Interrogate and Explore the Type System

**问题**：不会看推断类型。  
**要点**：悬停、`Go to Type Definition`、拆分复杂表达式到临时 `const` 再看推断。  
**示例**：对 `ReturnType<typeof fn>` 在 IDE 中展开。

---

## Item 7 — Think of Types as Sets of Values

**问题**：不理解为何 `never` 或联合赋值报错。  
**要点**：类型 ≈ 值的集合；赋值要求源集合 ⊆ 目标集合。  
**示例**：

```ts
type Digit = 0 | 1 | 2;
const d: Digit = 3 as any; // 断言绕过；集合视角下 3 ∉ Digit
```

---

## Item 8 — Know How to Tell Whether a Symbol Is in the Type Space or Value Space

**问题**：`Foo` 到底是类型还是值？  
**要点**：`import type` / `type` 别名在类型空间；`class` 与 `const` 可跨两空间。  
**示例**：

```ts
class Box { v = 1; }
type T = InstanceType<typeof Box>;
```

---

## Item 9 — Prefer Type Annotations to Type Assertions

**问题**：习惯 `as` 压错误。  
**要点**：断言绕过检查；优先注解 + 收窄；`as const` 是收窄不是「撒谎」。  
**示例**：

```ts
declare const u: unknown;
if (typeof u === 'string') {
  const s: string = u;
}
```

---

## Item 10 — Avoid Object Wrapper Types (String, Number, Boolean, Symbol, BigInt)

**问题**：写 `String` 当字符串类型。  
**要点**：用小写原始类型；包装对象易与原始类型混淆。  
**示例**：`const s: string = 'ok';`

---

## Item 11 — Distinguish Excess Property Checking from Type Checking

**问题**：对象字面量多字段有时报错有时不报。  
**要点**：新鲜对象字面量对「目标类型」有多余属性检查；先赋给变量再传可能放宽。  
**示例**：

```ts
type Opts = { width: number };
const o = { width: 1, height: 2 };
function f(x: Opts) {}
f(o); // 变量 o 常可传入；f({ width:1, height:2 }) 可能报错
```

---

## Item 12 — Apply Types to Entire Function Expressions When Possible

**问题**：对箭头函数只注解参数不注解整体。  
**要点**：整体注解可固定上下文类型、改善推断与重构安全。  
**示例**：

```ts
const add: (a: number, b: number) => number = (a, b) => a + b;
```

---

## Item 13 — Know the Differences Between `type` and `interface`

**问题**：何时 `type` 何时 `interface`？  
**要点**：第二版更强调 `interface` 的可合并、类 `implements`；联合/映射多用 `type`。  
**示例**：

```ts
interface A { x: number }
interface A { y: number }
type U = A | { kind: 'b' };
```

---

## Item 14 — Use `readonly` to Avoid Errors Associated with Mutation

**问题**：共享对象被悄悄改掉。  
**要点**：`readonly` 属性、`readonly T[]`；与 `const` 不同层次。  
**示例**：

```ts
type R = { readonly id: string };
```

---

## Item 15 — Use Type Operations and Generic Types to Avoid Repeating Yourself

**问题**：同一份字段列表复制三遍。  
**要点**：`Pick`/`Omit`/`ReturnType`/`Parameters`、映射类型；单一数据源。  
**示例**：

```ts
type User = { id: string; name: string; email: string };
type PublicUser = Pick<User, 'id' | 'name'>;
```

---

## Item 16 — Prefer More Precise Alternatives to Index Signatures

**问题**：`[k: string]: unknown` 太宽。  
**要点**：用联合键、`Record<K,V>`、`Map`、模板字面量键等收紧。  
**示例**：

```ts
type Key = 'a' | 'b';
type Bag = Partial<Record<Key, number>>;
```

---

## Item 17 — Avoid Numeric Index Signatures

**问题**：用 `number` 索引模拟数组语义。  
**要点**：优先 `Array<T>`、`Tuple`、`ArrayLike`；注意迭代与稀疏数组语义。  
**示例**：`const xs: number[] = [];`
