import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { AppBarLogo } from "./AppBarLogo";

/**
 * @id nav-legacy.app-bar-logo
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `nav-legacy.app-bar-logo`
 * @docKind brick
 * @noInheritDoc
 */
export class AppBarLogoElement extends UpdatingElement {
  connectedCallback(): void {
    // Don't override user's style settings.
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
          <AppBarLogo />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("nav-legacy.app-bar-logo", AppBarLogoElement);
