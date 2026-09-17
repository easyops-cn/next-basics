import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickDivider } from "./BrickDivider";


export interface BrickDividerElementProps {
  dividerTitle?: string;
  type?: "horizontal" | "vertical" | "radiation";
  dashed?: boolean;
  dividerStyle?: React.CSSProperties;
  orientation?: "center" | "left" | "right";
  plain?: boolean;
  proportion?: number[];
}

/**
 * @id presentational-bricks.brick-divider
 * @name presentational-bricks.brick-divider
 * @docKind brick
 * @description 分割线
 * @description.en Divider
 * @author dophi
 * @slots
 * @history
 * 1.60.0:新属性 `dividerTitle` 和 `orientation`
 * 1.204.0: 新属性 `plain` 和 `type`增加`radiation`
 * @memo
 * @noInheritDoc
 */
export class BrickDividerElement extends UpdatingElement implements BrickDividerElementProps {
  /**
   * @required false
   * @description 标题
   * @description.en Title
   * @group basic
   */
  @property()
  dividerTitle: string;

  /**
   * @required false
   * @default "horizontal"
   * @description 水平|垂直|放射类型,注意`radiation`是个特殊的类型，该样式是特定的
   * @description.en Horizontal|vertical|radiation type; note that `radiation` is a special type with its own specific style
   * @group basic
   */
  @property() type: "horizontal" | "vertical" | "radiation";

  /**
   * @required false
   * @default false
   * @description 是否虚线
   * @description.en Whether the line is dashed
   * @group basic
   */
  @property({ type: Boolean }) dashed: boolean;

  /**
   * @required false
   * @description 分割线自定义样式
   * @description.en Custom style of the divider
   * @group basic
   */
  @property({
    attribute: false,
  })
  dividerStyle: React.CSSProperties;

  /**
   * @kind "center" | "left" | "right"
   * @required false
   * @default "center"
   * @description 标题位置
   * @description.en Title position
   * @group basic
   */
  @property()
  orientation: "center" | "left" | "right";

  /**
   * @required false
   * @default  false
   * @description 文字是否显示为普通正文样式
   * @description.en Whether the text is displayed in a normal body style
   * @group ui
   */
  @property({ type: Boolean })
  plain: boolean;

  /**
   * @required  false
   * @description  当用于数值显示的情况，eg: 如果要展示"1/3"，那么传入就是[1,3], 该字段只适配于 type 为 `radiation`
   * @description.en Used for numeric display, e.g. to display "1/3", pass [1,3]; this field is applicable only when type is `radiation`
   * @group basic
   */
  @property({ attribute: false })
  proportion: number[];

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
            plain={this.plain}
            proportion={this.proportion}
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
