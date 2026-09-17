import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { UseBrickConf } from "@next-core/brick-types";
import { ComplexOption } from "@next-libs/cmdb-instances";

import {
  CmdbInstanceSelectFormItem,
  CmdbInstanceSelectFormItemProps,
} from "./CmdbInstanceSelectFormItem";

export interface CmdbInstanceSelectElementProps {
  name?: string;
  value?: string;
  placeholder?: string;
  objectId?: string;
  label?: string;
  required?: boolean;
  message?: Record<string, string>;
  disabled?: boolean;
  allowClear?: boolean;
  mode?: string;
  popoverPositionType?: CmdbInstanceSelectFormItemProps["popoverPositionType"];
  inputBoxStyle?: React.CSSProperties;
  instanceQuery?: CmdbInstanceSelectFormItemProps["instanceQuery"];
  fields?: CmdbInstanceSelectFormItemProps["fields"];
  labelTemplate?: string;
  extraSearchKey?: string[];
  extraFields?: string[];
  suffix?: {
    useBrick: UseBrickConf;
  };
  dropdownStyle?: React.CSSProperties;
  blurAfterValueChanged?: boolean;
  useExternalCmdbApi?: boolean;
  sort?: Record<string, number | string>[];
  useBrickVisible?: boolean;
}

/**
 * @id forms.cmdb-instance-select
 * @name forms.cmdb-instance-select
 * @docKind brick
 * @description 通过拉取 cmdb 实例数据作为数据源的下拉框
 * @description.en A dropdown that pulls cmdb instance data as the data source
 * @author jo
 * @slots
 * @history
 * 1.190.0:新增属性 `permission`
 * 1.117.1:新增数据类型 `fields.label`可以为数组
 * 1.79.0:新增事件 `forms.cmdb-instance-select.change.v2`
 * 1.77.0:新增属性 `extraSearchKey`
 * 1.49.0:新增属性 `inputBoxStyle`
 * 1.44.0:新增属性 `allowClear`
 * @memo
 * ### 注意
 * 该构件是下拉框对 cmdb 列表的一个简单封装，只适用于于简单的数据选择和搜索，如果涉及到复杂的数据选择，可能需要有高级的过滤（比如主机数据，需要按 IP，按主机名，按状态等过滤），则建议用：[CMDB 实例输入表单项 ](developers/brick-book/brick/cmdb-instances.cmdb-instances-input-form)
 * @memo.en
 * ### Note
 * This brick is a simple wrapper of a dropdown around the cmdb list. It is only suitable for simple data selection and search. If complex data selection is involved and advanced filtering may be needed (for example, host data needs to be filtered by IP, hostname, status, etc.), it is recommended to use: [CMDB Instance Input Form Item ](developers/brick-book/brick/cmdb-instances.cmdb-instances-input-form)
 */

export class CmdbInstanceSelectElement
  extends FormItemElement
  implements CmdbInstanceSelectElementProps
{
  /* =========================== Group: basic =========================== */

  /**
   * @kind string
   * @required true
   * @default -
   * @description 下拉框字段名
   * @description.en Field name of the dropdown
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框初始值
   * @description.en Initial value of the dropdown
   * @group basic
   */
  @property({ attribute: false }) value: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框占位说明
   * @description.en Placeholder text of the dropdown
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 模型 id
   * @description.en Model id
   * @group basic
   */
  @property()
  objectId: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框字段说明
   * @description.en Field description of the dropdown
   * @group formLabel
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: formValidation =========================== */

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   * @description.en Whether it is required
   * @group formValidation
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   * @description.en Validation message
   * @editor message
   * @group formValidation
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /* =========================== Group: ui =========================== */

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用
   * @description.en Whether to disable
   * @group ui
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 支持清除选项
   * @description.en Support clearing the selected option
   * @group ui
   */
  @property({
    type: Boolean,
  })
  allowClear: boolean;

  /**
   * @kind `multiple | tags`
   * @required false
   * @default -
   * @description 多选模式，不是多选不需要填写
   * @description.en Multiple mode; no need to fill in when multiple selection is not required
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "None",
   *       "value": ""
   *     },
   *     {
   *       "label": "Multiple",
   *       "value": "multiple"
   *     },
   *     {
   *       "label": "Tags",
   *       "value": "tags"
   *     }
   *   ]
   * }
   * @group ui
   */
  @property()
  mode: string;

  /**
   * @kind `default | parent`
   * @required -
   * @default default
   * @description 下拉选项的渲染方式，`default` 为默认(表示渲染在 body 当中)，`parent` 表示渲染在该元素的父节点上，当发现下拉菜单跟随页面滚动，需要设置该属性为 `parent`
   * @description.en Rendering method of the dropdown options: `default` is the default (rendered in the body), `parent` means rendering on the parent node of this element; when the dropdown menu is found to scroll with the page, set this property to `parent`
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Default",
   *       "value": "default"
   *     },
   *     {
   *       "label": "Parent",
   *       "value": "parent"
   *     }
   *   ]
   * }
   * @group ui
   */
  @property()
  popoverPositionType: CmdbInstanceSelectFormItemProps["popoverPositionType"];

  /**
   * @default false
   * @description 下拉列表的最后一行是否显示提示：仅显示前**项，更多结果请搜索
   * @description.en Whether the last row of the dropdown list shows a tip: only the first ** items are displayed, please search for more results
   * @group ui
   */
  @property({ type: Boolean })
  showSearchTip?: boolean;

  /**
   * @default true
   * @required false
   * @description 下拉框中是否启用tooltip显示label全称,label过长时可使用
   * @description.en Whether to enable tooltip in the dropdown to show the full label; can be used when the label is too long
   * @group ui
   */
  @property({ attribute: false })
  showTooltip?: boolean = true;

  /* =========================== Group: style =========================== */

  /**
   * @kind `object`
   * @required false
   * @default -
   * @description 输入框样式
   * @description.en Input box style
   * @group style
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties = {};

  /* =========================== Group: advanced =========================== */

  /**
   * @kind number
   * @required false
   * @default 30
   * @description 配置搜索接口的pageSize，也是下拉框显示的条目数，默认30条
   * @description.en Configure the pageSize of the search API, which is also the number of items displayed in the dropdown, 30 by default
   * @group advanced
   */
  @property({
    attribute: false,
  })
  pageSize = 30;

  /**
   * @kind `object | array`
   * @required false
   * @default -
   * @description 下拉框选项的过滤条件， 参数同 InstanceApi.postSearch 中的 query， 其中内置了关键字搜索的过滤条件，再根据用户输入合并 query 最终格式为 `$and: [internalQuery， userQuery]`
   * @description.en Filter conditions for the dropdown options; the parameters are the same as the query in InstanceApi.postSearch, with the filter conditions for keyword search built in, and the query is finally merged with the user input into the format `$and: [internalQuery， userQuery]`
   * @group advanced
   */
  @property({
    attribute: false,
  })
  instanceQuery: CmdbInstanceSelectFormItemProps["instanceQuery"];

  /**
   * @kind `{label: string[]|string, value?: string]}`
   * @required false
   * @default {label: name , value: instanceId}
   * @description 自定义 select 下拉选项的 label 和 value 字段， 默认 label 显示为模型的 name 值，value 为 instanceId
   * @description.en Customize the label and value fields of the select dropdown options; by default the label shows the model's name value and the value is the instanceId
   * @group advanced
   */
  @property({
    attribute: false,
  })
  fields: CmdbInstanceSelectFormItemProps["fields"];

  /**
   * @kind string
   * @required false
   * @default
   * @description 可自定义`label`显示的模板
   * @description.en A template can be customized to display the `label`
   * @group advanced
   */
  @property({ attribute: false })
  labelTemplate: string;

  /**
   * @kind number
   * @required false
   * @default 0
   * @description 输入多少个字符才触发搜索动作， 默认 0 表示在点击下拉框时触发一次，后面每次输入都会进行搜索操作。
   * @description.en How many characters must be entered to trigger the search action; the default 0 means it is triggered once when the dropdown is clicked, and a search is performed on every input afterwards.
   * @group advanced
   */
  @property({
    attribute: false,
  })
  minimumInputLength = 0;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 配置额外的字段进行搜索，默认的是 label，若配置为 ["memo"]，则会基于 memo 和 label 两个字段进行联合搜索
   * @description.en Configure extra fields for searching; the default is label; if configured as ["memo"], a joint search is performed based on both the memo and label fields
   * @group advanced
   */
  @property({
    attribute: false,
  })
  extraSearchKey: string[];

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 配置接口需要返回的额外字段
   * @description.en Configure the extra fields that the API needs to return
   * @group advanced
   */
  @property({
    attribute: false,
  })
  extraFields: string[];

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 控制下拉框中的label显示一个或者多个，当定义`labelTemplate`时，不起作用
   * @description.en Control whether the label in the dropdown shows one or multiple values; it has no effect when `labelTemplate` is defined
   * @group advanced
   */
  @property({ attribute: false })
  isMultiLabel = true;

  /**
   * @kind Array<"read" | "update" | "operate">
   * @default
   * @description 按照权限过滤实例
   * @description.en Filter instances by permission
   * @group advanced
   */
  @property({ attribute: false })
  permission?: Array<"read" | "update" | "operate">;

  /**
   * @kind boolean
   * @default
   * @description 是否忽略不存在字段
   * @description.en Whether to ignore non-existent fields
   * @group advanced
   */
  @property({ attribute: false })
  ignoreMissingFieldError?: boolean;

  /**
   * @default boolean
   * @required
   * @description 实例通过showKey自定义展示
   * @description.en Instances are displayed in a custom way through showKey
   * @group advanced
   */
  @property({ attribute: false })
  showKeyField?: boolean;

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default -
   * @description 支持在文本后添加自定义构件 具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf)
   * @description.en Support adding a custom brick after the text, see [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf) for details
   * @group ui
   */
  @property({
    attribute: false,
  })
  suffix: {
    useBrick: UseBrickConf;
  };

  /* =========================== events =========================== */

  firstRender = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 下拉菜单和选择器同宽
   * @description.en The dropdown menu has the same width as the selector
   * @group ui
   */
  @property({
    attribute: false,
  })
  dropdownMatchSelectWidth = true;

  /**
   * @kind object
   * @required false
   * @default -
   * @description 设置下拉框容器的样式
   * @description.en Set the style of the dropdown container
   * @group style
   */
  @property({
    attribute: false,
  })
  dropdownStyle: React.CSSProperties = {};

  /**
   * @default boolean
   * @required
   * @description 是否在选完值后取消聚焦
   * @description.en Whether to blur after a value is selected
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  blurAfterValueChanged: boolean;

  /**
   * @default false
   * @required
   * @description 使用外部数据源
   * @description.en Use an external data source
   */
  @property({
    type: Boolean,
  })
  useExternalCmdbApi: boolean;

  /**
   * @default false
   * @required
   * @description 外部数据源id
   * @description.en External data source id
   */
  @property({
    attribute: false,
  })
  externalSourceId = "";

  /**
   * @kind Record<string, number | string>[]
   * @required false
   * @default -
   * @description 配置接口返回数据的排序规则
   * @description.en Configure the sorting rules for the data returned by the API
   * @group advanced
   */
  @property({
    attribute: false,
  })
  sort: Record<string, number | string>[];

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 结合popover构件，当此构件为popoverBrick的内部构件时，popover构件会透穿 visible 属性,便于聚焦当前select框
   * @description.en Works with the popover brick: when this brick is an inner brick of popoverBrick, the popover brick passes through the visible property so that the current select box can be focused easily
   */
  @property({ attribute: false })
  useBrickVisible: boolean;

  updateObjectIdManual(objectId: string) {
    this.objectId = objectId;
    this.firstRender = false;
    this._render();
  }
  /**
   * @detail `string`
   * @description 选项改变触发事件, 传出的数据为当前项的值
   * @description.en Event triggered when the option changes; the emitted data is the value of the current item
   */
  @event({ type: "forms.cmdb-instance-select.change" })
  changeEvent: EventEmitter<string>;
  /**
   * @detail `{label: string, value: string, [key: string]: any}`
   * @description 选项改变时触发，传出的数据为当前项的值所对应的 option
   * @description.en Triggered when the option changes; the emitted data is the option corresponding to the value of the current item
   */
  @event({ type: "forms.cmdb-instance-select.change.v2" })
  changeEventV2: EventEmitter<ComplexOption>;
  handleChange = (value: string, option: ComplexOption): void => {
    this.value = value;
    this.changeEvent.emit(value);
    this.changeEventV2.emit(option);
  };
  /**
   * @detail `{options:ComplexOption[],name:string}	`
   * @description 下拉列表变化时触发
   * @description.en Triggered when the dropdown list changes
   */
  @event({ type: "forms.cmdb-instance-select.options.change" })
  optionsChange: EventEmitter<{
    options: ComplexOption[];
    name: string;
  }>;
  handleOptionsChange = (options: ComplexOption[], name: string): void => {
    this.optionsChange.emit({ options, name });
  };
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <CmdbInstanceSelectFormItem
            value={this.value}
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            mode={this.mode}
            placeholder={this.placeholder}
            required={this.required}
            objectId={this.objectId}
            fields={this.fields}
            instanceQuery={this.instanceQuery}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            firstRender={this.firstRender}
            onChange={this.handleChange}
            optionsChange={this.handleOptionsChange}
            minimumInputLength={this.minimumInputLength}
            allowClear={this.allowClear}
            inputBoxStyle={this.inputBoxStyle}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            extraSearchKey={this.extraSearchKey}
            extraFields={this.extraFields}
            pageSize={this.pageSize}
            popoverPositionType={this.popoverPositionType}
            isMultiLabel={this.isMultiLabel}
            showSearchTip={this.showSearchTip}
            labelTemplate={this.labelTemplate}
            disabled={this.disabled}
            permission={this.permission}
            showTooltip={this.showTooltip}
            ignoreMissingFieldError={this.ignoreMissingFieldError}
            showKeyField={this.showKeyField}
            dropdownMatchSelectWidth={this.dropdownMatchSelectWidth}
            dropdownStyle={this.dropdownStyle}
            blurAfterValueChanged={this.blurAfterValueChanged}
            sort={this.sort}
            suffix={this.suffix}
            useBrickVisible={this.useBrickVisible}
            useExternalCmdbApi={this.useExternalCmdbApi}
            externalSourceId={this.externalSourceId}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.cmdb-instance-select", CmdbInstanceSelectElement);
