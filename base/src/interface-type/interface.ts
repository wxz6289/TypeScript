/* 
interface IA {
  good(x: number): string;
  bad(x: number): string;
}

interface IB extends IA {
  good(x: number | boolean): string;
  bad(x: string): string; // 将进行兼容性检查
}
 */

/* type TA = {
  good(x: number): string;
  bad(x: number): string;
};

type TB = TA & {
  good(x: number | boolean): string;
  bad(x: string): string;
};

class CB implements TB {
  bad(x: number): string;
  bad(x: string): string;
  bad(x: unknown): string {
    if (typeof x == "number") {
      return "number";
    } else if (typeof x == "string") {
      return "string";
    } else {
      return "default";
    }
  }
  good(x: number | boolean): string {
    return String(x);
  }
}

const cb = new CB();
console.log(cb.bad(23), cb.bad("hello"));
console.log(cb.good(12));
 */

/* 
interface User {
  age: number;
}

interface User {
  age: string | number;
}
 */

interface CUser<Age extends number | string> {
  age: Age;
  name: string;
}
