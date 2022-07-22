import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { GeneralInputNumberRange } from "./GeneralInputNumberRange";
import { FormItemElement } from "@next-libs/forms";

/**
 * @id forms.general-input-number-range
 * @author Ella
 * @history
 * 1.x.0: 新增构件 `forms.general-input-number-range`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralInputNumberRangeElement extends FormItemElement {
  /**
   * @required true
   * @description 数字区间输入框字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @required false
   * @description 数字区间输入框字段说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @required false
   * @description 数字区间输入框初始值
   * @group basicFormItem
   */
  @property({
    attribute: false,
  })
  value: { min?: string | number; max?: string | number };

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
  @event({ type: "general.input.change" }) changeEvent: EventEmitter<{
    min?: string | number;
    max?: string | number;
  }>;
  private _handleChange = (value: {
    min?: string | number;
    max?: string | number;
  }): void => {
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
  @event({ type: "general.input.blur" }) blurEvent: EventEmitter<{
    min?: string | number;
    max?: string | number;
  }>;
  private _handleBlur = (): void => {
    this.blurEvent.emit(this.value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralInputNumberRange
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
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
            onBlur={this._handleBlur}
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

customElements.define(
  "forms.general-input-number-range",
  GeneralInputNumberRangeElement
);