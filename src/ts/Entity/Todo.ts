import { DueStatus } from "./DueStatus";
import { TodoPriority } from "./TodoPriority";
import { TodoStatus } from "./TodoStatus";

export class Todo {
  reminderDay: number = 0;
  dueStatus: DueStatus = DueStatus.none;

  constructor(
    public id: any,
    public title: string,
    public description: string,
    public date: Date,
    public priority: TodoPriority,
    public status: TodoStatus,
    public projectId?: any
  ) {}
}
