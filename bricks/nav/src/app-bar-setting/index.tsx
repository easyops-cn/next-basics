import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
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
  @property({
    attribute: false,
  })
  usernameStyle: React.CSSProperties;

  @property({
    attribute: false,
  })
  dropdownIconStyle: React.CSSProperties;

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
          <AppBarSetting
            usernameStyle={this.usernameStyle}
            dropdownIconStyle={this.dropdownIconStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("nav.app-bar-setting", AppBarSettingElement);
