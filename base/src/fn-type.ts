var greetUnname: (name: string) => string = function (name: string): string {
	return `Hi ${name}`;
};
console.log(greetUnname("King Dreamer"));

// 可选参数
function add(one: number, two: number, three?: number): number {
	if(three){
		return one + two + three;
	}
	return one + two;
}

console.log(add(1,2,3));
console.log(add(1,2));
// console.log(add(4));

// 默认参数

function add2(one: number, two: number =0 , three: number = 0): number {
	return one + two + three;
}

console.log(add2(1,2,3));
console.log(add2(1,2));
console.log(add2(4));

// 剩余参数

function sum(...numbers: number[]): number {
	let result = 0;
	let len = numbers.length;
	while(len--) {
		result += numbers[len];
	}
	return result;
}

function sum2(numbers: number[]): number {
	let result = 0;
	let len = numbers.length;
	while(len--) {
		result += numbers[len];
	}
	return result;
}

function sum3():number {
	let result = 0;
	let len = arguments.length;
	while(len--) {
		result += arguments[len];
	}
	return result;

}
console.log("++++++++++++++++++++++++");
console.log(sum2([1,2,5]))
console.log(sum2([5]))
console.log(sum2([1,2]))
console.log(sum2([]))
console.log("++++++++++++++++++++++++");
console.log(sum3(1,2,5));
console.log(sum3(2));
console.log(sum3(5,6));




