class User {
    name: string | undefined;
    pwd?: string
}

class MySQLDb<T> {
    add(user: T): boolean{
        console.log(user);
        return true;
    }
    update(info: T, id: number): boolean {
        console.log(info);
        console.log(id);
        return true;
        
    }
}

let u = new User();
u.name = "King";

let db = new MySQLDb<User>();
console.log(db.add(u));