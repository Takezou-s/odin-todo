import { State } from "../../Utility/State";
import { Component } from "./Component";

export abstract class Fragment extends Component {
  protected elements!: State;

  constructor(props: { append: (elements: HTMLElement | SVGSVGElement[]) => void; styles?: any; classes?: string }) {
    super(props);
    this.elements = this._createState("elements", [], true);
  }

  private _appendToParent(elements: Array<Component | HTMLElement | SVGSVGElement>) {
    if (!this.props.append) return;
    elements.forEach((x) => {
      if (x instanceof Component) {
        x.node.remove();
      } else {
        x.remove();
      }
    });
    this.props.append(elements.map<HTMLElement | SVGSVGElement>((x) => (x instanceof Component ? x.render() : x)));
  }

  protected _initStates(): void {
    this._bindToState(this.elements, ({ getValueT }) => {
      const elements = getValueT<Array<Component | HTMLElement | SVGSVGElement>>();
      if (elements) {
        this._appendToParent(elements);
      }
    });
  }
}
