import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BreadcrumbItemConf } from "@next-core/brick-types";
import { AppBar } from "./AppBar/AppBar";

class AppBarElement extends UpdatingElement {
  @property()
  pageTitle: string;

  @property()
  documentId: string;

  private _breadcrumb: BreadcrumbItemConf[] = [];

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
          <AppBar
            pageTitle={this.pageTitle}
            breadcrumb={this._breadcrumb}
            documentId={this.documentId}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  set breadcrumb(value: BreadcrumbItemConf[]) {
    this._breadcrumb = value;
    this._render();
  }

  get breadcrumb(): BreadcrumbItemConf[] {
    return this._breadcrumb || [];
  }
}

customElements.define("basic-bricks.app-bar", AppBarElement);
