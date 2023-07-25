import { Component } from "./Component";

export class Container extends Component {
  protected _appended: Array<Component | HTMLElement> = [];

  constructor(props: {
    nodeType: string;
    children?: Array<Component> | Array<HTMLElement> | Component | HTMLElement;
    styles?: any;
    classes?: string;
  }) {
    super(props);
  }

  addChildren(component: Array<Component> | Array<HTMLElement> | Component | HTMLElement) {
    this.setPropValue("children", (list: any[]) => {
      if (Array.isArray(component)) {
        list.push(...component);
        component.forEach((x) => this.append(x));
      } else {
        list.push(component);
        this.append(component);
      }
    });
  }

  removeChildren(component: Array<Component> | Array<HTMLElement> | Component | HTMLElement) {
    this.setPropValue("children", (list: any[]) => {
      const removeItem = (item: any) => {
        const index = list.findIndex((x) => x === item);
        if (index < 0) return;
        list.splice(index, 1);
        this.node.removeChild(item);
      };

      if (Array.isArray(component)) {
        for (const comp of component) {
          removeItem(comp);
        }
      } else {
        removeItem(component);
      }
    });
  }

  protected _initNode(): void {
    this.node = document.createElement(this.props.nodeType || "div");
  }

  protected _initStates(): void {
    this._bindToState(this._ps.children, ({ getValue }) => {
      if (this._update) return;
      const value = getValue();
      if (value) {
        if (Array.isArray(value)) {
          for (const iterator of value) {
            if (!iterator || this._isAppended(iterator)) {
              continue;
            }
            this.append(iterator);
            this._appended.push(iterator);
          }
        } else if (!this._isAppended(value)) {
          let node = value;
          if (value.render) {
            node = value.render();
          }
          this._appended.push(value);
          this.node.appendChild(node);
        }
      }
    });
  }

  private append(element: any) {
    let node = element;
    if (element.render) {
      node = element.render();
    }
    this.node.appendChild(node);
  }

  private _isAppended(component: any): boolean {
    return this._appended.findIndex((x) => x === component) >= 0;
  }
}
