import { Event } from "../../Utility/EventManagement/Event";
import { Component } from "../Core/Component";

export default class TabItemComponent extends Component {
  private buttonEl!: HTMLElement;

  clickedEvent = new Event();

  constructor(props: { text: string; active: boolean }) {
    super(props);
  }

  protected _initNode() {
    this.node = document.createElement("li");
    this._classes.setValue("tab-item");

    this.buttonEl = document.createElement("button");
    this.buttonEl.addEventListener("click", (event) => {
      this.clickedEvent.fireEvent(this, { event });
    });

    this.node.appendChild(this.buttonEl);
  }

  protected _initStates() {
    this._bindToState(this._ps.text, ({ getValue }) => {
      this.buttonEl.textContent = getValue();
    });

    this._bindToState(this._ps.active, ({ getValue }) => {
      const active = getValue();
      if (active) this.node.classList.add("active");
      else this.node.classList.remove("active");
    });
  }
}
