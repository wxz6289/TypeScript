// ts中的继承主要通过extends和super实现
// 修饰符:
// public 在当前类、子类和内外部都可以访问
// private 只能在当前类访问
// protected 在当前类和子类可以访问
// 实例属性
// 静态属性

// 静态方法  无法访问非静态属性或方法
// 实例方法
// 多态 是继承的一种表现
// abstract可以用来声明抽象类和抽象方法 抽象方法自能放在抽象类中，它不包含具体实现但必须在派生类中实现 它们主要用来定义标准
// 抽象类不能实例化

/* class Person {
    public name: string;
    public show: string  = "test";
    protected school: string = "江南"; 
    private age: number = 10;
    static prop: string = "is static";

    constructor(name: string) {
        this.name = name;
    }
    getName(): string {
        return this.name;
    }

    private getAge() {
        return this.age;
    }

    setName(name: string){
        this.name = name;
    }

    static print():void {
        console.log("print");
    }

    run():void {
        console.log(this.name, this.getAge());
    }
}


let p = new Person("King");
console.log(p.name);
p.setName("King23");
p.run();
Person.print();
console.log(Person.prop);
console.log(p.getName());
// console.log(p.getAge());



class Student extends Person {
    constructor(name: string) {
        super(name);
    }
    run(){
        console.log(this.name, "is study at ", this.school);
    }
}

let s = new Student("Tom");
s.run();
s.setName("Tom2");
console.log(s.getName());
console.log(s.show);
Student.print();
console.log(Student.prop);

 */

// 父类声明了一个方法却不具体实现，而要求子类去实现，每个子类有着不同的表现，这就是多态
/* 

class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    eat(){ 
        console.log("eat");
    }
}


class Rabbit extends Animal {
    constructor(name: string) {
        super(name);
    }

    eat(): string{
        return `${this.name}吃草`; 
    }
}

 */

 abstract class Animal {
     name: string
     constructor(name: string) {
         this.name = name
     }
     abstract eat(): void;

     getName(): string {
         return this.name;
     }
 }

 class Rabbit extends Animal {
     constructor(name) {
         super(name);
     }

     eat(){
        return `${this.name}吃草`;
     }
 }

 let r = new Rabbit("Whit Rabbit");
 console.log(r.getName());
 console.log(r.eat());
 
 