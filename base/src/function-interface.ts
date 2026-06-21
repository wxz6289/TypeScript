// 函数类型的接口是对传入函数参数和返回值的约束

interface encrypt { 
    (key: string, value: string): string
}

let md5:encrypt = function(key: string, value: string): string {
    return key + value;
}

console.log(md5("King", "Dreamer"));

// 可索引接口： 数组和对象的约束

interface UserArr { 
    [index: number]: string
}

let arr: UserArr = ['aaa', 'bbb'];
console.log(arr);


interface UserObj {
    [index: string]: string
}

let usr: UserObj = {
    name: "King", 
    // age: 20
}

console.log(usr);

// 类类型接口

interface Animal2 {
    name: string;
    eat(str: string): void;
}

class Dog implements Animal2 {
    name: string;
    constructor(name: string){
        this.name = name;
    }

    eat(str: string){
        console.log("eat:", str);
        
    }
}


let d = new Dog("Tom");
d.eat("Glass");

class HeiHei extends Dog {
    eat(str: string) {
        console.log("eat ->", str);
    }
}

let h = new HeiHei("heihei");
h.eat('rice');




