import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { formatOptions, FormItemElement } from "@next-libs/forms";
import {
  CheckboxOtherOptionType,
  GeneralCheckbox,
  IconCheckboxItem,
} from "./GeneralCheckbox";
import { CheckboxValueType, CheckboxOptionType } from "antd/lib/checkbox/Group";

export type CheckboxType = "default" | "icon";

export interface OptionGroup {
  /**
   * 分组名称
   */
  name: string;
  /**
   * 分组唯一键，必填，不可重复
   */
  key: string;
  /**
   * 分组下的选项
   */
  options: (CheckboxOptionType | IconCheckboxItem)[];
}

export interface LabeledValue {
  label: string;
  value: string | number;
  disabled: boolean;
}

/**
* @id forms.general-checkbox
* @name forms.general-checkbox
* @docKind brick
* @description 通用多选框
* @author jo
* @slots
* @history
* 1.146.0:新增属性 `type`，支持复选框选项`default``icon`样式
* 1.145.0:新增属性 `isGroup``optionGroups`，支持选项分组
* @excludesInherit
*  placeholder
*  pattern
* @memo

* > Tips: 多选框与 general-form 结合使用时，通过 value 设置初始值是无效的，需要在 general-form [values](developers/brick-book/brick/forms.general-form) 属性中设置初始值。
*/
export class GeneralCheckboxElement extends FormItemElement {
  /* =========================== Group: basic =========================== */

  /**
   * @kind string
   * @required true
   * @default -
   * @description 多选框字段名
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind any[] | boolean
   * @required -
   * @default -
   * @description 输入框当前选中始值
   * @group basic
   */
  @property({
    attribute: false,
  })
  value: CheckboxValueType[];

  /**
   * @kind `string[]|number[]|LabeledValue[]`
   * @required false
   * @default -
   * @description 多选框选项表
   * @group basic
   */
  @property({
    attribute: false,
  })
  options: (CheckboxOptionType | IconCheckboxItem)[];

  /**
   * @kind string
   * @required false
   * @default -
   * @description 多选框字段说明
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @description 多选框字段说明
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
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   * @editor message
   * @group formValidation
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /* =========================== Group: ui =========================== */

  /**
   * @kind CheckboxType
   * @required false
   * @default default
   * @description 多选框样式类型(不支持分组复选框）
   * @enums "default"|"icon"
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Default",
   *       "value": "default"
   *     },
   *     {
   *       "label": "Icon",
   *       "value": "icon",
   *       "icon": {
   *         "lib": "fa",
   *         "icon": "icons",
   *         "prefix": "fas"
   *       }
   *     }
   *   ]
   * }
   * @group ui
   */
  @property({
    attribute: false,
  })
  type: CheckboxType = "default";

  /**
   * @default false
   * @required false
   * @description 在icon模式下的优化样式，增加一种自定义样式，需设置 `type` 为 `icon` 才生效
   * @group ui
   */
  @property({
    type: Boolean,
  })
  isCustom: boolean;

  /**
   * @required false
   * @description 用值1~24来表示每一列跨越的范围，如三个等宽的列可以设置`colSpan: 8`
   * @group ui
   */
  @property({
    type: Number,
  })
  colSpan: number;

  /**
   * @required false
   * @default false
   * @description 作为单个复选框使用时的禁用状态
   * @group ui
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /* =========================== Group: advanced =========================== */

  /**
   * @required false
   * @default false
   * @description 是否为分组复选框，若为 `true`，则可设置分组数据 `optionGroups`
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  isGroup: boolean;

  /**
   * @kind OptionGroup[]
   * @required true
   * @default -
   * @description 多选框选项分组数据，需要设置 `isGroup` 为 `true` 才生效
   * @group advanced
   */
  @property({
    attribute: false,
  })
  optionGroups: OptionGroup[];

  /* =========================== Group: other =========================== */

  /**
   * @required false
   * @default -
   * @description 作为单个复选框使用时的选项文本
   * @group other
   */
  @property({
    type: String,
  })
  text: string;

  /* =========================== events =========================== */

  /**
   * @detail `any[] | boolean`
   * @description 复选框变化时触发，`event.detail` 为当前选中的值列表
   */
  @event({ type: "general.checkbox.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;

  /**
   * @detail `CheckboxOptionType[]`
   * @description 复选框变化时触发，`event.detail` 为当前选中的值列表
   */
  @event({ type: "general.checkbox.change.v2" }) changeEventV2: EventEmitter<
    CheckboxOptionType[]
  >;

  /**
   * @detail `{options:CheckboxOptionType[],name:string}`
   * @description 复选框options变化时触发
   */
  @event({ type: "general.checkbox.options.change" })
  optionsChangeEvent: EventEmitter<{
    options: CheckboxOptionType | IconCheckboxItem[] | CheckboxOtherOptionType;
    name: string;
  }>;

  private _handleChange = (value: CheckboxValueType[]): void => {
    this.value = value;
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };

  private _handleChangeV2 = (value: CheckboxOptionType[]): void => {
    Promise.resolve().then(() => {
      this.changeEventV2.emit(value);
    });
  };

  private _handleOptionsChange = (
    options: CheckboxOptionType | IconCheckboxItem[] | CheckboxOtherOptionType,
    name: string
  ): void => {
    Promise.resolve().then(() => {
      this.optionsChangeEvent.emit({ options, name });
    });
  };

  formatOptionsGroup = (optionGroups: OptionGroup[]): OptionGroup[] => {
    return optionGroups?.map((v) => ({
      ...v,
      options: formatOptions(v.options),
    }));
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralCheckbox
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            required={this.required}
            options={formatOptions(this.options)}
            value={this.value}
            colSpan={this.colSpan}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            onChange={this._handleChange}
            onChangeV2={this._handleChangeV2}
            optionsChange={this._handleOptionsChange}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            optionGroups={this.formatOptionsGroup(this.optionGroups)}
            isGroup={this.isGroup}
            text={this.text}
            disabled={this.disabled}
            type={this.type}
            isCustom={this.isCustom}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-checkbox", GeneralCheckboxElement);
