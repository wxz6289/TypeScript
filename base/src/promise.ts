import { readFile } from 'fs';

type Executor<T, E extends Error> = {
  resolve: (result: T) => void;
  reject: (error: E) => void;
};

/** 简化版 Promise 类型草图，用于理解泛型类与 then/catch 链式签名 */
class MyPromise<T, E extends Error> {
  constructor(_f: (executor: Executor<T, E>) => void) {}

  then<U, F extends Error>(_g: (result: T) => MyPromise<U, F>): MyPromise<U, F> {
    return null as unknown as MyPromise<U, F>;
  }

  catch<U, F extends Error>(_g: (error: E) => MyPromise<U, F>): MyPromise<U, F> {
    return null as unknown as MyPromise<U, F>;
  }
}

function readFilePromise(path: string): MyPromise<string, Error> {
  return new MyPromise<string, Error>((executor) => {
    readFile(path, (error, result) => {
      if (error) {
        executor.reject(error);
        return;
      }
      executor.resolve(result.toString());
    });
  });
}

readFilePromise('./params.ts');

export {};
