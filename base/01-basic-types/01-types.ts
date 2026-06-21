// implicit types
/* let age = 20;
age = "23";
console.log(age); */

// explicit types
// let age: number;
// age = '20';

// console.log(age);

// let n: undefined = null

/* function somefunc(n:number) {
    if(n % 2 == 0) {
        return "even"
    }
    return null
}

const value = somefunc(3)!;
value.substring(1); */

// function hello(name:string) {
//     console.log(`Hello from ${name}`);
// }

// const msg: string = hello("king")
// console.log(msg);

interface Person {
    name: string;
    readonly age: number;
    [key:string]: any
}

let user: Person = {
    name: "King", 
    age: 20,
    height: 180
}

user.age = 21;

console.log(user);



export { Person }
// export default age;
