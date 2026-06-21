// 泛型
function getData<T>(value: T): T {
    return value;
}

console.log(getData(12));
console.log(getData("King"));
console.log(getData<string>("Hello"));

// 泛型类

class MinClass<T> {
    public list: T[] = [];
    add(num: T) {
        this.list.push(num);
    }

    min():T{
        let min = this.list[0];
        for (let i = 0; i < this.list.length; i++) {
           if(min > this.list[i]){
               min = this.list[i];
           } 
        }
        return min;
    }
}

let m = new MinClass<number>();
m.add(12);
m.add(23);
m.add(2);
console.log(m.min());

let m2 = new MinClass<string>();
m2.add("hhah");
m2.add("zkk");
console.log(m2.min());



/* interface ConfigFn {
    (value1: string, value2: string): string;
}

let setData: ConfigFn = function(value1: string, value2: string): string {
    return `${value1} -> ${value2}`;
}

console.log(setData("King", "Jim")); */
/* 
interface ConfigFn {
    <T>(value: T): T;
}

let setData: ConfigFn = function<T>(value: T): T {
    return value;
}

console.log(setData<string>("King")); */

interface ConfigFn<T> {
    (value: T): T;
}

function setData<T> (value: T): T {
    return value;
}

let mySetData: ConfigFn<string> = setData;
console.log(mySetData("King"));

