import { Component } from "../Core/Component";

export default class ContactComponent extends Component {
  private phoneEl!: HTMLElement;
  private addressEl!: HTMLElement;

  constructor(props: { phone: string; address: string }) {
    super(props);
  }

  protected _initNode() {
    this.node = document.createElement("div");
    this._classes.setValue("contact");

    this.phoneEl = document.createElement("p");
    this.phoneEl.classList.add("contact-phone");

    this.addressEl = document.createElement("p");
    this.addressEl.classList.add("contact-address");

    this.node.append(this.phoneEl, this.addressEl);
  }

  protected _initStates() {
    this._bindToState(this._ps.phone, ({ getValue }) => {
      this.phoneEl.textContent = "Phone: " + getValue();
    });

    this._bindToState(this._ps.address, ({ getValue }) => {
      this.addressEl.textContent = "Address: " + getValue();
    });
  }
}
