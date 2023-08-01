import * as icons from "@mdi/js";
import * as dateHelper from "date-fns";

import { Component } from "./Core/Component";
import { Container } from "./Core/Container";
import { Icon } from "./Svg";
import { Todo } from "../Entity/Todo";
import { TodoPriority } from "../Entity/TodoPriority";
import { TodoStatus } from "../Entity/TodoStatus";
import { DueStatus } from "../Entity/DueStatus";
import { Note } from "../Entity/Note";
import { IconButton } from "./AddButton";
import GlobalStateStore from "../Utility/GlobalStateStore";

export class NoteItem extends Component {
  private _titleEl!: HTMLElement;
  private _descEl!: HTMLElement;
  private _buttonContainer!: Container;

  constructor(props: { note: Note }) {
    super(props);
  }

  protected _initNode(): void {
    this.node = document.createElement("div");
    this.addClass("p-2 shadow rounded-2 d-flex flex-column gap-2 ");
    this.node.style.overflowWrap = "anywhere";

    this._titleEl = document.createElement("span");
    this._titleEl.className = "text-truncate fs-6 fw-semibold";
    this._titleEl.textContent = "Titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

    this._descEl = document.createElement("p");
    this._descEl.textContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur ultricies erat, sed gravida ipsum sagittis vitae donec.";
    this._descEl.className = "m-0 fs-5";

    this._buttonContainer = new Container({ classes: "d-flex flex-wrap align-items-center gap-2" });

    this._buttonContainer.addChildren([
      new IconButton({
        onClick: () => {
          GlobalStateStore.editNoteHandler.getValue()(this.props.note.id);
        },
        icon: icons.mdiBookEdit,
        classes: "btn-success",
        fontSize: "1.5rem",
        title: "Edit Note",
      }),
      new IconButton({
        onClick: () => {
          GlobalStateStore.deleteNoteHandler.getValue()(this.props.note.id);
        },
        icon: icons.mdiDelete,
        classes: "btn-danger",
        fontSize: "1.5rem",
        title: "Delete Note",
      }),
    ]);

    this.node.append(this._titleEl, this._descEl, this._buttonContainer.render());
  }

  protected _initStates(): void {
    this._bindToState(this._ps.note, ({ getValueT }) => {
      const note = getValueT<Note>()!;
      if (note) {
        this._titleEl.textContent = note.title;
        this._descEl.textContent = note.description;
      }
    });
  }
}
