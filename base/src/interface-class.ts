class Person2 {
  constructor(private name: string, public age: number) {
  }
}

interface IPerson23 extends Person2 {
    sayHello(): void;
}


/* class Student2 implements IPerson23 {
    constructor(public name: string, public age: number) {
        this.name = name
    }
    sayHello(): void {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old`);
    }
}


const student2 = new Student2("John", 20);
student2.sayHello(); */