import "../scss/styles.scss";
import * as icons from "@mdi/js";

import BodyComponent from "./Component/Body";
import { Container } from "./Component/Core/Container";
import { TodoCategoryButton } from "./Component/TodoCategoryButton";
import GlobalStateStore from "./Utility/GlobalStateStore";
import { ComponentFromElement } from "./Component/Core/ComponentFromElement";
import { TodoItem } from "./Component/TodoItem";
import { Icon } from "./Component/Svg";
import { Todo } from "./Entity/Todo";
import { TodoStatus } from "./Entity/TodoStatus";
import { DueStatus } from "./Entity/DueStatus";
import { TodoPriority } from "./Entity/TodoPriority";
import { Component } from "./Component/Core/Component";
import { TodoForm } from "./Component/Core/Form";

// const radioClicked = (radioTab: TodoCategoryButton) => {
//   GlobalStateStore.todoCategory.setValue(radioTab);
// };
// const radioTab1 = new TodoCategoryButton({
//   text: "Todayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
//   todoCount: 999,
//   onClick: radioClicked,
// });
// const radioTab2 = new TodoCategoryButton({
//   text: "Approaching",
//   todoCount: 1,
//   onClick: radioClicked,
// });
// const radioTab3 = new TodoCategoryButton({
//   text: "Past",
//   todoCount: 99,
//   onClick: radioClicked,
// });
// const radioTab4 = new TodoCategoryButton({
//   text: "Notes",
//   todoCount: 100,
//   onClick: radioClicked,
//   classes: "text-truncate btn btn-lg text-start btn-outline-dark border-start-0 border-end-0 rounded-0",
// });
// const sideBar = new Container({
//   nodeType: "aside",
//   children: [
//     radioTab1,
//     radioTab2,
//     radioTab3,
//     new ComponentFromElement(
//       "h1",
//       [
//         {
//           propName: "title",
//           fn(comp) {
//             return ({ getValue }) => {
//               comp.node.textContent = getValue();
//             };
//           },
//         },
//       ],
//       { title: "Projects" }
//     ),
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
BodyComponent.render(
  new TodoForm({
    projectId: 1,
    onSubmit(args) {
      console.log(args);
    },
  })
);
