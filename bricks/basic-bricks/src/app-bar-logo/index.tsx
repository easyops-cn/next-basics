import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { AppBarLogo } from "./AppBarLogo";

export interface AppBarLogoElementProps {
  // 该构件无 attribute: false 的属性
}

/**
 * @id basic-bricks.app-bar-logo
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `basic-bricks.app-bar-logo`
 * @docKind brick
 * @deprecated
 * @memo
 *  该构件已迁移至 `nav-legacy` 包中维护，后续版本将不再维护该构件，请使用 `nav-legacy.app-bar-logo` 构件
 * @noInheritDoc
 */
export class AppBarLogoElement extends UpdatingElement implements AppBarLogoElementProps {
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

customElements.define("basic-bricks.app-bar-logo", AppBarLogoElement);
