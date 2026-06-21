# 协变与逆变（Variance）

> 对应官方：[Type Compatibility — Function Parameter Bivariance](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#function-parameter-bivariance)  
> 相关整理：[05-类型编程](../05-类型编程.md) · [Effective TS ch06](../effective-typescript/ch06-泛型与类型层编程.md)

---

## 符号约定

- **A ≼ B**：A 是 B 的子类型。
- **A → B**：以 A 为参数、B 为返回值的函数类型。
- **x : A**：x 的类型为 A。

---

## 函数类型的变型

在类型理论中，函数类型各位置的变型规则为：

| 位置 | 变型 | 直觉 |
|------|------|------|
| **返回值** | 协变（covariant） | 子类型返回值可替代父类型返回值 |
| **参数** | 逆变（contravariant） | 参数需接受「更宽」的类型才安全 |

示例（返回值协变）：

```ts
class Animal {}
class Dog extends Animal {}

type GetAnimal = () => Animal;
type GetDog = () => Dog;

let f: GetAnimal = () => new Dog(); // OK：Dog ≼ Animal
```

---

## TypeScript 的特殊行为

在**未开启** `--strictFunctionTypes` 时，TypeScript 对**函数参数**采用**双向协变**（bivariance）：参数位置既允许协变也允许逆变，这在某些场景下**不安全**。

开启 `--strict`（包含 `strictFunctionTypes`）后，函数参数按**逆变**检查，与更严格的类型理论一致。学习仓库 [`base/tsconfig.json`](../../base/tsconfig.json) 已开启 `strict: true`。

---

## 与集合类型的关系

- **只读**数据结构（如 `ReadonlyArray<T>`）在元素类型上通常是**协变**的。
- **可变**数据结构（如 `Array<T>`）在元素类型上应视为**不变**（invariant），否则写入会破坏类型安全。

---

## 实践建议

1. 保持 `strict: true`，避免依赖参数双向协变。
2. 设计 API 时，若需要「更宽参数可接受」，显式用泛型约束而非依赖隐式协变。
3. 深入阅读官方 [Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) 与 ET Item 51（函数类型设计）。
