// 可选参数 必须要在函数体里处理可选参数
/* function getInfo(name: string, age?: number):string {
    if(age){
        return `${name} ${age}`;
    } else {
        return `${name}`;
    }
}

console.log(getInfo("King"));
console.log(getInfo("King", 20));
 */

/*  // 默认参数 可以不用在函数体内单独处理
 function getInfo(name: string, age: number = 10):string {
     return `${name} ${age}`;
}

console.log(getInfo("King"));
console.log(getInfo("King", 20));
 */

/*  // 剩余参数 
 function sum(...rest:number[]): number{
    return rest.reduce((prev, curr) => prev + curr);
 }

 console.log(sum(1, 3, 6, 7)); */

 // 函数重载
 // js 中同名函数，前面的函数会被后面的函数覆盖
/* 
function getInfo(name: string): string;
function getInfo(age: number): number;

function getInfo(str: any): any {
    if(typeof str == "string") {
        return str;
    } else if(typeof str == "number"){
        return str;
    }
}

console.log(getInfo("King"));
console.log(getInfo(20)); */


// 箭头函数

//声明函数 
// 方式一：
// 这种方式支持重载 
type LongHand = {
    (a: number): number;
    (a: string): string;
}

// 方式二：
type ShortHand = (a: number) => number;

// 用类型别名或接口表示可调用注解
interface ReturnString {
    (): string
}

declare const foo: ReturnString;

// const bar2 = foo();

// 使用接口实现重载
interface Overload {
    (foo: string): string;
    (foo: number): number;
}

// 内联注解
const overload2: {
    (foo: string): string;
    (foo: number): number;
} = (foo: any) => foo;

function sOrN(foo: number): number;
function sOrN(foo: string): string;

function sOrN(foo: any) {
    if(typeof foo === 'number') {
        return foo*foo;
    } else if(typeof foo === 'string') {
        return `Hello ${foo}`;
    }
}

const overload: Overload = sOrN;

const str = overload('Dreamer');
const num = overload(12);
console.log(str, num);

const str2 = overload2('King');
const num2 = overload2(23);
// const b = overload2( true);
// console.log(str2, num2, b);

// 箭头函数类型注解 只能作为简单的函数类型使用，无法使用重载
const simple: (foo: number) => string = foo => String(foo);

console.log(simple(23));

// 可实例化注解
interface CallMeWithNew {
    new (): string;
}

declare const Foo: CallMeWithNew;
const bar3 = new Foo();
console.log(bar3);









 

