//接口的作用：定义类需要遵守的规范，它不关心类内部状态及方法的具体实现，只规定类必须要实现的方法 它主要用来对实现做限制和规范
// ts中接口有： 属性接口、函数类型接口、可索引接口、类类型接口、接口扩展

// 1. 属性接口
/* 
function printLable(label: string): void {
    console.log(label);
}

printLable("King");

interface ILabel {
    label: string;
}

function printLable2(labelObj: ILabel): void {
    console.log(labelObj.label);
}

printLable2({ label: "King2"});
 */

interface IConfig {
    type: string;
    url: string;
    data?: string;
    dataType?: string 
}

function ajax(config: IConfig, callback: Function){
    const xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true );
    xhr.send(config.data);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            callback(xhr.responseText);
        }
    }
}

ajax({
    type: 'get',
    url: "http://www.baidu.com"
}, function(res: any){
    console.log(res);
})

