import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { GeneralHeading } from "./GeneralHeading";

type headType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
/**
 * @id basic-bricks.general-heading
 * @author MJmajiong
 * @history
 * 1.x.0: 新增构件 `basic-bricks.general-heading`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralHeadingElement extends UpdatingElement {
  /**
   * @default ''
   * @required true
   * @description 字体文本
   * @group basic
   */
  @property()
  text: string;

  /**
   * @default h1
   * @required true
   * @description 标题类型 h1-h6
   * @group basic
   */
  @property()
  type: headType;

  /**
   * @default 使用自定义样式,将会覆盖默认样式
   * @required false
   * @description 自定义样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  customStyle: CSSProperties;

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
          <GeneralHeading
            text={this.text}
            type={this.type}
            customStyle={this.customStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.general-heading", GeneralHeadingElement);
