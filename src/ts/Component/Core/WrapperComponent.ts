import { Component } from "./Component";

export class WrapperComponent extends Component {
  constructor(props: { content: Component; styles?: any; classes?: string }) {
    super(props);
  }
  protected _initNode(): void {}
  protected _initStates(): void {
    this._bindToState(this._ps.content, ({ getValueT }) => {
      const component = getValueT<Component>()!;
      if (!this.node) {
        this.node = component.render();
      } else {
        const newNode = component.render();
        this.node.replaceWith(newNode);
        this.node = newNode;
      }
    });
  }

  public get content(): Component {
    return this.props.content;
  }

  public set content(value: Component) {
    this.props.content = value;
  }
}
