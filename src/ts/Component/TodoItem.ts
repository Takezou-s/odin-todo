import { Component } from "./Core/Component";

export class TodoItem extends Component {
  private _titleEl!: HTMLElement;
  private _descEl!: HTMLElement;

  protected _initNode(): void {
    this.node = document.createElement("div");
    this.addClass("border border-dark");

    this._titleEl = document.createElement("h1");
    this._titleEl.textContent = "Title";

    this._descEl = document.createElement("p");
    this._descEl.textContent = "Desc";

    this.node.append(this._titleEl, this._descEl);
  }
}
