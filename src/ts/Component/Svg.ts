import { Component } from "./Core/Component";

export class Icon extends Component {
  private _pathEl!: SVGPathElement;
  constructor(props: { viewBox?: string; path?: string; styles?: any; classes?: string }) {
    props = props || {};
    props.viewBox = props.viewBox || "0 0 24 24";
    props.path = props.path || "";
    super(props);
  }
  protected _initNode(): void {
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.node.setAttributeNS(null, "fill", "currentColor");
    this.node.style.display = "inline-block";
    this.node.style.width = "1em";
    this.node.style.height = "1em";
    this._pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.node.appendChild(this._pathEl);
  }

  protected _initStates(): void {
    this._bindToState(this._ps.viewBox, ({ getValue }) => {
      this.node.setAttributeNS(null, "viewBox", getValue());
    });
    this._bindToState(this._ps.path, ({ getValue }) => {
      this._pathEl.setAttributeNS(null, "d", getValue());
    });
  }
}
