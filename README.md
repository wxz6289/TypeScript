# TypeScript

**体系化笔记（对照官方 Handbook / Docs）**：见 [`docs/README.md`](./docs/README.md)。  
**《Effective TypeScript》第二版读书整理（原创笔记，非原文）**：见 [`docs/effective-typescript/README.md`](./docs/effective-typescript/README.md)。  
**官方文档**：[typescriptlang.org/docs](https://www.typescriptlang.org/docs/) · [Handbook 导言](https://www.typescriptlang.org/docs/handbook/intro.html)

---

视频教程
<https://www.bilibili.com/video/av38379328/?p=10>

[![Build Status](https://travis-ci.org/DreamerKing/learn-typescript.svg?branch=master)](https://travis-ci.org/DreamerKing/learn-typescript)

js 动态类型
自由灵活，易学易用

为什么需要 TypeScript？  
TypeScript 与 JavaScript 有什么不同?

特点：

- 兼容 JavaScript
- 拥有更多规则和类型限制，使编写的代码有更高的可预测性和可控性，易于维护和测试
- 支持模块、命名空间和面向对象，更容易组成代码，开发大型复杂应用程序
- 支持静态语法检查

安装 Typescript

```bash
sudo npm i typescript -g
yarn add typescript
```

生成配置文件`tsconfig.json`

```bash
tsc --init
```

```js
{
  /* 
  路径：
  ** 表示任意路径
  * 表示任意 
  */
  "include": [],
  "exclude": [],
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Enable incremental compilation */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./",                          /* Specify the folder for .tsbuildinfo incremental compilation files. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es5",                                     /* 指定生成js版本  Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h' */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.` */
    // "reactNamespace": "",                             /* Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like `./node_modules/@types`. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "resolveJsonModule": true,                        /* Enable importing .json files */
    // "noResolve": true,                                /* Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have `@internal` in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like `__extends` in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing `const enum` declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied `any` type.. */
    // "strictNullChecks": true,                         /* When type checking, take into account `null` and `undefined`. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for `bind`, `call`, and `apply` methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when `this` is given the type `any`. */
    // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when a local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}

```

常用配置项
- target
- module
- lib 指定要使用的库
- outDir 指定输出目录
- outFile 指定输出文件 与module相关
- allowJS
- checkJS 检查js语法
- removeComments
- noEmit 不生成编译以后的文件
- noEmitOnError 有错时不生成文件
  
- strict 类型检查总开关
- alwaysStrict
- noImplicitAny
- noImplicitThis
- strictNullChecks

与webpack集成

```
yarn add webpack webpack-cli typescript ts-loader -D
```

编译ts

```
tsc 
```

编译标记

- --strictNullChecks 严格空检查模式 指示 null 和 undefined 只能赋值给 void 和它们各自。

基本数据类型

- boolean
- number
- string
- array type[]或Array<type>
- tuple 元祖 与数组类似 [type,..., type] 固定长度的数组
- enum 枚举
- any
- symbol
- undefined
- null 默认情况下 null 和 undefined 是所有类型的子类型。
- void void 类型像是与 any 类型相反，它表示没有任何类型。只能接收 undefined 和 null 的赋值。
- never never 类型表示的是那些永不存在的值的类型。 never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。 即使 any 也不可以赋值给 never。
- unknown 未知类型 类型安全的any
- object
  - 可选属性 `?`
  - 任意属性 [prop: string]
  - 函数结构的类型声明
  - & 同时满足

- 字面量
- 联合类型 `|`

类型别名
type typeName

 类型断言  `as` 或 `<>` 告诉变量的实际类型

- 变量 as 类型
- <类型>变量

Readonly<T>
ReadonlyArray<T> 只读数组
ts会将只有getter没有setter的访问器属性自动推断成readonly属性

readonly与const的区别
readonly作用于属性上,并不能保证属性不能被修改 const作用于变量声明上，变量不能重新赋值,变量的属性可以重新赋值

变量声明

- var
- let
- const

接口声明
interface
可选属性 ?
只读属性 readonly
ReadonlyArray 只读数组
可索引的类型
TypeScript 支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 number 来索引时，JavaScript 会将它转换成 string 然后再去索引对象。

```ts
interface StringArray {
  [index: number]: string;
}
```

类型注解 记录变量或函数约束的简便方法，以供语法静态分析。

接口

类

函数类型接口

泛型 支持多种数据类型 解决类、接口和方法的复用性

- Types
  - Implicit Types 隐式类型
  - Explicit Types 显式类型
- Functions
- Interfaces
- Classes
- Interface and classes together
- Enums
- Generics 泛型

# 声明空间

- 类型声明空间 类型注解

  ```ts
  interface
  type
  class
  ```

- 变量声明空间

  ```ts
  const
  var
  let
  class
  ```

# 模块

- 全局模块
- 文件模块  
  文件中包含`export`或`import`会创建本地作用域。
  配置文件中的`module`选项可配置模块输出类型。

  模块路径

  - 相对路径
  - 动态查找
    1. 文件
    2. 文件夹下的 index.ts
    3. 文件夹下的 package.json 中`type`或`main`选项指定的文件

# 命名空间

使用`namespace`来管理分组

动态导入表达式 异步加载模块

- import()
- require.ensure()

在 Node 中使用 TypeScript

```sh
npm init -y
npm install typescript -D
npm install @types/node -D
npx tsc --init
npm install ts-node -D
npm install nodemon -D
nodemon --watch 'src/**/*.ts' --exec ts-node 'src/index.ts'
```

# 依赖管理

- devDependencies
- peerDependencies 外部依赖 装包时不会自动安装
- dependencies

<hr/>

# 类型系统

- 可选的 js 可以认为就是 ts
- 不阻止运行 即使类型错误也不妨碍运行

- Offers additional features to javascript including static types
- Using types is completely optional.
- Compiles down to regular JS
- Inludes most features from es6, es7.
- Types from 3rd party libraries can be added with type definitions.

联合类型与交叉类型  

交叉类型是多个类型合并为一个类型，可以访问所有类型的属性；联合类型是多个类型中的某一个，只能访问所有类型的共有属性。

类型别名

可以使用`type`为类型注解设置语义化的别名。当需要使用注解的层次结构时一般使用接口，这样可以使用`implements`和`extends`。

JavaScript项目迁移到TypeScript步骤：

1. 添加配置文件`tsconfig.json`;
2. 变更js文件扩展名为`.ts`, 开始使用类型断言或`any`来减少报错;
3. 添加类型注解，修复已识别的错误,逐渐减少`any`的使用;
4. 为第三方js代码定义环境声明。
