import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { PageNotFound } from "./PageNotFound";

export interface PageNotFoundElementProps {
  url?: string;
}

export class PageNotFoundElement extends UpdatingElement implements PageNotFoundElementProps {
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
