import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { PrintButton } from "./PrintButton";

/**
 * @id basic-bricks.print-button
 * @name basic-bricks.print-button
 * @docKind brick
 * @description 触发打开浏览器的打印窗口
 * @author momo
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class PrintButtonElement extends UpdatingElement {
  top: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description fixed 布局下，按钮的位置
   */
  @property({
    attribute: false,
  })
  right: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description fixed 布局下，按钮的位置
   */
  @property({
    attribute: false,
  })
  bottom: string;
  /**
   * @kind string
   * @required true
   * @default -
   * @description 打印保存的 pdf 文件前缀
   */
  @property({
    attribute: false,
  })
  prefixTitle: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 按钮边框
   */
  @property({
    attribute: false,
  })
  border: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 按钮图标颜色
   */
  @property({
    attribute: false,
  })
  color: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 按钮的背景
   */
  @property({
    attribute: false,
  })
  backgroundColor: string;

  connectedCallback(): void {
    this.style.position = "fixed";
    this.style.right = this.right;
    this.style.bottom = this.bottom;
    this.style.top = this.top;
    this.style.zIndex = "999";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <PrintButton
            prefixTitle={this.prefixTitle}
            color={this.color || ""}
            backgroundColor={this.backgroundColor || ""}
            border={this.border || ""}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.print-button", PrintButtonElement);
