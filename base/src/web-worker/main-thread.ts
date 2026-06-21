import EventEmitter from "events";

type Message = string;
type ThreadID = number;
type UserID = number;
type Participants = UserID[];

type Commands = {
  sendMessageToThread: [ThreadID, Message];
  createThread: [Participants];
  addUserToThread: [ThreadID, UserID];
  removeUserFromThread: [ThreadID, UserID];
};

type Events = {
  receivedMessage: [ThreadID, UserID, Message];
  createdThread: [ThreadID, Participants];
  addUserToThread: [ThreadID, UserID];
  removeUserFromThread: [ThreadID, UserID];
};

class SafeEmitter<Events extends Record<string, unknown[]>> {
  private _emitter = new EventEmitter();
  emit<K extends keyof Events & string>(channel: K, ...data: Events[K]) {
    return this._emitter.emit(channel, ...data);
  }
  on<K extends keyof Events & string>(
    channel: K,
    listener: (...data: Events[K]) => void
  ) {
    return this._emitter.on(channel, listener as (...args: unknown[]) => void);
  }
}

let commandEmitter = new SafeEmitter<Commands>();
let eventEmitter = new SafeEmitter<Events>();

let worker = new Worker("worker.js");

worker.onmessage = (event) => {
  commandEmitter.emit(event.data.type, ...event.data.data);
};

commandEmitter.on("sendMessageToThread", (data) => {
  worker.postMessage({ type: "sendMessageToThread", data });
});

commandEmitter.on("createThread", (data) => {
  worker.postMessage({ type: "createThread", data });
});

eventEmitter.on("createdThread", (threadId, participants) => {
  console.log("created a new chat thread! ", threadId, participants);
});

commandEmitter.emit("createThread", [456, 789]);
