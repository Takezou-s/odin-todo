import { State, StateStore } from "./State";

export class GlobalStateStore extends StateStore {
  todoCategory: State = this.createState("activeRadioTab");
  num1: State = this.createState("num1", 0, true);
  num2: State = this.createState("num2", 0, true);
}

export default new GlobalStateStore(null, 50);
