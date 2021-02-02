import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  UpdatingElement,
} from "@next-core/brick-kit";
import { GeneralSlider, GeneralSliderProps } from "./GeneralSlider";

/**
 * @id presentational-bricks.general-slider
 * @name presentational-bricks.general-slider
 * @docKind brick
 * @description 滑动型输入器，展示当前值和可选范围
 * @author jo
 * @slots
 * @history
 * 1.x.0:新增构件 `presentational-bricks.general-slider`
 * @memo
 * @noInheritDoc
 */
export class GeneralSliderElement extends UpdatingElement {
  /**
   * @kind `boolean`
   * @required -️
   * @default false
   * @description 只用展示不能改变任何值的模式，该属性与 `disabled` 不同的地方在于呈现的样式不一样
   */
  @property({
    type: Boolean,
  })
  onlyShowMode: boolean;

  /**
   * @kind `string`
   * @required -️
   * @default -
   * @description 为空则默认，也可为 large 模式，仅在 onlyShowMode 模式下有效
   */
  @property({
    attribute: false,
  })
  size: string;

  /**
   * @kind `number | [number, number]`
   * @required -️
   * @default false
   * @description 指定滑动条的值， 需要注意的是当 `range = false` 时值的类型为 `string` 格式， 当 `range = true` 时，值的类型为 `[number,number]` 的格式
   */
  @property({
    attribute: false,
  })
  value: GeneralSliderProps["value"];

  /**
   * @kind `boolean`
   * @required -️
   * @default false
   * @description 是否禁止滑动
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @kind `boolean`
   * @required -️
   * @default false
   * @description 是否只能拖拽到刻度上
   */
  @property({
    type: Boolean,
  })
  dots: boolean;

  /**
   * @kind `number`
   * @required -️
   * @default 0
   * @description 滑动条的最小值
   */
  @property({
    attribute: false,
  })
  min = 0;

  /**
   * @kind `number`
   * @required -️
   * @default 100
   * @description 滑动条的最大值
   */
  @property({
    attribute: false,
  })
  max = 100;

  /**
   * @kind `{number: string} | number: {style: CSSProperties, label: string}`
   * @required -️
   * @default -
   * @description 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式
   */
  @property({
    attribute: false,
  })
  marks: GeneralSliderProps["marks"];

  /**
   * @kind `boolean`
   * @required -️
   * @default false
   * @description 是否显示双滑块模式，双滑块模式时，value 的格式为 `[number, number]` 分别代表所选择的起始值和终点值
   */
  @property({
    type: Boolean,
  })
  range: boolean;

  /**
   * @kind `number | null`
   * @required -️
   * @default 1
   * @description 步长，当 marks 不为空对象时有效，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时滑动条的可选值仅有 marks 标出来的部分
   */
  @property({
    attribute: false,
  })
  step: GeneralSliderProps["step"];

  /**
   * @kind `boolean`
   * @required -️
   * @default true
   * @description marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列
   */
  @property({
    attribute: false,
  })
  included = true;

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
  /**
   * @detail `number | [number, number]`
   * @description 当滑动条被拖动的时候触发，`range = false` detail 传出值 为 `string`, `range = true` detail 传出值为 `[number, number]` 连续拖动时会触发不同值
   */
  @event({ type: "slider.change" }) changeEvent: EventEmitter<
    number | [number, number]
  >;
  /**
   * @detail `number | [number, number]`
   * @description 滑动条被拖动并且鼠标松开后才被触发， 其余跟 onChange 事件相同
   */
  @event({ type: "slider.after.change" }) afterChangeEvent: EventEmitter<
    number | [number, number]
  >;
  private _handleChange = (value: any) => {
    this.changeEvent.emit(value);
  };

  private _handleAfterChange = (value: any) => {
    this.afterChangeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralSlider
            value={this.value}
            disabled={this.disabled}
            dots={this.dots}
            max={this.max}
            min={this.min}
            marks={this.marks}
            step={this.step}
            included={this.included}
            range={this.range}
            onChange={this._handleChange}
            onAfterChange={this._handleAfterChange}
            onlyShowMode={this.onlyShowMode}
            size={this.size}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.general-slider",
  GeneralSliderElement
);
