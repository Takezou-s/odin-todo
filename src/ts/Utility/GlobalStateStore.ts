import { Note } from "../Entity/Note";
import { ProjectType } from "../Entity/ProjectType";
import { Todo } from "../Entity/Todo";
import { TodoPriority } from "../Entity/TodoPriority";
import { TodoProject } from "../Entity/TodoProject";
import { TodoStatus } from "../Entity/TodoStatus";
import { State, StateStore } from "./State";

class GlobalStateStore extends StateStore {
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
          (x) => new Todo(x.id, x.title, x.description, new Date(x.date), x.priority, x.status, x.projectId, x.reminderDay || 0)
        );
        return array;
      },
    });
    this._converters.push({
      stateName: "notes",
      setter: (value) => {
        let array: Note[] = [];
        array = (value as any[]).map<Note>((x) => new Note(x.id, x.title, x.description, x.todoId));
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
  todoCategories: State = this.createState("todoCategories", [], true);
  activeTab: State = this.createState("activeTab", { show: "Project", id: "Today" }, true);

  todos: State = this.createState("todos", [], true);
  notes: State = this.createState("notes", [], true);
  addTodoHandler: State = this.createState("addTodoHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });
  editTodoHandler: State = this.createState("editTodoHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });
  deleteTodoHandler: State = this.createState("deleteTodoHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });
  addTodoCategoryHandler: State = this.createState("addTodoCategoryHandler", () => {
    throw new Error("Implement addTodoCategoryHandler");
  });
  editTodoProjectHandler: State = this.createState("editTodoProjectHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });
  deleteTodoProjectHandler: State = this.createState("deleteTodoProjectHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });
  addNoteHandler: State = this.createState("addNoteHandler", (todoId: any) => {
    console.log(todoId);
    return;
    throw new Error("Implement addTodoHandler");
  });
  editNoteHandler: State = this.createState("editNoteHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });
  deleteNoteHandler: State = this.createState("deleteNoteHandler", (id: any) => {
    console.log(id);
    return;
    throw new Error("Implement addTodoHandler");
  });
  num1: State = this.createState("num1", 0, true);
  num2: State = this.createState("num2", 0, true);
}

export default new GlobalStateStore(null, 50);
