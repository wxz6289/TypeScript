var student: any = {
	name: "Dreamer",
	age: 23
};

for(let key in student){
	console.log(key, student[key]);
}

var greet = (name: string): string => {
	if(name) {
		return `Hi ${name}!`;
	} else {
		return 'Hi!';
	}
};

console.log(greet(student.name));

// 回调函数
function sum(a: number, b: number, callback:(result: number) => void) {
	callback(a + b);
}

sum(23, 18, function(result){
	console.log(`sum: ${result}`);
});
console.log("funck");