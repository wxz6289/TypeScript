# Chapter 4 · Items 29–42（Type Design）

---

## Item 29 — Prefer Types That Always Represent Valid States

**问题**：布尔旗标组合出非法状态。  
**要点**：判别联合；状态机式类型。  
**示例**：

```ts
type Req = { s: 'ok'; data: string } | { s: 'err'; msg: string };
```

---

## Item 30 — Be Liberal in What You Accept and Strict in What You Produce

**问题**：输入过严、输出过宽，API 难用。  
**要点**：参数类型接受合理超集；返回尽量精确。  
**示例**：接受 `string | URL`，返回 `URL`。

---

## Item 31 — Don’t Repeat Type Information in Documentation

**问题**：JSDoc 重复类型已表达的信息。  
**要点**：文档写行为、不变量、复杂度；类型写形状。  
**示例**：`/** 幂等：多次调用等价一次 */` 而非重复 `@param {string}`。

---

## Item 32 — Avoid Including `null` or `undefined` in Type Aliases

**问题**：`type Name = string | null` 到处传播。  
**要点**：把 nullability 推到边界或用判别字段表达。  
**示例**：`type Name = string`，在 `MaybeName` 包装层处理空。

---

## Item 33 — Push Null Values to the Perimeter of Your Types

**问题**：核心模型到处是 `| null`。  
**要点**：内核用非空；IO 边界解析后再收窄。  
**示例**：解析后用 `if (!x) throw` 再进入业务类型。

---

## Item 34 — Prefer Unions of Interfaces to Interfaces with Unions

**问题**：`interface { a: A|B; b: C|D }` 产生非法组合。  
**要点**：拆成 `| { kind:'1'...} | { kind:'2'...}`。  
**示例**：见 Item 29 模式。

---

## Item 35 — Prefer More Precise Alternatives to String Types

**问题**：`string` 表达枚举、路径、ID。  
**要点**：字面量联合、模板字面量、`brand`。  
**示例**：`type Role = 'admin' | 'user';`

---

## Item 36 — Use a Distinct Type for Special Values

**问题**：魔法字符串 `''`、`'NONE'` 与正常值混淆。  
**要点**：单独字面量或 brand 区分。  
**示例**：`type None = { __brand: 'None' };`

---

## Item 37 — Limit the Use of Optional Properties

**问题**：`?` 滥用，`undefined` 语义不清。  
**要点**：区分「未提供」与「显式空」；能判别联合则不用可选堆砌。  
**示例**：用 `data?:` 仅在真正可选配置。

---

## Item 38 — Avoid Repeated Parameters of the Same Type

**问题**：`(a: Id, b: Id)` 易传反。  
**要点**：用对象参数或 brand 区分。  
**示例**：`transfer({ from: Id; to: Id })`

---

## Item 39 — Prefer Unifying Types to Modeling Differences

**问题**：为微小差异复制整份类型。  
**要点**：找公共超集 + 判别字段，而不是复制粘贴。  
**示例**：`type Shape = Circle | Square`。

---

## Item 40 — Prefer Imprecise Types to Inaccurate Types

**问题**：为了好看写「过窄」类型撒谎。  
**要点**：宁可稍宽 + 运行时校验，也不要错误自信。  
**示例**：外部 JSON 先 `unknown` 再 schema 校验。

---

## Item 41 — Name Types Using the Language of Your Problem Domain

**问题**：`Data`、`Info` 无意义命名。  
**要点**：用领域词汇：`InvoiceId`、`LedgerEntry`。  
**示例**：`type CustomerId = string & { __brand: 'CustomerId' };`

---

## Item 42 — Avoid Types Based on Anecdotal Data

**问题**：从一条 JSON 样本推断全宇宙。  
**要点**：以规范（OpenAPI/JSON Schema）或多样本统计建模。  
**示例**：用 openapi-typescript 生成类型而非手写猜测字段。
