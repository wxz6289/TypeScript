// 数组
let list: number[] = [12, 23, 45];
console.log(list);

let list2: Array<number> = [12, 34, 32];
console.log(list2);

// 元组
let t: [string, number] = ["King", 20];
console.log(t);


// 枚举
enum Color { Red = 2, Green, Blue=6 }
let c: Color = Color.Green;
console.log(c);

// any

let notSure: any = 23;
notSure = "kkk";
console.log(notSure);

// void 
// void类型像是与any类型相反，它表示没有任何类型
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

function showName(name: string):void {
    console.log(name);
}

let sn = showName("King");
console.log(sn);

// null/undefined
// 默认情况下null和undefined是所有类型的子类型

// never never类型表示的是那些永不存在的值的类型。
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}


// Object
declare function create(o: object | null): void;

create({ prop: "King"});
create(null);
// create(12);

// 类型推断 
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。
// 第一种 尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// 第二种 as语法

let someValue2: any = "this is a string";
let strLength2: number = (someValue as string).length;