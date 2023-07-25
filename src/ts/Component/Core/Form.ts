import { TodoPriority } from "../../Entity/TodoPriority";
import { Component } from "./Component";

export class TodoForm extends Component {
  _addReminderInput!: HTMLElement;
  _addReminderLabel!: HTMLElement;
  _addReminder!: HTMLElement;

  _reminderEl!: HTMLElement;
  constructor(props: {
    projectId: any;
    onSubmit?: (args: { form: TodoForm; formProps: any; event: any }) => void;
    onReset?: (args: { form: TodoForm; event: any }) => void;
  }) {
    props = props || {};
    props.onSubmit = props.onSubmit || ((args: { form: TodoForm; formProps: any; event: any }) => {});
    props.onReset = props.onReset || ((args: { form: TodoForm; event: any }) => {});
    super(props);
  }
  protected _initNode(): void {
    this.node = document.createElement("form");

    const fieldContainer = () => {
      const div = document.createElement("div");
      div.className = "mb-3";
      return div;
    };

    this.node.innerHTML = `
    <input id="projectId" name="projectId" type="hidden" value="${this.props.projectId}">
    <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input id="title" name="title" type="text" class="form-control" required>
    </div>
    <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" name="description" type="text" rows="3" class="form-control"></textarea>
    </div>
    <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input id="date" name="date" type="date" class="form-control" required>
    </div>
    <div class="mb-3">
        <label for="priority" class="form-label">Priority</label>
        <select id="priority" name="priority" class="form-select" required>
            <option value="${TodoPriority.low}">${TodoPriority.low}</option>
            <option value="${TodoPriority.medium}">${TodoPriority.medium}</option>
            <option value="${TodoPriority.high}">${TodoPriority.high}</option>
        </select>
    </div>
    `;

    this._addReminderInput = document.createElement("input");
    this._addReminderInput.className = "form-check-input";
    this._addReminderInput.setAttribute("type", "checkbox");
    this._addReminderInput.addEventListener("change", (event) => {
      const input: HTMLInputElement = (event.target as HTMLInputElement)!;
      if (input.checked) {
        this._reminderEl.classList.remove("d-none");
        this._reminderEl.querySelector("input")?.setAttribute("required", "");
      } else {
        this._reminderEl.classList.add("d-none");
        this._reminderEl.querySelector("input")?.removeAttribute("required");
      }
    });

    this._addReminderLabel = document.createElement("label");
    this._addReminderLabel.className = "form-check-label";
    this._addReminderLabel.textContent = "Add reminder";

    this._addReminder = fieldContainer();
    this._addReminder.classList.add("form-check");
    this._addReminder.append(this._addReminderInput, this._addReminderLabel);

    this.node.append(this._addReminder);

    this._reminderEl = fieldContainer();
    this._reminderEl.classList.add("d-none");
    this._reminderEl.innerHTML = `
    <label for="reminderDay" class="form-label">Remind day before: </label>
    <input id="reminderDay" name="reminderDay" type="number" min="1" class="form-control">
    `;

    this.node.append(this._reminderEl);

    this.node.insertAdjacentHTML(
      "beforeend",
      `
      <div class="d-flex justify-content-end gap-2">
        <button type="submit" class="btn btn-outline-dark">Submit</button>
        <button type="reset" class="btn btn-outline-dark">Cancel</button>
      </div>
      `
    );
  }
  protected _initStates(): void {
    this._bindToState(this._ps.onSubmit, ({ getValueT }) => {
      const fn = getValueT<(args: { form: TodoForm; formProps: any; event: any }) => void>();
      if (fn && typeof fn === "function") {
        this.node.onsubmit = (event) => {
          event.preventDefault();
          fn({ form: this, formProps: this.getFormProps(), event });
        };
      }
    });

    this._bindToState(this._ps.onReset, ({ getValueT }) => {
      const fn = getValueT<(args: { form: TodoForm; event: any }) => void>();
      if (fn && typeof fn === "function") {
        this.node.onreset = (event) => {
          event.preventDefault();
          fn({ form: this, event });
        };
      }
    });
  }

  getFormProps() {
    const formData = new FormData(this.node as HTMLFormElement);
    return Object.fromEntries(formData);
  }
}
