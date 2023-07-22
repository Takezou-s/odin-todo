import { Component } from "../Component";

export default class ContactComponent extends Component {
  private phoneEl!: HTMLElement;
  private addressEl!: HTMLElement;

  constructor(props: { phone: string; address: string }) {
    super(props);
  }

  protected initNode() {
    this.node = document.createElement("div");
    this.node.classList.add("contact");

    this.phoneEl = document.createElement("p");
    this.phoneEl.classList.add("contact-phone");

    this.addressEl = document.createElement("p");
    this.addressEl.classList.add("contact-address");

    this.node.append(this.phoneEl, this.addressEl);
  }

  protected initStates() {
    this.bindToState(this.ps.phone, ({ getValue }) => {
      this.phoneEl.textContent = "Phone: " + getValue();
    });

    this.bindToState(this.ps.address, ({ getValue }) => {
      this.addressEl.textContent = "Address: " + getValue();
    });
  }
}
