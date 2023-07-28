import * as icons from "@mdi/js";

import { ProjectType } from "../Entity/ProjectType";
import { TodoProject } from "../Entity/TodoProject";
import { Container } from "./Core/Container";
import { Icon } from "./Svg";
import { Tab } from "./Tab";
import { Tabs } from "./Tabs";
import GlobalStateStore from "../Utility/GlobalStateStore";

export class Sidebar extends Container {
  private _defaultCategories!: Tabs;
  private _todoCategories!: Tabs;
  private _addProjectButton!: HTMLElement;

  constructor() {
    super({ nodeType: "aside", classes: "col-3 h-100 border-0 border-end border-primary m-0 px-0 py-3 d-flex flex-column gap-2" });
  }

  protected _initNode(): void {
    super._initNode();
    // const defaultCategories = [
    //   new TodoProject(ProjectType.today, "Today", "", 0, ProjectType.today),
    //   new TodoProject(ProjectType.close, "Close", "", 0, ProjectType.close),
    //   new TodoProject(ProjectType.overdue, "Overdue", "", 0, ProjectType.overdue),
    // ];
    // defaultCategories.forEach((x) => this.addChildren(new Tab({ id: x.id, text: x.title, count: x.todoCount })));

    this._defaultCategories = new Tabs();
    this._defaultCategories.addClass("d-flex flex-column gap-2");
    this.addChildren(this._defaultCategories);

    const projectHeaderContainer = new Container();
    projectHeaderContainer.addClass("d-flex justify-content-between align-items-center fs-5 px-3 py-2");

    const projectHeader_title = document.createElement("span");
    projectHeader_title.className = "text-truncate text-primary";
    projectHeader_title.textContent = "Projects";

    this._addProjectButton = document.createElement("button");
    this._addProjectButton.className = "btn btn-primary p-0 m-0 fs-2 rounded-circle d-flex justify-content-center align-items-center";
    this._addProjectButton.append(new Icon({ path: icons.mdiPlus, center: true }).render());
    this._addProjectButton.style.minWidth = "40px";
    this._addProjectButton.style.maxWidth = "40px";
    this._addProjectButton.style.minHeight = "40px";
    this._addProjectButton.style.maxHeight = "40px";
    projectHeaderContainer.addChildren([projectHeader_title, this._addProjectButton]);

    this.addChildren(projectHeaderContainer);

    this._todoCategories = new Tabs();
    this._todoCategories.addClass("d-flex flex-column gap-2 ps-5");
    this.addChildren(this._todoCategories);

    this.addChildren(new Tab({ id: "Notes", text: "Notes", count: 0 }));
  }

  protected _initStates(): void {
    this._subscribeStateStore(GlobalStateStore);
    this._bindToState(GlobalStateStore.defaultCategories, ({ getValueT }) => {
      this._defaultCategories.props.tabs = getValueT<Array<TodoProject>>()?.map<{ id: any; text: string; count: number }>((x) => {
        return { id: x.id, text: x.title, count: x.todoCount };
      });
    });
    this._bindToState(GlobalStateStore.todoCategories, ({ getValueT }) => {
      this._todoCategories.props.tabs = getValueT<Array<TodoProject>>()?.map<{ id: any; text: string; count: number }>((x) => {
        return { id: x.id, text: x.title, count: x.todoCount };
      });
    });
    this._bindToState(GlobalStateStore.addTodoCategoryHandler, ({ getValue }) => {
      this._addProjectButton.onclick = getValue();
    });
  }
}
