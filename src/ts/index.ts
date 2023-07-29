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
// //#region 1
// const radioClicked = (radioTab: Tab) => {
//   GlobalStateStore.activeTodoCategory.setValue(radioTab.props.id);
// };
// const radioTab1 = new Tab({
//   id: "1",
//   text: "Todayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
//   count: 999,
// });
// const radioTab2 = new Tab({
//   id: "2",
//   text: "Approaching",
//   count: 1,
// });
// const radioTab3 = new Tab({
//   id: "3",
//   text: "Past",
//   count: 99,
// });
// const radioTab4 = new Tab({
//   id: "4",
//   text: "Notes",
//   count: 100,
//   classes: "text-truncate btn btn-lg text-start btn-outline-dark border-start-0 border-end-0 rounded-0",
// });
// const sideBar = new Container({
//   nodeType: "aside",
//   children: [
//     radioTab1,
//     radioTab2,
//     radioTab3,

//     new Container({
//       classes: "d-flex justify-content-between align-items-center fs-5 px-3 py-2",
//       children: [
//         new ComponentFromElement(
//           "span",
//           [
//             {
//               propName: "title",
//               fn(comp) {
//                 return ({ getValue }) => {
//                   comp.node.textContent = getValue();
//                 };
//               },
//             },
//           ],
//           { title: "Projects", classes: "text-truncate" }
//         ),
//         new Container({
//           classes: "btn btn-primary p-0 m-0 fs-5 rounded-circle d-flex justify-content-center align-items-center",
//           styles: {
//             minWidth: "40px",
//             maxWidth: "40px",
//             minHeight: "40px",
//             maxHeight: "40px",
//           },
//           nodeType: "button",
//           children: new Icon({ path: icons.mdiPlus, center: true }),
//         }),
//       ],
//     }),

//     radioTab4,
//   ],
//   classes: "col-3 h-100 border border-dark px-0 py-3 d-flex flex-column gap-2",
// });
// const main = new Container({
//   nodeType: "main",
//   classes: "row h-100 overflow-auto m-0 col-9 border border-dark d-flex align-items-start justify-content-start",
// });
// const container = new Container({
//   nodeType: "div",
//   children: [sideBar, main],
//   classes: "row vw-100 vh-100 m-0 border border-dark overflow-hidden",
// });
// BodyComponent.render(container);

// let count = 0;
// function getTodo(): Component {
//   count++;

//   const todo = new TodoItem({
//     todo: new Todo(
//       count,
//       count.toString(),
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum tincidunt congue. Vestibulum ligula augue porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum tincidunt congue. Vestibulum ligula augue porttitor.",
//       new Date(),
//       TodoPriority.high,
//       TodoStatus.todo,
//       DueStatus.close
//     ),
//   });
//   return new Container({ classes: "col-3 p-2", children: todo });
// }
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addChildren(getTodo());
// main.addClass("row overflow-auto");

// // BodyComponent.render(
// //   new TodoForm({
// //     projectId: 1,
// //     onSubmit(args) {
// //       console.log(args);
// //     },
// //   })
// // );
// localStorage.setItem("store", JSON.stringify(GlobalStateStore.exportStateValues()));
// const storeJSON = localStorage.getItem("store");
// if (storeJSON) {
//   GlobalStateStore.importStateValues(JSON.parse(storeJSON));
// }

// setInterval(() => {
//   localStorage.setItem("store", JSON.stringify(GlobalStateStore.exportStateValues()));
// }, 1000);
// //#endregion

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
        obj.reminderDay
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
        todo.reminderDay = obj.reminderDay;
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
