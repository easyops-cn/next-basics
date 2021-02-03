import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralTimePicker } from "./GeneralTimePicker";
import { FormItemElement } from "@next-libs/forms";
import { TimePickerProps } from "antd/lib/time-picker";

/**
 * @id forms.general-time-picker
 * @name forms.general-time-picker
 * @docKind brick
 * @description
 * @author steve
 * @slots
 * @history
 * 1.29.0:新增 `general.time.open` 和 `general.time.close` 事件
 * 1.87.0:新增 configProps 透传
 * @memo
 * > Tips: 在与 `general-form` 组合使用时， 若通过 form 下的 values 赋值给时间选择器，需要通过 `valueTypes` 申明数据类型，同时为了更方便的提交指定时间格式给后台，在申明数据后也提供了格式化时间的选项，以`|`分隔。（如上述 demo 所示）
 *  ### METHODS
 *| name           | params | description            |
 *| -------------- | ------ | ---------------------- |
 *| getFormElement | -      | 获得输入框所属表单元素 |
 * @noInheritDoc
 */
export class GeneralTimePickerElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 时间选择框字段名
   */
  @property({ attribute: false }) name: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 时间选择框字段说明
   */
  @property({ attribute: false }) label: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 时间选择框占位说明
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
   * @kind string
   * @required false
   * @default -
   * @description 时间选择框框初始值
   */
  @property()
  value: string;

  /**
   * @kind [timePickerProps](https://3x.ant.design/components/time-picker-cn/)
   * @required false
   * @default -
   * @description 透传 antd timePicker 属性
   */
  @property({ attribute: false })
  configProps: Partial<TimePickerProps>;
  /**
   * @detail `string`
   * @description 输入变化时被触发，时间变化时触发
   */
  @event({ type: "general.time.change" }) changeEvent: EventEmitter<string>;
  /**
   * @detail `string`
   * @description 面板打开时触发， 传出当前时间值
   */
  @event({ type: "general.time.open" }) openEvent: EventEmitter<string>;
  /**
   * @detail `string`
   * @description 面板关闭时触发，传出当前时间值
   */
  @event({ type: "general.time.close" }) closeEvent: EventEmitter<string>;
  private _handleChange = (value: string): void => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };

  private _handleOpenChange = (flag: boolean, value: string): void => {
    if (flag) {
      this.openEvent.emit(value);
    } else {
      this.closeEvent.emit(value);
    }
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralTimePicker
            configProps={this.configProps}
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            placeholder={this.placeholder}
            value={this.value}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            onChange={this._handleChange}
            onOpenChange={this._handleOpenChange}
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

customElements.define("forms.general-time-picker", GeneralTimePickerElement);
