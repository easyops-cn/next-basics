import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { DynamicFormItem } from "./DynamicFormItem";
import {
  BaseColumnsProps,
  RowProps,
  CommonItemProps,
} from "../dynamic-common-item/DynamicCommonItem";
import { FormItemElement } from "@next-libs/forms";
import { CascaderExpandTrigger, FieldNamesType } from "antd/lib/cascader";
export interface CascaderOptionType {
  value?: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  isLeaf?: boolean;
  loading?: boolean;
  children?: Array<CascaderOptionType>;
  [key: string]: any;
}

export interface CascaderProps {
  placeholder?: string;
  disabled?: boolean;
  disabledHandler?: (row: any, index: number) => boolean;
  allowClear?: boolean;
  fieldNames?: FieldNamesType;
  expandTrigger?: CascaderExpandTrigger;
  options?: CascaderOptionType[];
  showSearch?: boolean;
  limit?: number;
}
export interface InputProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  disabledHandler?: (row: any, index: number) => boolean;
  visibilityToggle?: boolean;
  max?: number;
  min?: number;
  step?: number;
}

export interface SelectProps {
  mode?: "multiple" | "tags";
  options?: Array<{
    label: string;
    value: string;
    [key: string]: any;
  }>;
  placeholder?: string;
  disabled?: boolean;
  disabledHandler?: (row: any, index: number) => boolean;
  allowClear?: boolean;
}
export interface FormItemColumnsProps extends BaseColumnsProps {
  type: "input" | "select" | "password" | "inputNumber" | "cascader";
  encrypt?: boolean;
  inputProps?: InputProps;
  selectProps?: SelectProps;
  cascaderProps?: CascaderProps;
}
/**
* @id forms.dynamic-form-item
* @name forms.dynamic-form-item
* @docKind brick
* @description 多列显示可以动态增加或删除的表单项，目前支持 input 和 select 类型
* @author jo
* @slots
* @history
* 1.137.0:支持级联菜单
* 1.99.0:新增类型 `password` 和属性 `encrypt`
* 1.91.0:新增属性 `disabledAddButton` 和 `disabledDeleteButton`
* 1.76.0:新增构件 `forms.dynamic-form-item`
* @memo
* > Tips: 另外个表单项的 `required`, `message` 等这些校验属性，在每一列的表单子项 `columns.rules` 去配置
#### FormItemColumnsProps

*| property    | type                              | required | default | description                                                                                                                       |
*| ----------- | --------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
*| name        | `string`                          | ✔️       | -       | 配置该列的 name                                                                                                                   |
*| label       | `string`                          | -        | -       | 配置该列的 label，在一列的头部显示                                                                                                |
*| rules       | `any[]`                          | -        | -       | 配置该列的的校验规则，同 [antd 的 rules](https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)，也可参见下表rules支持的类型          |
*| placeholder | `string`                          | -        | -       | 配置该列 placeholder                                                                                                              |
*| type        | `input`\| `inputNumber`\| `select`\| `password`\|`cascader` | -        | input       | 配置表单项所支持的类型 |
*| selectProps | `selectProps` | - | - | 当 type = select 时的配置项，详情可参见下表 `selectProps` 字段说明 |
*| inputProps  | `inputProps` | - | -| 当 type 为 input,inputNumber 和 password 时的配置项，详情可参见下表 `inputProps` 字段说明 |
*| disabled    | `boolean`                         | -        | -       | 该列表单项是否禁止                                                                                                                |
*| flex        |  `number` \| `string` | - | 1 | 配置每一列的宽度，数字表示每一列所占的份额，例如在三列中如果每一列配置 flex: 1, 代表这三列平均等分这一行的宽度, 如果第一列配置 flex: 2, 其他列配置 flex: 1，代表第一列宽度是其他列的两倍，其余列的宽度都一样, 更多详情信息可查看 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex) |

 *### rules 支持的校验类型

*| field    | type      | description                              |
*| -------- | --------- | ---------------------------------------- |
*| required | `boolean` | 是否必选                                 |
*| len      | `number`  | 字段长度校验                             |
*| max      | `number`  | 最大长度校验                             |
*| min      | `number`  | 最小长度校验                             |
*| pattern  | `RegExp`  | 正则表达式校验                           |
*| uniq     | `boolean` | 内置的自定义校验，会校验该列的值是否唯一 |

*### InputProps

*| property    | type                              | required | default | description                                                                                                                       |
*| ----------- | --------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
*| placeholder | `string`                          | -        | -       | 配置该列 placeholder                                                                                                              |
*| disabled    | `boolean`                         | -        | -       | 该列表单项是否禁止                                                                                                                |
*| disabledHandler | `(row: any, index: number) => viod` | -  | -       | 通过传入函数来控制每一行中每一列的表单子项是否 disbaled, `row` 为当前行的每一列表单项的值， index 为行的序号，可根据以上数据自定义每一个表单项的 disabled 逻辑, 返回 `boolean` 类型来决定是否 disabled 
*| max         | `number`                          | -        | -       | 设置 inputNumber 最大值    |
*| min         | `number`                          | -        | -       | 设置 inputNumber 最小值    |
*| step         | `number`                          | -        | -      | 设置 inputNumber 步长    |


*### SelectProps

*| property    | type                                    | required | default | description                  |
*| ----------- | --------------------------------------- | -------- | ------- | ---------------------------- |
*| placeholder | `string`                                | -        | -       | 配置该列 placeholder         |
*| disabled    | `boolean`                               | -        | -       | 该列表单项是否禁止           |
*| disabledHandler | `(row: any, index: number) => viod` | -  | -       | 通过传入函数来控制每一行中每一列的表单子项是否 disbaled, `row` 为当前行的每一列表单项的值， index 为行的序号，可根据以上数据自定义每一个表单项的 disabled 逻辑, 返回 `boolean` 类型来决定是否 disabled 
*| options     | `Array<{label: string, value: string}>` | ✔️       | -       | 下拉框候选项                 |
*| mode        | `multiple \| tags`                      | -        | -       | 设置下拉框的模式为多选或标签 |
*| allowClear  | `boolean`                               | -        | false   | 是否支持清除                 |

*### CascaderProps

*| property    | type                                    | required | default | description                  |
*| ----------- | --------------------------------------- | -------- | ------- | ---------------------------- |
*| placeholder | `string`                                | -        | -       | 配置该列 placeholder         |
*| disabled    | `boolean`                               | -        | -       | 该列表单项是否禁止           |
*| disabledHandler | `(row: any, index: number) => viod` | -  | -       | 通过传入函数来控制每一行中每一列的表单子项是否 disbaled, `row` 为当前行的每一列表单项的值， index 为行的序号，可根据以上数据自定义每一个表单项的 disabled 逻辑, 返回 `boolean` 类型来决定是否 disabled 
*| options     | `CascaderOptionType[]` | ✔️       | -       | 可选项数据源                 |
*| fieldNames        | `{label: string, value: string, children: string}`                      | -        | -       | 自定义 options 中 label name children 的字段 |
*| allowClear  | `boolean`                               | -        | true   | 是否支持清除                 |
*| expandTrigger  | `click \| hover`                               | -        | 'click'   | 次级菜单的展开方式                 |
* @noInheritDoc
*/
export class DynamicFormItemElement extends FormItemElement {
  private manualEditedValue: any[];
  /**
   * @kind `string`
   * @required true
   * @default -
   * @description 表单项字段名
   */
  @property({ attribute: false }) name: string;
  /**
   * @kind `string`
   * @required false
   * @default -
   * @description 表单项字段说明
   */
  @property({ attribute: false }) label: string;

  /**
   * @kind `any[]`
   * @required -️
   * @default -
   * @description 动态表单项的初始值，一般跟 `general-form` 搭配使用，则初始值的赋值在 `general-form` 的 `values` 属性上设置，具体格式如 demo 所示，把每一列 `name` 值作为 `key`，`value` 为该列的具体值
   */
  @property({
    attribute: false,
  })
  value: any;

  /**
   * @kind `FormItemColumnsProps[]`
   * @required true
   * @default -
   * @description 每一列表单项的配置， 详见下表
   */
  @property({
    attribute: false,
  })
  columns: FormItemColumnsProps[];

  /**
   * @kind `boolean`
   * @required ️ -
   * @default false
   * @description 是否禁止添加的按钮
   */
  @property({
    type: Boolean,
  })
  disabledAddButton: boolean;

  /**
   * @kind `boolean`
   * @required ️ -
   * @default false
   * @description 是否隐藏添加的按钮
   */
  @property({
    type: Boolean,
  })
  hideAddButton: boolean;

  /**
   * @kind `boolean`
   * @required ️ -
   * @default false
   * @description 是否禁止每一行删除的按钮
   */
  @property({
    type: Boolean,
  })
  disabledDeleteButton: boolean;

  /**
   * @kind `boolean`
   * @required ️ -
   * @default false
   * @description 是否隐藏每一行删除的按钮
   */
  @property({
    type: Boolean,
  })
  hideDeleteButton: boolean;

  /**
   * @kind `boolean`
   * @required ️ -
   * @default false
   * @deprecated
   * @description 是否显示背景样式,根据 UI 规范该表单项都会提供背景样式，故已废弃
   */
  @property({
    type: Boolean,
  })
  showBackground: boolean;

  /**
   * @kind `boolean`
   * @required ️ -
   * @default true
   * @description 是否在初始化完成后额外触发一次动态表单项的 onChange 事件, 该事件会传出当前的初始值给到用户，这里因为历史原因之前默认行为就是在初始化后会触发该事件，这里为了兼容之前的行为，默认值只能设置为 true。
   */
  @property({
    attribute: false,
  })
  emitChangeOnInit = true;

  /**
   * @required ️ -
   * @default false
   * @description 当为 `true` 时表单只剩下一行时不允许被删除，隐藏对应的删除按钮，当某一列必填时可以达到整个表单项也是必填的效果
   */
  @property({
    type: Boolean,
  })
  oneRowRequired: boolean;

  /**
   * @kind `(row:any , index: number) => boolean`
   * @required ️ -
   * @default  -
   * @description 通过传入函数来控制每一行的的删除按钮是否 disabled， `row` 为当前行的每一列表单项的值， index 为行的序号，可根据以上数据自定义每一行的 disabled 逻辑, 返回 `boolean` 类型来决定是否 disabled
   */
  @property({
    attribute: false,
  })
  rowDisabledhandler: CommonItemProps["rowDisabledhandler"];

  connectedCallback(): void {
    // Don't override user's style settings.
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
   * @detail `Record<string, any>[]`
   * @description 修改每一列数据时触发，detail 该动态表单项全部的数据
   */
  @event({ type: "item.change" }) changeEvent: EventEmitter<
    Record<string, any>[]
  >;
  private _handleChange = (data: RowProps[]) => {
    this.changeEvent.emit(data);
  };
  /**
   * @description 增加一行时触发
   */
  @event({ type: "item.add" }) addEvent: EventEmitter;
  private _handleAdd = () => {
    this.addEvent.emit();
  };
  /**
   * @detail `Record<string, any>`
   * @description 删除某一行时触发，detail 为该行的数据
   */
  @event({ type: "item.remove" }) removeEvent: EventEmitter<
    Record<string, any>
  >;

  /**
   * @params any[](类型跟 value 属性一样)
   * @description 可调用该方法设置动态表单项的值，可用在 forms 表单中在使用 `values` 赋值之后可通过该方法再次设置初始值
   */
  @method()
  setDynamicValue(value: any[]) {
    //always assign a new value
    this.manualEditedValue = [...value];
    this._render();
  }

  private _handleRemove = (data: RowProps) => {
    this.removeEvent.emit(data);
  };
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <DynamicFormItem
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            value={this.value}
            manualEditedValue={this.manualEditedValue}
            required={this.required}
            message={this.message}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            columns={this.columns}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            notRender={this.notRender}
            onAdd={this._handleAdd}
            onRemove={this._handleRemove}
            onChange={this._handleChange}
            disabledAddButton={this.disabledAddButton}
            disabledDeleteButton={this.disabledDeleteButton}
            hideAddButton={this.hideAddButton}
            hideDeleteButton={this.hideDeleteButton}
            showBackground={this.showBackground}
            emitChangeOnInit={this.emitChangeOnInit}
            oneRowRequired={this.oneRowRequired}
            rowDisabledhandler={this.rowDisabledhandler}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.dynamic-form-item", DynamicFormItemElement);
