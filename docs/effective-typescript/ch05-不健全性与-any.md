# 第 5 章 · 不健全性与 `any`（Unsoundness and the `any` Type）

对应原书第 5 章（含 **Item 43: Use the Narrowest Possible Scope for `any` Types** 及 `@ts-expect-error` / `@ts-ignore` 讨论，见原书）。

---

## 1. 不健全性（unsoundness）是什么

**静态类型与运行时事实可能不一致**——TS 刻意在部分场景「放行」（例如双向泛型、`any`、某些初始化检查），以换取可用性。专业开发者应知道**坑在哪里**，而不是假设「通过编译 = 绝对安全」。

---

## 2. `any`：关掉类型系统的「紧急出口」

| 策略 | 说明 |
|------|------|
| 最小范围 | 不把 `any` 泄漏到公共 API；在边界封装后立即转为 `unknown` 或具体类型 |
| 最短寿命 | 迁移期使用；配跟踪 issue / 截止日期 |
| 替代 | `unknown` + 收窄、泛型、条件类型、声明合并 |

```ts
function parseJson(s: string): unknown {
  return JSON.parse(s);
}
```

---

## 3. `@ts-expect-error` 优于滥用 `@ts-ignore`

- `@ts-expect-error`：下一行**必须有**错误；错误被修掉后自身报错——防止「僵尸抑制」。  
- `@ts-ignore`：永久沉默，易掩盖真实问题。

---

## 4. 类型断言与双重断言

- `as` 应服务于**已知更窄**的情形（外部库类型过宽）。  
- `as unknown as Foo` 多为坏味道：说明类型层无法证明安全。

---

## 5. 自检清单

- [ ] 仓库里 `any` 数量是否随时间下降？  
- [ ] 每个 `@ts-ignore` 是否都有负责人与原因说明？

下一章：[ch06-泛型与类型层编程](./ch06-泛型与类型层编程.md)。
