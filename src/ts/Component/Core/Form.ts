import { Component } from "./Component";

export abstract class Form extends Component {
  protected _initNode(): void {
    this.node = document.createElement("form");
  }

  submit() {
    (this.node as HTMLFormElement).requestSubmit();
  }

  getFormProps() {
    const formData = new FormData(this.node as HTMLFormElement);
    return Object.fromEntries(formData);
  }
}
