import { Component } from "../Core/Component";
import ProductItemComponent from "./ProductItemComponent";

export default class ProductItemContainerComponent extends Component {
  private headerEl!: HTMLElement;
  private productItemsEl!: HTMLElement;

  constructor(props: { category: string; products: Array<{ title: string; description: string; price: number; image: string }> }) {
    super(props);
  }

  protected _initNode() {
    this.node = document.createElement("li");
    this._classes.setValue("prod-item-container");

    this.headerEl = document.createElement("h1");
    this.headerEl.classList.add("prod-item-container_category");

    this.productItemsEl = document.createElement("ul");
    this.productItemsEl.classList.add("prod-item-container_items");

    this.node.append(this.headerEl, this.productItemsEl);
  }

  protected _initStates() {
    this._bindToState(this._ps.category, ({ getValue }) => {
      this.headerEl.textContent = getValue();
    });

    this._bindToState(this._ps.products, ({ getValue }) => {
      this.productItemsEl.innerHTML = "";

      const products = getValue();
      for (const product of products) {
        const productItemComponent = new ProductItemComponent(product);
        this.productItemsEl.append(productItemComponent.render());
      }
    });
  }
}
