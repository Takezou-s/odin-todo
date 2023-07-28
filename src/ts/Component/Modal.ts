import * as bootstrap from "bootstrap";
import { Component } from "./Core/Component";

export class Modal {
  private _modal!: bootstrap.Modal;
  constructor() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="modal fade" style="z-index: 9999" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              </div>
              <div class="modal-footer">
                <button id="modal-cancel-button" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="modal-save-button" type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      `
    );
    this._modal = new bootstrap.Modal(".modal");
  }

  show(title: string, saveButtonText: string, component: Component | HTMLElement, onSaved: () => void) {
    document.querySelector(".modal-title")!.textContent = title;
    document.querySelector("#modal-save-button")!.textContent = saveButtonText;
    (document.querySelector("#modal-save-button")! as HTMLElement).onclick = () => {
      onSaved();
    };
    const modalBody = document.querySelector(".modal-body");
    modalBody!.innerHTML = "";
    modalBody?.append((component as any).render ? (component as any).render() : component);
    this._modal.show();
  }
  hide() {
    this._modal.hide();
  }
}
