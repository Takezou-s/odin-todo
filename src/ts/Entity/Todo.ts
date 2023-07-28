import * as dateHelper from "date-fns";

import { DueStatus } from "./DueStatus";
import { TodoPriority } from "./TodoPriority";
import { TodoStatus } from "./TodoStatus";

export class Todo {
  // reminderDay: number = 0;
  // dueStatus: DueStatus = DueStatus.none;

  public get dueStatus(): DueStatus {
    let result = DueStatus.none;
    if (this.status === TodoStatus.todo) {
      if (dateHelper.format(this.date, "dd-MM-yyyy") === dateHelper.format(new Date(), "dd-MM-yyyy")) {
        result = DueStatus.inProgress;
      } else if (this.reminderDay > 0) {
        const dayDiff = dateHelper.differenceInDays(this.date, new Date());
        if (dayDiff <= this.reminderDay && dayDiff > 0) {
          result = DueStatus.close;
        }
      } else if (dateHelper.differenceInDays(this.date, new Date()) < 0) {
        result = DueStatus.overdue;
      }
    }
    return result;
  }

  constructor(
    public id: any,
    public title: string,
    public description: string,
    public date: Date,
    public priority: TodoPriority,
    public status: TodoStatus,
    public projectId?: any,
    public reminderDay: number = 0
  ) {}
}
