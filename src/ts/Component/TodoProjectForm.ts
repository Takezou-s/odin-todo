import { Form } from "./Core/Form";

export class TodoProjectForm extends Form {
  constructor(props?: {
    onSubmit?: (args: { form: TodoProjectForm; formProps: any; event: any }) => void;
    onReset?: (args: { form: TodoProjectForm; event: any }) => void;
  }) {
    props = props || {};
    props.onSubmit = props.onSubmit || ((args: { form: TodoProjectForm; formProps: any; event: any }) => {});
    props.onReset = props.onReset || ((args: { form: TodoProjectForm; event: any }) => {});
    super(props);
  }
  protected _initNode(): void {
    super._initNode();

    this.node.innerHTML = `
    <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input id="title" name="title" type="text" class="form-control" required>
    </div>
    <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" name="description" type="text" rows="3" class="form-control"></textarea>
    </div>
    `;
  }
  protected _initStates(): void {
    this._bindToState(this._ps.onSubmit, ({ getValueT }) => {
      const fn = getValueT<(args: { form: TodoProjectForm; formProps: any; event: any }) => void>();
      if (fn && typeof fn === "function") {
        this.node.onsubmit = (event) => {
          event.preventDefault();
          fn({ form: this, formProps: this.getFormProps(), event });
        };
      }
    });

    this._bindToState(this._ps.onReset, ({ getValueT }) => {
      const fn = getValueT<(args: { form: TodoProjectForm; event: any }) => void>();
      if (fn && typeof fn === "function") {
        this.node.onreset = (event) => {
          event.preventDefault();
          fn({ form: this, event });
        };
      }
    });
  }
}
