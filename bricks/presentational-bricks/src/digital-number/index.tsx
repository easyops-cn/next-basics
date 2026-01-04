import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { DigitalNumber, DigitalNumberType } from "./DigitalNumber";


export interface DigitalNumberElementProps {
  decimals?: number;
  decimal?: string;
  cellStyle?: CSSProperties;
  textStyle?: CSSProperties;
  easeSpeed?: number;
  maxLen?: number;
  value?: number;
  type?: DigitalNumberType;
  height?: number;
  width?: number;
  thousands?: boolean;
}

/**
 * @id presentational-bricks.digital-number
 * @author abert
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.digital-number`
 * @docKind brick
 * @noInheritDoc
 */
export class DigitalNumberElement extends UpdatingElement implements DigitalNumberElementProps {
  /**
   * @default
   * @required false
   * @description 小数位数
   */
  @property({ attribute: false })
  decimals: number;
  /**
   * @default .
   * @required false
   * @description 小数位分割符
   */
  @property({ attribute: false })
  decimal: string;
  /**
   * @default
   * @required false
   * @description 容器样式
   */
  @property({ attribute: false })
  cellStyle: CSSProperties;
  /**
   * @default
   * @required
   * @description 数字样式
   */
  @property({ attribute: false })
  textStyle: CSSProperties;

  /**
   * @default 1.5s
   * @requires false
   * @description 动画执行时间，单位 s
   */
  @property({ attribute: false })
  easeSpeed: number;

  /**
   * @default 100s
   * @required false
   * @description 等待动画执行时间，单位 ms
   */
  @property({ attribute: false })
  delaySpeed = 100;

  /**
   * @default
   * @required false
   * @description 整数位设置最大展示长度，长度不够按位补 0
   */
  @property({ attribute: false })
  maxLen: number;

  /**
   * @required true
   * @description 值
   */
  @property({ attribute: false })
  value: number;

  /**
   *
   * @default default
   * @required false
   * @description 滚动数字组件类型 default | custom
   */
  @property({ attribute: false })
  type: DigitalNumberType;

  /**
   * @default
   * @required false
   * @description 滚动容器的高度
   */
  @property({ attribute: false })
  height: number;

  /**
   * @default
   * @required false
   * @description 滚动容器的宽度
   */
  @property({ attribute: false })
  width: number;

  /**
   * @default false
   * @required false
   * @description 是否有千位分隔符
   */
  @property({ attribute: false })
  thousands: boolean;

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
          <DigitalNumber
            height={this.height}
            width={this.width}
            decimal={this.decimal}
            decimals={this.decimals}
            cellStyle={this.cellStyle}
            textStyle={this.textStyle}
            thousands={this.thousands}
            type={this.type}
            value={this.value}
            easeSpeed={this.easeSpeed}
            delaySpeed={this.delaySpeed}
            maxLen={this.maxLen}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.digital-number",
  DigitalNumberElement
);
