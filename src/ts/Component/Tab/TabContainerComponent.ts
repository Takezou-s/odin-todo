import { Event } from "../../Utility/EventManagement/Event";
import { Component } from "../Component";
import TabItemComponent from "./TabItemComponent";

type Tab = { title: string; active: boolean; content: Component };
export default class TabContainerComponent extends Component {
  private _tabContentPair: Array<{ tab: TabItemComponent; content: Component }> = [];
  private titleEl!: HTMLElement;
  private tabContainerEl!: HTMLElement;

  activeContentChanged = new Event();

  constructor(props: { title: string; tabs: Array<Tab> }) {
    super(props);
  }

  protected initNode() {
    this.node = document.createElement("div");
    this.node.classList.add("tab-container");

    this.titleEl = document.createElement("h1");
    this.titleEl.classList.add("brand");

    this.tabContainerEl = document.createElement("ul");
    this.tabContainerEl.classList.add("tab-items");

    this.node.append(this.titleEl, this.tabContainerEl);
  }

  protected initStates() {
    this.bindToState(this.ps.title, ({ getValue }) => {
      this.titleEl!.textContent = getValue();
    });
    this.bindToState(this.ps.tabs, ({ getValue }) => {
      this._createTabItems(getValue());
      this.tabContainerEl!.innerHTML = "";
      this._tabContentPair.forEach((x) => {
        this.tabContainerEl!.appendChild(x.tab.node!);
        x.tab.render();
      });
    });
  }

  _createTabItems = (tabs: Array<Tab>) => {
    tabs.forEach((tab) => {
      const tabItemComponent = new TabItemComponent({ text: tab.title, active: tab.active });
      tabItemComponent.clickedEvent.subscribe(this._tabClickedHandler.bind(this));
      this._tabContentPair.push({ tab: tabItemComponent, content: tab.content });
    });
  };

  _tabClickedHandler = (sender: any, args: any) => {
    this._tabContentPair.forEach((x) => (x.tab.props.active = false));
    const { tab, content } = this._tabContentPair.find((x) => x.tab === sender)!;
    tab.props.active = true;
    this.activeContentChanged.fireEvent(this, { content });
  };
}
