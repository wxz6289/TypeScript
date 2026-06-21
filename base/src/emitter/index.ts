/** 类型安全的 EventEmitter 包装示例（不依赖 redis 运行时） */

type Events = {
  ready: [];
  error: [Error];
  reconnecting: [{ attempt: number; delay: number }];
};

type TypedEmitter<E extends Record<string, unknown[]>> = {
  on<K extends keyof E & string>(event: K, f: (...args: E[K]) => void): void;
  emit<K extends keyof E & string>(event: K, ...args: E[K]): void;
};

function createTypedEmitter<E extends Record<string, unknown[]>>(): TypedEmitter<E> {
  const listeners = new Map<string, Array<(...args: unknown[]) => void>>();

  return {
    on(event, f) {
      const list = listeners.get(event) ?? [];
      list.push(f as (...args: unknown[]) => void);
      listeners.set(event, list);
    },
    emit(event, ...args) {
      for (const f of listeners.get(event) ?? []) {
        f(...args);
      }
    },
  };
}

const client = createTypedEmitter<Events>();

client.on("ready", () => {
  console.info("Redis client is ready");
});

client.on("error", (error) => {
  console.error(`Redis client error: ${error}`);
});

client.on("reconnecting", (params) => {
  console.info(`Redis client reconnecting with attempt ${params.attempt}`);
});

export {};
