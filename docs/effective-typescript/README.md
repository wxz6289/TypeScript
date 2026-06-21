# 《Effective TypeScript》第二版 · 学习笔记

> 原书：*Effective TypeScript: 83 Specific Ways to Improve Your TypeScript*, Second Edition（2024），作者 Dan Vanderkam，O'Reilly。
> 中文版译名：**《Effective TypeScript：精进 TypeScript 代码的 83 个实践方法（第二版）》**。

本目录为**原创整理**：依据原书公开的**章节划分与 Item 编号体系**（见 [O'Reilly 书目页](https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/) 与 [作者博客第二版说明](https://effectivetypescript.com/2024/05/21/second-edition/)），用中文归纳**心智模型、实践要点与示例**，便于系统复习；**不能替代阅读原文**，亦未逐条复述书中叙述与全部代码。

---

## 与仓库内其它文档的关系

- **官方语言与配置**：[`../01-基础.md`](../01-基础.md)、[`../07-工程与配置.md`](../07-工程与配置.md) 等；本地实践见 [`../09-仓库实践与入门速查.md`](../09-仓库实践与入门速查.md)。
- **本书**：侧重「**如何用得更好**」— 类型设计、推断、不健全性、`any`、泛型与类型层编程、工程化与迁移等。

**按 Item 的短笔记（83 条）**：[items/README.md](./items/README.md)
**章末自测题 + 思路**：[quizzes/README.md](./quizzes/README.md)

---

## 章节索引（第二版 10 章 · 共 83 条 Item）

| 章 | 文件 | 原书英文名 |
|----|------|------------|
| 1 | [ch01-认识-TypeScript.md](./ch01-认识-TypeScript.md) | Getting to Know TypeScript |
| 2 | [ch02-TypeScript-类型系统.md](./ch02-TypeScript-类型系统.md) | TypeScript's Type System |
| 3 | [ch03-类型推断与控制流分析.md](./ch03-类型推断与控制流分析.md) | Type Inference and Control Flow Analysis |
| 4 | [ch04-类型设计.md](./ch04-类型设计.md) | Type Design |
| 5 | [ch05-不健全性与-any.md](./ch05-不健全性与-any.md) | Unsoundness and the `any` Type |
| 6 | [ch06-泛型与类型层编程.md](./ch06-泛型与类型层编程.md) | Generics and Type-Level Programming |
| 7 | [ch07-TypeScript-配方.md](./ch07-TypeScript-配方.md) | TypeScript Recipes |
| 8 | [ch08-类型声明与-types.md](./ch08-类型声明与-types.md) | Type Declarations and `@types` |
| 9 | [ch09-编写与运行代码.md](./ch09-编写与运行代码.md) | Writing and Running Your Code |
| 10 | [ch10-现代化与迁移.md](./ch10-现代化与迁移.md) | Modernization and Migration |

另附**自检清单（非逐条抄书）**：[附录-核心实践清单.md](./附录-核心实践清单.md)

**第一版 ↔ 第二版**（新增章节、删条、重大改写、新 Item 列表）：[第一版与第二版对照.md](./第一版与第二版对照.md)

---

## 正版获取与版本信息

- O'Reilly 图书页（含在线阅读入口）：[Effective TypeScript, 2nd Edition](https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/)
- 作者第二版公告（更新要点）：[Now Available: Second Edition](https://effectivetypescript.com/2024/05/21/second-edition/)
- 第一版 → 第二版 **Item 对照附录**（原书 PDF/在线版）：[Appendix: Item Mapping](https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/app01.html)

ISBN（纸书/电子书以渠道为准）：**9781098155056**（见 O'Reilly 书目页）。

---

## 版权声明

原书正文、插图及全部 Item 的完整表述版权归出版社与作者所有。本笔记仅供个人学习；商业使用请购买正版图书或电子书。

---

## 推荐阅读顺序

若你读过**第一版**：请先阅读 [第一版与第二版对照](./第一版与第二版对照.md)，再按下列顺序补读新增章节（第 6–7 章）与重大改写条目所在章。

1. 先读 **第 1–3 章** 建立心智模型与推断直觉。
2. **第 4 章** 类型设计是全书「性价比」最高部分之一。
3. **第 5–6 章** 处理现实项目中的边界：不健全、`any`、以及类型层技巧。
4. **第 7 章** 当「菜谱」查阅。
5. **第 8–10 章** 与团队协作、声明文件、运行与迁移强相关。
