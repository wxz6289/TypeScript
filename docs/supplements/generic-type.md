# 泛型（Generics）

> 对应官方：[Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) · [Generics — Type Parameters](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-type-aliases)  
> 相关整理：[05-类型编程](../05-类型编程.md) · [04-函数与对象](../04-函数与对象.md) · [overload.md](./overload.md)  
> 本地示例：[`base/src/universal-type.ts`](../../base/src/universal-type.ts) · [`base/src/db-operate.ts`](../../base/src/db-operate.ts) · [`base/01-basic-types/02-generic.ts`](../../base/01-basic-types/02-generic.ts)

---

## 1. 为什么需要泛型

没有泛型时，要么用 **`any`** 丢掉类型信息，要么为每种类型**复制一份**几乎相同的代码：

```ts
function wrapString(x: string): string { return x; }
function wrapNumber(x: number): number { return x; }
```

泛型在**定义处保留类型参数**，在**使用处填入具体类型**，实现「一份实现、多种类型安全」：

```ts
function identity<T>(x: T): T {
  return x;
}

const a = identity('hi'); // string
const b = identity(42);   // number
```

可以把泛型理解为 **类型层面的函数**（《Effective TypeScript》Item 50）：`Box<number>` 就像对类型参数 `T` 的一次「调用」。

---

## 2. 基本语法

### 2.1 泛型函数

```ts
function getData<T>(value: T): T {
  return value;
}

getData(12);              // 推断 T = number
getData('King');          // 推断 T = string
getData<string>('Hello'); // 显式指定 T = string
```

箭头函数写法（类型参数写在参数列表前）：

```ts
const getData = <T,>(value: T): T => value;
//            ^ 尾随逗号：避免与 JSX 的 <T> 歧义（.tsx 中尤其需要）
```

### 2.2 泛型接口与类型别名

```ts
interface Box<T> {
  value: T;
}

type Pair<A, B> = { first: A; second: B };

const numBox: Box<number> = { value: 1 };
```

### 2.3 泛型类

```ts
class MinClass<T> {
  list: T[] = [];

  add(item: T) {
    this.list.push(item);
  }

  min(): T {
    return this.list.reduce((a, b) => (a < b ? a : b));
  }
}

const nums = new MinClass<number>();
nums.add(12);
nums.min(); // number
```

**注意**：类的 **static** 成员不能引用类的类型参数 `T`；若静态方法需要泛型，应单独声明方法级类型参数：

```ts
class Factory {
  static create<T>(value: T): T {
    return value;
  }
}
```

### 2.4 实现泛型接口

```ts
interface DBI<T> {
  add(info: T): boolean;
  get(id: number): T | undefined;
}

class MySQLDb<T> implements DBI<T> {
  add(info: T): boolean {
    console.log(info);
    return true;
  }
  get(id: number): T | undefined {
    return undefined;
  }
}

class User {
  constructor(public name: string) {}
}

const db = new MySQLDb<User>();
db.add(new User('King'));
```

---

## 3. 类型参数：命名、数量、默认值

### 3.1 命名惯例

| 单字母 | 常见含义 |
|--------|----------|
| `T` | Type（通用） |
| `K` | Key |
| `V` | Value |
| `E` | Element |
| `R` | Result / Return |
| `P` | Props（React 组件） |

复杂签名中可用**有意义的名字**：`TEntity`、`TResponse`，比一长串 `T1, T2, T3` 更易读。

### 3.2 多个类型参数

```ts
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

function map<T, U>(arr: T[], fn: (x: T) => U): U[] {
  return arr.map(fn);
}
```

### 3.3 默认类型参数

```ts
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

type StringMap<V = string> = Record<string, V>;
```

默认值让调用方在「不关心具体类型」时省略类型实参；库 API 常用 `unknown` 或合理默认，而不是 `any`。

---

## 4. 泛型约束（`extends`）

### 4.1 表达「T 至少具备什么能力」

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest('ab', 'c');     // OK
longest([1], [1, 2]);   // OK
// longest(1, 2);       // Error：number 无 length
```

`extends` 在这里是**上界（upper bound）**：`T` 必须是「可赋给该类型」的子类型。

### 4.2 与 `keyof` 组合：`pick` 模式

```ts
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) {
    out[k] = obj[k];
  }
  return out;
}

const user = { name: 'Ada', age: 36 };
const subset = pick(user, ['name']); // { name: string }
```

`K extends keyof T` 保证 `keys` 里的字符串只能是 `T` 的真实键。

### 4.3 约束另一个类型参数

```ts
function assign<T extends U, U>(target: T, source: U): T {
  return Object.assign(target, source);
}
```

`T extends U` 表示 `T` 比 `U` 更具体（或相等），常用于「目标对象类型不能比源更宽」的场景。

### 4.4 `const` 类型参数（TypeScript 5.0+）

保留字面量类型，避免被拓宽为 `string`：

```ts
function asTuple<const T extends readonly unknown[]>(items: T): T {
  return items;
}

const t = asTuple(['a', 'b'] as const); // readonly ["a", "b"]
```

---

## 5. 类型推断

### 5.1 何时能推断出 `T`

编译器通常从**实参**推断类型参数：

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

first([1, 2, 3]); // T = number
```

从**返回值位置**推断较少见；更常见的是从参数、上下文类型、或显式类型实参得到 `T`。

### 5.2 显式传入类型实参

在推断失败或需要**强制**更窄/更宽类型时使用：

```ts
getData<string>('Hello');

const el = document.querySelector<HTMLDivElement>('#app');
```

过度使用显式实参会降低可维护性；优先让推断工作，仅在报错或需要收窄时补上。

### 5.3 推断失败与「卡住」

常见原因：

| 情况 | 表现 | 处理 |
|------|------|------|
| 无足够类型信息 | `T` 落到 `unknown` 或 `{}` | 加约束、默认类型、或显式实参 |
| 只出现在返回、不出现在参数 | 无法推断 `T` | 把 `T` 放进参数，或用柯里化/类创造新推断点（Item 28） |
| 多个候选联合过宽 | 丢失字面量 | `as const`、泛型约束、`const T` |
| 目标类型过宽 | 回调参数变 `any` | 给回调或外层变量注解 |

**创造新推断点**（柯里化 / 类）示例：

```ts
class Box<T> {
  constructor(readonly value: T) {}
  map<U>(fn: (x: T) => U): Box<U> {
    return new Box(fn(this.value));
  }
}

new Box(1).map((n) => n.toFixed(0)); // U 推断为 string
```

```ts
function define<T>() {
  return <U extends T>(value: U): U => value;
}

const num = define<number>()(42);
```

### 5.4 上下文类型（Contextual Typing）

泛型函数的**类型参数**与**回调参数**会受「期望类型」影响：

```ts
[1, 2, 3].map((n) => n.toFixed(0)); // n: number，来自 Array<number>.map 的上下文

type Mapper = <T>(arr: T[], fn: (x: T) => void) => void;
const run: Mapper = (arr, fn) => arr.forEach(fn);
run(['a', 'b'], (s) => console.log(s.toUpperCase())); // s: string
```

---

## 6. 泛型函数 vs 泛型接口（可调用类型）

### 6.1 函数自身带类型参数

```ts
function setData<T>(value: T): T {
  return value;
}

setData('King'); // 每次调用可推断新的 T
```

### 6.2 接口上的类型参数（固定一次）

```ts
interface ConfigFn<T> {
  (value: T): T;
}

const mySetData: ConfigFn<string> = setData;
mySetData('King'); // OK
// mySetData(42);  // Error：已固定为 string
```

### 6.3 接口上的「调用签名泛型」（每次调用推断）

```ts
interface ConfigFn {
  <T>(value: T): T;
}

const setData: ConfigFn = <T>(value: T) => value;
setData('a'); // string
setData(1);   // number
```

区别：

| 写法 | `T` 何时确定 |
|------|----------------|
| `function f<T>()` / `interface { <T>(...) }` | **每次调用** |
| `interface Fn<T> { (...): ... }` | **赋值给 `Fn<string>` 时** |

本地对比见 [`universal-type.ts`](../../base/src/universal-type.ts) 中 `ConfigFn` 两段注释与实现。

---

## 7. 泛型与类型编程（进阶衔接）

泛型常和以下条件类型、映射类型组合，构成「类型层程序」。详见 [05-类型编程](../05-类型编程.md)。

### 7.1 条件类型 + `infer`

```ts
type ElementType<T> =
  T extends readonly (infer U)[] ? U : T;

type N = ElementType<number[]>; // number
```

用**单一泛型签名**替代多条函数重载（见 [overload.md §6](./overload.md#62-优先考虑更简单替代)）。

### 7.2 映射类型

```ts
type ReadonlyFields<T> = {
  readonly [K in keyof T]: T[K];
};
```

### 7.3 内置工具类型（本质都是泛型）

| 工具 | 典型用途 |
|------|----------|
| `Partial<T>` | 全部可选 |
| `Required<T>` | 全部必选 |
| `Readonly<T>` | 全部只读 |
| `Pick<T, K>` / `Omit<T, K>` | 选键 / 删键 |
| `Record<K, V>` | 字典 |
| `Exclude<T, U>` / `Extract<T, U>` | 联合运算 |
| `NonNullable<T>` | 去掉 null / undefined |
| `ReturnType<F>` / `Parameters<F>` | 从函数类型提取 |
| `Awaited<T>` | 解包 Promise |

```ts
type Todo = { title: string; done: boolean };
type TodoPatch = Partial<Pick<Todo, 'title' | 'done'>>;
```

### 7.4 分布式条件类型（简要）

`T extends X ? A : B` 中，若 `T` 是联合，条件会**分发**到每个成员：

```ts
type ToArray<T> = T extends unknown ? T[] : never;
type A = ToArray<string | number>; // string[] | number[]
```

需要**整包判断**联合时，用元组包裹关闭分发：

```ts
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;
type B = ToArrayNonDist<string | number>; // (string | number)[]
```

---

## 8. 泛型与类、继承

### 8.1 子类保持类型参数

```ts
class Container<T> {
  constructor(public value: T) {}
}

class NumberContainer extends Container<number> {
  double() {
    return this.value * 2;
  }
}
```

### 8.2 泛型约束与类层次

```ts
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Lecturer extends User {}

function getPromise<T extends User>(value: T): Promise<T> {
  return Promise.resolve(value);
}

getPromise(new Lecturer('King')); // Promise<Lecturer>
```

见 [`02-generic.ts`](../../base/01-basic-types/02-generic.ts)。

### 8.3 注意：实现接口时不要用 `any` 放宽

```ts
// ❌ 实现侧写成 any，调用方仍以为类型安全
class BadDb<T> implements DBI<T> {
  add(info: any): boolean { /* ... */ return true; }
}
```

应保持 `add(info: T)`，与接口一致。

---

## 9. 何时用泛型，何时不用

### 9.1 适合使用

- 同一逻辑要服务**多种类型**，且类型之间有**关联**（入参类型 ↔ 返回类型）。
- 容器、仓储、API 客户端、`Result<T, E>`、事件总线 `EventMap[K]` 等。
- 库作者需要让**调用方**决定 `T`，同时保留推断体验。
- 用 `Pick` / `Record` / 条件类型消除重复字段定义（Item 15）。

### 9.2 不必使用

| 场景 | 更简单做法 |
|------|------------|
| 只用一种类型 | 直接写具体类型 |
| 类型之间无关联 | 联合类型 `string \| number` |
| 多种调用形态、返回不同 | 函数重载（见 [overload.md](./overload.md)） |
| 类型层逻辑极复杂、难维护 | 代码生成 OpenAPI / GraphQL（Item 58） |
| `T` 从未出现在签名中 | 删除无用类型参数（Item 51） |

### 9.3 与 `any` / `unknown`

- **`any`**：放弃检查；仅在迁移边界短期使用。
- **`unknown`**：安全顶层类型，需收窄后再用；泛型约束常写 `T extends unknown` 关闭条件类型分发。
- **泛型**：在「未知但相关」的场景保留关系，优于 `any`。

---

## 10. 最佳实践

### 10.1 把泛型当成「带约束的类型函数」（Item 50）

读签名时问：**输入类型参数 → 输出类型是什么**。

```ts
type Head<T extends readonly unknown[]> =
  T extends readonly [infer H, ...unknown[]] ? H : never;
```

### 10.2 删除不必要的类型参数（Item 51）

```ts
// ❌ T 未参与约束或返回值
function log<T>(msg: string): void {
  console.log(msg);
}

// ✅
function log(msg: string): void {
  console.log(msg);
}
```

### 10.3 用 `extends` 表达最小能力，而不是 `any`

```ts
// ✅
function printLength<T extends { length: number }>(x: T): number {
  return x.length;
}
```

### 10.4 优先推断，谨慎显式实参

- 数组、`Promise`、`map` 回调等让推断完成。
- `querySelector<HTMLDivElement>`、测试工具等再显式指定。

### 10.5 对外 API：默认类型 + 文档

```ts
interface Page<TItem = unknown> {
  items: TItem[];
  total: number;
}
```

为公共泛型参数写 JSDoc，说明 `T` 代表什么、默认行为如何。

### 10.6 复杂类型用工具类型组合，避免复制字段

```ts
type CreateUserDto = Omit<User, 'id' | 'createdAt'>;
type UpdateUserDto = Partial<CreateUserDto>;
```

### 10.7 为类型层逻辑写「类型测试」（Item 55）

```ts
type Expect<T extends true> = T;
type Eq<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false;

type _cases = [
  Expect<Eq<ElementType<number[]>, number>>,
];
```

或使用 `expect-type`、`tsd` 等工具在 CI 中回归。

### 10.8 控制 IDE 中的类型展示（Item 56）

- 导出**简短别名**而非巨大交叉类型。
- 使用 `satisfies` 保留字面量同时让显示更可读：

```ts
const routes = {
  home: '/',
  about: '/about',
} as const satisfies Record<string, `/${string}`>;
```

### 10.9 极深递归类型注意实例化深度（Item 57）

元组运算、深层 `infer` 递归可能触发编译器限制；可拆步、尾递归化，或改用代码生成。

### 10.10 重载 vs 泛型 vs 条件类型

- **2～3 种固定形态**、要精确提示 → 重载。
- **入参与返回同步变化** → 泛型函数。
- **返回类型随类型参数复杂变化** → 泛型 + 条件类型（Item 52）。

### 10.11 工程习惯

- `strict` 下泛型才能发挥最大价值；避免实现签名里偷偷用 `any`。
- React 组件：`PropsWithChildren<P>`、`ComponentProps<typeof X>` 等复用泛型工具。
- 不要为「看起来高级」而泛型化；**每增加一个 `T` 都应有类型关系上的理由**。

---

## 11. 常见陷阱

| 陷阱 | 说明 |
|------|------|
| 无约束的 `T` 被误用 | `T` 太宽时访问 `T` 上不存在的属性会报错 |
| 实现用 `any` | 泛型接口名存实亡 |
| 泛型接口 `Fn<T>` 与函数 `f<T>()` 混淆 | 前者固定 `T`，后者每次推断 |
| 类 static 使用 `T` | 不允许；static 需自己的类型参数 |
| `Object.keys(obj)` 丢失 `keyof` | 需 `as` 或 `Record<K, V>` 模式（Item 60） |
| 条件类型意外分发 | 联合被拆散；用 `[T] extends [...]` 控制 |
| 多余类型参数 | 增加推断失败面（Item 51） |
| 显式实参过多 | 掩盖设计问题，难重构 |
| 类型层图灵完备化 | 维护成本爆炸 → 考虑 codegen（Item 58） |

---

## 12. 完整示例：安全仓储

```ts
interface Repository<T extends { id: string }> {
  get(id: string): T | undefined;
  save(entity: T): void;
}

class MemoryRepo<T extends { id: string }> implements Repository<T> {
  private store = new Map<string, T>();

  get(id: string): T | undefined {
    return this.store.get(id);
  }

  save(entity: T): void {
    this.store.set(entity.id, entity);
  }
}

interface Article {
  id: string;
  title: string;
}

const articles = new MemoryRepo<Article>();
articles.save({ id: '1', title: 'Generics' });
articles.get('1'); // Article | undefined
```

---

## 13. 与仓库其他材料的关系

| 材料 | 内容 |
|------|------|
| [05-类型编程](../05-类型编程.md) | `keyof`、条件类型、映射类型、工具类型 |
| [overload.md](./overload.md) | 重载 vs 泛型 vs 条件类型 |
| [Effective TS ch06](../effective-typescript/ch06-泛型与类型层编程.md) | 类型层实践与自检清单 |
| [Items 50–58](../effective-typescript/items/chapter-06.md) | 单条 Item 速查 |
| [附录-核心实践清单 §D](../effective-typescript/附录-核心实践清单.md) | 泛型检查项 |

---

## 14. 速查

```ts
// 函数
function id<T>(x: T): T { return x; }

// 约束
function len<T extends { length: number }>(x: T): number { return x.length; }

// 多参数 + keyof
function pick<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }

// 默认
type Res<T = unknown> = { data: T };

// 类
class Stack<T> { private items: T[] = []; push(x: T) { this.items.push(x); } }

// 接口实现
interface Repo<T> { save(x: T): void; }
class Mem<T> implements Repo<T> { save(x: T) {} }
```

**记住三句话**：

1. 泛型是**延迟决定的类型**，在调用时用实参或显式实参「填入」`T`。  
2. 用 **`extends` 写最小能力**，用 **`keyof` / 工具类型** 避免重复，而不是用 `any` 糊弄。  
3. **能推断就不手写**；**能删掉的 `T` 就删**；类型层太复杂时**用测试或代码生成**兜底。
