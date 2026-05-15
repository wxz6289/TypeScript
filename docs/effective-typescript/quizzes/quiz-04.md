# 第 4 章自测

**Q1** 用接口+联合重构：`{ loading:boolean; data?:User; error?:string }` 的问题与改法。  
**思路**：非法组合；改三态判别联合。

**Q2** 「宽进严出」在一组 HTTP 客户端函数签名上如何体现？  
**思路**：入参接受 `string|URL`；返回精确 `Response` 或 domain 类型。

**Q3** 何时 `string` 太宽？给两种收紧方式。  
**思路**：字面量联合；模板字面量；brand。

**Q4** 解释「可选 never 表达互斥」与 XOR 类型。  
**思路**：两字段其一为 `never` 禁止并存。

**Q5** 为什么说「从一条 JSON 样本生成类型」危险？  
**思路**：轶事数据；应 schema/OpenAPI。
