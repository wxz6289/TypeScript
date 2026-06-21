function show(text: string): string;
function show(num: number): number; 
function show(num: boolean): boolean; 

function show(value:(string|number|boolean)): (string|number|boolean) {
	return value;
}

console.log(show("King"));
console.log(show(23));
console.log(show(8));
