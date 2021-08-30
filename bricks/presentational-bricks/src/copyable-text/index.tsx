import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { CopyableText } from "./CopyableText";

/**
 * @id presentational-bricks.copyable-text
 * @name presentational-bricks.copyable-text
 * @docKind brick
 * @description 可复制文本
 * @author ann
 * @slots
 * @history
 * 1.99.0:新增构件 `presentational-bricks.copyable-text`
 * @memo
 * @noInheritDoc
 */
export class CopyableTextElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 要复制的文本
   */
  @property()
  text: string;
  /**
   * @kind string
   * @required false
   * @default 复制(copy)
   * @description 自定义提示文案
   */
  @property({ attribute: false })
  tooltips: string;
  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏需要复制的文本，`input`样式下该设置无效
   */
  @property({ type: Boolean })
  hiddenText: boolean;
  /**
   * @kind string
   * @default custom
   * @required false
   * @description 构件样式，支持普通(`custom`)和输入框(`input`)样式（见示例）
   */
  @property({ attribute: false })
  type: string;
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
          <CopyableText
            text={this.text}
            tooltips={this.tooltips}
            hiddenText={this.hiddenText}
            type={this.type}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.copyable-text",
  CopyableTextElement
);
