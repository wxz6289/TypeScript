# Chapter 6 · Items 50–58（Generics and Type-Level Programming）

---

## Item 50 — Think of Generics as Functions Between Types

**问题**：把泛型只当「容器装 T」。  
**要点**：输入类型 → 输出类型；读泛型签名像读函数。  
**示例**：

```ts
type Id<T> = T;
type Out = Id<number>;
```

---

## Item 51 — Avoid Unnecessary Type Parameters

**问题**：`T` 从未参与签名或返回值。  
**要点**：能删则删；减少推断失败。  
**示例**：`function f<T>(x: number): number` 中 `T` 多余。

---

## Item 52 — Prefer Conditional Types to Overload Signatures

**问题**：overload 重复且难维护。  
**要点**：单一签名 + 条件类型返回不同分支。  
**示例**：

```ts
type Flat<T> = T extends (infer U)[] ? U : T;
```

---

## Item 53 — Know How to Control the Distribution of Unions over Conditional Types

**问题**：联合被错误「分发」。  
**要点**：用 `[T] extends [X]` 关闭分发；理解 distributive。  
**示例**：

```ts
type ToArray<T> = T extends unknown ? T[] : never;
type A = ToArray<string | number>; // string[] | number[]
```

---

## Item 54 — Use Template Literal Types to Model DSLs and Relationships Between Strings

**问题**：路由、事件名用裸 `string`。  
**要点**：模板字面量组合合法字符串集合。  
**示例**：

```ts
type Method = 'GET' | 'POST';
type Path = '/a' | '/b';
type Route = `${Method} ${Path}`;
```

---

## Item 55 — Write Tests for Your Types

**问题**：复杂类型回归无人知。  
**要点**：`expect-type`、类型挑战式断言、eslint expect-type。  
**示例**：

```ts
type Eq<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false;
type _c = Eq<string, string>;
```

---

## Item 56 — Pay Attention to How Types Display

**问题**：推断结果在 IDE 里展开成「天书」。  
**要点**：简化别名、避免过度交叉、用 `satisfies` 改善显示。  
**示例**：对外导出 `type PublicApi = Pick<Internal, 'a'|'b'>`。

---

## Item 57 — Prefer Tail-Recursive Generic Types

**问题**：深度递归类型实例化溢出。  
**要点**：尾递归模式减层；或改用 codegen。  
**示例**：大深度 tuple 运算时拆步或用构建脚本生成类型。

---

## Item 58 — Consider Codegen as an Alternative to Complex Types

**问题**：类型层实现图算法。  
**要点**：OpenAPI/GraphQL → 生成 `.ts`；维护成本更低。  
**示例**：`openapi-typescript schema.yaml -o api.d.ts`
