import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { AppBarSetting } from "./AppBarSetting";

/**
 * @id basic-bricks.app-bar-setting
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `basic-bricks.app-bar-setting`
 * @docKind brick
 * @noInheritDoc
 */
export class AppBarSettingElement extends UpdatingElement {
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
          <AppBarSetting />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.app-bar-setting", AppBarSettingElement);
