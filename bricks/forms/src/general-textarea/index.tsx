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
  /* =========================== Group: basic =========================== */

  /**
   * @required true
   * @description 下拉框字段名
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @description 初始值
   * @editor textarea
   * @group basic
   */
  @property()
  value?: string;

  /**
   * @required false
   * @description 下拉框占位说明
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @required false
   * @description 下拉框字段说明
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
   * @description 最小长度
   * @group formValidation
   */
  @property({
    type: Number,
  })
  min?: number;

  /**
   * @description 最大长度
   * @group formValidation
   */
  @property({
    type: Number,
  })
  max?: number;

  /* =========================== Group: ui =========================== */

  /**
   * @default false
   * @description 是否禁用
   * @group ui
   */
  @property({
    type: Boolean,
  })
  disabled?: boolean;

  /**
   * @description 是否只读
   * @group ui
   */
  @property({ type: Boolean })
  readOnly?: boolean;

  /**
   * @description 自适应内容高度，或自配置
   * @group ui
   */
  @property({ attribute: false })
  autoSize?: boolean | AutoSizeType;

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
   * @description 设置粘贴图片上传到 OSS 的 bucketName（不设置时不支持上传图片）
   * @group advanced
   */
  @property() pasteImageBucketName?: string;

  /* =========================== events =========================== */

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
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
            pasteImageBucketName={this.pasteImageBucketName}
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
