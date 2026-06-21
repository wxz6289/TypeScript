// class decrator

function log(params: any) {
    return function(target: any){
        console.log(target);
        console.log(params);
        target.prototype.aipUrl = params;
    }
    /* console.log(params);
    params.prototype.baseUrl = "/";
    params.prototype.run = function(){
        console.log("decrator run()");
    } */
}

function log2(target: any){
    console.log(target);
    return class extends target {
        apiUrl: any = "decrator apiUrl";

        getData(){
            this.apiUrl = this.apiUrl + "...."; 
            console.log(this.apiUrl);
        }
    }
}

function logProperty(params: any){
    return function(target: any, attr: any){
        // console.log(target);
        // console.log(attr); 
        // console.log(params);
        target[attr] = params; 
    }
}

function logMethod(params: any){
    return function(target: any, methodName: string, description: any){
        console.log(params, ">>");
        
        console.log(target);
        console.log(methodName);
        console.log(description);
        target.apiUrl = 'xxxx';
        target.run = function(){
            console.log("run"); 
            
        }

        let oldMethod = target[methodName];

        target[methodName] = function(...args: any[]){
            args = args.map(value => {
                return String(value);
            });
           // console.log(args);
            oldMethod.apply(this, args);
        }
    }
}


function logParams(params: any){
    return function(target: any, methodName: any, paramsIndex: any){
        console.log(params, target, methodName, paramsIndex);
        target.apiUrl = params;
    }
}

// @log2
class HttpClient {
    @logProperty("hello")
    public apiUrl: string | undefined;
    constructor(){
        this.apiUrl = "constructor apiUrl";
    }
    @logMethod('http://localhost')
    getData(...args: any[]):void {
        console.log(args);
        console.log(this.apiUrl);
    }

    
    get(@logParams('uuid') uuid: any){
        console.log("get");
        console.log(uuid);
    }
}



let http = new HttpClient();
http.get(12);
console.log(http.apiUrl);

// http.getData(123, "King");
// http.run();
// console.log(">>", http.aipUrl);

// 属性  方法 类