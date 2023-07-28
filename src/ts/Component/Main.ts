import * as dateHelper from "date-fns";

import { ProjectType } from "../Entity/ProjectType";
import { Todo } from "../Entity/Todo";
import { TodoProject } from "../Entity/TodoProject";
import GlobalStateStore from "../Utility/GlobalStateStore";
import { Container } from "./Core/Container";
import { TodoItem } from "./TodoItem";

export class Main extends Container {
  constructor() {
    super({
      nodeType: "main",
      classes: "row h-100 overflow-auto m-0 col-9 border border-dark d-flex align-items-start justify-content-start",
    });
  }

  protected _initNode(): void {
    super._initNode();
  }

  protected _initStates(): void {
    this._subscribeStateStore(GlobalStateStore);
    this._bindToState(GlobalStateStore.activeTodoCategory, ({ getValue }) => {
      const id = getValue();
      let todos: Array<Todo> | undefined;
      if (id) {
        if (id === ProjectType.today) {
          todos = GlobalStateStore.todos
            .getValueT<Todo[]>()
            ?.filter((x) => dateHelper.format(x.date, "dd-MM-yyyy") === dateHelper.format(new Date(), "dd-MM-yyyy"));
        } else if (id === ProjectType.close) {
          todos = GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => {
            let result = false;
            if (x.reminderDay <= 0) return result;
            const dayDiff = dateHelper.differenceInDays(x.date, new Date());
            result = dayDiff <= x.reminderDay && dayDiff > 0;
            return result;
          });
        } else if (id === ProjectType.overdue) {
          todos = GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => {
            const dayDiff = dateHelper.differenceInDays(x.date, new Date());
            return dayDiff < 0;
          });
        } else {
          todos = GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => x.projectId === id);
        }
      }
      this.clearChildren();
      if (todos && todos.length > 0) {
        this.addChildren(todos.map<Container>((x) => new Container({ classes: "col-3 p-2", children: new TodoItem({ todo: x }) })));
      } else {
        alert("Hiç Todo bulunamadı..." + id);
      }
    });
  }
}
