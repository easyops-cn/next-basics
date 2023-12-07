import React from "react";
import ReactDOM from "react-dom";
import { property, BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { SiteMap } from "./SiteMap";

class SiteMapElement extends UpdatingElement {
  connectedCallback(): void {
    this.style.display = "block";
    this._render();
  }

  @property({ attribute: false })
  modelMap: Record<string, any>[];

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <SiteMap modelMap={this.modelMap} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("nav-legacy.site-map", SiteMapElement);
