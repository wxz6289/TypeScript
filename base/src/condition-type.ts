type ToArray<T> = T extends unknown ? T[] : T[];

type TA = ToArray<number | string>;

let to = ["s", 2] as unknown as TA;

type ToArray2<T> = T[];

type TA2 = ToArray2<number | string>;

let to2: TA2 = ["2", 5];

type Without<T, U> = T extends U ? never : T;

type WA = Without<boolean | string | number, boolean>;

let wa: WA = 23;

type ElementType<T> = T extends unknown[] ? T[number] : T;

type EA = ElementType<number[]>;

type ElementType2<T> = T extends (infer U)[] ? U : T;

type EA2 = ElementType2<number[]>;

type SecondArgs<F> = F extends (a: any, b: infer B) => any ? B : never;

type F2 = (typeof Array)["prototype"]["slice"];
type F22 = SecondArgs<F2>;

type A = number | string;
type B = string;

type C = Exclude<A, B>;

type D = Extract<A, B>;

type E = { a?: number | null };
type E2 = NonNullable<E["a"]>;

type F3 = () => number | string;
type R = ReturnType<F3>;

type A1 = { new (): B1 };
type B1 = { a: number | string };

type H = InstanceType<A1>;

// 模拟名义类型
type UserId = string & { readonly id: unique symbol };

function UserId(id: string) {
  return id as UserId;
}

let id = UserId("user1");
// @ts-expect-error 名义类型：不能把任意 string 赋给 UserId
id = "user2";
