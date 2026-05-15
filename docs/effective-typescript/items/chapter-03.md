# Chapter 3 · Items 18–28（Type Inference and Control Flow Analysis）

---

## Item 18 — Avoid Cluttering Your Code with Inferable Types

**问题**：注解噪音大且与推断重复。  
**要点**：让 TS 推断；在边界/导出 API/空数组等处补注解。  
**示例**：`const x = 1` 不写 `: number`。

---

## Item 19 — Use Different Variables for Different Types

**问题**：同一变量承载不同阶段类型，推断混乱。  
**要点**：拆变量名表达状态迁移；配合收窄。  
**示例**：

```ts
declare const raw: string;
const parsed: unknown = JSON.parse(raw);
```

---

## Item 20 — Understand How a Variable Gets Its Type

**问题**：字面量变宽、`const` 推断、元组辅助。  
**要点**：理解 widening；`as const`、`satisfies`（TS 4.9+）控制字面量。  
**示例**：

```ts
const modes = ['r', 'w'] as const;
type Mode = (typeof modes)[number];
```

---

## Item 21 — Create Objects All at Once

**问题**：分步赋值触发中间态类型过宽或过窄。  
**要点**：对象一次性构造；或先局部变量再赋值。  
**示例**：

```ts
const o = { a: 1, b: 2 as const };
```

---

## Item 22 — Understand Type Narrowing

**问题**：联合类型上直接调方法报错。  
**要点**：`typeof`/`in`/`instanceof`/谓词收窄。  
**示例**：

```ts
function f(x: string | number) {
  if (typeof x === 'string') return x.toUpperCase();
  return x.toFixed(0);
}
```

---

## Item 23 — Be Consistent in Your Use of Aliases

**问题**：别名与原始引用混用导致收窄失效。  
**要点**：对同一值保持一致引用或重新设计数据结构。  
**示例**：避免对对象字段反复 `const tmp = obj.x` 后又改 `obj.x`。

---

## Item 24 — Understand How Context Is Used in Type Inference

**问题**：回调参数类型从哪来？  
**要点**：上下文类型（contextual typing）；泛型函数目标类型影响推断。  
**示例**：

```ts
[1, 2].map((n) => n.toFixed(0)); // n 由上下文推断为 number
```

---

## Item 25 — Understand Evolving Types

**问题**：变量从 `any` 逐步「长成」具体类型。  
**要点**：`noImplicitAny` 关闭时常见 evolving `any`；应用 `strict` 并逐步消除。  
**示例**：启用 `strict` 后改为显式注解 + 初始化。

---

## Item 26 — Use Functional Constructs and Libraries to Help Types Flow

**问题**：手写循环丢失推断。  
**要点**：`map`/`filter`/`reduce` 等常保留元素类型；配合谓词 `is`。  
**示例**：

```ts
const xs = [1, null, 2].filter((x): x is number => x != null);
```

---

## Item 27 — Use `async` Functions Instead of Callbacks to Improve Type Flow

**问题**：回调地狱 + 类型难写。  
**要点**：`async/await` 与 `Promise<T>` 推断更直观。  
**示例**：

```ts
async function load(): Promise<string> {
  return 'ok';
}
```

---

## Item 28 — Use Classes and Currying to Create New Inference Sites

**问题**：泛型推断「卡住」。  
**要点**：通过类字段、柯里化让中间类型参数有推断锚点。  
**示例**：

```ts
class Box<T> {
  constructor(readonly v: T) {}
  map<U>(fn: (x: T) => U): Box<U> {
    return new Box(fn(this.v));
  }
}
```
