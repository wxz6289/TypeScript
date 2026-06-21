// class MyMap extends Map<number, string> {

// }

class User {
    name: string
    constructor(name: string) {
        this.name = name;
    }
}

class Lecturer extends User {
    constructor(name: string) {
        super(name)
    }
}

function getPromise<T extends User>(value: T): Promise<T>{
    return new Promise((resolve) => setTimeout(() => resolve(value), 1000))
}

getPromise(new Lecturer("King")).then(console.log)

export default User;