import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralTextArea, BlurData } from "./GeneralTextArea";
import { FormItemElement } from "@next-libs/forms";
import { AutoSizeType } from "rc-textarea/lib/ResizableTextArea";

/**
 * @id forms.general-textarea
 * @name forms.general-textarea
 * @docKind brick
 * @description 可支持配置 autoSize, value 和 placeholder
 * @author ice
 * @slots
 * @history
 * 1.70.0:新增 `general.textarea.blur.V2` 事件
 * 1.91.0:新增 `disabled` 属性，构件正名为 `forms.general-textarea`
 * @memo
 */
export class GeneralTextAreaElement extends FormItemElement {
  /**
   * @required true
   * @description 下拉框字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @required false
   * @description 下拉框字段说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @description 初始值
   * @group basicFormItem
   */
  @property()
  value?: string;

  /**
   * @required false
   * @description 下拉框占位说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @description 是否只读
   * @group basicFormItem
   */
  @property({ type: Boolean })
  readOnly?: boolean;

  /**
   * @default false
   * @description 是否禁用
   * @group basicFormItem
   */
  @property({
    type: Boolean,
  })
  disabled?: boolean;

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
   * @description 自适应内容高度，或自配置
   * @group ui
   */
  @property({ attribute: false })
  autoSize?: boolean | AutoSizeType;

  /**
   * @description 最小长度
   * @group advancedFormItem
   */
  @property({
    type: Number,
  })
  min?: number;

  /**
   * @description 最大长度
   * @group advancedFormItem
   */
  @property({
    type: Number,
  })
  max?: number;

  /**
   * @description 输入框样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  inputBoxStyle?: React.CSSProperties;

  /**
   * @description 输入变化时被触发，`event.detail` 为当前值
   */
  @event({ type: "general.textarea.change" }) changeEvent: EventEmitter<string>;
  /**
   * @description 获得焦点时触发
   */
  @event({ type: "general.textarea.focus" }) focusEvent: EventEmitter;
  /**
   * @description 失焦时触发，而且会传出当前输入框当前值
   */
  @event({ type: "general.textarea.blur" }) blurEvent: EventEmitter<string>;
  /**
   * @description 失焦时触发，而且会传出当前输入框光标所在的前后部分
   */
  @event({ type: "general.textarea.blur.V2" })
  blurEventV2: EventEmitter<BlurData>;
  private _handleChange = (value: string): void => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };

  private _handleFocus = (): void => {
    this.focusEvent.emit();
  };

  private _handleBlur = (value: string): void => {
    this.blurEvent.emit(value);
  };

  private _handleBlurV2 = (data: BlurData): void => {
    this.blurEventV2.emit(data);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralTextArea
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            placeholder={this.placeholder}
            required={this.required}
            readOnly={this.readOnly}
            disabled={this.disabled}
            value={this.value}
            autoSize={this.autoSize}
            message={this.message}
            min={this.min}
            max={this.max}
            pattern={this.pattern}
            validator={this.validator}
            notRender={this.notRender}
            onChange={this._handleChange}
            onFocus={this._handleFocus}
            onHandleBlurV2={this._handleBlurV2}
            onHandleBlur={this._handleBlur}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            inputBoxStyle={this.inputBoxStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-text-area", GeneralTextAreaElement);

class GeneralTextAreaAlias extends GeneralTextAreaElement {}
customElements.define("forms.general-textarea", GeneralTextAreaAlias);
