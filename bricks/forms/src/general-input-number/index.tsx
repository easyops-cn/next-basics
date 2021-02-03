import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralInputNumber } from "./GeneralInputNumber";
import { FormItemElement } from "@next-libs/forms";

/**
 * @id forms.general-input-number
 * @name forms.general-input-number
 * @docKind brick
 * @description 通用的数字输入框
 * @author jo
 * @slots
 * @history
 * @memo
 * > Tips: 对于 event.detail 为 `Keyboard Event` 时， 由于 react 对于合成事件的处理，打印出来的整个 `Keyboard Event` 相关属性都为 null, 但可通过单独查看某个属性来得到值（如示例所示），相关详情信息可[查看 react 合成事件](https://zh-hans.reactjs.org/docs/events.html#event-pooling)。
 * ### METHODS
 *| name           | params | description            |
 *| -------------- | ------ | ---------------------- |
 *| getFormElement | -      | 获得输入框所属表单元素 |
 * @noInheritDoc
 */
export class GeneralInputNumberElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 数字输入框字段名
   */
  @property({ attribute: false }) name: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 数字输入框字段说明
   */
  @property({ attribute: false }) label: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 数字输入框占位说明
   */
  @property({ attribute: false }) placeholder: string;
  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) required: boolean;
  /**
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   */
  @property({ attribute: false }) message: Record<string, string>;
  /**
   * @kind `number|string`
   * @required false
   * @default -
   * @description 数字输入框初始值
   */
  @property({
    attribute: false,
  })
  value: number | string;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 数字输框入步长
   */
  @property({
    attribute: false,
  })
  step = 1;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 数字输入框最小值
   */
  @property({
    type: Number,
  })
  min: number;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 数字输入框最大值
   */
  @property({
    attribute: false,
  })
  max = Infinity;

  /**
   * @kind `object`
   * @required false
   * @default
   * @description 输入框样式
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;
  /**
   * @detail `string`
   * @description 输入改变，`event.detail` 是当前值
   */
  @event({ type: "general.input.change" }) changeEvent: EventEmitter<
    number | string
  >;
  private _handleChange = (value: number | string): void => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
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
   * @detail `string|number`
   * @description 失焦时触发, 而且会传出当前输入框当前值
   */
  @event({ type: "general.input.blur" }) blurEvent: EventEmitter<
    string | number
  >;
  private _handleBlur = (): void => {
    this.blurEvent.emit(this.value);
  };
  /**
   * @detail `object`
   * @description 按下enter键触发，`event.detail` 为 [Keyboard Event](https://zh-hans.reactjs.org/docs/events.html#keyboard-events)
   */
  @event({ type: "general.input.press.enter" }) enterPressEvent: EventEmitter<
    Record<string, any>
  >;
  private _handlePressEnter = (e: KeyboardEvent): void => {
    this.enterPressEvent.emit(e);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralInputNumber
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            placeholder={this.placeholder}
            required={this.required}
            value={this.value}
            min={this.min}
            max={this.max}
            step={this.step}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            inputBoxStyle={this.inputBoxStyle}
            onChange={this._handleChange}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur as any}
            onPressEnter={this._handlePressEnter}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-input-number", GeneralInputNumberElement);
