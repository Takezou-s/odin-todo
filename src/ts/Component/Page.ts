import { List } from "../Utility/List";
import { State } from "../Utility/State";
import { Component } from "./Core/Component";
import { Container } from "./Core/Container";
import TabItemComponent from "./Tab/TabItemComponent";

export default class Page extends Container {
  private _sideBar!: Container;
  private _main!: Container;

  constructor() {
    super({ nodeType: "div", classes: "row vw-100 vh-100 m-0 border border-dark" });
  }

  protected _initNode(): void {
    super._initNode();

    this._sideBar = new Container({
      nodeType: "aside",
      classes: "col-3 border-0 border-end border-primary m-0 px-0 py-3 d-flex flex-column gap-2",
    });
    this._main = new Container({ nodeType: "main", classes: "col-9 m-0 px-0 py-3" });

    this.addChildren(this._sideBar);
    this.addChildren(this._main);
  }
}
