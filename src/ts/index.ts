import "../scss/styles.scss";
import * as icons from "@mdi/js";

import BodyComponent from "./Component/Body";
import { Container } from "./Component/Core/Container";
import { TodoCategoryButton } from "./Component/TodoCategoryButton";
import GlobalStateStore from "./Utility/GlobalStateStore";
import { ComponentFromElement } from "./Component/Core/ComponentFromElement";
import { TodoItem } from "./Component/TodoItem";
import { Icon } from "./Component/Svg";

const radioClicked = (radioTab: TodoCategoryButton) => {
  GlobalStateStore.todoCategory.setValue(radioTab);
};
const radioTab1 = new TodoCategoryButton({
  text: "Todayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
  todoCount: 999,
  onClick: radioClicked,
});
const radioTab2 = new TodoCategoryButton({
  text: "Approaching",
  todoCount: 1,
  onClick: radioClicked,
});
const radioTab3 = new TodoCategoryButton({
  text: "Past",
  todoCount: 99,
  onClick: radioClicked,
});
const radioTab4 = new TodoCategoryButton({
  text: "Notes",
  todoCount: 100,
  onClick: radioClicked,
  classes: "text-truncate btn btn-lg text-start btn-outline-dark border-start-0 border-end-0 rounded-0",
});
const sideBar = new Container({
  nodeType: "aside",
  children: [
    radioTab1,
    radioTab2,
    radioTab3,
    new ComponentFromElement(
      "h1",
      [
        {
          propName: "title",
          fn(comp) {
            return ({ getValue }) => {
              comp.node.textContent = getValue();
            };
          },
        },
      ],
      { title: "Projects" }
    ),
    radioTab4,
  ],
  classes: "col-3 border border-dark px-0 py-3 d-flex flex-column gap-2",
});
const main = new Container({
  nodeType: "main",
  classes: "row m-0 p-0 col-9 border border-dark",
});
const container = new Container({
  nodeType: "div",
  children: [sideBar, main],
  classes: "row vw-100 vh-100 m-0 border border-dark",
});
// BodyComponent.render(container);
// main.addChildren(new TodoItem());
document.body.style.fontSize = "64px";
// const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// SVGSVGElement;
// svg.setAttributeNS(null, "viewBox", "0 0 24 24");
// // svg.setAttributeNS(null, "width", "24");
// // svg.setAttributeNS(null, "height", "24");
// svg.setAttributeNS(null, "fill", "currentColor");
// svg.style.display = "inline-block";

// svg.style.width = "1em";
// svg.style.height = "1em";

// const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
// path.setAttributeNS(null, "d", icons.mdiChevronLeft);
// path.setAttributeNS(null, "fill", "currentColor");
// svg.append(path);
// document.body.prepend(svg);
BodyComponent.render(new Icon({ path: icons.mdiChevronLeft }));
BodyComponent.render(new Icon({ path: icons.mdiChevronDoubleLeft }));
