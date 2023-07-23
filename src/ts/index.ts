import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import BodyComponent from "./Component/BodyComponent";
import PageComponent from "./Component/PageComponent";
import { ContainerComponent } from "./Component/Core/ContainerComponent";
import { Comp1, Comp2 } from "./Component/Comp1";
import { RadioTabItemComponent } from "./Component/RadioTabItemComponent";
import GlobalStateStore from "./Utility/GlobalStateStore";
import { CollapseComponent } from "./Component/CollapseComponent";

// BodyComponent.render(new PageComponent());
// const button1 = new Comp1({ stateName: "num1", stateName2: "num2", styles: { padding: "16px" } });
// const button2 = new Comp1({ stateName2: "num1", stateName: "num2", styles: { padding: "16px" } });
// const container = new ContainerComponent({ nodeType: "div", children: [button1, button2] });
// BodyComponent.render(container);
const radioClicked = (radioTab: RadioTabItemComponent) => {
  GlobalStateStore.activeRadioTab.setValue(radioTab);
};
const radioTab1 = new RadioTabItemComponent({
  text: "Tab - 1",
  activeClassName: "active",
  onClick: radioClicked,
  classes: "btn btn-dark",
});
const radioTab2 = new RadioTabItemComponent({
  text: "Tab - 2",
  activeClassName: "active",
  onClick: radioClicked,
  classes: "btn btn-dark",
});
const sideBar = new ContainerComponent({ nodeType: "aside", children: [radioTab1, radioTab2], classes: "col-3 border border-dark" });
const main = new ContainerComponent({
  nodeType: "main",
  classes: "row m-0 p-0 col-9 border border-dark",
});
const container = new ContainerComponent({
  nodeType: "div",
  children: [sideBar, main],
  classes: "row vw-100 vh-100 m-0 border border-dark",
});
BodyComponent.render(new Comp2());
BodyComponent.render(container);
main.props.children = new CollapseComponent();
