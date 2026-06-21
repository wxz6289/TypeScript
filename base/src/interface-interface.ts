// 接口扩展： 接口可以继承接口

interface Animal {
    eat(): void;
}

interface Person extends Animal {
    work(): void;
}

class Programmer {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    coding(code: string){
        console.log(`code: ${code}`);
    }
}

class Web extends Programmer implements Person {
    constructor(name: string ) {
        super(name); 
    }
    eat(){
        console.log("eat");
    }

    work(){
        console.log("work");
    }
}

let w = new Web("Web");
w.work();
w.coding("Javascript");