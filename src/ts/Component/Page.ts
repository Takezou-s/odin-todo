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
import { ComponentFromString } from "./Core/ComponentFromString";
import { Component } from "./Core/Component";

export default class Page extends Container {
  private _header!: Component;

  private _row!: Container;
  private _sideBar!: Sidebar;
  private _main!: Container;

  constructor() {
    super({
      nodeType: "div",
      classes: "vw-100 vh-100",
      styles: {
        display: "grid",
        gridTemplateRows: "auto 1fr",
      },
    });
  }

  protected _initNode(): void {
    super._initNode();
    this._header = new ComponentFromString({
      htmlString: `
    <div class="text-bg-primary p-4 d-flex justify-content-between align-items-center">
      <span class="display-6">Todo</span>
    </div>
    `,
    });
    const button = new ComponentFromString({
      htmlString: `
    <button class="btn btn-outline-light d-md-none d-flex justify-content-center align-items-center fs-4 p-2" data-bs-toggle="offcanvas" data-bs-target="#sidebar"></button>
    `,
    });
    button.node.append(new Icon({ path: icons.mdiMenu }).render());
    this._header.node.append(button.render());

    this._row = new Container({ classes: "row m-0 border border-dark overflow-hidden" });
    this._sideBar = new Sidebar();
    this._main = new Main();
    this._row.addChildren([this._sideBar, this._main]);

    this.addChildren(this._header);
    this.addChildren(this._row);
  }

  protected _initStates(): void {}
}
