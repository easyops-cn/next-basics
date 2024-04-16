import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { CurrentTime } from "./CurrentTime";
import { MenuIcon } from "@next-core/brick-types";

export type TimeType = "timestamp" | "custom";

/**
 * @id presentational-bricks.current-time
 * @author kehua
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.current-time`
 * @docKind brick
 * @noInheritDoc
 */
export class CurrentTimeElement extends UpdatingElement {
  /**
   * @kind TimeType
   * @required true
   * @default timestamp
   * @description 时间类型
   * @enums "timestamp"|"custom"
   * @group basic
   */
  @property({
    attribute: false,
  })
  type: TimeType = "timestamp";

  /**
   * @kind string
   * @required false
   * @default -
   * @description 自定义时间格式
   * @group basic
   */
  @property({
    attribute: false,
  })
  format = "HH:mm:ss";

  /**
   * @kind MenuIcon
   * @required false
   * @description 图标
   * @group basic
   */
  @property({ attribute: false })
  icon: MenuIcon;

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
          <CurrentTime type={this.type} format={this.format} icon={this.icon} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.current-time", CurrentTimeElement);
