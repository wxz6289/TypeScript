# 接口与类（Interface & Class）

> 对应官方：[Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) · [Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html#interfaces)  
> 相关整理：[06-类与模块](../06-类与模块.md) · [04-函数与对象](../04-函数与对象.md)  
> 本地示例：[`base/src/interface-class.ts`](../../base/src/interface-class.ts) · [`base/src/class.ts`](../../base/src/class.ts)

---

## 1. `extends` 与 `implements` 的分工

| 关系 | 关键字 | 说明 |
|------|--------|------|
| 类 → 类 | `extends` | 继承实现与类型 |
| 接口 → 接口 | `extends` | 扩展形状 |
| 类 → 接口 | `implements` | 类承诺满足接口的**实例侧**形状 |

```ts
interface Drawable {
  draw(): void;
}

class Circle implements Drawable {
  draw() {
    console.log('circle');
  }
}
```

`implements` **不**检查类的静态成员；只约束实例可用的方法与属性。

---

## 2. 接口可以继承类

接口可以 `extends` 一个类，但**只继承类的类型形状（实例侧 public / protected 成员）**，**不**继承实现（方法体、构造函数逻辑）。

```ts
class Person {
  constructor(protected name: string, public age: number) {}
}

interface IPerson extends Person {
  sayHello(): void;
}
```

含义：

- `IPerson` 的类型包含 `name`、`age` 以及 `sayHello`。
- 实现 `IPerson` 的类必须**同时**满足 `Person` 的实例形状与 `sayHello`。

---

## 3. `private` / `protected` 与「谁可以实现」

若接口 `extends` 的类含有 **`private` 或 `protected`** 成员，则该接口**只能**被该类的**子类** `implements`——因为子类才在类型系统里「看得到」这些受保护成员。

```ts
class Person2 {
  constructor(private name: string, public age: number) {}
}

interface IPerson23 extends Person2 {
  sayHello(): void;
}

// 仅 Person2 的子类可以 implements IPerson23
class Student extends Person2 implements IPerson23 {
  constructor(name: string, age: number) {
    super(name, age);
  }
  sayHello() {
    console.log(`${this.name}, ${this.age}`);
  }
}
```

非子类若强行 `implements`，编译器会报缺少 `private name` 等成员。

本地 [`interface-class.ts`](../../base/src/interface-class.ts) 保留了 `Person2` / `IPerson23` 的最小示例；完整可运行版本见上表 `Student` 写法。

---

## 4. 类在类型空间与值空间

`class` 同时存在于：

- **值空间**：构造函数、`new`、运行时存在。
- **类型空间**：实例类型、构造函数类型。

因此接口继承类时，拿到的是**实例类型**上的成员，而不是类的静态侧。

需要「从类提取实例类型」时，使用内置工具类型：

```ts
type Instance = InstanceType<typeof Person2>;
```

---

## 5. 与结构化类型的关系

TypeScript 是**结构化类型**系统：只要形状兼容即可赋值或实现，不要求名义上的继承关系。  
接口继承类是在此基础上，显式把某个类的实例形状「并入」接口定义，常用于：

-  mixin / 抽象基类 + 额外接口方法；
- 框架中「实体类 + 行为接口」的组合约束。

---

## 6. 常见误区

| 误区 | 正确理解 |
|------|----------|
| 接口继承类 = 继承方法实现 | 仅继承**类型**，实现仍由 `implements` 的类提供 |
| 任意类都能 `implements` 继承含 private 的接口 | 只有该类的**子类**可以 |
| `implements` 检查静态方法 | 只检查**实例**成员 |

---

## 7. 延伸阅读

- 体系笔记：[06-类与模块](../06-类与模块.md)
- 接口合并、方法双向协变：[interface-type/interface.ts](../../base/src/interface-type/interface.ts)（注释示例）
- 类 mixin：[extend.ts](../../base/src/extend.ts)
