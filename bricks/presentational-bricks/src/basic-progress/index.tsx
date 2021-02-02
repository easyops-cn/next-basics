import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BasicProgress, Color } from "./BasicProgress";

export interface ColorObj {
  /**
   * 进度范围最大值，值（value）小于等于最大值则为该颜色
   */
  progress: string | number;
  /**
   * 颜色
   */
  color: Color;
}

/**
 * @id presentational-bricks.basic-progress
 * @name presentational-bricks.basic-progress
 * @docKind brick
 * @description 进度条展示
 * @author momo
 * @slots
 * @history
 * 1.82.2:新增构件 `presentational-bricks.basic-progress`
 * 1.82.3:color 颜色选择标准化
 * 1.90.0:新增 text 和 fontSIze 属性
 * @memo
 * ```typescript
 * export enum Color {
 *   green = "green",
 *   red = "red",
 *   blue = "blue",
 *   orange = "orange",
 *   cyan = "cyan",
 *   purple = "purple",
 *   geekblue = "geekblue",
 *   gray = "gray",
 * }
 * ```
 * @noInheritDoc
 */
export class BasicProgressElement extends UpdatingElement {
  /**
   * @kind line|circle|dashboard
   * @required circle
   * @default dashboard
   * @description 类型
   */
  @property({ attribute: false })
  type: "line" | "circle" | "dashboard";

  /**
   * @kind number
   * @required true
   * @default -
   * @description 进度值（只负责确定颜色的值）
   */
  @property({ attribute: false })
  value: number;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 展示内容
   */
  @property({ attribute: false })
  text: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 描述值
   */
  @property({ attribute: false })
  description: string;

  /**
   * @kind ColorObj[]
   * @required false
   * @default -
   * @description 颜色范围
   */
  @property({ attribute: false })
  colorMap: ColorObj[];

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 透传[antd progress](https://3x.ant.design/components/progress-cn/)
   */
  @property({ attribute: false })
  configProps: Record<string, any>;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 设定展示内容大小
   */
  @property({ attribute: false })
  fontSize: string;

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
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BasicProgress
            configProps={this.configProps}
            value={this.value}
            description={this.description}
            type={this.type}
            colorMap={this.colorMap}
            text={this.text}
            fontSize={this.fontSize}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.basic-progress",
  BasicProgressElement
);
