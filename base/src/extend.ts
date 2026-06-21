type Constructor<T = {}> = new (...args: any[]) => T;

function TimeStamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivated() {
      this.isActivated = false;
    }
  };
}

class UserTest {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const TimeStampedUser = TimeStamped(UserTest);

let tu = new TimeStampedUser("king");

console.log(tu);

const TimeStampedActivableUser = Activatable(TimeStamped(UserTest));

let tsa = new TimeStampedActivableUser("test");

console.log(tsa);
