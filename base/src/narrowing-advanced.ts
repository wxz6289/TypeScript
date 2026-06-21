type Unit = "cm" | "px" | "%";
let units: Unit[] = ["cm", "px", "%"];

function parseUnit(value: string): Unit | null {
  for (let unit of units) {
    if (value.endsWith(unit)) {
      return unit;
    }
  }
  return null;
}

type Width = {
  unit: Unit;
  value: number;
};

function parseWidth(width: string | number | undefined | null): Width | null {
  if (!width) return null;
  if (typeof width === "number") return { unit: "px", value: width };
  let unit = parseUnit(width);
  if (unit) return { unit: unit, value: parseFloat(width) };
  return null;
}

console.log(parseWidth("23%"));

type UserTextEvent = {
  value: string;
  type: "TextEvent";
  target: HTMLInputElement;
};
type UserMouseEvent = {
  value: [number, number];
  type: "MouseEvent";
  target: HTMLElement;
};

type UserEvent = UserTextEvent | UserMouseEvent;
function handle(event: UserEvent) {
  if (typeof event.value === "string") return event.value;
  return event.value;
}

function handle2(event: UserEvent) {
  if (event.type === "TextEvent") return event.target;
  return event.target;
}

type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
type Day = Weekday | "Sat" | "Sun";

function getNextDay(w: Weekday): Day {
  switch (w) {
    case "Mon":
      return "Tue";
    case "Tue":
      return "Wed";
    case "Wed":
      return "Thu";
    case "Thu":
      return "Fri";
    case "Fri":
      return "Sat";
  }
}

// type NextDay = { [week: Weekday]: Day };

const NextMap = {
  Mon: "Tue",
  Tue: "Wed",
  Wed: "Thu",
  Thu: "Fri",
  Fri: "Sat",
};

function getNextDay2(w: Weekday): Day {
  return NextMap[w] as Day;
}
