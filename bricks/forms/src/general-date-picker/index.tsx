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
import { DisabledDateType, PickerMode } from "../interfaces";

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
 */
export class GeneralDatePickerElement extends FormItemElement {
  /* =========================== Group: basic =========================== */

  /**
   * @required true
   * @description 日期选择框字段名
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @required false
   * @description 日期选择框初始值
   * @group basic
   * @editor input
   * @editorProps {
   *   "placeholder": "eg. 2012-03-04"
   * }
   */
  @property()
  value: string;

  /**
   * @required false
   * @description 日期选择框占位说明
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @description 日期选择框字段说明
   * @required false
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

  /* =========================== Group: ui =========================== */

  /**
   * @description 是否禁用
   * @group ui
   */
  @property({ type: Boolean })
  disabled?: boolean;

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

  /* =========================== Group: advanced =========================== */

  /**
   * @description 设置选择器类型
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Date",
   *       "value": "date"
   *     },
   *     {
   *       "label": "Week",
   *       "value": "week"
   *     }
   *   ]
   * }
   * @group advanced
   */
  @property({ attribute: false })
  picker?: PickerMode = "date";

  /**
   * @description 不可选择未来日期,优先级高于disabledDate
   * @group advanced
   */
  @property({ type: Boolean })
  disabledFutureDate?: boolean;

  /**
   * @description 不可选择的日期
   * @group advanced
   */
  @property({ attribute: false })
  disabledDate?: DisabledDateType;

  /**
   * @description 快速选项
   * @group advanced
   */
  @property({ type: Boolean })
  useFastSelectBtn?: boolean;

  /* =========================== Group: style =========================== */

  /**
   * @description 输入框样式
   * @group style
   */
  @property({
    attribute: false,
  })
  inputBoxStyle?: CSSProperties;

  /**
   * @description 不可选择指定日期的过去日期
   * @group advanced
   */
  @property({ attribute: false })
  disabledBeforeDate?: string;

  /**
   * @description 不可选择指定日期的未来日期
   * @group advanced
   */
  @property({ attribute: false })
  disabledAfterDate?: string;

  /* =========================== events =========================== */

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

  /**
   * @description 弹出日历和关闭日历的回调
   */
  @event({ type: "general.date.open" }) openEvent: EventEmitter<boolean>;
  private _handleOpenChange = (open: boolean): void => {
    this.openEvent.emit(open);
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
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
            disabledFutureDate={this.disabledFutureDate}
            useFastSelectBtn={this.useFastSelectBtn}
            disabledBeforeDate={this.disabledBeforeDate}
            disabledAfterDate={this.disabledAfterDate}
            handleOpenChange={this._handleOpenChange}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-date-picker", GeneralDatePickerElement);
