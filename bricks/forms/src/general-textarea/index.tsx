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
   * @kind string
   * @required true
   * @default -
   * @description 下拉框字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 初始值
   */
  @property()
  value: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框占位说明
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否只读
   * @group basic
   */
  @property({ type: Boolean })
  readOnly: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind `boolean / AutoSizeType`
   * @required false
   * @default -
   * @description 自适应内容高度，或自配置
   */
  @property({ attribute: false })
  autoSize: boolean | AutoSizeType;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最小长度
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
   */
  @property({
    type: Number,
  })
  max: number;

  /**
   * @kind object
   * @required false
   * @default
   * @description 输入框样式
   * @group basic
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;

  /**
   * @detail `string`
   * @description 输入变化时被触发，`event.detail` 为当前值
   */
  @event({ type: "general.textarea.change" }) changeEvent: EventEmitter<string>;
  /**
   * @detail `null`
   * @description 获得焦点时触发
   */
  @event({ type: "general.textarea.focus" }) focusEvent: EventEmitter;
  /**
   * @detail `string`
   * @description 失焦时触发，而且会传出当前输入框当前值
   */
  @event({ type: "general.textarea.blur" }) blurEvent: EventEmitter<string>;
  /**
   * @detail handleBlurReturn
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
