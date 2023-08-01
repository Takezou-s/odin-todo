import * as icons from "@mdi/js";
import * as dateHelper from "date-fns";

import { Component } from "./Core/Component";
import { Container } from "./Core/Container";
import { Icon } from "./Svg";
import { Todo } from "../Entity/Todo";
import { TodoPriority } from "../Entity/TodoPriority";
import { TodoStatus } from "../Entity/TodoStatus";
import { DueStatus } from "../Entity/DueStatus";
import GlobalStateStore from "../Utility/GlobalStateStore";
import { IconButton } from "./AddButton";

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
  private _buttonContainer!: Container;
  private _setStatusContainer!: Container;
  private _droppedButton!: HTMLElement;
  private _doneButton!: HTMLElement;

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
    this._dateContainer.addClass("d-flex align-items-center gap-2 fs-5 text-success fw-light");

    this._dateIcon = new Icon({ viewBox: "0 0 24 24", path: icons.mdiCalendar, classes: "fs-4" });
    this._dateIcon.center();
    this._dateText = document.createElement("span");
    this._dateText.textContent = "25.07.2023";
    this._dateContainer.addChildren([this._dateIcon, this._dateText]);

    this._buttonContainer = new Container({ classes: "d-flex flex-wrap align-items-center gap-2" });

    this._buttonContainer.addChildren([
      new IconButton({
        onClick: () => {
          GlobalStateStore.activeTab.setValue({ show: "Todo", id: this.props.todo.id });
        },
        icon: icons.mdiArrowExpand,
        classes: "btn-dark",
        fontSize: "1.5rem",
        title: "Details",
      }),
      new IconButton({
        onClick: () => {
          GlobalStateStore.addNoteHandler.getValue()(this.props.todo.id);
        },
        icon: icons.mdiPlus,
        title: "Add Note",
      }),
      new IconButton({
        onClick: () => {
          GlobalStateStore.editTodoHandler.getValue()(this.props.todo.id);
        },
        icon: icons.mdiBookEdit,
        classes: "btn-success",
        fontSize: "1.5rem",
        title: "Edit Todo",
      }),
      new IconButton({
        onClick: () => {
          GlobalStateStore.deleteTodoHandler.getValue()(this.props.todo.id);
        },
        icon: icons.mdiDelete,
        classes: "btn-danger",
        fontSize: "1.5rem",
        title: "Delete Todo",
      }),
    ]);

    const setStatus = (status: TodoStatus) => {
      GlobalStateStore.todos.setValueT<Todo[]>((list: Todo[]) => {
        this.setPropValue("todo", (prev: Todo) => {
          prev.status = status;
          return prev;
        });
        return list;
      });
    };

    this._setStatusContainer = new Container({ classes: "row m-0 p-0" });
    if (this.props.todo) {
      const todo = this.props.todo as Todo;
      if (todo.status !== TodoStatus.todo) {
        this._setStatusContainer.addClass("d-none");
      }
    }

    this._droppedButton = document.createElement("button");
    this._droppedButton.className = "btn btn-danger m-0 col-6 rounded-0";
    this._droppedButton.textContent = "Dropped";

    this._doneButton = document.createElement("button");
    this._doneButton.className = "btn btn-success m-0 col-6 rounded-0";
    this._doneButton.textContent = "Done";

    this._droppedButton.addEventListener("click", () => setStatus(TodoStatus.dropped));
    this._doneButton.addEventListener("click", () => setStatus(TodoStatus.done));

    this._setStatusContainer.addChildren([this._droppedButton, this._doneButton]);

    this.node.append(
      this._header.render(),
      this._descEl,
      this._tagContainer.render(),
      this._dateContainer.render(),
      this._buttonContainer.render(),
      this._setStatusContainer.render()
    );
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

        if (todo.status !== TodoStatus.todo) {
          this._setStatusContainer.addClass("d-none");
        } else {
          this._setStatusContainer.removeClass("d-none");
        }
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
