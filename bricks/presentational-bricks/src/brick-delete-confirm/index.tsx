import React from "react";
import ReactDOM from "react-dom";
import { BrickDeleteConfirm } from "./BrickDeleteConfirm";
import { BrickWrapper } from "@next-core/brick-kit";

class BrickDeleteConfirmElement extends HTMLElement {
  private _deleteName = "";
  private _fields: {
    name?: string;
    key?: string;
    argsPath?: string;
  };
  private _type: "array" | "object" | "string";
  private _dataSource: any;
  private _keySeparator: string;

  private _isVisible = false;
  private _loading = false;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  private _render() {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickDeleteConfirm
            deleteName={this._deleteName}
            onDelete={this._handleOnDelete}
            handleCancel={this.close}
            visible={this._isVisible}
            loading={this._loading}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  open() {
    this._isVisible = true;
    this._render();
  }

  private close = () => {
    this._isVisible = false;
    this._render();
  };

  private _handleOnDelete = () => {
    const { key, argsPath } = this._fields;
    let detail;
    if (this._type === "array") {
      detail = key
        ? this._dataSource.map((item: any) => item[key])
        : this._dataSource;
      if (this._keySeparator) {
        detail = detail.join(this._keySeparator);
      }
    } else if (this._type === "object") {
      detail = this._dataSource[key];
    } else {
      detail = this._dataSource;
    }
    this.dispatchEvent(
      new CustomEvent("confirm.delete", {
        detail: argsPath ? { [argsPath]: detail } : detail
      })
    );
  };

  private initData(value: any) {
    this._dataSource = value;
    const { name } = this._fields;

    if (this._type === "array") {
      this._deleteName = name
        ? value.map((item: any) => item[name]).toString()
        : value.toString();
    } else if (this._type === "object") {
      this._deleteName = value[name];
    } else {
      this._deleteName = value;
    }
  }

  updateData(event: CustomEvent): void {
    this.initData(event.detail);
    this._render();
  }

  updateLoading(value: boolean): void {
    this._loading = value;
    this._render();
  }

  set dataSource(value: any) {
    this.initData(value);
    this._render();
  }

  set deleteName(value: string) {
    this._deleteName = value;
    this._render();
  }

  set fields(value: any) {
    this._fields = value;
    this._render();
  }

  set keySeparator(value: string) {
    this._keySeparator = value;
    this._render();
  }

  set type(value: "array" | "object" | "string") {
    this._type = value;
    this._render();
  }
}

customElements.define(
  "presentational-bricks.brick-delete-confirm",
  BrickDeleteConfirmElement
);
