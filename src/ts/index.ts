import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import BodyComponent from "./Component/BodyComponent";
import PageComponent from "./Component/PageComponent";

document.getElementById("content")!.appendChild(new PageComponent().render());
