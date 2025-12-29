import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { CopyableText } from "./CopyableText";


export interface CopyableTextElementProps {
  text?: string;
  tooltips?: string;
  hiddenText?: boolean;
  type?: "custom" | "input" | "text" ;
  dataSource?: Record<string, any>;
}

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
export class CopyableTextElement extends UpdatingElement implements CopyableTextElementProps {
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
   * @description 构件样式，支持普通(`custom`)和输入框(`input`)和 中间省略(`text`) 样式（见示例）
   */
  @property({ attribute: false })
  type: "custom" | "input" | "text" = "custom";
  /**
   * @kind object
   * @required false
   * @default -
   * @description 数据源
   */
  @property({ attribute: false })
  dataSource: Record<string, any>;

  /**
   * @kind number
   * @required false
   * @default  10
   * @description  当`type: text`，中间省略时，保留文本末尾字段的的数量
   */
  @property({ attribute: false })
  suffixCount = 10;
  /**
   * @detail any
   * @description 文本点击时触发的事件
   */
  @event({ type: "text.click" })
  itemClick: EventEmitter<any>;
  private _handleTextClick = (data: any): void => {
    this.itemClick.emit(data);
  };
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
            dataSource={this.dataSource}
            textClick={this._handleTextClick}
            suffixCount={this.suffixCount}
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
