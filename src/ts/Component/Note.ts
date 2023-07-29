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

export class NoteItem extends Component {
  private _titleEl!: HTMLElement;
  private _descEl!: HTMLElement;

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

    this.node.append(this._titleEl, this._descEl);
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
