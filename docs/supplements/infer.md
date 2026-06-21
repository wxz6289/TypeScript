# infer 关键字

> 对应官方：[Conditional Types — Inferring Within Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)  
> 相关整理：[05-类型编程](../05-类型编程.md) · [generic-type.md](./generic-type.md)  
> 本地示例：[`base/src/infer.ts`](../../base/src/infer.ts)

---

## 是什么

`infer` 只能在**条件类型的 `extends` 子句**中使用，声明一个**待推断的类型变量**。编译器在匹配条件类型时会尝试从输入类型中「解出」该变量。

```ts
type ParamType<T> = T extends (arg: infer P) => unknown ? P : T;

type P1 = ParamType<(x: string) => void>; // string
type P2 = ParamType<number>;             // number（不匹配函数，走 false 分支）
```

---

## 常见模式

| 模式 | 含义 |
|------|------|
| `T extends (...args: infer A) => infer R` | 提取函数参数元组与返回类型 |
| `T extends (infer U)[]` | 提取数组元素类型 |
| `T extends new (...args: infer A) => infer I` | 提取构造参数与实例类型 |

内置工具类型 `ReturnType`、`Parameters`、`ConstructorParameters`、`InstanceType` 均基于 `infer` 实现。详见 [`infer.ts`](../../base/src/infer.ts) 与 [05-类型编程 §3](../05-类型编程.md)。

---

## 注意

- `infer` 只出现在条件类型中，不能单独用于普通泛型参数。
- 同一条件类型中可声明多个 `infer`，编译器会同时求解。
- 与 `distributive conditional types` 组合时，联合类型会逐成员分发推断（见 [condition-type.ts](../../base/src/condition-type.ts)）。
