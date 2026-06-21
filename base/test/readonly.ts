type Foo = {
    bar: number;
    baz: string;
};

type ReadOnlyFoo = Readonly<Foo>; // { readonly [P in keyof T]: T[P]; }

const foo1: Foo = { bar: 12, baz: 'hello' };
foo1.bar = 456;

const foo2: ReadOnlyFoo = { bar: 12, baz: 'hello' };
// foo2.bar = 456;

function test(foo) {
    foo.bar = 456;
}

test(foo2);
console.log(foo2.bar);
