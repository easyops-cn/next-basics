import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper } from "@next-core/brick-kit";
import { BrickCodeDisplay } from "./BrickCodeDisplay";
import { get } from "lodash";

class BrickCodeDisplayElement extends HTMLElement {
  private _language: string;
  private _showLineNumber = true;
  private _value: string;
  private _field: string;

  connectedCallback(): void {
    // eslint-disable-next-line no-console
    console.warn(
      "`presentational-bricks.brick-code-display` are deprecated, use `code-bricks.code-display` instead."
    );
    this.style.display = "block";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  private _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickCodeDisplay
            language={this._language}
            showLineNumber={this._showLineNumber}
            value={this._value}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  set language(value: string) {
    this._language = value;
    this._render();
  }

  set showLineNumber(value: boolean) {
    this._showLineNumber = value;
    this._render();
  }

  set value(value: string) {
    this._value = value;
    this._render();
  }

  set field(value: string) {
    this._field = value;
    this._render();
  }

  set dataSource(value: any) {
    this._field && (this._value = get(value, this._field));
    this._render();
  }

  updateValue(e: CustomEvent): void {
    this._value = e.detail;
    this._render();
  }
}

customElements.define(
  "presentational-bricks.brick-code-display",
  BrickCodeDisplayElement
);
