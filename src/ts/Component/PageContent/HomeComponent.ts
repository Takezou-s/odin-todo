import { Component } from "../Core/Component";

export default class HomeComponent extends Component {
  private titleEl!: HTMLElement;
  private descEl!: HTMLElement;

  constructor(props: any | { title: string; description: string; styles: any | null; classes: string | null }) {
    super(props);
  }

  protected _initNode() {
    this.node = document.createElement("div");
    this._classes.setValue("home");

    this.titleEl = document.createElement("h1");
    this.titleEl.classList.add("home-title");

    this.descEl = document.createElement("p");
    this.descEl.classList.add("home-desc");

    this.node.append(this.titleEl, this.descEl);
  }

  protected _initStates() {
    this._bindToState(this._ps.title, ({ getValue }) => {
      this.titleEl.textContent = getValue();
    });

    this._bindToState(this._ps.description, ({ getValue }) => {
      this.descEl.textContent = getValue();
    });
  }
}
