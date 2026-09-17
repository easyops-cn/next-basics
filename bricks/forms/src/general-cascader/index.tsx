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

export interface GeneralCascaderElementProps {
  name?: string;
  label?: string;
  options?: GeneralCascaderProps["options"];
  value?: GeneralCascaderProps["value"];
  placeholder?: string;
  required?: boolean;
  message?: Record<string, string>;
  disabled?: boolean;
  suffixIcon?: string;
  notFoundContent?: string;
  popupPlacement?: popupPlacementType;
  size?: sizeType;
  cascaderStyle?: React.CSSProperties;
}




/**
 * @id forms.general-cascader
 * @name forms.general-cascader
 * @docKind brick
 * @description 从一组相关联的数据集合进行选择，用多级分类进行分隔，常见场景为省市区，公司层级，事物分类等
 * @description.en Select from a set of related data collections, separated by multi-level categories. Common scenarios include province/city/district, company hierarchy, and item classification
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
 * @memo.en
 * ```typescript
 *interface CascaderOptionType {
 *  value?: string;
 *  label?: string;
 *  disabled?: boolean;
 *  children?: Array<CascaderOptionType>;
 *  isLeaf?: boolean;  // Used together with dynamic data fetching. When isLeaf = false is configured, the dynamic data fetching event will be triggered
 *  [key: string]: any;
 *}
 *```
 */

export class GeneralCascaderElement extends FormItemElement  implements GeneralCascaderElementProps {
  private _cascaderRef = React.createRef<any>();
  /**
   * @group basicFormItem
   * @required true
   * @description 级联选择框字段名
   * @description.en Field name of the cascader
   */
  @property({ attribute: false }) declare name: string;

  /**
   * group basicFormItem
   * @required false
   * @description 级联选择框字段说明
   * @description.en Field description of the cascader
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind CascaderOptionType[]
   * @required true
   * @default -
   * @description 可选项数据源
   * @description.en Data source of the options
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
   * @description.en Customize the label, name and children fields in options. For details, see [fieldNames](https://3x.ant.design/components/cascader-cn/#API)
   */
  @property({
    attribute: false,
  })
  fieldNames = { label: "label", value: "value", children: "children" };

  /**
   * @group basicFormItem
   * @required false
   * @description 指定选中项
   * @description.en Specify the selected item
   */
  @property({
    attribute: false,
  })
  value: GeneralCascaderProps["value"];

  /**
   * @group basicFormItem
   * @required false
   * @description 输入框占位文本
   * @description.en Placeholder text of the input
   */
  @property()
  declare placeholder: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 是否必填项
   * @description.en Whether the field is required
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @description 校验文本信息
   * @description.en Validation message text
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   *@group basicFormItem
   * @required false
   * @default false
   * @description 表单项禁用
   * @description.en Disable the form item
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
   * @description.en Whether deletion is allowed
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
   * @description.en Whether to enable search
   */
  @property({
    attribute: false,
  })
  showSearch = true;

  /**
   * @group basicFormItem
   * @required false
   * @description 自定义的选择框后缀图标，仅支持 [antd 图标库](developers/icon?type=antd)， 配置图标的 `icon` 字段即可
   * @description.en Custom suffix icon of the select box. Only the [antd icon library](developers/icon?type=antd) is supported; just configure the `icon` field of the icon
   */
  @property()
  suffixIcon: string;

  /**
   * @group basicFormItem
   * @required false
   * @default click
   * @description 次级菜单的展开方式 click | hover
   * @description.en Expand trigger of the submenu: click | hover
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
   * @description.en Content displayed when the dropdown list is empty
   */
  @property()
  notFoundContent: string;

  /**
   * @group ui
   * @required false
   * @default bottomLeft
   * @description 浮层的显示位置 bottomLeft | bottomRight | topLeft | topRight
   * @description.en Display position of the popup: bottomLeft | bottomRight | topLeft | topRight
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
   * @description.en Size of the input: large | default | small
   */
  @property()
  size: sizeType;

  /**
   * @group ui
   * @required false
   * @description 级联选择器自定义样式
   * @description.en Custom style of the cascader
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
   * @description.en Number of search results displayed
   */
  @property({ attribute: false })
  limit = 50;

  /**
   * @group basic
   * @required false
   * @default false
   * @description （单选时生效）当此项为 true 时，点选每级菜单选项值都会发生变化
   * @description.en (Effective in single select mode) When this item is true, the selected value changes each time an option at any level is clicked
   */
  @property({
    attribute: false,
  })
  changeOnSelect = false;

  /**
   * @detail {value: string[], selectedOptions: CascaderOptionType[]}
   * @description 级联选择项输入变化时触发，value 为选择的值，selectedOptions 为选择的值所对应的 options
   * @description.en Triggered when the cascader input changes; value is the selected value, and selectedOptions are the options corresponding to the selected value
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
   * @description.en Triggered when the cascader options change
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
   * @description.en When an option has isLeaf = false set (when data needs to be dynamically fetched for an option, this property must be set, see [isLeaf details](https://ant.design/components/cascader-cn/#components-cascader-demo-lazy)), selecting the current item triggers this event. layerIndex indicates the level at which the current item is selected, curOption indicates the details of the option selected at the current level, and selectedOptions lists the options selected along all levels of the path.
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
   * @description.en Callback for showing/hiding the popup
   */
  @event({ type: "cascader.dropdownVisible.change" })
  dropdownVisibleChange: EventEmitter<Record<string, any>>;
  private _handleDropdownVisibleChange = (
    selectedData: selectedDataType,
    visible: boolean
  ): void => {
    const detail = { selectedData, visible };
    Promise.resolve().then(() => {
      this.dropdownVisibleChange.emit(detail);

      // 新增规范化事件（向后兼容）
      this.dispatchEvent(
        new CustomEvent("cascader.dropdown.visible.change", {
          detail,
        })
      );
    });
  };

  /**
   *
   * @params [{curOptionData: ProcessedOptionData, childrenOptions: CascaderOptionType[]}]
   * @description 跟 `cascader.loading.data` 搭配使用，当获取下一层级的数据后，通过该方法更新数据，第一个参数就是 `cascader.loading.data` 事件传出的数据
   * @description.en Used together with `cascader.loading.data`. After the data of the next level is fetched, update the data with this method; the first parameter is the data emitted by the `cascader.loading.data` event
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
