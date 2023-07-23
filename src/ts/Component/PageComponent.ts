import { State } from "../Utility/State";
import { Component } from "./Core/Component";
import { ContainerComponent } from "./Core/ContainerComponent";
import ContactComponent from "./PageContent/ContactComponent";
import HomeComponent from "./PageContent/HomeComponent";
import MenuComponent from "./PageContent/MenuComponent";
import TabContainerComponent from "./Tab/TabContainerComponent";
import TabItemComponent from "./Tab/TabItemComponent";

function dummyContent(title: string) {
  const el = document.createElement("h1");
  el.textContent = title;
  return el;
}

export default class PageComponent extends Component {
  private _sideBar!: ContainerComponent;
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

  protected _initNode(): void {
    this.node = document.createElement("div");
  }

  private _initSideBar(): void {
    this._sideBar = new ContainerComponent({ nodeType: "ul", children: new TabItemComponent({ text: "q", active: false }) });
  }
}
