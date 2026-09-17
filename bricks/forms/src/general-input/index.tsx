import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralInput, widthSize } from "./GeneralInput";
import { FormItemElement } from "@next-libs/forms";

export interface GeneralInputElementProps {
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  message?: Record<string, string>;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
  size?: widthSize;
  addonBefore?: string;
  addonAfter?: string;
  copyButton?: boolean;
  inputBoxStyle?: React.CSSProperties;
  useBrickVisible?: boolean;
}


/**
 * @id forms.general-input
 * @name forms.general-input
 * @docKind brick
 * @description 通用输入框
 * @description.en General input
 * @author steve
 * @slots
 * @history
 * 1.61.0:新增属性 `addonBefore`,`addonAfter`
 * @memo
 *>Tips: 对于 event.detail 为 Keyboard Event 时， 由于 react 对于合成事件的处理，打印出来的整个 Keyboard Event 相关属性都为 null, 但可通过单独查看某个属性来得到值（如示例所示），相关详情信息可查看 [查看 react 合成事件](https://zh-hans.reactjs.org/docs/events.html#event-pooling)。
 *### METHODS
 *| name           | params | description            |
 *| -------------- | ------ | ---------------------- |
 *| getFormElement | -      | 获得输入框所属表单元素 |
 * @memo.en
 *>Tips: When event.detail is a Keyboard Event, because of how React handles synthetic events, all the printed properties related to the Keyboard Event are null, but the value can be obtained by viewing an individual property (as shown in the example). For details, see [React SyntheticEvent](https://zh-hans.reactjs.org/docs/events.html#event-pooling).
 *### METHODS
 *| name           | params | description            |
 *| -------------- | ------ | ---------------------- |
 *| getFormElement | -      | Gets the form element the input belongs to |
 */

export class GeneralInputElement extends FormItemElement  implements GeneralInputElementProps {
  /* =========================== Group: basic =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @description 输入框 name 值, 即唯一 id
   * @description.en Name value of the input, i.e. the unique id
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 初始值
   * @description.en Initial value
   * @group basic
   */
  @property()
  value: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 占位符
   * @description.en Placeholder
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @description 标签文字
   * @description.en Label text
   * @group formLabel
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: formValidation =========================== */

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   * @description.en Whether the form item is required
   * @group formValidation
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind Record<string,string>
   * @required false
   * @default -
   * @description 校验文本信息
   * @description.en Validation text message
   * @editor message
   * @group formValidation
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最小长度
   * @description.en Minimum length
   * @deprecated
   * @group formValidation
   */
  @property({
    type: Number,
  })
  min: number;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最大长度
   * @description.en Maximum length
   * @deprecated
   * @group formValidation
   */
  @property({
    type: Number,
  })
  max: number;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最小长度
   * @description.en Minimum length
   * @deprecated
   * @group formValidation
   */
  @property({
    type: Number,
  })
  minLength: number;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 限制输入的最大长度
   * @description.en Maximum length of the input
   * @group formValidation
   */
  @property({
    type: Number,
  })
  maxLength: number;

  /* =========================== Group: ui =========================== */

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否禁用
   * @description.en Whether it is disabled
   * @group ui
   */
  @property({ attribute: false })
  disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否只读
   * @description.en Whether it is read-only
   * @group ui
   */
  @property({ type: Boolean })
  readOnly: boolean;

  /**
   * @kind string
   * @required false
   * @default text
   * @description 输入框类型, 可输入 text / password 或者其他
   * @description.en Input type; text / password or others can be entered
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Text",
   *       "value": "text",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "font-size",
   *         "theme": "outlined"
   *       }
   *     },
   *     {
   *       "label": "Password",
   *       "value": "password",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "lock",
   *         "theme": "outlined"
   *       }
   *     }
   *   ]
   * }
   * @group ui
   */
  @property({ attribute: false }) type: string;

  /**
   * @kind enum["XS", "S", "M", "L","XL"]
   * @required false
   * @default -
   * @description 宽度调整 有XS/S/M/L/XL五种值
   * @description.en Width adjustment, with five values: XS/S/M/L/XL
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "XS",
   *       "value": "XS"
   *     },
   *     {
   *       "label": "S",
   *       "value": "S"
   *     },
   *     {
   *       "label": "M",
   *       "value": "M"
   *     },
   *     {
   *       "label": "L",
   *       "value": "L"
   *     },
   *     {
   *       "label": "XL",
   *       "value": "XL"
   *     }
   *   ]
   * }
   * @group ui
   */
  @property({
    type: String,
  })
  size: widthSize;

  /**
   * @kind string
   * @required false
   * @default
   * @description 前置标签
   * @description.en Prefix label
   * @group ui
   */
  @property()
  addonBefore: string;

  /**
   * @kind string
   * @required false
   * @default
   * @description 后置标签
   * @description.en Suffix label
   * @group ui
   */
  @property()
  addonAfter: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 显示复制按钮
   * @description.en Show the copy button
   * @group ui
   */
  @property({ type: Boolean })
  copyButton: boolean;

  /**
   * @description 可以点击清除图标删除内容
   * @description.en The content can be deleted by clicking the clear icon
   * @group ui
   */
  @property({
    type: Boolean,
  })
  allowClear?: boolean;

  /* =========================== Group: style =========================== */

  /**
   * @kind object
   * @required false
   * @default
   * @description 输入框样式
   * @description.en Input style
   * @group style
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 结合popover构件，当此构件为popoverBrick的内部构件时，popover构件会透穿 visible 属性,便于聚焦当前input框
   * @description.en Used together with the popover brick; when this brick is an inner brick of popoverBrick, the popover brick passes through the visible property, making it easier to focus the current input
   */
  @property({ attribute: false })
  useBrickVisible: boolean;

  /* =========================== events =========================== */

  /**
   * @detail string
   * @description 输入改变，`event.detail` 是当前值
   * @description.en Input changed; `event.detail` is the current value
   */
  @event({ type: "general.input.change" }) changeEvent: EventEmitter<string>;
  private _handleChange = (value: string): void => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };
  /**
   * @detail object
   * @description 按下键盘键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
   * @description.en Triggered when a keyboard key is pressed; `event.detail` is a [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
   */
  @event({ type: "general.input.keydown" }) keydownEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleKeyDown = (e: KeyboardEvent): void => {
    this.keydownEvent.emit(e);
  };
  /**
   * @detail object
   * @description 释放键盘键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
   * @description.en Triggered when a keyboard key is released; `event.detail` is a [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
   */
  @event({ type: "general.input.keyup" }) keyupEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleKeyUp = (e: KeyboardEvent) => {
    this.keyupEvent.emit(e);
  };
  /**
   * @detail null
   * @description 	获得焦点时触发
   * @description.en Triggered when focused
   */
  @event({ type: "general.input.focus" }) focusEvent: EventEmitter;
  private _handleFocus = (): void => {
    this.focusEvent.emit();
  };
  /**
   * @detail string
   * @description 失焦时触发, 而且会传出当前输入框当前值
   * @description.en Triggered on blur; the current value of the input is also emitted
   */
  @event({ type: "general.input.blur" }) blurEvent: EventEmitter<string>;

  private _handleBlur = (value: string): void => {
    this.blurEvent.emit(value);
  };

  /**
   * @detail object
   * @description 按下enter键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
   * @description.en Triggered when the enter key is pressed; `event.detail` is a [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
   */
  @event({ type: "general.input.press.enter" }) enterPressEvent: EventEmitter<
    Record<string, any>
  >;
  private _handlePressEnter = (e: KeyboardEvent) => {
    this.enterPressEvent.emit(e);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralInput
            type={this.type}
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelAlign={this.labelAlign}
            labelBold={this.labelBold}
            placeholder={this.placeholder}
            value={this.value}
            required={this.required}
            readOnly={this.readOnly}
            disabled={this.disabled}
            minLength={this.minLength}
            maxLength={this.maxLength}
            max={this.max}
            min={this.min}
            size={this.size}
            pattern={this.pattern}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            inputBoxStyle={this.inputBoxStyle}
            copyButton={this.copyButton}
            onChange={this._handleChange}
            // @ts-ignore
            onKeyDown={this._handleKeyDown}
            onKeyUp={this._handleKeyUp}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onPressEnter={this._handlePressEnter}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            addonBefore={this.addonBefore}
            addonAfter={this.addonAfter}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            trim={this.trim}
            allowClear={this.allowClear}
            useBrickVisible={this.useBrickVisible}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-input", GeneralInputElement);
