export class User {
  constructor(public name: string, protected age: number) {
    this.name = name;
    this.age = age;
  }
}

console.log(new User('king', 23));
type UserProp = Partial<User>

const x: [string, number] = ['hello', 100];
console.log(x[1]);
// 元组长度固定，x[3] 在 strict 下会报错