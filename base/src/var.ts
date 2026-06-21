/* function foo(){
	console.log("bar:", bar);
	var bar: number;
	bar = 9;
	console.log("bar:", bar);
}
foo(); */

/* function sumMatrix(matrix: number[][]) {
	var sum = 0;
	for (var i = 0; i < matrix.length; i++) {
		var currentRow = matrix[i];
		for (var i = 0; i < currentRow.length; i++) {
			sum += currentRow[i];
		}
	}

	return sum;
} */

function sumMatrix(matrix: number[][]) {
	var sum = 0;
	for (let i = 0; i < matrix.length; i++) {
		var currentRow = matrix[i];
		for (let i = 0; i < currentRow.length; i++) {
			sum += currentRow[i];
		}
	}

	return sum;
}

console.log(sumMatrix([[12, 23],[1, 6]]));

for (let i = 0; i < 10; i++) {
	setTimeout(function () { console.log(i); }, 100 * i);
}


function theCityThatAlwaysSleeps() {
	let getCity;

	if (true) {
		let city = "Seattle";
		getCity = function () {
			return city;
		}
	}

	return getCity();
}

let f: string = theCityThatAlwaysSleeps();
console.log(f);

let user2 = {
	name: "King",
	age: 20
};

let {name: n, age }: { name: string, age: number} = user2;
console.log(n, age);

function fn({ a = "", b = 0} = {}){
	console.log(a, b);
}

fn();

fn({a: "a2"});
