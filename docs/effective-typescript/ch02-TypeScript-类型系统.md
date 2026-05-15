# 第 2 章 · TypeScript 的类型系统（TypeScript's Type System）

对应原书第 2 章（多条 Item，以原书为准；公开索引中可见如 **Item 7–9、15** 等主题）。

---

## 1. 本章核心：把类型当作「值的集合」

- 类型 `T` 可理解为**运行时可能取到的值的集合**（含 `never` 空集）。  
- 赋值兼容：源集合须是目标集合的**子集**（或按结构规则兼容）。  
- 联合 `A | B` = 并集；交叉 `A & B` = 交集（可能坍缩为 `never`）。

```ts
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
function isDigit(n: number): n is Digit {
  return Number.isInteger(n) && n >= 0 && n <= 9;
}
```

---

## 2. 类型空间 vs 值空间（高频混淆点）

- **值空间**：运行时的变量、函数实现、`class` 作为构造函数等。  
- **类型空间**：`type`、`interface`、泛型参数、多数 `import type` 等。  
- 同名标识符可能**分身**：`Foo` 既可能是类型也可能是值（如 `class Foo`）。

**实践**：在 IDE 里用「转到定义」「显示推断类型」区分；文档中明确写 `type Foo = ...` 与 `const foo = ...` 避免同名。

---

## 3. 优先注解，慎用断言

- **注解**（`: Type`）约束你**希望**契约如何。  
- **断言**（`as` / `<>`）告诉编译器「相信我」——会**绕过**检查。

```ts
declare const raw: unknown;
// 不好：双重断言掩盖逻辑
const x = raw as any as string;

// 更好：先收窄
if (typeof raw === 'string') {
  const s = raw;
}
```

---

## 4. 用类型运算减少重复（DRY at type level）

- `Pick` / `Omit` / `ReturnType` / `Parameters` / 自定义映射类型，避免把同一份字段列表抄三遍。  
- 「单一数据源」：从 runtime 常量 `as const` 推导字面量联合，再生成 UI/路由类型。

```ts
const routes = ['/home', '/about'] as const;
type Route = (typeof routes)[number];
```

---

## 5. 与本书后文衔接

- **第 3 章**：在集合视角下理解**控制流如何缩小集合**。  
- **第 4 章**：把「非法状态」从集合里**挖掉**，让类型只剩合法值。

下一章：[ch03-类型推断与控制流分析](./ch03-类型推断与控制流分析.md)。
