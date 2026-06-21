import EventEmitter from "events";

type Message = string;
type ThreadID = number;
type UserID = number;
type Participants = UserID[];

type Command = {
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

type Command2 =
  | { type: "sendMessageToThread"; data: [ThreadID, Message] }
  | { type: "createThread"; data: [Participants] }
  | { type: "addUserToThread"; data: [ThreadID, UserID] }
  | { type: "removeUserFromThread"; data: [ThreadID, UserID] };

onmessage = (e) => proccessCommandFromMainThread(e.data);

function proccessCommandFromMainThread(command: Command2) {
  switch (command.type) {
    case "sendMessageToThread":
      let [threadID, message] = command.data;
      break;
  }
}

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

let commadEmitter = new SafeEmitter<Command>();
let eventEmitter = new SafeEmitter<Events>();

onmessage = (command) => {
  commadEmitter.emit(command.data.type, ...command.data.data);
};

eventEmitter.on("receivedMessage", (data) => {
  postMessage({ type: "receivedMessage", data });
});

eventEmitter.on("createdThread", (data) =>
  postMessage({ type: "createdThread", data })
);

commadEmitter.on("sendMessageToThread", (threadId, message) => {
  console.log(threadId, message);
});

eventEmitter.emit("createdThread", 123, [456, 789]);
