import { Component } from "../Core/Component";
import ProductItemContainerComponent from "../Product/ProductItemContainerComponent";

export default class MenuComponent extends Component {
  private titleEl!: HTMLElement;
  private contentEl!: HTMLElement;

  constructor(props: any) {
    super(props);
  }

  protected _initNode() {
    this.node = document.createElement("div");
    this._classes.setValue("menu");

    this.titleEl = document.createElement("h1");
    this.titleEl.classList.add("menu-header");
    this.titleEl.textContent = "Menu";

    this.contentEl = document.createElement("ul");
    this.contentEl.classList.add("menu-prods");

    this.node.append(this.titleEl, this.contentEl);
  }

  protected _initStates() {
    this._bindToState(this._ps.categoriedProducts, ({ getValue }) => {
      const categoriedProds = getValue();

      this.contentEl.innerHTML = "";
      for (const prod of categoriedProds) {
        const productItemContainer = new ProductItemContainerComponent({
          ...prod,
          styles: {
            backgroundColor: "red",
          },
        });
        this.contentEl.append(productItemContainer.render());
      }
    });
  }
}
