import { State } from "../Utility/EventManagement/State";
import { Component } from "./Component";
import ContactComponent from "./PageContent/ContactComponent";
import HomeComponent from "./PageContent/HomeComponent";
import MenuComponent from "./PageContent/MenuComponent";
import TabContainerComponent from "./Tab/TabContainerComponent";

function dummyContent(title: string) {
  const el = document.createElement("h1");
  el.textContent = title;
  return el;
}

export default class PageComponent extends Component {
  private headerEl!: HTMLElement;
  private mainEl!: HTMLElement;
  private footerEl!: HTMLElement;
  private brand!: string;
  private activeContentState!: State;
  private homeContent!: Component;
  private menuContent!: Component;
  private contactContent!: Component;

  constructor() {
    super();
  }

  protected initNode() {
    this.node = document.createElement("div");
    this.node.classList.add("page");

    this.headerEl = document.createElement("header");
    this.mainEl = document.createElement("main");
    this.mainEl.classList.add("main-content");
    this.footerEl = document.createElement("footer");

    this.node.append(this.headerEl, this.mainEl, this.footerEl);

    this._initContents();
    this._initHeader();
    this._initFooter();
  }

  protected initStates() {
    this.activeContentState = this.createState("activeContent", this.homeContent, true);

    this.bindToState(this.activeContentState, ({ getValue }) => {
      let content = getValue();
      if (content.render) content = content.render();
      this.mainEl.innerHTML = "";
      this.mainEl.appendChild(content);
    });
  }

  _initContents() {
    this.brand = "Unreal Burger Crafting";
    this.homeContent = new HomeComponent({ title: this.brand, description: "We craft burgers. Nothing special..." });

    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget euismod turpis. Quisque cursus ipsum eu ex imperdiet, non blandit urna accumsan.";
    const categoriedProducts = [
      {
        category: "Burgers",
        products: [
          { title: "Chicken (Grilled or Fried)", description, price: 20, image: "https://picsum.photos/200" },
          { title: "Black Bean Veggie Burger", description, price: 10, image: "https://picsum.photos/200" },
          { title: "Cheese and Bacon Burger", description, price: 15, image: "https://picsum.photos/200" },
          { title: "Ham and Chicken Burger", description, price: 25, image: "https://picsum.photos/200" },
        ],
      },
      {
        category: "Toppings",
        products: [
          { title: "Beef Bacon", description, price: 20, image: "https://picsum.photos/200" },
          { title: "Fresh Avocado", description, price: 10, image: "https://picsum.photos/200" },
          { title: "Cheese", description, price: 15, image: "https://picsum.photos/200" },
        ],
      },
      {
        category: "Fries & Rings",
        products: [
          { title: "French Fries", description, price: 25, image: "https://picsum.photos/200" },
          { title: "Mooyah Fries", description, price: 15, image: "https://picsum.photos/200" },
          { title: "Onion Rings", description, price: 10, image: "https://picsum.photos/200" },
          { title: "Sweet Potato Fries", description, price: 20, image: "https://picsum.photos/200" },
        ],
      },
      {
        category: "Drinks",
        products: [
          { title: "Beer", description, price: 25, image: "https://picsum.photos/200" },
          { title: "Fruit Juice", description, price: 15, image: "https://picsum.photos/200" },
        ],
      },
    ];
    this.menuContent = new MenuComponent({ categoriedProducts });

    this.contactContent = new ContactComponent({ phone: "111 222 333", address: "This website" });
  }

  _initHeader() {
    const tabs = [
      { title: "Home", active: true, content: this.homeContent },
      { title: "Menu", active: false, content: this.menuContent },
      { title: "Contact", active: false, content: this.contactContent },
    ];
    const tabContainer = new TabContainerComponent({ title: this.brand, tabs });
    tabContainer.activeContentChanged.subscribe((sender, { content }) => this.activeContentState.setValue(content));
    this.headerEl.appendChild(tabContainer.render());
  }

  _initFooter() {
    this.footerEl.innerHTML = `
    <a href="https://www.pinterest.com/pin/basic-burger-menu-template-illustrator-indesign-word-apple-pages-psd-publisher--698480223449936211/" target="_blank">Menu - Pinterest</a>
    <a href="https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page" target="_blank">Restaurant Page for Odin Project</a>
    <a href="https://picsum.photos/" target="_blank">Images - Lorem Picsum</a>
    `;
  }
}
