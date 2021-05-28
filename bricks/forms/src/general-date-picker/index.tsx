import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralDatePicker } from "./GeneralDatePicker";
import { FormItemElement } from "@next-libs/forms";

/**
 * @id forms.general-date-picker
 * @name forms.general-date-picker
 * @docKind brick
 * @description
 * @author steve
 * @slots
 * @history
 * 1.35.0:新增 `format` 属性
 * @memo
 * > Tips: 在与 `general-form` 组合使用时， 若通过 form 下的 values 赋值给日期选择器，需要通过 `valueTypes` 申明数据类型，同时为了更方便的提交指定时间格式给后台，在申明数据后也提供了格式化日期的选项，以`|`分隔。（如上述 demo 所示）
 *  ### METHODS
 *| name           | params | description            |
 *| -------------- | ------ | ---------------------- |
 *| getFormElement | -      | 获得输入框所属表单元素 |
 */
export class GeneralDatePickerElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 日期选择框字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 日期选择框字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 日期选择框初始值
   */
  @property()
  value: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 日期选择框占位说明
   */
  @property({ attribute: false }) declare placeholder: string;

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
   * @kind boolean
   * @required false
   * @default `false`
   * @description 是否显示时间, 当设为 `true` 时, 请同时设置 `format` 为 `YYYY-MM-DD HH:mm:ss` 使其也显示具体时，分，秒 的时间
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  showTime: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 显示预览的格式，具体配置参考 [moment](https://momentjs.com/docs/#/displaying/format/)，注意，这里并非是定义给后台的数据格式，给后台的数据格式定义请参考 `general-form` 构件的 [valueTypes](developers/brick-book/brick/forms.general-form) 属性
   * @group advanced
   */
  @property({
    attribute: false,
  })
  format: string;

  /**
   * @kind "date"|"week"
   * @required false
   * @default "date"
   * @description 日期选择框初始值
   * @group advanced
   */
  @property({ attribute: false })
  picker: "date" | "week" = "date";

  /**
 * @description 	日期变化时触发

 * @detail `string`
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
   * @detail `string`
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
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-date-picker", GeneralDatePickerElement);
