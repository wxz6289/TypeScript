type ParamType<T> = T extends (arg: infer P) => any ? P : T;
type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;
type Constructor = new (...args: any[]) => any;
//获取参数类型
type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any
  ? P
  : never;
// 获取实例类型
type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;

interface IUser {
  name: string;
  age: number
}

class User implements IUser {
  constructor(public name: string, public age: number) {}
}

type Func = (param: User) => string;

type Param = ParamType<Func>;
type AA = ParamType<string>;

type TF = ReturnType<Func>;
type TP = ConstructorParameters<typeof User>;
type Instance = InstanceType<typeof User>;

export {}