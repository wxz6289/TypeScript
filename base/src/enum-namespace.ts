enum Test {
  DEV,
  PRD,
}

// 利用命名空间与枚举的声明合并为枚举添加静态方法
namespace Test {
  export function log(t: Test) {
    console.log(t);
  }
}

const tn = Test.PRD;

Test.log(tn);

console.log(Test);
