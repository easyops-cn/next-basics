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
  maxTagCount?: number | "responsive";
  options?: Array<{
    label: string;
    value: string;
    [key: string]: any;
  }>;
  placeholder?: string;
  disabled?: boolean;
  disabledHandler?: (row: any, index: number) => boolean;
  selectedHandler?: (
    row: any,
    index: number
  ) => Array<{ label: string; value: string; [key: string]: any }>;
  allowClear?: boolean;
  popoverPositionType?: "default" | "parent";
}
export interface FormItemColumnsProps extends BaseColumnsProps {
  type:
    | "input"
    | "select"
    | "password"
    | "inputNumber"
    | "cascader"
    | "userSelect";
  encrypt?: boolean;
  inputProps?: InputProps;
  selectProps?: SelectProps;
  cascaderProps?: CascaderProps;
}
export interface DynamicFormItemElementProps {
  name?: string;
  label?: string;
  columns?: FormItemColumnsProps[];
}


/**
* @id forms.dynamic-form-item
* @name forms.dynamic-form-item
* @docKind brick
* @description 多列显示可以动态增加或删除的表单项，目前支持 input 和 select 等多种类型
* @description.en A form item displayed in multiple columns that can be dynamically added or deleted; currently supports multiple types such as input and select
* @author jo
* @slots
* @history*
* 1.209.0: `type`为`select`时候，增加 `popoverPositionType`属性
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
*| type        | `input`\| `inputNumber`\| `select`\| `userSelect`\|`password`\|`cascader` | -        | input       | 配置表单项所支持的类型 |
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
*| maxTagCount        | number\| "responsive"                      | -        | -       | 最多显示多少个 tag |
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
* @memo.en
* > Tips: For the validation properties of another form item, such as `required` and `message`, configure them in the form sub-item `columns.rules` of each column
#### FormItemColumnsProps

*| property    | type                              | required | default | description                                                                                                                       |
*| ----------- | --------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
*| name        | `string`                          | ✔️       | -       | Configure the name of the column                                                                                              |
*| label       | `string`                          | -        | -       | Configure the label of the column, displayed at the head of the column                                               |
*| rules       | `any[]`                          | -        | -       | Configure the validation rules of the column, same as [antd rules](https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99), and you can also refer to the types supported by rules in the table below|
*| placeholder | `string`                          | -        | -       | Configure the placeholder of the column                                                                                        |
*| type        | `input`\| `inputNumber`\| `select`\| `userSelect`\|`password`\|`cascader` | -        | input       | Configure the types supported by the form item|
*| selectProps | `selectProps` | - | - | Configuration items when type = select; for details, see the `selectProps` field description in the table below|
*| inputProps  | `inputProps` | - | -| Configuration items when type is input, inputNumber and password; for details, see the `inputProps` field description in the table below|
*| disabled    | `boolean`                         | -        | -       | Whether the form sub-item of the column is disabled                                                                       |
*| flex        |  `number` \| `string` | - | 1 | Configure the width of each column; the number represents the share of each column, for example, among three columns, if each column is configured with flex: 1, the three columns equally divide the width of the row, and if the first column is configured with flex: 2 and the other columns with flex: 1, the width of the first column is twice that of the other columns and the rest of the columns have the same width; for more details, see [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)|

 *### Validation types supported by rules

*| field    | type      | description                              |
*| -------- | --------- | ---------------------------------------- |
*| required | `boolean` | Whether it is required                |
*| len      | `number`  | Field length validation             |
*| max      | `number`  | Maximum length validation           |
*| min      | `number`  | Minimum length validation           |
*| pattern  | `RegExp`  | Regular expression validation      |
*| uniq     | `boolean` | Built-in custom validation, which validates whether the value of the column is unique|

*### InputProps

*| property    | type                              | required | default | description                                                                                                                       |
*| ----------- | --------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
*| placeholder | `string`                          | -        | -       | Configure the placeholder of the column                                                                                        |
*| disabled    | `boolean`                         | -        | -       | Whether the form sub-item of the column is disabled                                                                       |
*| disabledHandler | `(row: any, index: number) => viod` | -  | -       | Control whether the form sub-item of each column in each row is disabled by passing in a function, `row` is the value of the form sub-item of each column in the current row, index is the row number, you can customize the disabled logic of each form item based on the above data, and return a `boolean` type to decide whether it is disabled
*| max         | `number`                          | -        | -       | Set the maximum value of inputNumber|
*| min         | `number`                          | -        | -       | Set the minimum value of inputNumber|
*| step         | `number`                          | -        | -      | Set the step of inputNumber|


*### SelectProps

*| property    | type                                    | required | default | description                  |
*| ----------- | --------------------------------------- | -------- | ------- | ---------------------------- |
*| placeholder | `string`                                | -        | -       | Configure the placeholder of the column|
*| disabled    | `boolean`                               | -        | -       | Whether the form sub-item of the column is disabled|
*| disabledHandler | `(row: any, index: number) => viod` | -  | -       | Control whether the form sub-item of each column in each row is disabled by passing in a function, `row` is the value of the form sub-item of each column in the current row, index is the row number, you can customize the disabled logic of each form item based on the above data, and return a `boolean` type to decide whether it is disabled
*| options     | `Array<{label: string, value: string}>` | ✔️       | -       | Dropdown candidates     |
*| mode        | `multiple \| tags`                      | -        | -       | Set the mode of the dropdown to multiple or tags|
*| maxTagCount        | number\| "responsive"                      | -        | -       | Maximum number of tags to display|
*| allowClear  | `boolean`                               | -        | false   | Whether clearing is supported|

*### CascaderProps

*| property    | type                                    | required | default | description                  |
*| ----------- | --------------------------------------- | -------- | ------- | ---------------------------- |
*| placeholder | `string`                                | -        | -       | Configure the placeholder of the column|
*| disabled    | `boolean`                               | -        | -       | Whether the form sub-item of the column is disabled|
*| disabledHandler | `(row: any, index: number) => viod` | -  | -       | Control whether the form sub-item of each column in each row is disabled by passing in a function, `row` is the value of the form sub-item of each column in the current row, index is the row number, you can customize the disabled logic of each form item based on the above data, and return a `boolean` type to decide whether it is disabled
*| options     | `CascaderOptionType[]` | ✔️       | -       | Candidate data source   |
*| fieldNames        | `{label: string, value: string, children: string}`                      | -        | -       | Customize the label, name and children fields in options|
*| allowClear  | `boolean`                               | -        | true   | Whether clearing is supported|
*| expandTrigger  | `click \| hover`                               | -        | 'click'   | How the submenu is expanded|
*/

export class DynamicFormItemElement extends FormItemElement  implements DynamicFormItemElementProps {
  private manualEditedValue: any[];

  /**
   * @required true
   * @description 表单项字段名
   * @description.en Form item field name
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @required false
   * @description 表单项字段说明
   * @description.en Form item field description
   * @group basicFormItem
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @description 每一列表单项的配置， 详见下表
   * @description.en Configuration of the form sub-item of each column, see the table below
   * @group basicFormItem
   */
  @property({
    attribute: false,
  })
  columns: FormItemColumnsProps[];

  /**
   * @description 动态表单项的初始值，一般跟 `general-form` 搭配使用，则初始值的赋值在 `general-form` 的 `values` 属性上设置，具体格式如 demo 所示，把每一列 `name` 值作为 `key`，`value` 为该列的具体值
   * @description.en Initial value of the dynamic form item, generally used together with `general-form`, in which case the initial value is assigned to the `values` property of `general-form`; the specific format is shown in the demo, where each column's `name` value is used as the `key` and `value` is the specific value of the column
   * @group basicFormItem
   */
  @property({
    attribute: false,
  })
  value?: any;

  /**
   * @default false
   * @description 当为 `true` 时表单只剩下一行时不允许被删除，隐藏对应的删除按钮，当某一列必填时可以达到整个表单项也是必填的效果
   * @description.en When it is `true`, the form is not allowed to be deleted when only one row remains and the corresponding delete button is hidden; when a column is required, the whole form item can also be made required
   * @group basicFormItem
   */
  @property({
    type: Boolean,
  })
  oneRowRequired?: boolean;

  /**
   * @default false
   * @description 是否禁止添加的按钮
   * @description.en Whether the add button is disabled
   * @group ui
   */
  @property({
    type: Boolean,
  })
  disabledAddButton?: boolean;

  /**
   * @default false
   * @description 是否隐藏添加的按钮
   * @description.en Whether the add button is hidden
   * @group ui
   */
  @property({
    type: Boolean,
  })
  hideAddButton?: boolean;

  /**
   * @default false
   * @description 是否隐藏每一行删除的按钮
   * @description.en Whether the delete button of each row is hidden
   * @group ui
   */
  @property({
    type: Boolean,
  })
  hideDeleteButton?: boolean;

  /**
   * @default false
   * @description 是否禁止每一行删除的按钮
   * @description.en Whether the delete button of each row is disabled
   * @group ui
   */
  @property({
    type: Boolean,
  })
  disabledDeleteButton?: boolean;

  /**
   * @kind (row:any , index: number) => boolean
   * @description 通过传入函数来控制每一行的的删除按钮是否 disabled， `row` 为当前行的每一列表单项的值， index 为行的序号，可根据以上数据自定义每一行的 disabled 逻辑, 返回 `boolean` 类型来决定是否 disabled
   * @description.en Control whether the delete button of each row is disabled by passing in a function, `row` is the value of the form sub-item of each column in the current row, index is the row number, you can customize the disabled logic of each row based on the above data, and return a `boolean` type to decide whether it is disabled
   * @group other
   */
  @property({
    attribute: false,
  })
  rowDisabledhandler?: CommonItemProps["rowDisabledhandler"];

  /**
   * @default true
   * @description 是否在初始化完成后额外触发一次动态表单项的 onChange 事件, 该事件会传出当前的初始值给到用户，这里因为历史原因之前默认行为就是在初始化后会触发该事件，这里为了兼容之前的行为，默认值只能设置为 true。
   * @description.en Whether to additionally trigger the onChange event of the dynamic form item once after initialization; this event passes the current initial value to the user, and here for historical reasons the previous default behavior was to trigger this event after initialization, so for compatibility with the previous behavior the default value can only be set to true.
   * @group other
   */
  @property({
    attribute: false,
  })
  emitChangeOnInit? = true;

  /**
   * @default false
   * @deprecated
   * @description 是否显示背景样式,根据 UI 规范该表单项都会提供背景样式，故已废弃
   * @description.en Whether to show the background style; according to the UI specification this form item always provides a background style, so it is deprecated
   * @group other
   */
  @property({
    type: Boolean,
  })
  showBackground?: boolean;

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
   * @description 修改每一列数据时触发，detail 该动态表单项全部的数据
   * @description.en Triggered when the data of each column is modified, detail is all the data of this dynamic form item
   */
  @event({ type: "item.change" }) changeEvent: EventEmitter<
    Record<string, any>[]
  >;
  private _handleChange = (data: RowProps[]) => {
    this.changeEvent.emit(data);
  };
  /**
   * @description 增加一行时触发
   * @description.en Triggered when a row is added
   */
  @event({ type: "item.add" }) addEvent: EventEmitter;
  private _handleAdd = () => {
    this.addEvent.emit();
  };
  /**
   * @description 删除某一行时触发，detail 为该行的数据
   * @description.en Triggered when a row is deleted, detail is the data of that row
   */
  @event({ type: "item.remove" }) removeEvent: EventEmitter<
    Record<string, any>
  >;

  /**
   * @description 可调用该方法设置动态表单项的值，可用在 forms 表单中在使用 `values` 赋值之后可通过该方法再次设置初始值
   * @description.en Call this method to set the value of the dynamic form item; it can be used to set the initial value again through this method after assigning a value with `values` in a forms form
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
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
