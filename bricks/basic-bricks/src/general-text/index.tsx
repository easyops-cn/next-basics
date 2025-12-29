import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { GeneralText } from "./GeneralText";

export interface GeneralTextElementProps {
  text?: string;
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  color?: CSSProperties["color"];
  lineHeight?: CSSProperties["lineHeight"];
  textAlign?: CSSProperties["textAlign"];
  display?: CSSProperties["display"];
  customStyle?: CSSProperties;
}

/**
 * @id basic-bricks.general-text
 * @author SailorShe
 * @history
 * 1.x.0: 新增构件 `basic-bricks.general-text`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralTextElement extends UpdatingElement implements GeneralTextElementProps {
  /**
   * @default ''
   * @required false
   * @description 字体文本
   * @group basic
   */
  @property({ type: String })
  text: string;

  /**
   * @default 14px
   * @required false
   * @description 字体大小
   * @group basic
   */
  @property({ type: String })
  fontSize: CSSProperties["fontSize"];

  /**
   * @default normal
   * @required false
   * @description 字体粗细
   * @group basic
   */
  @property({ type: String })
  fontWeight: CSSProperties["fontWeight"];

  /**
   * @default black
   * @required false
   * @description 字体颜色
   * @group basic
   */
  @property({ type: String })
  color: CSSProperties["color"];

  /**
   * @default 14px
   * @required false
   * @description 字体行高
   * @group basic
   */
  @property({ type: String })
  lineHeight: CSSProperties["lineHeight"];

  /**
   * @default left
   * @required false
   * @description 字体对齐方式
   * @group basic
   */
  @property({ type: String })
  textAlign: CSSProperties["textAlign"];

  /**
   * @default inline
   * @required false
   * @description 显示类型, 在文字构件中常用inline inline-block block,其余类型请查看[相关文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)
   * @group basic
   */
  @property({ type: String })
  display: CSSProperties["display"];

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
            display={this.display}
            customStyle={this.customStyle}
            textAlign={this.textAlign}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.general-text", GeneralTextElement);
