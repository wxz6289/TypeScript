var bar = 0;
(function() {
	var foo: number = 0;
	bar = 1;
	//在闭包中可以访问全局变量
	console.log(bar, foo);
})();

console.log(bar);
// 闭包外不能访问闭包内的变量
// console.log(foo);
