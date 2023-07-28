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

  setInputValue(selector: string, value: any) {
    const inputElement = this.node.querySelector(selector) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = value;
    }
  }
}
