import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import * as icons from "@mdi/js";
import * as dateHelper from "date-fns";

import BodyComponent from "./Component/Body";
import { Container } from "./Component/Core/Container";
import { Tab } from "./Component/Tab";
import GlobalStateStore from "./Utility/GlobalStateStore";
import { ComponentFromElement } from "./Component/Core/ComponentFromElement";
import { TodoItem } from "./Component/TodoItem";
import { Icon } from "./Component/Svg";
import { Todo } from "./Entity/Todo";
import { TodoStatus } from "./Entity/TodoStatus";
import { DueStatus } from "./Entity/DueStatus";
import { TodoPriority } from "./Entity/TodoPriority";
import { Component } from "./Component/Core/Component";
import { TodoForm } from "./Component/TodoForm";
import Page from "./Component/Page";
import { Modal } from "./Component/Modal";
import { TodoProjectForm } from "./Component/TodoProjectForm";
import { TodoProject } from "./Entity/TodoProject";
import { ProjectType } from "./Entity/ProjectType";
import { ComponentFromString } from "./Component/Core/ComponentFromString";
import { Note } from "./Entity/Note";
import { NoteForm } from "./Component/NoteForm";
import { State } from "./Utility/State";

const storeJSON = localStorage.getItem("store");
if (storeJSON) {
  GlobalStateStore.importStateValues(JSON.parse(storeJSON));
}

BodyComponent.render(new Page());
const modal = new Modal();
GlobalStateStore.addTodoCategoryHandler.setValue(() => {
  const form = new TodoProjectForm({
    onSubmit: ({ form }) => {
      const obj = form.getFormProps();
      const todoProject = new TodoProject(Math.random().toString(), "___", "___", 0, ProjectType.category);
      for (const key in todoProject) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          (todoProject as any)[key] = obj[key];
        }
      }
      GlobalStateStore.todoCategories.setValue((prev: any) => {
        prev.push(todoProject);
        return prev;
      });
      modal.hide();
    },
  });
  modal.show("Create Project", "Create", form, () => {
    form.submit();
  });
});
GlobalStateStore.editTodoProjectHandler.setValue((id: any) => {
  const todoProject = GlobalStateStore.todoCategories.getValueT<TodoProject[]>()?.find((x) => x.id === id);
  if (todoProject) {
    const form = new TodoProjectForm({
      onSubmit: ({ form }) => {
        const obj = form.getFormProps();
        for (const key in todoProject) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            (todoProject as any)[key] = obj[key];
          }
        }
        GlobalStateStore.todoCategories.setValue((prev: any) => prev);
        GlobalStateStore.activeTab.setValue((prev: any) => prev);
        modal.hide();
      },
      todoProject: todoProject,
    });
    modal.show("Edit Project", "Save", form, () => form.submit());
  }
});
GlobalStateStore.deleteTodoProjectHandler.setValue((id: any) => {
  const index = GlobalStateStore.todoCategories.getValueT<TodoProject[]>()?.findIndex((x) => x.id === id)!;
  if (index >= 0) {
    modal.show(
      "Delete Project",
      "Delete",
      new ComponentFromString({
        htmlString: `
    <p>Do you really want to delete project with todos in it?</p>
    `,
      }),
      () => {
        GlobalStateStore.todoCategories.setValue((prev: TodoProject[]) => {
          prev.splice(index, 1);
          return prev;
        });
        GlobalStateStore.todos.setValue((prev: Todo[]) => {
          prev = prev.filter((todo) => todo.projectId !== id);
          return prev;
        });
        GlobalStateStore.activeTab.setValue({ show: "Project", id: "Today" });
        modal.hide();
      }
    );
  }
});
GlobalStateStore.addTodoHandler.setValue((projectId: any) => {
  const form = new TodoForm({
    projectId,
    onSubmit: ({ form }) => {
      const obj: any = form.getFormProps();
      const todo = new Todo(
        Math.random().toString(),
        obj.title,
        obj.description,
        new Date(obj.date),
        obj.priority,
        TodoStatus.todo,
        obj.projectId,
        +obj.reminderDay
      );

      GlobalStateStore.todos.setValue((prev: any) => {
        prev.push(todo);
        return prev;
      });
      modal.hide();
    },
  });
  modal.show("Create Todo", "Create", form, () => {
    form.submit();
  });
});
GlobalStateStore.editTodoHandler.setValue((id: any) => {
  const todo = GlobalStateStore.todos.getValueT<Todo[]>()?.find((x) => x.id === id)!;
  if (todo) {
    const form = new TodoForm({
      projectId: todo.projectId,
      onSubmit: ({ form }) => {
        const obj: any = form.getFormProps();
        todo.title = obj.title;
        todo.description = obj.description;
        todo.date = new Date(obj.date);
        todo.priority = obj.priority;
        todo.reminderDay = +obj.reminderDay;
        GlobalStateStore.todos.setValue((prev: any) => prev);
        modal.hide();
      },
      todo: todo,
    });
    modal.show("Edit Todo", "Save", form, () => form.submit());
  }
});
GlobalStateStore.deleteTodoHandler.setValue((id: any) => {
  const index = GlobalStateStore.todos.getValueT<Todo[]>()?.findIndex((x) => x.id === id)!;
  if (index >= 0) {
    modal.show(
      "Delete Todo",
      "Delete",
      new ComponentFromString({
        htmlString: `
    <p>Do you really want to delete todo with notes in it?</p>
    `,
      }),
      () => {
        GlobalStateStore.todos.setValue((prev: Todo[]) => {
          prev.splice(index, 1);
          return prev;
        });
        GlobalStateStore.notes.setValue((prev: Note[]) => {
          prev = prev.filter((note) => note.todoId !== id);
          return prev;
        });
        GlobalStateStore.activeTab.setValue((prev: any) => prev);
        modal.hide();
      }
    );
  }
});
GlobalStateStore.addNoteHandler.setValue((todoId: any) => {
  const form = new NoteForm({
    todoId,
    onSubmit: ({ form }) => {
      const obj: any = form.getFormProps();
      const note = new Note(Math.random().toString(), obj.title, obj.description, todoId);

      GlobalStateStore.notes.setValue((prev: any) => {
        prev.push(note);
        return prev;
      });
      modal.hide();
    },
  });
  modal.show("Create Note", "Create", form, () => {
    form.submit();
  });
});
GlobalStateStore.editNoteHandler.setValue((id: any) => {
  const note = GlobalStateStore.notes.getValueT<Note[]>()?.find((x) => x.id === id)!;
  if (note) {
    const form = new NoteForm({
      todoId: note.todoId,
      onSubmit: ({ form }) => {
        const obj: any = form.getFormProps();
        note.title = obj.title;
        note.description = obj.description;
        GlobalStateStore.notes.setValue((prev: any) => prev);
        modal.hide();
      },
      note,
    });
    modal.show("Edit Note", "Save", form, () => form.submit());
  }
});
GlobalStateStore.deleteNoteHandler.setValue((id: any) => {
  const index = GlobalStateStore.notes.getValueT<Note[]>()?.findIndex((x) => x.id === id)!;
  if (index >= 0) {
    modal.show(
      "Delete Note",
      "Delete",
      new ComponentFromString({
        htmlString: `
    <p>Do you really want to delete note?</p>
    `,
      }),
      () => {
        GlobalStateStore.notes.setValue((prev: Note[]) => {
          prev.splice(index, 1);
          return prev;
        });
        modal.hide();
      }
    );
  }
});

function todoCount() {
  const today = GlobalStateStore.defaultCategories.getValueT<Array<TodoProject>>()?.find((x) => x.id === "Today");
  if (today) {
    today.todoCount =
      GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => x.status === TodoStatus.todo && x.dueStatus === DueStatus.inProgress)
        .length || 0;
  }

  const close = GlobalStateStore.defaultCategories.getValueT<Array<TodoProject>>()?.find((x) => x.id === "Close");
  if (close) {
    close.todoCount =
      GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => x.status === TodoStatus.todo && x.dueStatus === DueStatus.close)
        .length || 0;
  }

  const overdue = GlobalStateStore.defaultCategories.getValueT<Array<TodoProject>>()?.find((x) => x.id === "Overdue");
  if (overdue) {
    overdue.todoCount =
      GlobalStateStore.todos.getValueT<Todo[]>()?.filter((x) => x.status === TodoStatus.todo && x.dueStatus === DueStatus.overdue)
        .length || 0;
  }

  GlobalStateStore.defaultCategories.setValue((prev: any) => prev);
}

todoCount();
GlobalStateStore.subscribeStoreChanged((sender: any, args: any) => {
  if (GlobalStateStore.todos.changed) {
    todoCount();
  }
  localStorage.setItem("store", JSON.stringify(GlobalStateStore.exportStateValues()));
});
