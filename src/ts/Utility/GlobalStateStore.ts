import { DueStatus } from "../Entity/DueStatus";
import { ProjectType } from "../Entity/ProjectType";
import { Todo } from "../Entity/Todo";
import { TodoPriority } from "../Entity/TodoPriority";
import { TodoProject } from "../Entity/TodoProject";
import { TodoStatus } from "../Entity/TodoStatus";
import { State, StateStore } from "./State";

export class GlobalStateStore extends StateStore {
  constructor(owner: any, delay: any) {
    super(owner, delay);
    this._converters.push({
      stateName: "defaultCategories",
      setter: (value) => {
        let array: TodoProject[] = [];
        array = (value as any[]).map<TodoProject>((x) => new TodoProject(x.id, x.title, x.description, x.todoCount, x.projectType));
        return array;
      },
    });
    this._converters.push({
      stateName: "todoCategories",
      setter: (value) => {
        let array: TodoProject[] = [];
        array = (value as any[]).map<TodoProject>((x) => new TodoProject(x.id, x.title, x.description, x.todoCount, x.projectType));
        return array;
      },
    });
    this._converters.push({
      stateName: "todos",
      setter: (value) => {
        let array: Todo[] = [];
        array = (value as any[]).map<Todo>(
          (x) => new Todo(x.id, x.title, x.description, new Date(x.date), x.priority, x.status, x.projectId)
        );
        return array;
      },
    });
  }
  defaultCategories: State = this.createState(
    "defaultCategories",
    [
      new TodoProject(ProjectType.today, "Today", "", 0, ProjectType.today),
      new TodoProject(ProjectType.close, "Close", "", 0, ProjectType.close),
      new TodoProject(ProjectType.overdue, "Overdue", "", 0, ProjectType.overdue),
    ],
    true
  );
  todoCategories: State = this.createState(
    "todoCategories",
    [new TodoProject("1", "Proj - 1", "This is a project.", 0, ProjectType.category)],
    true
  );
  activeTodoCategory: State = this.createState("activeTodoCategory", "Today", true);
  addTodoCategoryHandler: State = this.createState("addTodoCategoryHandler", () => {
    throw new Error("Implement addTodoCategoryHandler");
  });

  todos: State = this.createState(
    "todos",
    [
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
      new Todo(
        Math.random().toString(),
        "Todo - " + Math.random().toString(),
        "desc",
        new Date(2023, 6, 28),
        TodoPriority.high,
        TodoStatus.todo,
        "1"
      ),
    ],
    true
  );
  addTodoHandler: State = this.createState("addTodoHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });
  editTodoProjectHandler: State = this.createState("editTodoProjectHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });
  deleteTodoProjectHandler: State = this.createState("editTodoProjectHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });

  notes: State = this.createState("notes", [], true);
  num1: State = this.createState("num1", 0, true);
  num2: State = this.createState("num2", 0, true);
}

export default new GlobalStateStore(null, 50);
