let a = 1 + 2;
let b = a + 1;
let c = {
  apple: a,
  banana: b,
};
let d = c.apple * 4;


interface Vector2D {
  x: number;
  y: number;
}

function length1(v: Vector2D) {
  return Math.hypot(v.x, v.y);
}

// { x: number; y: number; z: string; }
const p1 = { x: 3, y: 4, z:'23' };
length1(p1);
length1({ x: 3, y: 4, z: '23' });

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
function isDigit(n: number): n is Digit {
  return Number.isInteger(n) && n >= 0;
}

let Digit: Digit = 1;

let a1 = isDigit(10);