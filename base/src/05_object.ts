let a2: { b: number; c?: string; [key: number]: boolean };

a2 = { b: 1 };
a2 = { b: 2, c: undefined };
a2 = { b: 3, c: "d" };
a2 = { b: 4, 10: true };
a2 = { b: 5, 10: false, 33: "red" };
