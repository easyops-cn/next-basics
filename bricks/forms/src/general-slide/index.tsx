import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralSlide, GeneralSlideProps } from "./GeneralSlide";
import { FormItemElement } from "@next-libs/forms";
import { UiType } from "../interfaces";

/**
 * @id forms.general-slide
 * @name forms.general-slide
 * @docKind brick
 * @description 滑动型输入器，展示当前值和可选范围
 * @author jo
 * @slots
 * @history
 * 1.x.0:新增构件 `forms.general-slide`
 * 1.100.0:新增属性 `onlyShowMode`、`size`
 * @memo
 */
export class GeneralSlideElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 表单项字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind `number | [number, number]`
   * @required -️
   * @default false
   * @description 指定滑动条的值， 需要注意的是当 `range = false` 时值的类型为 `string` 格式， 当 `range = true` 时，值的类型为 `[number,number]` 的格式
   */
  @property({
    attribute: false,
  })
  value: GeneralSlideProps["value"];

  /**
   * @kind boolean
   * @required -️
   * @default false
   * @description 是否禁止滑动
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @kind `{number: string} | number: {style: CSSProperties, label: string}`
   * @required -️
   * @default -
   * @description 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式
   */
  @property({
    attribute: false,
  })
  marks: GeneralSlideProps["marks"];

  /**
   * @kind boolean
   * @required -️
   * @default false
   * @description 是否显示双滑块模式，双滑块模式时，value 的格式为 `[number, number]` 分别代表所选择的起始值和终点值
   */
  @property({
    type: Boolean,
  })
  range: boolean;

  /**
   * @kind boolean
   * @required -️
   * @default true
   * @description marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列
   */
  @property({
    attribute: false,
  })
  included = true;

  /**
   * @kind boolean
   * @required -️
   * @default false
   * @description 是否只能拖拽到刻度上
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  dots: boolean;

  /**
   * @kind number
   * @required -️
   * @default 0
   * @description 滑动条的最小值
   * @group advanced
   */
  @property({
    attribute: false,
  })
  min = 0;

  /**
   * @kind number
   * @required -️
   * @default 100
   * @description 滑动条的最大值
   * @group advanced
   */
  @property({
    attribute: false,
  })
  max = 100;

  /**
   * @kind `number | null`
   * @required -️
   * @default 1
   * @description 步长，当 marks 不为空对象时有效，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时滑动条的可选值仅有 marks 标出来的部分
   * @group advanced
   */
  @property({
    attribute: false,
  })
  step: GeneralSlideProps["step"];

  /**
   * @kind boolean
   * @required -️
   * @default false
   * @description 只用展示不能改变任何值的模式，该属性与 `disabled` 不同的地方在于呈现的样式不一样
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  onlyShowMode: boolean;

  /**
   * @kind string
   * @required -️
   * @default -
   * @description 为空则默认，也可为 large 模式，仅在 onlyShowMode 模式下有效
   * @group advanced
   */
  @property({
    attribute: false,
  })
  size: string;
  /**
   * @kind UiType
   * @required -️
   * @default default
   * @description Ui样式，可选择 `dashboard` 样式，默认`default`
   */
  @property({
    attribute: false,
  })
  uiType: UiType = "default";
  /**
   * @kind boolean
   * @required -️
   * @default -
   * @description 值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时
   */
  @property({
    attribute: false,
  })
  tooltipVisible: boolean;
  /**
   * @kind value =>string
   * @required -️
   * @default -
   * @description 格式化函数，Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip
   */
  @property({
    attribute: false,
  })
  tipFormatter: (value?: number) => string;
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
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };

  private _handleAfterChange = (value: any) => {
    this.afterChangeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralSlide
            formElement={this.getFormElement()}
            label={this.label}
            labelTooltip={this.labelTooltip}
            name={this.name}
            value={this.value}
            required={this.required}
            message={this.message}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
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
            tooltipVisible={this.tooltipVisible}
            tipFormatter={this.tipFormatter}
            uiType={this.uiType}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-slide", GeneralSlideElement);
