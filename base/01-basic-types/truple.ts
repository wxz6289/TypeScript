// truple
let employee: [number, string][] = [[1, "king"]];

// union
let pid: string | number = 22;

// enum
enum Direction {
  Up = 1,
  Dwon,
  Right,
  Left,
}

type User = {
  id: number;
  name: string;
};

// objects
export const user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "user",
};

let cid: any = 1;
// let customerId = <number>cid;
let customerId = cid as number;

// function

// Interface

interface UserInterface {
  readonly id: number;
  name: string;
  age?: number;
}

const u: UserInterface = {
  id: 2,
  name: "king",
};

class Person {
  private _id: number;
  name: string;
  constructor(_id: number, name: string) {
    this._id = _id;
    this.name = name;
  }
}

const p = new Person(1, "king");
console.log(p.name);

// generic
