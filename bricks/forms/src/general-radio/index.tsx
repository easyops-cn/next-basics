import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import {
  FormItemElement,
  formatOptions,
  GeneralOption,
} from "@next-libs/forms";
import { GeneralRadio } from "./GeneralRadio";
import { RadioGroupButtonStyle } from "antd/lib/radio";
import { UiType } from "../interfaces";
import { UseBrickConf } from "@next-core/brick-types";

export type RadioType =
  | "button"
  | "default"
  | "icon"
  | "icon-circle"
  | "icon-square"
  | "custom";

/**
 * @id forms.general-radio
 * @name forms.general-radio
 * @docKind brick
 * @description 通用的单选框
 * @author jo
 * @slots
 * @history
 * 1.207.0: `type` 属性新增  `icon-circle` 类型样式
 * 1.1.0: 构件 type 属性，添加`icon`图标类型样式
 * 1.0.0: 新增构件 `forms.general-radio`
 * @excludesInherit
 *  placeholder
 *  pattern
 * @memo
 * > Tips: 单选框与 general-form 结合使用时，通过 value 设置初始值是无效的，需要在 general-form [values](developers/brick-book/brick/forms.general-form) 属性中设置初始值。
 */
export interface GeneralRadioElementProps {
  name?: string;
  value?: any;
  options?: GeneralOption[];
  label?: string;
  required?: boolean;
  message?: Record<string, string>;
  disabled?: boolean;
  type?: RadioType;
  size?: "large" | "middle" | "small";
  uiType?: UiType;
  useBrick?: UseBrickConf;
  customStyle?: React.CSSProperties;
  buttonStyle?: RadioGroupButtonStyle;
}


export class GeneralRadioElement extends FormItemElement  implements GeneralRadioElementProps {
  /* =========================== Group: basic =========================== */

  /**
   * @kind string
   * @required true
   * @default -
   * @description 下拉框字段名
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 单选框当前选中始值
   * @group basic
   */
  @property({ attribute: false })
  value: any;

  /**
   * @required true
   * @default -
   * @description 单选框选项表，RadioType为default时，如果设置了tooltip值,可以设置tooltipIcon图标（MenuIcon 类型）,tooltipIcon颜色默认为--color-secondary-text。
   * @group basic
   */
  @property({
    attribute: false,
  })
  options: GeneralOption[];

  /* =========================== Group: formLabel =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @description 单选框字段说明
   * @group formLabel
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: formValidation =========================== */

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   * @group formValidation
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind Record<string,string>
   * @required false
   * @default -
   * @description 校验文本信息
   * @editor message
   * @group formValidation
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /* =========================== Group: ui =========================== */

  /**
   * @kind boolean
   * @required false
   * @default  false
   * @description 是否禁用
   * @group ui
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @kind RadioType
   * @required false
   * @default default
   * @description 单选框样式类型
   * @enums "button"|"default"|"icon"|"icon-circle"|"icon-square"|"custom"
   * @group ui
   */
  @property({
    attribute: false,
  })
  type: RadioType = "default";

  /**
   * @kind "large" | "middle" | "small"
   * @required false
   * @default -
   * @description 大小，只对按钮样式生效
   * @enums "large"|"middle"|"small"
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "S",
   *       "value": "small"
   *     },
   *     {
   *       "label": "M",
   *       "value": "middle"
   *     },
   *     {
   *       "label": "L",
   *       "value": "large"
   *     }
   *   ]
   * }
   * @group ui
   */
  @property({
    attribute: false,
  })
  size: "large" | "middle" | "small";

  /**
   * @kind UiType
   * @required -️
   * @default default
   * @description Ui样式，可选择 `dashboard` 样式，默认`default`
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Default",
   *       "value": ""
   *     },
   *     {
   *       "label": "Dashboard",
   *       "value": "dashboard",
   *       "icon": {
   *         "lib": "antd",
   *         "icon": "dashboard",
   *         "theme": "outlined"
   *       }
   *     }
   *   ]
   * }
   * @group ui
   */
  @property({
    attribute: false,
  })
  uiType: UiType = "default";

  /**
   * @kind `{useBrick: UseBrickConf }`
   * @required false
   * @default
   * @description 自定义radio的内容
   * @group ui
   */
  @property({
    attribute: false,
  })
  useBrick: UseBrickConf;

  /* =========================== Group: style =========================== */

  /**
   * @kind customStyle
   * @required false
   * @default -
   * @description 自定义radio的外层样式
   * @group style
   */
  @property({
    attribute: false,
  })
  customStyle: React.CSSProperties;

  /**
   * @kind RadioGroupButtonStyle
   * @required false
   * @default solid
   * @description 单选框样式
   * @group style
   */
  @property({
    attribute: false,
  })
  buttonStyle: RadioGroupButtonStyle = "solid";

  /* =========================== events =========================== */

  /**
   * @detail `string | number`
   * @description 单选框变化时被触发，`event.detail` 为选项值
   */
  @event({ type: "general.radio.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;

  /**
   * @detail `{label: string, value: any, [key: string]: any}	`
   * @description 单选框变化时被触发，`event.detail` 为当前整个选择项包含其他字段值
   */
  @event({ type: "general.radio.change.v2" }) changeEventV2: EventEmitter<{
    label: string;
    value: any;
    [key: string]: any;
  }>;

  /**
   * @detail `{options:{label: string, value: any, [key: string]: any},name:string}	`
   * @description 单选框选项列表变化时被触发
   */
  @event({ type: "general.radio.options.change" }) optionsChange: EventEmitter<{
    options: {
      label: string;
      value: any;
      [key: string]: any;
    };
    name: string;
  }>;

  private _handleChange = (value: any): void => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };

  private _handleChangeV2 = (value: {
    label: string;
    value: any;
    [key: string]: any;
  }): void => {
    Promise.resolve().then(() => {
      this.changeEventV2.emit(value);
    });
  };

  private _handleOptionsChange = (
    options: {
      label: string;
      value: any;
      [key: string]: any;
    },
    name: string
  ): void => {
    Promise.resolve().then(() => {
      this.optionsChange.emit({ options, name });
    });
  };
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralRadio
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            required={this.required}
            options={formatOptions(this.options)}
            value={this.value}
            type={this.type}
            size={this.size}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            onChange={this._handleChange}
            onChangeV2={this._handleChangeV2}
            optionsChange={this._handleOptionsChange}
            disabled={this.disabled}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            buttonStyle={this.buttonStyle}
            uiType={this.uiType}
            useBrick={this.useBrick}
            customStyle={this.customStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-radio", GeneralRadioElement);
