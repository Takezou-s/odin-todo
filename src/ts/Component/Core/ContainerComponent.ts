import { Component } from "./Component";

export class ContainerComponent extends Component {
  constructor(props: {
    nodeType: string | undefined;
    children?: Array<Component> | Array<HTMLElement> | Component | HTMLElement;
    styles?: any;
    classes?: string;
  }) {
    super(props);
  }

  protected _initNode(): void {
    this.node = document.createElement(this.props.nodeType || "div");
  }

  protected _initStates(): void {
    this._bindToState(this._ps.children, ({ getValue }) => {
      const value = getValue();
      this.node.innerHTML = "";
      if (value) {
        if (Array.isArray(value)) {
          for (const iterator of value) {
            if (!iterator) {
              continue;
            }
            let node = iterator;
            if (iterator.render) {
              node = iterator.render();
            }
            this.node.appendChild(node);
          }
        } else {
          let node = value;
          if (value.render) {
            node = value.render();
          }
          this.node.appendChild(node);
        }
      }
    });
  }
}
