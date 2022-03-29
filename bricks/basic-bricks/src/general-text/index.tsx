import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { GeneralText } from "./GeneralText";

/**
 * @id basic-bricks.general-text
 * @author SailorShe
 * @history
 * 1.x.0: 新增构件 `basic-bricks.general-text`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralTextElement extends UpdatingElement {
  /**
   * @default 14px
   * @required false
   * @description 字体大小
   */
  @property({ type: String })
  fontSize: CSSProperties["fontSize"];

  /**
   * @default normal
   * @required false
   * @description 字体粗细
   */
  @property({ type: String })
  fontWeight: CSSProperties["fontWeight"];

  /**
   * @default black
   * @required false
   * @description 字体颜色
   */
  @property({ type: String })
  color: CSSProperties["color"];

  /**
   * @default 14px
   * @required false
   * @description 字体行高
   */
  @property({ type: String })
  lineHeight: CSSProperties["lineHeight"];

  /**
   * @default left
   * @required false
   * @description 字体对齐方式
   */
  @property({ type: String })
  textAlign: CSSProperties["textAlign"];

  /**
   * @default ''
   * @required false
   * @description 字体文本
   */
  @property({ type: String })
  text: string;

  /**
   * @default 使用自定义样式,将会覆盖默认样式
   * @required false
   * @description 自定义样式
   */
  @property({
    attribute: false,
  })
  customStyle: CSSProperties;

  connectedCallback(): void {
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
          <GeneralText
            fontSize={this.fontSize}
            fontWeight={this.fontWeight}
            color={this.color}
            lineHeight={this.lineHeight}
            text={this.text}
            customStyle={this.customStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.general-text", GeneralTextElement);
