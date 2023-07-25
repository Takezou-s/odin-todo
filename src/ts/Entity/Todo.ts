import { DueStatus } from "./DueStatus";
import { TodoPriority } from "./TodoPriority";
import { TodoStatus } from "./TodoStatus";

export class Todo {
  private _status!: TodoStatus;

  public get status(): TodoStatus {
    return this._status;
  }

  public set status(value: TodoStatus) {
    this._status = value;
    if (value !== TodoStatus.todo) {
      this.dueStatus = DueStatus.none;
    }
  }

  constructor(
    public id: any,
    public title: string,
    public description: string,
    public date: Date,
    public priority: TodoPriority,
    status: TodoStatus,
    public dueStatus: DueStatus,
    public projectId?: any
  ) {
    this.status = status;
  }
}
