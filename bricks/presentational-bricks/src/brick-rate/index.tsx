import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { BrickRate } from "./BrickRate";

/**
 * @id presentational-bricks.brick-rate
 * @author astrid
 * @history
 * 1.130.0: 新增构件 `presentational-bricks.brick-rate`
 * 1.130.1: 构件功能优化
 * @docKind brick
 * @noInheritDoc
 */
export class BrickRateElement extends UpdatingElement {
  /**
   * @kind number
   * @required false
   * @default  3
   * @description 等级级数
   */
  @property({ attribute: false }) count = 3;
  /**
   * @kind number
   * @required false
   * @default -
   * @description 默认等级
   */
  @property({ attribute: false }) defaultValue: number;
  /**
   * @kind boolean
   * @required false
   * @default  true
   * @description 是否禁用
   */
  @property({ attribute: false }) disabled = true;
  /**
   * @kind boolean
   * @required false
   *
   * @default  -
   * @description 是否允许半选
   */
  @property({ attribute: false }) allowHalf: boolean;
  /**
   * @kind `any[]`
   * @required false
   * @default  -
   * @description 等级颜色分类，每一级别对应的颜色，只在`disabled:true`的情况下显示
   */
  @property({ attribute: false }) colors: any[];
  /**
   * @kind  "string"
   * @required false
   * @default  -
   * @description 可选任意字符（非图标类）比如字母、数字、中文，表示等级图标
   */
  @property() type: string;
  /**
   * @kind  Record<string,any>
   * @required false
   * @default
   * @description  设置样式
   */
  @property({ attribute: false }) rateStyle: Record<string, any>;
  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 等级icon，优先级高于type，支持[icon 图标库](developers/icon)，可直接复制图标图标的配置（antd、fa 及 easyops 三种库都支持），也可只取 icon 字段的值（仅支持 antd 库）。配置{ "lib": "antd", "icon": "edit" }与 "edit"等价
   */
  @property({
    attribute: false,
  })
  rateIcon: any;

  @event({ type: "rate.change" }) changEvent: EventEmitter<Record<number, any>>;
  private _handleChange = (value: any): void => {
    this.changEvent.emit(value);
  };
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
          <BrickRate
            count={this.count}
            type={this.type}
            onChange={this._handleChange}
            defaultValue={this.defaultValue}
            disabled={this.disabled}
            allowHalf={this.allowHalf}
            rateStyle={this.rateStyle}
            rateIcon={this.rateIcon}
            colors={this.colors}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.brick-rate", BrickRateElement);
