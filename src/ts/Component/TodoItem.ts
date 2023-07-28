import * as icons from "@mdi/js";
import * as dateHelper from "date-fns";

import { Component } from "./Core/Component";
import { Container } from "./Core/Container";
import { Icon } from "./Svg";
import { Todo } from "../Entity/Todo";
import { TodoPriority } from "../Entity/TodoPriority";
import { TodoStatus } from "../Entity/TodoStatus";
import { DueStatus } from "../Entity/DueStatus";

export class TodoItem extends Component {
  private _header!: Container;
  private _statusIconContainer!: HTMLElement;
  private _statusIcon!: Icon;
  private _titleEl!: HTMLElement;
  private _descEl!: HTMLElement;
  private _tagContainer!: Container;
  private _priorityEl!: HTMLElement;
  private _dueStatusEl!: HTMLElement;
  private _dateContainer!: Container;
  private _dateIcon!: Icon;
  private _dateText!: HTMLElement;

  constructor(props: { todo: Todo }) {
    super(props);
  }

  protected _initNode(): void {
    this.node = document.createElement("div");
    this.addClass("p-2 shadow rounded-2 d-flex flex-column gap-2 ");
    this.node.style.overflowWrap = "anywhere";

    this._header = new Container();
    this._header.addClass("d-flex align-items-center gap-2 fs-6 fw-semibold");

    this._statusIconContainer = document.createElement("div");
    this._statusIconContainer.className = " rounded-circle d-flex justify-content-center align-items-center";
    this._statusIconContainer.style.color = "white";
    this._statusIconContainer.style.backgroundColor = "green";
    this._statusIconContainer.style.minWidth = "1.25em";
    this._statusIconContainer.style.minHeight = "1.25em";
    this._statusIconContainer.style.maxWidth = "1.25em";
    this._statusIconContainer.style.maxHeight = "1.25em";
    this._statusIcon = new Icon({ path: icons.mdiCheck });
    this._statusIconContainer.appendChild(this._statusIcon.render());

    this._titleEl = document.createElement("span");
    this._titleEl.className = "text-truncate";
    this._titleEl.textContent = "Titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    this._titleEl.style.fontSize = "1.25em";

    this._header.addChildren([this._statusIconContainer, this._titleEl]);

    this._descEl = document.createElement("p");
    this._descEl.textContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur ultricies erat, sed gravida ipsum sagittis vitae donec.";
    this._descEl.className = "m-0 fs-5";

    this._tagContainer = new Container();
    this._tagContainer.addClass("d-flex flex-wrap gap-2");

    this._priorityEl = document.createElement("span");
    this._priorityEl.textContent = "High";
    this._priorityEl.className = "px-3 py-1 rounded-pill";

    this._dueStatusEl = document.createElement("span");
    this._dueStatusEl.textContent = "Close";
    this._dueStatusEl.className = "px-3 py-1 rounded-pill";

    this._tagContainer.addChildren([this._priorityEl, this._dueStatusEl]);

    this._dateContainer = new Container();
    this._dateContainer.addClass("d-flex align-items-center gap-2 fs-6 text-success fw-light");

    this._dateIcon = new Icon({ viewBox: "0 0 24 24", path: icons.mdiCalendar, classes: "fs-5" });
    this._dateIcon.center();
    this._dateText = document.createElement("span");
    this._dateText.textContent = "25.07.2023";
    this._dateContainer.addChildren([this._dateIcon, this._dateText]);

    this.node.append(this._header.render(), this._descEl, this._tagContainer.render(), this._dateContainer.render());
  }

  protected _initStates(): void {
    this._bindToState(this._ps.todo, ({ getValueT }) => {
      const todo = getValueT<Todo>()!;
      if (todo) {
        this._titleEl.textContent = todo.title;
        this._descEl.textContent = todo.description.length > 128 ? todo.description.slice(0, 125) + "..." : todo.description;
        this._dateText.textContent = dateHelper.format(todo.date, "dd-MM-yyyy");

        this._priorityEl.textContent = todo.priority;
        this.assignSourceToTarget(this._priorityEl.style, this.priorityStyle(todo.priority));

        this._statusIcon.props.path = todo.status === TodoStatus.dropped ? icons.mdiClose : icons.mdiCheck;
        this._statusIconContainer.setAttribute("title", todo.status);
        this.assignSourceToTarget(this._statusIconContainer.style, this.todoStatusStyle(todo.status));

        this._dueStatusEl.textContent = todo.dueStatus;
        this.assignSourceToTarget(this._dueStatusEl.style, this.dueStatusStyle(todo.dueStatus));
      }
    });
  }

  private dueStatusStyle(dueStatus: DueStatus) {
    const result: any = {};
    if (dueStatus === DueStatus.close) {
      result.color = "white";
      result.backgroundColor = "#16825D";
    } else if (dueStatus === DueStatus.inProgress) {
      result.color = "white";
      result.backgroundColor = "#007ACC";
    } else if (dueStatus === DueStatus.overdue) {
      result.color = "white";
      result.backgroundColor = "#DC3545";
    } else if (dueStatus === DueStatus.none) {
      result.color = "white";
      result.backgroundColor = "#DC3545";
      result.display = "none";
    }
    return result;
  }

  private priorityStyle(priority: TodoPriority) {
    const result: any = {};
    if (priority === TodoPriority.low) {
      result.color = "white";
      result.backgroundColor = "#16825D";
    } else if (priority === TodoPriority.medium) {
      result.color = "white";
      result.backgroundColor = "#007ACC";
    } else if (priority === TodoPriority.high) {
      result.color = "white";
      result.backgroundColor = "#DC3545";
    }
    return result;
  }

  private todoStatusStyle(status: TodoStatus) {
    const result: any = {};
    if (status === TodoStatus.todo) {
      result.color = "white";
      result.backgroundColor = "gray";
    } else if (status === TodoStatus.done) {
      result.color = "white";
      result.backgroundColor = "#16825D";
    } else if (status === TodoStatus.dropped) {
      result.color = "white";
      result.backgroundColor = "#DC3545";
    }
    return result;
  }

  private assignSourceToTarget(target: any, source: any) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = source[key];
      }
    }
  }
}
