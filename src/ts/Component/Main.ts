import * as dateHelper from "date-fns";
import * as icons from "@mdi/js";

import { ProjectType } from "../Entity/ProjectType";
import { Todo } from "../Entity/Todo";
import { TodoProject } from "../Entity/TodoProject";
import GlobalStateStore from "../Utility/GlobalStateStore";
import { Container } from "./Core/Container";
import { TodoItem } from "./TodoItem";
import { DueStatus } from "../Entity/DueStatus";
import { IconButton } from "./AddButton";
import { Note } from "../Entity/Note";
import { ComponentFromString } from "./Core/ComponentFromString";
import { Component } from "./Core/Component";
import { NoteItem } from "./Note";

export class Main extends Container {
  private _lastShown: { show: string; id: any } | null = null;
  private _loading?: Component;
  constructor() {
    super({
      nodeType: "main",
      classes:
        "row h-100 overflow-auto m-0 py-2 col-md-9 col-12 d-flex align-items-start justify-content-start align-content-start position-relative",
    });
  }

  refresh() {
    if (this._lastShown) {
      this.display(this._lastShown);
    }
  }

  protected _initNode(): void {
    super._initNode();
  }

  protected _initStates(): void {
    this._subscribeStateStore(GlobalStateStore);
    this._bindToState(GlobalStateStore.activeTab, ({ getValue }) => {
      this.display(getValue());
    });

    this._bindToState(GlobalStateStore.todos, ({ getValueT }) => {
      this.refresh();
    });
  }

  private display(obj: { show: string; id: any }) {
    if (obj.show === "Project" || obj.show === "Notes") {
      this._lastShown = obj;
      this.displayCategoryOrNote(obj.id);
    } else if (obj.show === "Todo") {
      this._lastShown = obj;
      this.displayTodo(obj.id);
    }
  }

  private displayTodo(id: any) {
    const todo = GlobalStateStore.todos.getValueT<Todo[]>()?.find((x) => x.id === id);
    if (todo) {
      const notes = GlobalStateStore.notes.getValueT<Note[]>()?.filter((x) => x.todoId === id);
      this.clearChildren();
      const header = this.getTodoNameElement(todo.title, todo.description, true, id);
      this.addChildren(header);
      this.addNoteElements(notes);
    }
  }

  private async displayCategoryOrNote(id: any) {
    this.showLoading();
    // await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(true);
    //   }, 3000);
    // });
    let todos: Array<Todo> | undefined;
    let notes: Array<Note> | undefined;
    let projectName: string | undefined;
    let desc: string | undefined;
    let showCreateButton: boolean = false;
    let note: boolean = false;
    if (id) {
      if (id === ProjectType.today) {
        projectName = ProjectType.today;
        desc = "What to do today?";
        todos = GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => x.dueStatus === DueStatus.inProgress);
      } else if (id === ProjectType.close) {
        projectName = ProjectType.close;
        desc = "It's close, would be nice to remember.";
        todos = GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => x.dueStatus === DueStatus.close);
      } else if (id === ProjectType.overdue) {
        projectName = ProjectType.overdue;
        desc = "It's late, no need to panic.";
        todos = GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => x.dueStatus === DueStatus.overdue);
      } else if (id === "Notes") {
        projectName = "Notes";
        desc = "Standalone notes here.";
        showCreateButton = true;
        note = true;
        notes = GlobalStateStore.notes.getValueT<Note[]>()?.filter((x) => x.todoId === "Notes");
      } else {
        const todoProject = GlobalStateStore.todoCategories.getValueT<TodoProject[]>()?.find((x) => x.id === id);
        projectName = todoProject?.title;
        desc = todoProject?.description;
        showCreateButton = true;
        todos = GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => x.projectId === id);
      }
    }
    this.clearChildren();
    if (projectName) {
      const container = this.getProjectNameElement(projectName, desc, showCreateButton, id);
      this.addChildren(container);
    }
    let empty: boolean = true;
    if (!note) {
      empty = this.addTodoElements(todos);
    } else {
      if (notes && notes.length > 0) {
        empty = false;
      }
    }

    if (empty) {
      this.addEmptyIndicator();
    }
    this.hideLoading();
  }

  private showLoading() {
    if (!this._loading) {
      this._loading = new ComponentFromString({
        htmlString: `
      <div class="position-absolute top-50 start-50 translate-middle" style="width: max-content">
        <div class="spinner-border text-info" role="status"></div>
      </div>
      `,
      });
    }
    this.node.append(this._loading.render());
  }

  private hideLoading() {
    if (this._loading) {
      this._loading.node.remove();
    }
  }

  private addEmptyIndicator() {
    this.addChildren(
      new ComponentFromString({
        htmlString: `
        <div class="p-2 mt-3">
          <div class="rounded-3 p-2 shadow">
            <h1>This looks empty!</h1>
            <h3>Visit a project to create todos.</h3>
            <h3>Visit "Notes" section to create standalone notes.</h3>
          </div>
        </div>
        `,
      })
    );
  }

  private addTodoElements(todos: Todo[] | undefined) {
    let empty = true;
    if (todos && todos.length > 0) {
      empty = false;
      this.addChildren(
        todos.map<Container>((x) => new Container({ classes: "col-md-6 col-lg-4 col-xxl-3 p-2", children: new TodoItem({ todo: x }) }))
      );
    }
    return empty;
  }

  private getProjectNameElement(projectName: string, description: string | undefined, showCreateButton: boolean, id: any) {
    const container = new Container({ classes: "col-12 p-2" });
    const innerContainer = new Container({ classes: "p-2 shadow rounded-3" });
    const titleContainer = new Container({ classes: "d-flex align-items-center gap-2 py-2" });

    const title = document.createElement("h3");
    title.className = "text-truncate m-0";
    title.title = projectName;
    title.textContent = projectName;

    titleContainer.addChildren(title);
    if (showCreateButton) {
      titleContainer.addChildren(
        new IconButton({
          onClick: () => {
            if (id !== "Notes") {
              GlobalStateStore.addTodoHandler.getValue()(id);
            } else {
              var q = 5;
            }
          },
          icon: icons.mdiPlus,
          classes: "ms-4",
        })
      );

      titleContainer.addChildren(
        new IconButton({
          onClick: () => {
            if (id !== "Notes") {
              GlobalStateStore.editTodoProjectHandler.getValue()(id);
            } else {
              var q = 5;
            }
          },
          icon: icons.mdiBookEdit,
          classes: "btn-success",
          fontSize: "1.5rem",
        })
      );

      titleContainer.addChildren(
        new IconButton({
          onClick: () => {
            if (id !== "Notes") {
              GlobalStateStore.deleteTodoProjectHandler.getValue()(id);
            } else {
              var q = 5;
            }
          },
          icon: icons.mdiDelete,
          classes: "btn-danger",
          fontSize: "1.5rem",
        })
      );
    }
    innerContainer.addChildren(titleContainer);

    if (description) {
      const desc = document.createElement("p");
      desc.className = "my-2 fs-4";
      desc.textContent = description;
      innerContainer.addChildren(desc);
      titleContainer.addClass("border-bottom");
    }

    container.addChildren(innerContainer);
    return container;
  }

  private getTodoNameElement(todoName: string, description: string | undefined, showCreateButton: boolean, id: any) {
    const container = new Container({ classes: "col-12 p-2" });
    const innerContainer = new Container({ classes: "p-2 shadow rounded-3" });
    const titleContainer = new Container({ classes: "d-flex align-items-center gap-2 py-2" });

    const title = document.createElement("h3");
    title.className = "text-truncate m-0";
    title.title = todoName;
    title.textContent = todoName;

    titleContainer.addChildren(title);
    if (showCreateButton) {
      titleContainer.addChildren(
        new IconButton({
          onClick: () => {
            GlobalStateStore.addNoteHandler.getValue()(id);
          },
          icon: icons.mdiPlus,
          classes: "ms-4",
        })
      );

      titleContainer.addChildren(
        new IconButton({
          onClick: () => {
            GlobalStateStore.editTodoHandler.getValue()(id);
          },
          icon: icons.mdiBookEdit,
          classes: "btn-success",
          fontSize: "1.5rem",
        })
      );

      titleContainer.addChildren(
        new IconButton({
          onClick: () => {
            GlobalStateStore.deleteTodoHandler.getValue()(id);
          },
          icon: icons.mdiDelete,
          classes: "btn-danger",
          fontSize: "1.5rem",
        })
      );
    }
    innerContainer.addChildren(titleContainer);

    if (description) {
      const desc = document.createElement("p");
      desc.className = "my-2 fs-4";
      desc.textContent = description;
      innerContainer.addChildren(desc);
      titleContainer.addClass("border-bottom");
    }

    container.addChildren(innerContainer);
    return container;
  }

  private addNoteElements(notes: Note[] | undefined) {
    let empty = true;
    if (notes && notes.length > 0) {
      empty = false;
      this.addChildren(
        notes.map<Container>((x) => new Container({ classes: "col-md-6 col-lg-4 col-xxl-3 p-2", children: new NoteItem({ note: x }) }))
      );
    }
    return empty;
  }
}
