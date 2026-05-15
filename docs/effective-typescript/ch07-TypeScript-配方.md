# 第 7 章 · TypeScript 配方（TypeScript Recipes）

对应原书第 7 章（第二版新增；公开介绍提及**穷尽检查**、过滤 `null`、变参等「社区菜谱」式问题）。

---

## 1. 本章怎么用

遇到**具体形状**的问题时来查：如何用类型系统抓住「遗漏分支」「不同步字段」类错误，而不是死记 API。

---

## 2. 穷尽性：`never` 与 `assertNever`

```ts
function assertNever(x: never): never {
  throw new Error('unexpected');
}

type Lang = 'ts' | 'js';
function icon(lang: Lang) {
  switch (lang) {
    case 'ts':
      return '🔷';
    case 'js':
      return '🟨';
    default:
      return assertNever(lang);
  }
}
```

---

## 3. 过滤 `null` / `undefined` 的类型安全 helper

```ts
function isDefined<T>(x: T): x is NonNullable<T> {
  return x !== undefined && x !== null;
}

const xs = [1, null, 2, undefined].filter(isDefined); // number[]
```

---

## 4. 变参与元组类型的提示

- 用**元组 + 剩余参数**为「固定前缀 + 可变后缀」建模。  
- 过度技巧化前，先问：运行时是否真的需要——类型层复杂度有维护成本。

---

## 5. 与生态资料的关系

原书亦会指向社区进阶读物（如其它 Cookbook）；本仓库仍以 [TypeScript 官方手册](https://www.typescriptlang.org/docs/handbook/intro.html) 为语义权威。

下一章：[ch08-类型声明与-types](./ch08-类型声明与-types.md)。
