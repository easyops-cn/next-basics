import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper } from "@next-core/brick-kit";
import { LoadingBar } from "./LoadingBar";

class LoadingBarElement extends HTMLElement {
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
          <LoadingBar />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.loading-bar", LoadingBarElement);
