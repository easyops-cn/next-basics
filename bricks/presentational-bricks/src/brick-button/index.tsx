import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper } from "@next-core/brick-kit";
import { BrickButton } from "./BrickButton";
import { ButtonProps } from "antd/lib/button";

class BrickButtonElement extends HTMLElement {
  private _text: string;
  private _configProps: ButtonProps & { icon?: string };

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

  private _handleOnClick = (e: React.MouseEvent): void => {
    this.dispatchEvent(new CustomEvent("button.click", e));
  };

  private _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickButton
            text={this._text}
            configProps={this._configProps}
            onClick={this._handleOnClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  set text(value: string) {
    this._text = value;
    this._render();
  }

  set configProps(value: ButtonProps & { icon?: string }) {
    this._configProps = value;
    this._render();
  }
}

customElements.define("presentational-bricks.brick-button", BrickButtonElement);
