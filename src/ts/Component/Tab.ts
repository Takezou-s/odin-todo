import GlobalStateStore from "../Utility/GlobalStateStore";
import { Component } from "./Core/Component";

export class Tab extends Component {
  _textEl!: HTMLElement;
  _todoCountEl!: HTMLElement;

  constructor(props: { id: any; text: string; count: number; show: string; styles?: any; classes?: string }) {
    super(props);
  }

  protected _initNode(): void {
    this.node = document.createElement("button");
    this.node.addEventListener("click", () => GlobalStateStore.activeTab.setValue({ show: this.props.show, id: this.props.id }));
    this.addClass("btn btn-lg btn-outline-primary border-start-0 border-end-0 rounded-0 d-flex align-items-center");

    this._textEl = document.createElement("span");
    this._textEl.className = "text-truncate";

    this._todoCountEl = document.createElement("span");
    this._todoCountEl.className = "ms-auto text-bg-primary rounded-circle d-flex align-items-center justify-content-center fs-6";
    this._todoCountEl.style.minWidth = "40px";
    this._todoCountEl.style.maxWidth = "40px";
    this._todoCountEl.style.minHeight = "40px";
    this._todoCountEl.style.maxHeight = "40px";

    this.node.append(this._textEl, this._todoCountEl);
  }

  protected _initStates(): void {
    this._subscribeStateStore(GlobalStateStore);

    this._bindToState(GlobalStateStore.activeTab, ({ getValue }) => {
      const obj = getValue();
      if (this.props.id === obj.id && this.props.show === obj.show) {
        this.addClass("active");
        this._todoCountEl.classList.remove("text-bg-dark");
        this._todoCountEl.classList.add("text-bg-light");
      } else {
        this.removeClass("active");
        this._todoCountEl.classList.add("text-bg-dark");
        this._todoCountEl.classList.remove("text-bg-light");
      }
    });

    this._bindToState(this._ps.text, ({ getValue }) => (this._textEl.textContent = getValue()));
    this._bindToState(this._ps.count, ({ getValueT }) => {
      const count = getValueT<number>()!;
      if (count <= 0) {
        this._todoCountEl.classList.add("d-none");
      } else {
        this._todoCountEl.classList.remove("d-none");
        this._todoCountEl.textContent = count >= 100 ? "99+" : count.toString();
      }
    });
  }
}
