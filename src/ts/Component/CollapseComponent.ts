import { Component } from "./Core/Component";
import { Collapse } from "bootstrap";
export class CollapseComponent extends Component {
  private buttonEl!: HTMLElement;
  private collapseEl!: HTMLElement;
  private collapse!: Collapse;
  protected _initNode(): void {
    this.node = document.createElement("div");

    this.buttonEl = document.createElement("button");
    this.buttonEl.textContent = "Collapse button";
    this.buttonEl.addEventListener("click", () => this.collapse.toggle());

    this.collapseEl = document.createElement("div");
    this.collapseEl.innerHTML = "<h1>Collapse</h1>";

    this.node.append(this.buttonEl, this.collapseEl);

    this.collapse = new Collapse(this.collapseEl);
  }
}
