import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickDivider } from "./BrickDivider";

/**
 * @id presentational-bricks.brick-divider
 * @name presentational-bricks.brick-divider
 * @docKind brick
 * @description 分割线
 * @author dophi
 * @slots
 * @history
 * 1.60.0:新属性 `dividerTitle` 和 `orientation`
 * @memo
 * @noInheritDoc
 */
export class BrickDividerElement extends UpdatingElement {
  /**
   * @kind "horizontal" \| "vertical"
   * @required false
   * @default horizontal
   * @description 水平还是垂直类型
   */
  @property() type: "horizontal" | "vertical";
  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否虚线
   */
  @property() dashed: boolean;
  /**
   * @kind Record<string,any>
   * @required false
   * @default -
   * @description 分割线自定义样式
   */
  @property({
    attribute: false,
  })
  dividerStyle: any;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 标题
   */
  @property()
  dividerTitle: string;

  /**
   * @kind "center" 或 "left" 或 "right"
   * @required false
   * @default center
   * @description 标题位置
   */
  @property()
  orientation: "center" | "left" | "right";

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
          <BrickDivider
            type={this.type || "horizontal"}
            dashed={this.dashed}
            dividerStyle={this.dividerStyle}
            orientation={this.orientation || "center"}
            dividerTitle={this.dividerTitle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-divider",
  BrickDividerElement
);
