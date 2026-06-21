# 函数重载（Function Overloads）

> 对应官方：[More on Functions — Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)  
> 相关整理：[04-函数与对象](../04-函数与对象.md) · [05-类型编程](../05-类型编程.md) · 本地示例 [`base/src/function.ts`](../../base/src/function.ts)

---

## 1. 是什么：与 JavaScript 的区别

在 **JavaScript** 里，同名函数后声明会覆盖先声明，不存在「编译期多签名」：

```js
function f(x) { return x; }
function f(x, y) { return x + y; } // 只有这一份在运行
```

在 **TypeScript** 里，**重载（overload）是类型层面的能力**：你可以为**同一次调用**声明多组「入参 → 返回值」关系，编译器根据实参类型选择匹配的**声明签名**；运行时仍然只有**一个实现函数**。

```ts
function len(s: string): number;
function len(arr: unknown[]): number;
function len(x: string | unknown[]) {
  return x.length;
}

len('abc');     // number
len([1, 2]);    // number
len(42);        // 报错：没有匹配的重载
```

要点：

| 层面 | 行为 |
|------|------|
| 类型检查 | 多个**声明签名**（overload signatures） |
| 运行时 | 一个**实现签名**（implementation signature） |
| 调用方可见 | 仅声明签名；实现签名对外「隐藏」 |

---

## 2. 基本写法

### 2.1 声明签名 + 实现签名

```ts
// 声明签名（可多个，无函数体）
function createDate(timestamp: number): Date;
function createDate(y: number, m: number, d: number): Date;

// 实现签名（有函数体，必须兼容上面所有声明）
function createDate(a: number, b?: number, c?: number): Date {
  if (b === undefined || c === undefined) {
    return new Date(a);
  }
  return new Date(a, b, c);
}
```

规则摘要：

1. **实现签名必须能接住所有重载场景**（参数更宽、返回更宽或相同，见 §5）。
2. **实现签名不会出现在「对该函数的调用」的类型提示里**；IDE 只展示重载列表。
3. 重载按**自上而下**匹配，**更具体、更窄的签名应写在前面**。

### 2.2 类方法重载

```ts
class Box {
  content: string | number;

  constructor(value: string);
  constructor(value: number);
  constructor(value: string | number) {
    this.content = value;
  }

  get(): string;
  get(): number;
  get(): string | number {
    return this.content;
  }
}
```

类上的重载规则与顶层 `function` 相同：多个声明 + 一个实现。

### 2.3 用接口 / 类型描述「可调用重载」

函数值（变量、属性）不能写多个 `function` 关键字，要用**调用签名（call signature）**叠加重载：

```ts
interface Overload {
  (foo: string): string;
  (foo: number): number;
}

function sOrN(foo: number): number;
function sOrN(foo: string): string;
function sOrN(foo: string | number) {
  return typeof foo === 'number' ? foo * foo : `Hello ${foo}`;
}

const fn: Overload = sOrN;
```

内联写法等价：

```ts
const fn2: {
  (foo: string): string;
  (foo: number): number;
} = (foo: string | number) =>
  typeof foo === 'number' ? foo * foo : `Hello ${foo}`;
```

---

## 3. 箭头函数的限制

**不能**对 `const f = (...) => {}` 写多行 `function f(...)` 式重载。

```ts
// ❌ 语法上不支持
const bad = (x: string): string;
const bad = (x: number): number;
const bad = (x: any) => x;
```

可行做法：

1. 先写**具名 function** 带重载，再赋给变量（见上 `sOrN`）。
2. 用**接口调用签名**注解箭头函数（见 `fn2`）。
3. 若参数形态可统一，优先**联合类型 / 泛型**（见 §6）。

```ts
// 仅「单形态」的箭头函数类型
const simple: (n: number) => string = (n) => String(n);
```

---

## 4. 编译器如何解析重载

### 4.1 调用侧：选哪一个声明签名

对 `f(args)`，TypeScript 会：

1. 按书写顺序尝试每个**声明签名**；
2. 找到第一个「实参类型可赋值给形参」的签名；
3. 用该签名的**返回类型**作为表达式类型。

因此：**顺序很重要**。把 `(string) => void` 写在 `(string | number) => void` 后面时，后者会先匹配，前者可能永远 unreachable。

### 4.2 实现侧：实现签名不参与对外类型

```ts
function example(a: string): void;
function example(a: number): void;
function example(a: string | number) {
  // 在实现体内，a 的类型是 string | number（实现签名）
  // 不能假设「一定是 string」除非自己收窄
}
```

在实现函数体内，参数类型是**实现签名**的类型，不是某一条重载的窄类型。需要 `typeof`、`in`、判别联合等做**收窄**。

### 4.3 与 `strictFunctionTypes` 的关系

在严格函数类型检查下，函数参数是**双向协变/逆变**语境中的位置；重载的**实现**必须对所有声明在参数、返回值上可赋值兼容。写实现时参数往往要比每条重载**更宽**（如 `string | number`），返回值有时也要**更宽**（联合或公共超类型）。

---

## 5. 实现签名与声明签名的兼容性

实现签名在类型上应满足：

- 实现参数的**每一个可能调用**，都能被实现函数接受；
- 实现返回值对每个重载调用方**可赋值**到对应声明的返回类型。

常见模式：

| 场景 | 实现参数 | 实现返回 |
|------|----------|----------|
| 参数个数不同 | 可选参数 / 剩余参数 / `unknown` + 运行时分支 | 联合或公共类型 |
| 参数类型不同 | 联合 + 类型守卫 | 联合 + 守卫后 `return` |
| 返回类型随入参变化 | 联合入参 | 联合返回，或泛型/条件类型（见 §6.2） |

反例（实现过窄）：

```ts
function bad(x: string): void;
function bad(x: number): void;
function bad(x: string) { // ❌ 实现未覆盖 number 重载
  console.log(x);
}
```

---

## 6. 何时用重载，何时不用

### 6.1 适合用重载

- **同一函数名**，不同参数形态对应**明显不同**的返回类型，且联合类型无法准确表达：

```ts
function parse(input: string): object;
function parse(input: object): string;
function parse(input: string | object): string | object { /* ... */ }
```

- **对外 API**（库、公共模块）需要精确的 IntelliSense：调用 `f('a')` 必须是 `number`，`f([1])` 也必须是 `number`，而不是宽泛的 `any` 或过大联合。
- **DOM / Node 风格** 的「同一方法，多种调用形式」（如 `document.createElement` 一类在 `.d.ts` 里大量出现）。

### 6.2 优先考虑更简单替代

**（1）单一签名 + 联合类型**

入参、返回值都能用同一套联合表达时，不必重载：

```ts
function padLeft(value: string, padding: string | number): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + value;
  }
  return padding + value;
}
```

**（2）泛型**

「入参类型与返回类型一一对应」时，泛型往往更短：

```ts
function identity<T>(x: T): T {
  return x;
}
```

**（3）条件类型（《Effective TypeScript》Item 52）**

返回类型随类型参数变化、重载条数会变多时，用**一条签名 + 条件类型**更易维护：

```ts
type ElementType<T> = T extends (infer E)[] ? E : T;

function head<T>(arr: T): ElementType<T> {
  return (arr as unknown[])[0] as ElementType<T>;
}
```

对比：为 `head` 写 `string[] → string`、`number[] → number` 等多条重载会重复且难扩展。

**（4）判别联合 + 单一函数**

业务上已是「标签 + 载荷」时，用判别联合比重载更清晰：

```ts
type Request =
  | { kind: 'GET'; url: string }
  | { kind: 'POST'; url: string; body: unknown };

function send(req: Request): Promise<unknown> {
  switch (req.kind) { /* ... */ }
}
```

### 6.3 决策简表

| 需求 | 更倾向 |
|------|--------|
| 仅参数可选/默认不同，返回相同 | 可选参数、默认参数 |
| 参数类型不同，返回类型相同或宽联合 | 联合 + 收窄 |
| 参数类型与返回类型强关联 | 泛型 |
| 返回类型随类型参数复杂变化 | 条件类型 |
| 多种调用形态、返回类型差异大且要精确提示 | 重载 |
| 重载超过 2～3 条且模式重复 | 重构为泛型/条件类型 |

---

## 7. 最佳实践

### 7.1 控制重载数量与复杂度

- 每条重载都应有**真实调用场景**；避免为「少写联合」而堆砌重载。
- 超过 **2～3 条** 时评估是否改为泛型或条件类型（见 [Effective TS Item 52](../effective-typescript/items/chapter-06.md#item-52--prefer-conditional-types-to-overload-signatures)）。
- 重载签名之间保持**对称、可读**；实现体用 `switch` / 类型守卫集中处理，避免复制粘贴多份逻辑。

### 7.2 实现体：类型安全

- 实现参数类型用**能覆盖所有重载的联合**，在函数体内**收窄**后再操作。
- 避免实现签名里滥用 `any`；`any` 会绕过检查，让重载失去意义。

```ts
// ⚠️ 能编译，但调用方仍受重载约束，实现体却无类型安全
function risky(x: string): number;
function risky(x: number): number;
function risky(x: any) {
  return x.length; // number 上无 length
}
```

- 若逻辑分支已穷尽，可用 `never` 辅助 exhaustiveness：

```ts
function assertNever(x: never): never {
  throw new Error('Unexpected');
}
```

### 7.3 顺序与特异性

- **更具体的签名在前**（参数更少、类型更窄、字面量类型等）。
- 公共宽签名放在后面，否则窄签名永远不会被匹配到。

### 7.4 导出与赋值

- 对外导出时，可导出**具名 function**（带重载），类型会随函数一起走。
- `const fn = function overload(...) {}` 若需重载，同样要先写 function 声明再赋值，或显式标注 `Overload` 接口。

### 7.5 与 `.d.ts` 声明文件

库作者常在 `.d.ts` 里只写**声明签名**、无实现：

```ts
export function createPlugin(options: string): Plugin;
export function createPlugin(options: Options): Plugin;
```

实现留在 `.js` 中。消费方只看到重载，与手写 TS 一致。

### 7.6 测试与文档

- 为每条重载路径写至少一个**类型层面的用例**（调用应推断出预期返回类型）。
- 在 JSDoc 中说明「第几种调用形式」，避免维护者只改实现不改重载。

---

## 8. 常见陷阱

| 陷阱 | 说明 |
|------|------|
| 实现签名对外可见的误解 | 调用方类型只来自重载列表，不是实现签名 |
| 实现体内参数已是窄类型 | 实际是联合，需手动收窄 |
| 重载顺序错误 | 宽签名在前导致窄签名永不匹配 |
| 箭头函数直接重载 | 语法不支持，需 interface 或 function 声明 |
| 用重载模拟可选参数 | 用 `?` 和默认值更简单 |
| 重载与运行时行为不一致 | 运行时只有一个函数，分支必须覆盖所有重载 |
| 过多 `any` 实现 | 编译通过但实现无检，易产 runtime bug |
| 能用联合/泛型却硬写重载 | 维护成本上升，Item 52 建议优先条件类型 |

---

## 9. 完整示例（日期工厂）

```ts
function createDate(timestamp: number): Date;
function createDate(y: number, m: number, d: number): Date;
function createDate(y: number, m?: number, d?: number): Date {
  if (m !== undefined && d !== undefined) {
    return new Date(y, m, d);
  }
  return new Date(y);
}

const d1 = createDate(1_700_000_000_000);
const d2 = createDate(2024, 5, 18);
// createDate();           // Error
// createDate(2024, 5);    // Error：若未声明该重载
```

---

## 10. 与仓库其他材料的关系

- 速览条目：[04-函数与对象 §3](../04-函数与对象.md#3-函数重载)
- 可运行草稿：[base/src/function.ts](../../base/src/function.ts)（`Overload` 接口、`sOrN`、箭头函数限制）
- 类型级替代思路：[05-类型编程 §4 条件类型](../05-类型编程.md#4-条件类型conditional-types) · [Effective TS Ch.6 Item 52](../effective-typescript/items/chapter-06.md)

---

## 11. 速查

```ts
// 声明
function f(a: string): number;
function f(a: number): number;
function f(a: string | number): number { return String(a).length; }

// 接口可调用重载
type F = {
  (x: string): number;
  (x: number): number;
};

// 类
class C {
  m(x: string): void;
  m(x: number): void;
  m(x: string | number): void {}
}
```

**记住三句话**：

1. 重载是**类型**特性，不是多个运行时函数。  
2. **一个实现**兼容**全部声明**，实现体内按**实现签名**收窄。  
3. 能联合、泛型、条件类型说清楚的，**优先不用重载**；API 需要精确提示时再上重载。
