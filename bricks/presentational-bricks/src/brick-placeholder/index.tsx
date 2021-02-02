import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickPlaceholder } from "./BrickPlaceholder";

import { Card } from "antd";

/**
 * @id presentational-bricks.brick-placeholder
 * @name presentational-bricks.brick-placeholder
 * @docKind brick
 * @description 在编排时，可在 Grid 布局中临时占位
 * @author cyril
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class BrickPlaceholderElement extends UpdatingElement {
  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否展示卡片背景
   */
  @property({ type: Boolean, attribute: false })
  showCard: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否展示卡片边框
   */
  @property({ type: Boolean })
  bordered: boolean;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 在 Grid 布局容器中的所占的行列数
   */
  @property()
  gridRow: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 在 Grid 布局容器中的所占的列列数
   */
  @property()
  gridColumn: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 提示内容
   */
  @property()
  text?: string;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.style.gridRow = this.gridRow;
    this.style.gridColumn = this.gridColumn;
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const brickPlaceholder = <BrickPlaceholder text={this.text} />;

      ReactDOM.render(
        <BrickWrapper>
          {this.showCard === false ? (
            brickPlaceholder
          ) : (
            <Card
              style={{ height: "100%" }}
              bodyStyle={{ height: "100%" }}
              bordered={this.bordered}
            >
              {brickPlaceholder}
            </Card>
          )}
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-placeholder",
  BrickPlaceholderElement
);
