import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper } from "@next-core/brick-kit";
import { BrickDebug } from "./BrickDebug";

export interface BrickDebugElementProps {
  // 此构件没有属性
}

class BrickDebugElement extends HTMLElement implements BrickDebugElementProps {
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
          <BrickDebug />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("developers.brick-debug", BrickDebugElement);
