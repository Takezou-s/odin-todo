import { Component } from "../Component";

export default class ProductItemComponent extends Component {
  private imgEl!: HTMLElement;
  private headerEl!: HTMLElement;
  private header_titleEl!: HTMLElement;
  private header_priceEl!: HTMLElement;
  private descriptionEl!: HTMLElement;

  constructor(props: { title: string; description: string; price: number; image: string }) {
    super(props);
  }

  protected initNode() {
    this.node = document.createElement("li");
    this.node.classList.add("prod-item");

    this.imgEl = document.createElement("img");
    this.imgEl.classList.add("prod-item-img");

    this.headerEl = document.createElement("div");
    this.headerEl.classList.add("prod-item-header");

    this.header_titleEl = document.createElement("h1");
    this.header_titleEl.classList.add("prod-item-header_title");

    this.header_priceEl = document.createElement("h1");
    this.header_priceEl.classList.add("prod-item-header_price");
    this.headerEl.append(this.header_titleEl, this.header_priceEl);

    this.descriptionEl = document.createElement("p");
    this.descriptionEl.classList.add("prod-item-desc");

    this.node.append(this.imgEl, this.headerEl, this.descriptionEl);
  }

  protected initStates() {
    this.bindToState(this.ps.image, ({ getValue }) => {
      this.imgEl.setAttribute("src", getValue());
    });

    this.bindToState(this.ps.title, ({ getValue }) => {
      this.header_titleEl.textContent = getValue();
    });

    this.bindToState(this.ps.price, ({ getValue }) => {
      this.header_priceEl.textContent = "$" + getValue();
    });

    this.bindToState(this.ps.description, ({ getValue }) => {
      this.descriptionEl.textContent = getValue();
    });
  }
}
