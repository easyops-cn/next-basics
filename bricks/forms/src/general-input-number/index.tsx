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
 * @excludesInherit
 *  placeholder
 * @memo
 * > Tips: 对于 event.detail 为 `Keyboard Event` 时， 由于 react 对于合成事件的处理，打印出来的整个 `Keyboard Event` 相关属性都为 null, 但可通过单独查看某个属性来得到值（如示例所示），相关详情信息可[查看 react 合成事件](https://zh-hans.reactjs.org/docs/events.html#event-pooling)。
 */
export class GeneralInputNumberElement extends FormItemElement {
  /**
   * @required true
   * @description 数字输入框字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @required false
   * @description 数字输入框字段说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @required false
   * @description 数字输入框初始值
   * @group basicFormItem
   */
  @property({
    attribute: false,
  })
  value: number | string;

  /**
   * @required false
   * @description 数字输入框占位说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @required false
   * @description 是否必填项
   * @group basicFormItem
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @required false
   * @description 校验文本信息
   * @group basicFormItem
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @description 是否禁用
   * @group basicFormItem
   */
  @property({ type: Boolean }) disabled?: boolean;

  /**
   * @description 是否只读
   * @group basicFormItem
   */
  @property({ type: Boolean }) readOnly?: boolean;

  /**
   * @description 输入框样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  inputBoxStyle?: React.CSSProperties;

  /**
   * @description 数字输框入步长
   * @group advancedFormItem
   */
  @property({
    attribute: false,
  })
  step? = 1;

  /**
   * @description 数值精度
   * @group advancedFormItem
   */
  @property({
    attribute: false,
  })
  precision?: number;

  /**
   * @description 数字输入框最小值
   * @group advancedFormItem
   */
  @property({
    type: Number,
  })
  min?: number;

  /**
   * @kind number
   * @description 数字输入框最大值
   * @group advancedFormItem
   */
  @property({
    attribute: false,
  })
  max? = Infinity;

  /**
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
   * @description 	获得焦点时触发
   */
  @event({ type: "general.input.focus" }) focusEvent: EventEmitter;
  private _handleFocus = (): void => {
    this.focusEvent.emit();
  };
  /**
   * @description 失焦时触发, 而且会传出当前输入框当前值
   */
  @event({ type: "general.input.blur" }) blurEvent: EventEmitter<
    string | number
  >;
  private _handleBlur = (): void => {
    this.blurEvent.emit(this.value);
  };
  /**
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
            readOnly={this.readOnly}
            disabled={this.disabled}
            value={this.value}
            min={this.min}
            max={this.max}
            step={this.step}
            precision={this.precision}
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
