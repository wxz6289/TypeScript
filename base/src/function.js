// 可选参数 必须要在函数体里处理可选参数
/* function getInfo(name: string, age?: number):string {
    if(age){
        return `${name} ${age}`;
    } else {
        return `${name}`;
    }
}

console.log(getInfo("King"));
console.log(getInfo("King", 20));
 */
function getInfo(str) {
    if (typeof str == "string") {
        return str;
    }
    else if (typeof str == "number") {
        return str;
    }
}
console.log(getInfo("King"));
console.log(getInfo(20));
