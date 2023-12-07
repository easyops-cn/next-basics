import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BreadcrumbItemConf } from "@next-core/brick-types";
import { AppBar } from "./AppBar/AppBar";

/**
 * @id basic-bricks.basic-bricks.app-bar
 * @deprecated
 * @memo 该构件已迁移至 `nav-legacy` 包中维护，后续版本将不再维护该构件，请使用 `nav-legacy.app-bar` 构件
 */

class AppBarElement extends UpdatingElement {
  @property()
  pageTitle: string;

  @property()
  documentId: string;

  @property({
    type: Boolean,
  })
  noCurrentApp: boolean;

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
            noCurrentApp={this.noCurrentApp}
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
