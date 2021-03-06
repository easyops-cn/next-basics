import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import {
  CmdbInstanceSelect,
  CmdbInstanceSelectProps,
  ComplexOption,
} from "./CmdbInstanceSelect";
import { FormItemElement } from "@next-libs/forms";

/**
 * @id forms.cmdb-instance-select
 * @name forms.cmdb-instance-select
 * @docKind brick
 * @description 通过拉取 cmdb 实例数据作为数据源的下拉框
 * @author jo
 * @slots
 * @history
 * 1.44.0:新增属性 `allowClear`
 * 1.49.0:新增属性 `inputBoxStyle`
 * 1.77.0:新增属性 `extraSearchKey`
 * 1.79.0:新增事件 `forms.cmdb-instance-select.change.v2`
 * 1.117.1:新增数据类型 `fields.label`可以为数组
 * @memo
 * ### 注意
 * 该构件是下拉框对 cmdb 列表的一个简单封装，只适用于于简单的数据选择和搜索，如果涉及到复杂的数据选择，可能需要有高级的过滤（比如主机数据，需要按 IP，按主机名，按状态等过滤），则建议用：[CMDB 实例输入表单项 ](developers/brick-book/brick/cmdb-instances.cmdb-instances-input-form)
 * @noInheritDoc
 */
export class CmdbInstanceSelectElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 下拉框字段名
   */
  @property({ attribute: false }) name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框字段说明
   */
  @property({ attribute: false }) label: string;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 模型 id
   */
  @property()
  objectId: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框初始值
   */
  @property({ attribute: false }) value: string;

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
   * @description 下拉框占位说明
   */
  @property({ attribute: false }) placeholder: string;

  /**
   * @kind `multiple | tags`
   * @required false
   * @default -
   * @description 多选模式，不是多选不需要填写
   */
  @property()
  mode: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 支持清除选项
   */
  @property({
    type: Boolean,
  })
  allowClear: boolean;

  /**
   * @kind `object`
   * @required false
   * @default -
   * @description 输入框样式
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties = {};

  /**
   * @kind `{label: string[]|string, value?: string]}`
   * @required false
   * @default {label: name , value: instanceId}
   * @description 自定义 select 下拉选项的 label 和 value 字段， 默认 label 显示为模型的 name 值，value 为 instanceId
   * @group advanced
   */
  @property({
    attribute: false,
  })
  fields: CmdbInstanceSelectProps["fields"];

  /**
   * @kind `object | array`
   * @required false
   * @default -
   * @description 下拉框选项的过滤条件， 参数同 InstanceApi.postSearch 中的 query， 其中内置了关键字搜索的过滤条件，再根据用户输入合并 query 最终格式为 `$and: [internalQuery， userQuery]`
   * @group advanced
   */
  @property({
    attribute: false,
  })
  instanceQuery: CmdbInstanceSelectProps["instanceQuery"];

  firstRender = true;

  /**
   * @kind number
   * @required false
   * @default 0
   * @description 输入多少个字符才触发搜索动作， 默认 0 表示在点击下拉框时触发一次，后面每次输入都会进行搜索操作。
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
   * @group advanced
   */
  @property({
    attribute: false,
  })
  extraSearchKey: string[];

  /**
   * @kind number
   * @required false
   * @default 30
   * @description 配置搜索接口的pageSize，也是下拉框显示的条目数，默认30条
   * @group advanced
   */
  @property({
    attribute: false,
  })
  pageSize = 30;

  /**
   * @kind `default | parent`
   * @required -
   * @default default
   * @description 下拉选项的渲染方式，`default` 为默认(表示渲染在 body 当中)，`parent` 表示渲染在该元素的父节点上，当发现下拉菜单跟随页面滚动，需要设置该属性为 `parent`
   * @group advanced
   */
  @property()
  popoverPositionType: CmdbInstanceSelectProps["popoverPositionType"];

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 控制下拉框中的label显示一个或者多个，当定义`labelTemplate`时，不起作用
   * @group advanced
   */
  @property({ attribute: false })
  isMultiLabel = true;
  /**
   * @kind boolean
   * @param showSearchTip
   * @default false
   * @description 下拉列表的最后一行是否显示提示：仅显示前**项，更多结果请搜索
   * @group advanced
   */
  @property({ type: Boolean })
  showSearchTip: boolean;

  /**
   * @kind string
   * @required false
   * @default
   * @description 可自定义`label` 显示的模板
   * @group advanced
   */
  @property({ attribute: false })
  labelTemplate: string;

  updateObjectIdManual(objectId: string) {
    this.objectId = objectId;
    this.firstRender = false;
    this._render();
  }
  /**
   * @detail `string`
   * @description 选项改变触发事件, 传出的数据为当前项的值
   */
  @event({ type: "forms.cmdb-instance-select.change" })
  changeEvent: EventEmitter<string>;
  /**
   * @detail `{label: string, value: string, [key: string]: any}`
   * @description 选项改变时触发，传出的数据为当前项的值所对应的 option
   */
  @event({ type: "forms.cmdb-instance-select.change.v2" })
  changeEventV2: EventEmitter<ComplexOption>;
  handleChange = (value: string, option: ComplexOption): void => {
    this.value = value;
    this.changeEvent.emit(value);
    this.changeEventV2.emit(option);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <CmdbInstanceSelect
            value={this.value}
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
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
            minimumInputLength={this.minimumInputLength}
            allowClear={this.allowClear}
            inputBoxStyle={this.inputBoxStyle}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            extraSearchKey={this.extraSearchKey}
            pageSize={this.pageSize}
            popoverPositionType={this.popoverPositionType}
            isMultiLabel={this.isMultiLabel}
            showSearchTip={this.showSearchTip}
            labelTemplate={this.labelTemplate}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.cmdb-instance-select", CmdbInstanceSelectElement);
