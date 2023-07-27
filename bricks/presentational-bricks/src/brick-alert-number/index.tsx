import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickAlertNumber } from "./BrickAlertNumber";

/**
 * @id presentational-bricks.brick-alert-number
 * @name presentational-bricks.brick-alert-number
 * @docKind brick
 * @description 数值 0 将带有绿色背景，1 带有黄色背景
 * @author ice
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class BrickAlertNumberElement extends UpdatingElement {
  /**
   * @kind number
   * @required true
   * @default -
   * @description 告警数量
   */
  @property({
    attribute: false,
  })
  value: number;

  connectedCallback(): void {
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
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickAlertNumber alertNumber={this.value} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-alert-number",
  BrickAlertNumberElement
);
