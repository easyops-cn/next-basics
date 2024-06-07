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
import { UseBrickConf } from "@next-core/brick-types";

/**
 * @id forms.general-input-number
 * @name forms.general-input-number
 * @docKind brick
 * @description 通用的数字输入框
 * @author jo
 * @slots
 * @history
 * @excludesInherit
 *  pattern
 * @memo
 * > Tips: 对于 event.detail 为 `Keyboard Event` 时， 由于 react 对于合成事件的处理，打印出来的整个 `Keyboard Event` 相关属性都为 null, 但可通过单独查看某个属性来得到值（如示例所示），相关详情信息可[查看 react 合成事件](https://zh-hans.reactjs.org/docs/events.html#event-pooling)。
 */
export class GeneralInputNumberElement extends FormItemElement {
  /* =========================== Group: basic =========================== */

  /**
   * @required true
   * @description 数字输入框字段名
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @required false
   * @description 数字输入框初始值
   * @editor number
   * @group basic
   */
  @property({
    attribute: false,
  })
  value: number | string;

  /**
   * @required false
   * @description 数字输入框占位说明
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @required false
   * @description 数字输入框字段说明
   * @group formLabel
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: formValidation =========================== */

  /**
   * @required false
   * @description 是否必填项
   * @group formValidation
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @required false
   * @description 校验文本信息
   * @editor message
   * @group formValidation
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @description 数字输入框最小值
   * @group formValidation
   */
  @property({
    type: Number,
  })
  min?: number;

  /**
   * @kind number
   * @description 数字输入框最大值
   * @group formValidation
   */
  @property({
    attribute: false,
  })
  max? = Infinity;

  /* =========================== Group: advanced =========================== */

  /**
   * @description 数字输入框步长
   * @group advanced
   */
  @property({
    attribute: false,
  })
  step? = 1;

  /**
   * @description 数值精度
   * @group advanced
   */
  @property({
    attribute: false,
  })
  precision?: number;

  /* =========================== Group: ui =========================== */

  /**
   * @description 是否禁用
   * @group ui
   */
  @property({ type: Boolean }) disabled?: boolean;

  /**
   * @description 是否只读
   * @group ui
   */
  @property({ type: Boolean }) readOnly?: boolean;

  /* =========================== Group: style =========================== */

  /**
   * @description 输入框样式
   * @group style
   */
  @property({
    attribute: false,
  })
  inputBoxStyle?: React.CSSProperties;

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default -
   * @description 后置标签，支持在input框后面添加自定义构件 具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf)
   * @group ui
   */
  @property({
    attribute: false,
  })
  addonAfter: {
    useBrick: UseBrickConf;
  };

  /* =========================== events =========================== */

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
  private _handlePressEnter = (e?: KeyboardEvent): void => {
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
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
            addonAfter={this.addonAfter}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-input-number", GeneralInputNumberElement);
