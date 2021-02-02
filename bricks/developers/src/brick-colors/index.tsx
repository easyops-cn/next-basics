import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickColors, BrickColorsProps } from "./BrickColors";

class BrickColorsElement extends UpdatingElement {
  @property({
    attribute: false
  })
  list: BrickColorsProps["list"];

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
          <BrickColors list={this.list} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("developers.brick-colors", BrickColorsElement);
