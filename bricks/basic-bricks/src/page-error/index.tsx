import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { PageError } from "./PageError";

class PageErrorElement extends UpdatingElement {
  @property()
  error: string;

  @property({ type: Number })
  code: number;

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
          <PageError error={this.error} code={this.code} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.page-error", PageErrorElement);
