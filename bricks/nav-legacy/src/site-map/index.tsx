import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { SiteMap } from "./SiteMap";
import { NewSiteMap } from "./newSiteMap";
class SiteMapElement extends UpdatingElement {
  connectedCallback(): void {
    this.style.display = "block";
    this._render();
  }

  @property({ attribute: false })
  modelMap: Record<string, any>[];

  @property({ attribute: false })
  isNext = false;

  @property({ attribute: false })
  urlTemplates = {};
  /**
   * @default
   * @required false
   * @description 是否放在顶部菜单里
   */
  @property({ type: Boolean })
  isInMenu: boolean;
  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          {this.isInMenu ? (
            <NewSiteMap
              modelMap={this.modelMap}
              urlTemplates={this.urlTemplates}
            />
          ) : (
            <SiteMap
              modelMap={this.modelMap}
              isNext={this.isNext}
              urlTemplates={this.urlTemplates}
            />
          )}
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("nav-legacy.site-map", SiteMapElement);
