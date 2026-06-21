module Geometry {
	export interface Verctor2dInterface {
		toArray(callback: (x: number[]) => void): void;
		length(): number;
		normalize(): void;
	}

	export class Vector2d implements Verctor2dInterface {
		private _x: number;
		private _y: number;
		constructor(x: number, y: number) {
			this._x = x;
			this._y = y;
		}

		toArray(callback: (x: number[]) => void): void {
			callback([this._x, this._y]);
		}

		length(): number {
			return Math.sqrt(this._x * this._x + this._y * this._y);
		}

		normalize(): void {
			var len = 1 / this.length();
			this._x *= len;
			this._y *= len
		}
	}
}

var vector: Geometry.Verctor2dInterface = new Geometry.Vector2d(2,3);
vector.normalize();
vector.toArray(function(verctorArray: number[]){
	console.log(`x: ${verctorArray[0]}, y: ${verctorArray[1]}`);
});