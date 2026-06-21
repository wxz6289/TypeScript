function reverseHalfStr(str: string): string {
  const len = str.length;
  if (len <= 3) return str;
  let mid = (len % 2 ? len : len + 1) / 2;
  let before = str.slice(0, len % 2 ? mid + 1 : mid);
  let after = str
    .slice(len % 2 ? mid + 1 : mid)
    .split("")
    .reverse()
    .join("");
  return before + after;
}

console.log(reverseHalfStr("abc"));
console.log(reverseHalfStr("abcdefgh"));
