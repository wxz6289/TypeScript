import { type } from "os";

let as: readonly number[] = [1, 2, 3];
let bs: readonly number[] = as.concat(4);
let cs = as[2];
as[1] = 2;
bs.push(2);

type A = readonly number[];
type B = ReadonlyArray<number>;
type C = Readonly<number[]>;
type D = readonly [number, string];
type E = Readonly<[number, string]>;
