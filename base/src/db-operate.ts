interface DBI<T> {
    add(info: T): boolean;
    update(info: T, id: number): boolean;
    delete(id: number): boolean;
    get(id: number): any[]
}

// 泛型接口需要泛型类来实现


class MySQLDb<T> implements DBI<T>{
    add(info: T): boolean {
        console.log(info);
        return true;
      //  throw new Error("Method not implemented.");
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.");
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.");
    }
}


class MSSQLDb<T> implements DBI<T> {
    add(info: any): boolean {
        throw new Error("Method not implemented.");
    }    update(info: any, id: number): boolean {
        throw new Error("Method not implemented.");
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.");
    }
}

class User2 {
    name: string | undefined;
    pwd: string | undefined;
    constructor(u: { name: string, pwd: string}) {
        this.name = u.name;
        this.pwd = u.pwd;
    }
}

let u1 = new User2({ name: "King", pwd: "123"});
let mysql = new MySQLDb<User2>();
mysql.add(u1);

// console.log(u1);
