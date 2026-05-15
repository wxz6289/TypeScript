# 第 2 章自测

**Q1** 用「集合」解释为什么 `number` 不能赋给 `1 | 2`。  
**思路**：`1|2` 是 `{1,2}` 的子集概念；`number` 集合更大，反向赋值不成立。

**Q2** `type Foo = typeof bar` 中 `bar` 在值空间；若 `bar` 是 `class Bar {}`，`Foo` 可能是什么？  
**思路**：`typeof Bar` 是构造函数值类型；`InstanceType<typeof Bar>` 得实例类型。

**Q3**  excess property checking 何时触发、何时可能不触发？  
**思路**：新鲜对象字面量对目标类型；先赋变量再传可能绕过。

**Q4** 何时更倾向 `interface` 而非 `type`？（第二版结论倾向）  
**思路**：可合并、类 implements、演进式公共 API 形状。

**Q5** 用 `Pick`/`Omit` 各写一例消除重复字段声明。  
**思路**：从宽模型派生子视图 DTO。
