import { Event } from "../../Utility/EventManagement/Event";
import { Component } from "../Component";

export default class TabItemComponent extends Component {
  private buttonEl!: HTMLElement;

  clickedEvent = new Event();

  constructor(props: { text: string; active: boolean }) {
    super(props);
  }

  protected initNode() {
    this.node = document.createElement("li");
    this.node.classList.add("tab-item");

    this.buttonEl = document.createElement("button");
    this.buttonEl.addEventListener("click", (event) => {
      this.clickedEvent.fireEvent(this, { event });
    });

    this.node.appendChild(this.buttonEl);
  }

  protected initStates() {
    this.bindToState(this.ps.text, ({ getValue }) => {
      this.buttonEl.textContent = getValue();
    });

    this.bindToState(this.ps.active, ({ getValue }) => {
      const active = getValue();
      if (active) this.node.classList.add("active");
      else this.node.classList.remove("active");
    });
  }
}
