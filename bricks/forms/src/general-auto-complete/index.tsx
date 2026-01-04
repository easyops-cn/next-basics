import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { GeneralAutoComplete } from "./GeneralAutoComplete";
import { OptionType } from "../interfaces";

/**
 * @id forms.general-auto-complete
 * @name forms.general-auto-complete
 * @docKind brick
 * @description 输入框自动完成功能
 * @author ice
 * @slots
 * @history
 * 1.36.0:新增构件 `forms.general-auto-complete`
 * @memo
 */
export interface GeneralAutoCompleteElementProps {
  name?: string;
  value?: string;
  options?: string[] | OptionType[];
  filterByCaption?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  message?: Record<string, string>;
  disabled?: boolean;
}


export class GeneralAutoCompleteElement extends FormItemElement  implements GeneralAutoCompleteElementProps {
  /* =========================== Group: basic =========================== */

  /**
   * @required true
   * @description 字段名
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @required false
   * @description 当前值
   * @group basic
   */
  @property()
  value: string;

  /**
   * @required true
   * @description 补全选项列表
   * @group basic
   */
  @property({ attribute: false })
  options: string[] | OptionType[];

  /**
   * @default false
   * @required false
   * @description 搜索时是否根据caption过滤options
   * @group advanced
   */
  @property({ type: Boolean })
  filterByCaption: boolean;

  /**
   * @required false
   * @description 占位说明
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @group formLabel
   * @required false
   * @description 字段说明
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
   * @group formValidation
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /* =========================== Group: ui =========================== */

  /**
   * @required false
   * @description 是否禁用
   * @group ui
   */
  @property({ attribute: false }) declare disabled: boolean;

  /* =========================== Group: style =========================== */

  /**
   * @required false
   * @description 输入框样式
   * @group style
   */
  @property({
    attribute: false,
  })
  inputBoxStyle?: CSSProperties;

  /* =========================== events =========================== */

  connectedCallback(): void {
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
   * @description 补全输入框变化时触发
   */
  @event({ type: "general.auto-complete.change" })
  changeEvent: EventEmitter<string>;
  private _handleChange = (value: string): void => {
    this.value = value;
    this._render();
    this.changeEvent.emit(value);
  };

  /**
   * @description 鼠标失去焦点时触发
   */
  @event({ type: "general.auto-complete.blur" })
  blurEvent: EventEmitter<string>;
  private _handleBlur = (): void => {
    this.blurEvent.emit(this.value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralAutoComplete
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            placeholder={this.placeholder}
            required={this.required}
            inputBoxStyle={this.inputBoxStyle}
            message={this.message}
            validator={this.validator}
            pattern={this.pattern}
            notRender={this.notRender}
            options={this.options}
            value={this.value}
            // @ts-ignore
            onChange={this._handleChange}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            disabled={this.disabled}
            filterByCaption={this.filterByCaption}
            onBlur={this._handleBlur}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "forms.general-auto-complete",
  GeneralAutoCompleteElement
);
