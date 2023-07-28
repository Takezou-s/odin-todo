import * as icons from "@mdi/js";

import { ProjectType } from "../Entity/ProjectType";
import { TodoProject } from "../Entity/TodoProject";
import GlobalStateStore from "../Utility/GlobalStateStore";
import { Container } from "./Core/Container";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab";
import { Icon } from "./Svg";
import { Sidebar } from "./Sidebar";
import { Main } from "./Main";

export default class Page extends Container {
  private _sideBar!: Sidebar;
  private _todoCategories!: Tabs;
  private _main!: Container;
  private _defaultCategories!: Array<TodoProject>;

  constructor() {
    super({ nodeType: "div", classes: "row vw-100 vh-100 m-0 border border-dark overflow-hidden" });
  }

  protected _initNode(): void {
    super._initNode();
    this._sideBar = new Sidebar();

    this._main = new Main();

    this.addChildren(this._sideBar);
    this.addChildren(this._main);
  }

  protected _initStates(): void {}
}
