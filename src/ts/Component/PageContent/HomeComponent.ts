import { Component } from "../Component";

export default class HomeComponent extends Component {
  private titleEl!: HTMLElement;
  private descEl!: HTMLElement;

  constructor(props: { title: string; description: string }) {
    super(props);
  }

  protected initNode() {
    this.node = document.createElement("div");
    this.node.classList.add("home");

    this.titleEl = document.createElement("h1");
    this.titleEl.classList.add("home-title");

    this.descEl = document.createElement("p");
    this.descEl.classList.add("home-desc");

    this.node.append(this.titleEl, this.descEl);
  }

  protected initStates() {
    this.bindToState(this.ps.title, ({ getValue }) => {
      this.titleEl.textContent = getValue();
    });

    this.bindToState(this.ps.description, ({ getValue }) => {
      this.descEl.textContent = getValue();
    });
  }
}
