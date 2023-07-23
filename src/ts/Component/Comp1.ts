import { Component } from "./Core/Component";
import GlobalStateStore from "../Utility/GlobalStateStore";
import { State } from "../Utility/State";
/**
 * Global state store'u denemek için kullandım.
 */
export class Comp1 extends Component {
  constructor(props: { stateName: string; stateName2: string; styles?: any; classes?: string }) {
    super(props);
  }
  protected _initNode(): void {
    this.node = document.createElement("button");
    this.node.addEventListener("click", () => {
      GlobalStateStore.setStateValue(this.props.stateName2, (prev: any) => ++prev);
    });
  }

  protected _initStates(): void {
    this._listenStateStore(GlobalStateStore);
    this._bindToState((GlobalStateStore as any)[this.props.stateName] as State, ({ getValue }) => {
      this.node.textContent = getValue();
    });
  }
}
/**
 * props değişikliğini denemek için kullandım.
 */
export class Comp2 extends Component {
  protected _initNode(): void {
    this.node = document.createElement("h1");
    this.node.textContent = "Deneme";
  }
}
