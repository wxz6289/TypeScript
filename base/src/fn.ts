console.log(greetName("King"));
// console.log(greetUnname("King Dreamer"));
function greetName(name: string): string {
	if(name) return name;
}

var greetUnname = function(name: string): string {
	return name
}

console.log(greetUnname("King Dreamer"));

