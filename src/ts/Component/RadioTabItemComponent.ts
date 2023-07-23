import GlobalStateStore from "../Utility/GlobalStateStore";
import { Component } from "./Core/Component";

export class RadioTabItemComponent extends Component {
  constructor(props: {
    text: string;
    activeClassName: string;
    onClick: (radioTab: RadioTabItemComponent) => void;
    styles?: any;
    classes?: string;
  }) {
    super(props);
  }

  protected _initNode(): void {
    this.node = document.createElement("button");
    this.node.addEventListener("click", () => this.props.onClick(this));
  }

  protected _initStates(): void {
    this._listenStateStore(GlobalStateStore);

    this._bindToState(GlobalStateStore.activeRadioTab, ({ getValue }) => {
      if (this === getValue()) {
        this._classes.setValueT<DOMTokenList>((list) => {
          list.add(this.props.activeClassName);
          return list;
        });
      } else {
        this._classes.setValueT<DOMTokenList>((list) => {
          list.remove(this.props.activeClassName);
          return list;
        });
      }
    });

    this._bindToState(this._ps.text, ({ getValue }) => (this.node.textContent = getValue()));
  }
}
