import { TodoProject } from "../Entity/TodoProject";
import { Component } from "./Core/Component";
import { Tab } from "./Tab";

export class Tabs extends Component {
  constructor(props?: { tabs?: Array<{ id: any; text: string; count: number }>; styles?: any; classes?: string }) {
    props = props || {};
    props.tabs = props.tabs || [];
    super(props);
  }
  protected _initNode(): void {
    this.node = document.createElement("div");
  }

  protected _initStates(): void {
    this._bindToState(this._ps.tabs, ({ getValueT }) => {
      const tabs = getValueT<Array<{ id: any; text: string; count: number }>>();
      this.node.innerHTML = "";
      if (tabs) {
        tabs.forEach((x) => {
          this.node.appendChild(new Tab({ id: x.id, text: x.text, count: x.count }).render());
        });
      }
    });
  }
}
