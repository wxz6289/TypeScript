function Person(name, age){
    this.name = name;
    this.age = age;
    this.toString = function(){
        return `${this.name} -> ${this.age}`;
    }
}

//原型上的属性和方法会被实例共享，而构造函数里的不共享。
Person.prototype.sex = "Male";
Person.prototype.work = function(){
    console.log(this.name, "is working");  
}
// 静态方法
Person.getInfo = function(){
    console.log(this.name, "static method");
}

let p = new Person("King", 20);
console.log(p.name, p.age);
console.log(p.toString());
console.log(p.sex);
p.work();
//调用静态方法
Person.getInfo();

function Student(name, age){
    Person.call(this, name, age); // 寄生构造
}
Student.prototype = Person.prototype;  //new Person() // 没法给父类传参

let s = new Student("Dreamer", 12);
console.log(s.name, s.age, s.toString());
s.work();

// https://www.bilibili.com/video/av38379328/?p=5


