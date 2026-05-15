# 第 5 章自测

**Q1** 如何把 `JSON.parse` 结果安全接到业务类型？  
**思路**：`unknown` + 校验函数/`zod` + 收窄。

**Q2** `@ts-expect-error` 与 `@ts-ignore` 的维护差异？  
**思路**：expect 无错时报错，防僵尸抑制。

**Q3** 何谓「把不安全断言藏进良类型函数」？举伪代码结构。  
**思路**：对外 `parseUser(s:string):User`；内层 `as` 仅在校验后。

**Q4** 列举一种常见 soundness trap。  
**思路**：双断言、错误逆变假设等。

**Q5** 如何在 CI 防止 `any` 回潮？  
**思路**：type-coverage、eslint、统计阈值。
