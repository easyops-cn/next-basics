import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralInput } from "./GeneralInput";
import { FormItemElement } from "@next-libs/forms";

/**
 * @id forms.general-input
 * @name forms.general-input
 * @docKind brick
 * @description 通用输入框
 * @author steve
 * @slots
 * @history
 * 1.61.0:新增属性 `addonBefore`,`addonAfter`
 * @groupI18N
 * {
 *  "basicFormItem": {
 *    "en": "BasicFormItem",
 *    "zh": "表单项常用"
 *   },
 *  "advanceFormItem": {
 *    "en": "AdvanceFormItem",
 *    "zh": "表单项高级"
 *   },
 *   "ui": {
 *     "en": "UI",
 *     "zh": "外观"
 *   }
 * }
 * @memo
 *>Tips: 对于 event.detail 为 Keyboard Event 时， 由于 react 对于合成事件的处理，打印出来的整个 Keyboard Event 相关属性都为 null, 但可通过单独查看某个属性来得到值（如示例所示），相关详情信息可查看 [查看 react 合成事件](https://zh-hans.reactjs.org/docs/events.html#event-pooling)。
 *### METHODS
 *| name           | params | description            |
 *| -------------- | ------ | ---------------------- |
 *| getFormElement | -      | 获得输入框所属表单元素 |
 */
export class GeneralInputElement extends FormItemElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 输入框字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 输入框字段说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare label: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 输入框占位说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   * @group basicFormItem
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 输入框初始值
   * @group basicFormItem
   */
  @property()
  value: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否禁用
   * @group basicFormItem
   */
  @property({ attribute: false })
  disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否只读
   * @group basicFormItem
   */
  @property({ type: Boolean })
  readOnly: boolean;

  /**
   * @kind object
   * @required false
   * @default
   * @description 输入框样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;

  /**
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   * @group basicFormItem
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最小长度
   * @group basicFormItem
   */
  @property({
    type: Number,
  })
  minLength: number;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最大长度
   * @group basicFormItem
   */
  @property({
    type: Number,
  })
  maxLength: number;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 输入框类型,可输入password/email或者其他
   * @group basicFormItem
   */
  @property({ attribute: false }) type: string;

  /**
   * @kind string
   * @required false
   * @default
   * @description 设置前置标签
   * @group basicFormItem
   */
  @property()
  addonBefore: string;

  /**
   * @kind string
   * @required false
   * @default
   * @description 设置后置标签
   * @group basicFormItem
   */
  @property()
  addonAfter: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否显示复制按钮
   * @group ui
   */
  @property({ type: Boolean })
  copyButton: boolean;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最小长度
   * @deprecated
   * @group basicFormItem
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
   * @deprecated
   * @group basicFormItem
   */
  @property({
    type: Number,
  })
  max: number;

  /**
   * @detail `string`
   * @description 输入改变，`event.detail` 是当前值
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
   * @detail `object`
   * @description 按下键盘键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
   */
  @event({ type: "general.input.keydown" }) keydownEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleKeyDown = (e: KeyboardEvent): void => {
    this.keydownEvent.emit(e);
  };
  /**
   * @detail `object`
   * @description 释放键盘键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
   */
  @event({ type: "general.input.keyup" }) keyupEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleKeyUp = (e: KeyboardEvent) => {
    this.keyupEvent.emit(e);
  };
  /**
   * @detail `null`
   * @description 	获得焦点时触发
   */
  @event({ type: "general.input.focus" }) focusEvent: EventEmitter;
  private _handleFocus = (): void => {
    this.focusEvent.emit();
  };
  /**
   * @detail `string`
   * @description 失焦时触发, 而且会传出当前输入框当前值
   */
  @event({ type: "general.input.blur" }) blurEvent: EventEmitter<string>;

  private _handleBlur = (value: string): void => {
    this.blurEvent.emit(value);
  };

  /**
   * @detail `object`
   * @description 按下enter键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
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
            placeholder={this.placeholder}
            value={this.value}
            required={this.required}
            readOnly={this.readOnly}
            disabled={this.disabled}
            minLength={this.minLength}
            maxLength={this.maxLength}
            max={this.max}
            min={this.min}
            pattern={this.pattern}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            inputBoxStyle={this.inputBoxStyle}
            copyButton={this.copyButton}
            onChange={this._handleChange}
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
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-input", GeneralInputElement);
