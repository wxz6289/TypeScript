// 类型断言 重写其推断和分析类型,告诉编译器不再提示错误 编译时支持
// 类型转换 需要运行时支持
/* const foo2 = {};
foo.bar = 123;
foo.bas = "King"; */

interface Foo {
    bar: number;
    baz: string
}

const foo2 = {} as Foo;

foo2.bar = 123;
foo2.baz = "King";

