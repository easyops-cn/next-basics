import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { GeneralCascader, GeneralCascaderProps } from "./GeneralCascader";
import { CascaderOptionType } from "antd/lib/cascader";
import { ProcessedOptionData, selectedDataType } from "../interfaces";

type popupPlacementType = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
type sizeType = "large" | "default" | "small";
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
 * @excludesInherit
 *  pattern
 * @memo
 * ```typescript
 *interface CascaderOptionType {
 *  value?: string;
 *  label?: string;
 *  disabled?: boolean;
 *  children?: Array<CascaderOptionType>;
 *  isLeaf?: boolean;  // 配合动态拉取数据使用，当配置 isLeaf = false，会触发动态数据拉取事件
 *  [key: string]: any;
 *}
 *```
 */

export class GeneralCascaderElement extends FormItemElement {
  private _cascaderRef = React.createRef<any>();
  /**
   * @group basicFormItem
   * @required true
   * @description 级联选择框字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * group basicFormItem
   * @required false
   * @description 级联选择框字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind CascaderOptionType[]
   * @required true
   * @default -
   * @description 可选项数据源
   */
  @property({
    attribute: false,
  })
  options: GeneralCascaderProps["options"];

  /**
   * @group basicFormItem
   * @required false
   * @default { label: 'label', value: 'value', children: 'children' }
   * @description 自定义 options 中 label name children 的字段，相关详情可查看 [fieldNames](https://3x.ant.design/components/cascader-cn/#API)
   */
  @property({
    attribute: false,
  })
  fieldNames = { label: "label", value: "value", children: "children" };

  /**
   * @group basicFormItem
   * @required false
   * @description 指定选中项
   */
  @property({
    attribute: false,
  })
  value: GeneralCascaderProps["value"];

  /**
   * @group basicFormItem
   * @required false
   * @description 输入框占位文本
   */
  @property()
  declare placeholder: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 是否必填项
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @description 校验文本信息
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   *@group basicFormItem
   * @required false
   * @default false
   * @description 表单项禁用
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default true
   * @description 是否允许删除
   */
  @property({
    attribute: false,
  })
  allowClear = true;

  /**
   * @group ui
   * @required false
   * @default true
   * @description 是否开启搜索
   */
  @property({
    attribute: false,
  })
  showSearch = true;

  /**
   * @group basicFormItem
   * @required false
   * @description 自定义的选择框后缀图标，仅支持 [antd 图标库](developers/icon?type=antd)， 配置图标的 `icon` 字段即可
   */
  @property()
  suffixIcon: string;

  /**
   * @group basicFormItem
   * @required false
   * @default click
   * @description 次级菜单的展开方式 click | hover
   * @group advanced
   */
  @property({
    attribute: false,
  })
  expandTrigger = "click" as GeneralCascaderProps["expandTrigger"];

  /**
   * @group basicFormItem
   * @required false
   * @default 暂无数据
   * @description 当下拉列表为空时显示的内容
   */
  @property()
  notFoundContent: string;

  /**
   * @group ui
   * @required false
   * @default bottomLeft
   * @description 浮层的显示位置 bottomLeft | bottomRight | topLeft | topRight
   */
  @property({
    attribute: false,
  })
  popupPlacement: popupPlacementType = "bottomLeft";

  /**
   * @group ui
   * @required false
   * @default default
   * @description 输入框大小 large | default | small
   */
  @property()
  size: sizeType;

  /**
   * @group ui
   * @required false
   * @description 级联选择器自定义样式
   */
  @property({
    attribute: false,
  })
  cascaderStyle: React.CSSProperties;

  /**
   * @group basicFormItem
   * @required false
   * @default 50
   * @description  搜索结果展示数量
   */
  @property({ attribute: false })
  limit = 50;

  /**
   * @group basic
   * @required false
   * @default false
   * @description （单选时生效）当此项为 true 时，点选每级菜单选项值都会发生变化
   */
  @property({
    attribute: false,
  })
  changeOnSelect = false;

  /**
   * @detail {value: string[], selectedOptions: CascaderOptionType[]}
   * @description 级联选择项输入变化时触发，value 为选择的值，selectedOptions 为选择的值所对应的 options
   */
  @event({ type: "cascader.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
  private _handleChange = (
    value: (string | number)[],
    selectedOptions: CascaderOptionType[]
  ): void => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit({ value, selectedOptions });
    });
  };

  /**
   * @detail {options: CascaderOptionType[],name: string}
   * @description 级联选择项options变化时触发
   */
  @event({ type: "cascader.options.change" }) optionsChange: EventEmitter<
    Record<string, any>
  >;
  private _handleOptionsChange = (
    options: CascaderOptionType[],
    name: string
  ): void => {
    Promise.resolve().then(() => {
      this.optionsChange.emit({ options, name });
    });
  };

  /**
   * @detail ProcessedOptionData
   * @description 当某一个 option 有设置 isLeaf = false 时(对于某个 option 需要动态拉取数据时，需要设置该属性，[isLeaf 详情信息](https://ant.design/components/cascader-cn/#components-cascader-demo-lazy))，选择当前项会触发该事件, layerIndex 表示选择当前项所处在的层级，curOption 表示当前层级选择项的详情信息，selectedOptions 会列出所有层级路径下所选过的 option 信息。
   */
  @event({ type: "cascader.loading.data" })
  loadingEvent: EventEmitter<ProcessedOptionData>;
  private _handleLoading = (selectedOptions: CascaderOptionType[]): void => {
    this.loadingEvent.emit({
      layerIndex: selectedOptions.length - 1,
      selectedOptions,
      curOption: selectedOptions[selectedOptions.length - 1],
    });
  };

  /**
   * @detail {selectedData:{value: string[], selectedOptions: CascaderOptionType[]},visible: boolean}
   * @description 显示/隐藏浮层的回调
   */
  @event({ type: "cascader.dropdownVisible.change" })
  dropdownVisibleChange: EventEmitter<Record<string, any>>;
  private _handleDropdownVisibleChange = (
    selectedData: selectedDataType,
    visible: boolean
  ): void => {
    Promise.resolve().then(() => {
      this.dropdownVisibleChange.emit({ selectedData, visible });
    });
  };

  /**
   *
   * @params [{curOptionData: ProcessedOptionData, childrenOptions: CascaderOptionType[]}]
   * @description 跟 `cascader.loading.data` 搭配使用，当获取下一层级的数据后，通过该方法更新数据，第一个参数就是 `cascader.loading.data` 事件传出的数据
   */
  @method() setChildrenOption(
    selectedOptions: CascaderOptionType[],
    childrenOptions: CascaderOptionType[]
  ): void {
    this._cascaderRef.current?.setChildrenOption(
      selectedOptions,
      childrenOptions
    );
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralCascader
            ref={this._cascaderRef}
            notRender={this.notRender}
            formElement={this.getFormElement()}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
            optionsChange={this._handleOptionsChange}
            dropdownVisibleChange={this._handleDropdownVisibleChange}
            size={this.size}
            limit={this.limit}
            onLoadingData={this._handleLoading}
            changeOnSelect={this.changeOnSelect}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-cascader", GeneralCascaderElement);
