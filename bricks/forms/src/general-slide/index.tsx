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

export interface GeneralSlideElementProps {
  name?: string;
  value?: GeneralSlideProps["value"];
  label?: string;
  required?: boolean;
  disabled?: boolean;
  onlyShowMode?: boolean;
  size?: string;
  uiType?: UiType;
  dots?: boolean;
  marks?: GeneralSlideProps["marks"];
  range?: boolean;
  tooltipVisible?: boolean;
  tipFormatter?: (value?: number) => string;
  inputBoxStyle?: React.CSSProperties;
  step?: GeneralSlideProps["step"];
}


/**
 * @id forms.general-slide
 * @name forms.general-slide
 * @docKind brick
 * @description 滑动型输入器，展示当前值和可选范围
 * @description.en Slider input that displays the current value and the selectable range
 * @author jo
 * @slots
 * @history
 * 1.x.0:新增构件 `forms.general-slide`
 * 1.100.0:新增属性 `onlyShowMode`、`size`
 * @excludesInherit
 *  placeholder
 *  pattern
 * @memo
 */

export class GeneralSlideElement extends FormItemElement  implements GeneralSlideElementProps {
  /* =========================== Group: basic =========================== */

  /**
   * @group basic
   * @required true
   * @description 表单项字段名
   * @description.en Field name of the form item
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @group basic
   * @default false
   * @description 指定滑动条的值， 需要注意的是当 `range = false` 时值的类型为 `string` 格式， 当 `range = true` 时，值的类型为 `[number,number]` 的格式
   * @description.en Specifies the value of the slider. Note that when `range = false` the value type is `string`, and when `range = true` the value type is `[number,number]`
   */
  @property({
    attribute: false,
  })
  value: GeneralSlideProps["value"];

  /* =========================== Group: formLabel =========================== */

  /**
   * @group formLabel
   * @required false
   * @description 表单项字段说明
   * @description.en Field label of the form item
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: formValidation =========================== */

  /**
   * @group formValidation
   * @required false
   * @description 是否必填项
   * @description.en Whether the field is required
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @group formValidation
   * @required false
   * @default 0
   * @description 滑动条的最小值
   * @description.en Minimum value of the slider
   */
  @property({
    attribute: false,
  })
  min = 0;

  /**
   * @group formValidation
   * @required false
   * @default 100
   * @description 滑动条的最大值
   * @description.en Maximum value of the slider
   */
  @property({
    attribute: false,
  })
  max = 100;

  /* =========================== Group: ui =========================== */

  /**
   * @group ui
   * @default false
   * @description 是否禁止滑动
   * @description.en Whether sliding is disabled
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @group ui
   * @required false
   * @default false
   * @description 只用展示不能改变任何值的模式，该属性与 `disabled` 不同的地方在于呈现的样式不一样
   * @description.en Display-only mode in which no value can be changed; this property differs from `disabled` in the rendered style
   */
  @property({
    type: Boolean,
  })
  onlyShowMode: boolean;

  /**
   * @group ui
   * @required false
   * @description 为空则默认，也可为 large 模式，仅在 onlyShowMode 模式下有效
   * @description.en Empty means default; can also be large mode, only valid in onlyShowMode mode
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Default",
   *       "value": ""
   *     },
   *     {
   *       "label": "Large",
   *       "value": "large"
   *     }
   *   ]
   * }
   */
  @property({
    attribute: false,
  })
  size: string;

  /**
   * @group ui
   * @required false
   * @default default
   * @description UI样式，可选择 `dashboard` 样式，默认`default`
   * @description.en UI style; the `dashboard` style can be selected, defaults to `default`
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Default",
   *       "value": "default"
   *     },
   *     {
   *       "label": "Dashboard",
   *       "value": "dashboard",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "dashboard",
   *         "theme": "outlined"
   *       }
   *     }
   *   ]
   * }
   */
  @property({
    attribute: false,
  })
  uiType: UiType = "default";

  /**
   * @group ui
   * @required false
   * @default false
   * @description 是否只能拖拽到刻度上
   * @description.en Whether dragging is restricted to the marks
   */
  @property({
    type: Boolean,
  })
  dots: boolean;

  /**
   * @group ui
   * @required false
   * @description 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式
   * @description.en Marks of the scale. The type of key must be number and its value must be within the closed interval [min, max]; each label can be styled individually
   */
  @property({
    attribute: false,
  })
  marks: GeneralSlideProps["marks"];

  /**
   * @group ui
   * @required false
   * @default true
   * @description marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列
   * @description.en Valid when marks is not an empty object; when the value is true it means the values are inclusive, and false means they are parallel
   */
  @property({
    attribute: false,
  })
  included = true;

  /**
   * @group ui
   * @required false
   * @description 是否显示双滑块模式，双滑块模式时，value 的格式为 `[number, number]` 分别代表所选择的起始值和终点值
   * @description.en Whether to display dual slider mode; in dual slider mode the value format is `[number, number]`, representing the selected start value and end value respectively
   */
  @property({
    type: Boolean,
  })
  range: boolean;

  /**
   * @group ui
   * @required false
   * @description 值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时
   * @description.en When the value is true, the Tooltip will always be displayed; otherwise it will never be displayed, even while dragging or hovering
   */
  @property({
    attribute: false,
  })
  tooltipVisible: boolean;

  /**
   * @group ui
   * @required false
   * @description 格式化函数，Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip
   * @description.en Formatter function; Slider passes the current value to tipFormatter and displays the return value of tipFormatter in the Tooltip; if it is null, the Tooltip is hidden
   */
  @property({
    attribute: false,
  })
  tipFormatter: (value?: number) => string;

  /* =========================== Group: style =========================== */

  /**
   * @kind object
   * @required false
   * @default
   * @description 输入框样式
   * @description.en Input box style
   * @group style
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;

  /* =========================== Group: advanced =========================== */

  /**
   * @group advanced
   * @required false
   * @default 1
   * @description 步长，当 marks 不为空对象时有效，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时滑动条的可选值仅有 marks 标出来的部分
   * @description.en Step. Valid when marks is not an empty object; the value must be greater than 0 and divisible by (max - min). When marks is not an empty object, step can be set to null, in which case the selectable values of the slider are only those marked out by marks.
   */
  @property({
    attribute: false,
  })
  step: GeneralSlideProps["step"];

  /* =========================== events =========================== */

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
   * @description.en Triggered when the slider is dragged; when `range = false` the passed detail value is `string`, when `range = true` the passed detail value is `[number, number]`, and different values are triggered during continuous dragging
   */
  @event({ type: "slider.change" }) changeEvent: EventEmitter<
    number | [number, number]
  >;
  /**
   * @detail `number | [number, number]`
   * @description 滑动条被拖动并且鼠标松开后才被触发， 其余跟 onChange 事件相同
   * @description.en Triggered only after the slider is dragged and the mouse is released; otherwise the same as the onChange event
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
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
            inputBoxStyle={this.inputBoxStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-slide", GeneralSlideElement);
