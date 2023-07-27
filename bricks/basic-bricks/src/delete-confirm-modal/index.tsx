import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper } from "@next-core/brick-kit";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

/**
 * @id basic-bricks.delete-confirm-modal
 * @name basic-bricks.delete-confirm-modal
 * @docKind brick
 * @description
 * @author
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class DeleteConfirmModalElement extends HTMLElement {
  private isVisible = false;
  private _data = { name: "" };
  private _eventName = "";
  private _title = "删除";
  private _message = "";
  private _eventDetail = {};

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  private _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <DeleteConfirmModal
            visible={this.isVisible}
            name={this._data.name}
            title={this._title}
            message={this._message}
            handleConfirm={this.confirm.bind(this)}
            handleCancel={this.close.bind(this)}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  open(event: CustomEvent) {
    this.isVisible = true;
    this._eventDetail = event.detail;
    this._render();
  }

  close() {
    this.isVisible = false;
    this._render();
  }

  confirm() {
    this.dispatchEvent(
      new CustomEvent(this._eventName, { detail: this._eventDetail })
    );
    this.isVisible = false;
    this._render();
  }

  set eventName(value: string) {
    this._eventName = value;
  }

  set message(value: string) {
    this._message = value;
    this._render();
  }

  set title(value: string) {
    this._title = value;
  }

  set data(value: any) {
    this._data = value;
    this._render();
  }
}

customElements.define(
  "basic-bricks.delete-confirm-modal",
  DeleteConfirmModalElement
);
