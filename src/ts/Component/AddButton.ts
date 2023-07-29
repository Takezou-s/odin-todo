import * as icons from "@mdi/js";

import { Component } from "./Core/Component";
import { Icon } from "./Svg";

export class IconButton extends Component {
  constructor(props?: { onClick?: () => void; icon?: string; fontSize?: string; title?: string; styles?: any; classes?: string }) {
    props = props || {};
    props.onClick = props.onClick || (() => {});
    props.icon = props.icon || "";
    props.fontSize = props.fontSize || "2rem";
    props.title = props.title || "";
    super(props);
  }
  protected _initNode(): void {
    this.node = document.createElement("button");
    this.addClass("btn btn-primary p-0 m-0 fs-2 rounded-circle d-flex justify-content-center align-items-center");
    this.node.style.minWidth = "40px";
    this.node.style.maxWidth = "40px";
    this.node.style.minHeight = "40px";
    this.node.style.maxHeight = "40px";
    this.node.append(new Icon({ path: this.props.icon, center: true }).render());
  }
  protected _initStates(): void {
    this._bindToState(this._ps.onClick, ({ getValue }) => {
      this.node.onclick = getValue();
    });
    this._bindToState(this._ps.fontSize, ({ getValue }) => {
      const val = getValue();
      this.node.style.setProperty("font-size", val, "important");
    });
    this._bindToState(this._ps.title, ({ getValue }) => {
      const val = getValue();
      if (val) {
        this.node.setAttribute("title", val);
      } else {
        this.node.removeAttribute("title");
      }
    });
  }
}
