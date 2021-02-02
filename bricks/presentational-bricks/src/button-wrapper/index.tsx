import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { ButtonWrapper } from "./ButtonWrapper";

class ButtonWrapperElement extends UpdatingElement {
  @property()
  description: string;
  @property()
  brick: string;

  private _properties: any;

  set properties(value: any) {
    this._properties = value;
  }

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <ButtonWrapper
            description={this.description}
            brick={this.brick}
            properties={this._properties}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.button-wrapper",
  ButtonWrapperElement
);
