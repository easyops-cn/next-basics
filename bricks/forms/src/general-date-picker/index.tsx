import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralDatePicker } from "./GeneralDatePicker";
import { FormItemElement } from "@next-libs/forms";
import { DisabledDateType } from "../interfaces";

/**
 * @id forms.general-date-picker
 * @name forms.general-date-picker
 * @docKind brick
 * @description
 * @author steve
 * @slots
 * @history
 * 1.35.0:新增 `format` 属性
 * @excludesInherit
 *  placeholder
 *  pattern
 * @memo
 * > Tips: 在与 `general-form` 组合使用时， 若通过 form 下的 values 赋值给日期选择器，需要通过 `valueTypes` 申明数据类型，同时为了更方便的提交指定时间格式给后台，在申明数据后也提供了格式化日期的选项，以`|`分隔。（如上述 demo 所示）
 *  ### METHODS
 *| name           | params | description            |
 *| -------------- | ------ | ---------------------- |
 *| getFormElement | -      | 获得输入框所属表单元素 |
 */
export class GeneralDatePickerElement extends FormItemElement {
  /**
   * @required true
   * @description 日期选择框字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @description 日期选择框字段说明
   * @required false
   * @group basicFormItem
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @required false
   * @description 日期选择框初始值
   * @group basicFormItem
   */
  @property()
  value: string;

  /**
   * @required false
   * @description 日期选择框占位说明
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
   * @description 输入框样式,CSSProperties 包含的属性可[查看](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#index),需要注意的是该属性中的 key 需要转为小驼峰命名的方式，如设置 background-color 样式其形式为 { backgroundColor: "red"}, 具体原因可 [查看](https://zh-hans.reactjs.org/docs/dom-elements.html#style)
   * @group ui
   */
  @property({
    attribute: false,
  })
  inputBoxStyle?: CSSProperties;

  /**
   * @description 是否显示时间, 当设为 `true` 时, 请同时设置 `format` 为 `YYYY-MM-DD HH:mm:ss` 使其也显示具体时，分，秒 的时间
   * @group ui
   */
  @property({
    type: Boolean,
  })
  showTime?: boolean;

  /**
   * @description 显示预览的格式，具体配置参考 [moment](https://momentjs.com/docs/#/displaying/format/)，注意，这里并非是定义给后台的数据格式，给后台的数据格式定义请参考 `general-form` 构件的 [valueTypes](developers/brick-book/brick/forms.general-form) 属性
   * @group ui
   */
  @property({
    attribute: false,
  })
  format?: string;

  /**
   * @description 设置选择器类型
   * @group basicFormItem
   */
  @property({ attribute: false })
  picker?: "date" | "week" = "date";

  /**
   * @description 不可选择的日期
   * @group basicFormItem
   */
  @property({ attribute: false })
  disabledDate?: DisabledDateType;
  /**
   * @description 是否禁用
   * @group basicFormItem
   */
  @property({ type: Boolean })
  disabled?: boolean;

  /**
   * @description 	日期变化时触发
   */
  @event({ type: "general.date.change" }) changeEvent: EventEmitter<string>;
  private _handleChange = (value: string): void => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };
  /**
   * @description 点击确定按钮触发（showTime 为 true 使用）
   */
  @event({ type: "general.date.ok" }) okEvent: EventEmitter<string>;
  private _handleOk = (value: string): void => {
    this.okEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralDatePicker
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            placeholder={this.placeholder}
            value={this.value}
            showTime={this.showTime}
            required={this.required}
            message={this.message}
            validator={this.validator}
            inputBoxStyle={this.inputBoxStyle}
            notRender={this.notRender}
            onChange={this._handleChange}
            onOk={this._handleOk}
            format={this.format}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            picker={this.picker}
            disabledDate={this.disabledDate}
            disabled={this.disabled}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-date-picker", GeneralDatePickerElement);
