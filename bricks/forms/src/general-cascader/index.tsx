import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { GeneralCascader, GeneralCascaderProps } from "./GeneralCascader";
import { CascaderOptionType } from "antd/lib/cascader";

/**
 * @id forms.general-cascader
 * @name forms.general-cascader
 * @docKind brick
 * @description 从一组相关联的数据集合进行选择，用多级分类进行分隔，常见场景为省市区，公司层级，事物分类等
 * @author jo
 * @slots
 * @history
 * 1.146.0 支持`limit`属性，以及支持空格分隔，做and搜索
 * 1.x.0:新增构件 `forms.general-cascader`
 * @memo
 * ```typescript
 *interface CascaderOptionType {
 *  value?: string;
 *  label?: string;
 *  disabled?: boolean;
 *  children?: Array<CascaderOptionType>;
 *  [key: string]: any;
 *}
 *```
 * @noInheritDoc
 */
export class GeneralCascaderElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 级联选择框字段名
   */
  @property({ attribute: false }) name: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 级联选择框字段说明
   */
  @property({ attribute: false }) label: string;
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
   * @kind string[]
   * @required false
   * @default -
   * @description 指定选中项
   */
  @property({
    attribute: false,
  })
  value: GeneralCascaderProps["value"];

  /**
   * @kind `CascaderOptionType[]`
   * @required true
   * @default -
   * @description 可选项数据源
   */
  @property({
    attribute: false,
  })
  options: GeneralCascaderProps["options"];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 表单项禁用
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否允许删除
   */
  @property({
    attribute: false,
  })
  allowClear = true;

  /**
   * @kind `click | hover`
   * @required false
   * @default click
   * @description 次级菜单的展开方式
   */
  @property({
    attribute: false,
  })
  expandTrigger = "click" as GeneralCascaderProps["expandTrigger"];

  /**
   * @kind `{label: string, value: string, children: string}`
   * @required false
   * @default { label: 'label', value: 'value', children: 'children' }
   * @description 自定义 options 中 label name children 的字段，相关详情可查看 [fieldNames](https://3x.ant.design/components/cascader-cn/#API)
   */
  @property({
    attribute: false,
  })
  fieldNames = { label: "label", value: "value", children: "children" };

  /**
   * @kind string
   * @required false
   * @default 暂无数据
   * @description 当下拉列表为空时显示的内容
   */
  @property()
  notFoundContent: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 输入框占位文本
   */
  @property()
  placeholder: string;

  /**
   * @kind `bottomLeft | bottomRight | topLeft | topRight`
   * @required false
   * @default bottomLeft
   * @description 浮层的显示位置
   */
  @property({
    attribute: false,
  })
  popupPlacement = "bottomLeft";

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否开启搜索
   */
  @property({
    attribute: false,
  })
  showSearch = true;

  /**
   * @kind `large | default | small`
   * @required false
   * @default default
   * @description 输入框大小
   */
  @property()
  size: string;

  /**
   * @kind `Object`
   * @required false
   * @default -
   * @description 级联选择器自定义样式
   */
  @property({
    attribute: false,
  })
  cascaderStyle: React.CSSProperties;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 自定义的选择框后缀图标，仅支持 [antd 图标库](developers/icon?type=antd)， 配置图标的 `icon` 字段即可
   */
  @property()
  suffixIcon: string;

  /**
   * @kind numberr
   * @required false
   * @default 50
   * @description  搜索结果展示数量
   */
  @property({ attribute: false })
  limit = 50;

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
   * @detail {value: string[], selectedOptions: CascaderOptionType[]}
   * @description 级联选择项输入变化时触发，value 为选择的值，selectedOptions 为选择的值所对应的 options
   */
  @event({ type: "cascader.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
  private _handleChange = (
    value: string[],
    selectedOptions: CascaderOptionType[]
  ) => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit({ value, selectedOptions });
    });
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralCascader
            formElement={this.getFormElement()}
            label={this.label}
            labelTooltip={this.labelTooltip}
            name={this.name}
            value={this.value}
            options={this.options}
            disabled={this.disabled}
            allowClear={this.allowClear}
            expandTrigger={this.expandTrigger}
            fieldNames={this.fieldNames}
            notFoundContent={this.notFoundContent}
            placeholder={this.placeholder}
            popupPlacement={this.popupPlacement}
            showSearch={this.showSearch}
            style={this.cascaderStyle}
            required={this.required}
            message={this.message}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            suffixIcon={this.suffixIcon}
            onChange={this._handleChange}
            size={this.size}
            limit={this.limit}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-cascader", GeneralCascaderElement);
