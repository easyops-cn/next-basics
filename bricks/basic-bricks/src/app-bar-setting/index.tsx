import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { AppBarSetting } from "./AppBarSetting";

export interface AppBarSettingElementProps {
  usernameStyle?: React.CSSProperties;
  dropdownIconStyle?: React.CSSProperties;
}

/**
 * @id basic-bricks.app-bar-setting
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `basic-bricks.app-bar-setting`
 * @docKind brick
 * @deprecated
 * @memo
 *  该构件已迁移至 `nav-legacy` 包中维护，后续版本将不再维护该构件，请使用 `nav-legacy.app-bar-setting` 构件
 * @noInheritDoc
 */
export class AppBarSettingElement extends UpdatingElement implements AppBarSettingElementProps {
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

customElements.define("basic-bricks.app-bar-setting", AppBarSettingElement);
