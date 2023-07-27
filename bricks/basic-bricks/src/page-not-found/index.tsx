import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { PageNotFound } from "./PageNotFound";

export class PageNotFoundElement extends UpdatingElement {
  @property()
  url: string;

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
          <PageNotFound url={this.url} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.page-not-found", PageNotFoundElement);
