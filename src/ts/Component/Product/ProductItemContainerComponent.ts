import { Component } from "../Component";
import ProductItemComponent from "./ProductItemComponent";

export default class ProductItemContainerComponent extends Component {
  private headerEl!: HTMLElement;
  private productItemsEl!: HTMLElement;

  constructor(props: { category: string; products: Array<{ title: string; description: string; price: number; image: string }> }) {
    super(props);
  }

  protected initNode() {
    this.node = document.createElement("li");
    this.node.classList.add("prod-item-container");

    this.headerEl = document.createElement("h1");
    this.headerEl.classList.add("prod-item-container_category");

    this.productItemsEl = document.createElement("ul");
    this.productItemsEl.classList.add("prod-item-container_items");

    this.node.append(this.headerEl, this.productItemsEl);
  }

  protected initStates() {
    this.bindToState(this.ps.category, ({ getValue }) => {
      this.headerEl.textContent = getValue();
    });

    this.bindToState(this.ps.products, ({ getValue }) => {
      this.productItemsEl.innerHTML = "";

      const products = getValue();
      for (const product of products) {
        const productItemComponent = new ProductItemComponent(product);
        this.productItemsEl.append(productItemComponent.render());
      }
    });
  }
}
