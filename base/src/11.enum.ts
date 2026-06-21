enum Color2 {
  Red,
  Blue,
}

enum Color2 {
  Green = "g",
}

let c1 = Color2.Red;
let c2 = Color2[1];

console.log(c1, c2);

const enum Language {
  English,
  Spanish,
  Russian,
}

let e1 = Language.English;
let r1 = Language[1];
console.log(e1, r1);

const enum Flippable {
  Burger,
  Chair,
  Cup,
  Skateboard,
  Table,
}

function flip(f: Flippable) {
  return "flipped it";
}

flip(Flippable.Chair);
let f2 = flip(12); // !!!
console.log(f2);
