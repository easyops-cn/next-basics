import React from "react";
import ReactDOM from "react-dom";
import { isEmpty, uniqBy } from "lodash";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  EasyopsEmptyProps,
} from "@next-core/brick-kit";
import { GeneralSelect, GeneralSelectProps } from "./GeneralSelect";
import {
  formatOptions,
  GeneralOption,
  GeneralComplexOption,
  FormItemElement,
} from "@next-libs/forms";
import { UseBrickConf, UseBackendConf } from "@next-core/brick-types";

export interface ComplexOption<T = string | number> {
  label: string;
  value: T;
}
export type maxTagCountType = "responsive" | number;
/**
 * @id forms.general-select
 * @name forms.general-select
 * @docKind brick
 * @description
 * @author steve
 * @slots
 * @history
 * 1.33.0:新增属性 `suffix`，废弃属性 `suffixBrick`
 * 1.56.0:新增属性 `size`
 * 1.59.0:新增属性 `emptyOption`
 * 1.72.0:新增属性 `groupBy`
 * 1.77.0:新增属性 `tokenSeparators`
 * 1.200.0:新增属性 `emptyProps`
 * @memo
 */
export class GeneralSelectElement extends FormItemElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 选择框字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 选择框validateTrigger
   * @group advancedFormItem
   */
  @property({ attribute: false }) declare validateTrigger: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 选择框字段说明
   * @group basic
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @required true
   * @description 候选项列表
   * @group basic
   */
  @property({
    attribute: false,
  })
  options: GeneralOption[];

  /**
   * @kind string
   * @required false
   * @default -
   * @description 选择框占位说明
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @kind string|number|string[]|number[]
   * @required false
   * @default -
   * @description 选择框初始值
   * @group basic
   */
  @property({
    attribute: false,
  })
  value: any;

  /**
   * @kind maxTagCountType
   * @required false
   * @description 最多显示多少个 tag，响应式模式会对性能产生损耗
   * @group basic
   */
  @property({
    attribute: false,
  })
  maxTagCount: maxTagCountType;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填
   * @group basicFormItem
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default -
   * @description 支持在文本后添加自定义构件 具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf)
   * @group basicFormItem
   */
  @property({
    attribute: false,
  })
  suffix: {
    useBrick: UseBrickConf;
  };

  /**
   * @kind "multiple"|"tags"
   * @required false
   * @default -
   * @description 选择框模式
   * @enums "multiple"|"tags"
   * @group advancedFormItem
   */
  @property()
  mode: string;

  /**
   * @kind Record<string,string>
   * @required false
   * @default -
   * @description 校验文本信息
   * @group basicFormItem
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind object
   * @required false
   * @default
   * @description 输入框样式
   * @group basic
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 支持清除选项
   * @group basic
   */
  @property({
    attribute: false,
  })
  allowClear = true;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用
   * @group basic
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏当前选中的label项的suffix构件逻辑(`false`默认显示)
   * @group ui
   */
  @property({
    attribute: false,
  })
  hiddenCheckedValueSuffix = false;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 支持搜索
   * @group advancedFormItem
   */
  @property({
    attribute: false,
  })
  showSearch = true;

  /**
   * @kind "small" | "middle" | "large"
   * @required false
   * @default middle
   * @description 选择框大小
   * @enums "small"|"middle"|"large"
   * @group advanced
   */
  @property()
  size: "small" | "middle" | "large";

  /**
   * @description 空候选项，将插入到候选项列表最前面
   * @group advancedFormItem
   */
  @property({ attribute: false })
  emptyOption?: GeneralComplexOption;

  /**
   * @kind object
   * @required false
   * @default -
   * @description 设置后置构件容器的样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  suffixStyle: React.CSSProperties = {};

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 下拉菜单和选择器同宽
   * @group ui
   */
  @property({
    attribute: false,
  })
  dropdownMatchSelectWidth = true;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 基于 `options` 列表中的某个字段进行分组显示
   * @group advancedFormItem
   */
  @property({
    attribute: false,
  })
  groupBy: string;

  /**
   * @kind {label: string, value: string}
   * @required false
   * @default -
   * @description 列表指定字段作为 label 和 value
   * @group advancedFormItem
   */
  @property({
    attribute: false,
  })
  fields: Partial<GeneralComplexOption>;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 在 mode 为 `tags` 和 `multiple` 的模式下定义自动分词的分隔符
   * @group basicFormItem
   */
  @property({
    attribute: false,
  })
  tokenSeparators: string[];

  /**
   * @kind default | parent
   * @required -
   * @default default
   * @description 下拉选项的渲染方式，`default` 为默认(表示渲染在 body 当中)，`parent` 表示渲染在该元素的父节点上，当发现下拉菜单跟随页面滚动，需要设置该属性为 `parent`
   * @group advancedFormItem
   */
  @property()
  popoverPositionType: GeneralSelectProps["popoverPositionType"];

  /**
   * @default 300
   * @description 设置防抖动搜索的时间间隔。
   * @group advancedFormItem
   */
  @property({ type: Number })
  debounceSearchDelay?: number;

  /**
   * @description 空option 时候可以自定义 EasyopsEmpty 配置实现自定义的无数据提示
   * @group advancedFormItem
   */
  @property({ attribute: false })
  emptyProps?: EasyopsEmptyProps;
  /**
   * @default false
   * @required false
   * @description 搜索时是否同时根据value和label过滤options，否则只根据label过滤
   * @group advancedFormItem
   */
  @property({ type: Boolean })
  filterByLabelAndValue: boolean;
  /**
   * @default false
   * @required false
   * @description 是否默认高亮第一个选项
   */
  @property({ type: Boolean })
  defaultActiveFirstOption: boolean;

  /**
   * @kind UseBrickConf
   * @required false
   * @default -
   * @description 支持在文本后添加自定义构件 [UseBrickConf](http://docs.developers.easyops.cn/docs/brick-next/transform)
   * @group advancedFormItem
   * @deprecated
   */
  @property({
    attribute: false,
  })
  suffixBrick: UseBrickConf;

  /**
   * @kind object
   * @required false
   * @default -
   * @description [已废弃]设置后置构件容器的样式
   * @deprecated
   * @group advancedFormItem
   */
  @property({
    attribute: false,
  })
  suffixBrickStyle: React.CSSProperties = {};

  /**
   * @kind object
   * @required false
   * @default -
   * @description 设置下拉框容器的样式
   * @group advancedFormItem
   */
  @property({
    attribute: false,
  })
  dropdownStyle: React.CSSProperties = {};

  /**
   * @required false
   * @default -
   * @description 后端搜索
   * @group advancedFormItem
   */
  @property({
    attribute: false,
  })
  useBackend: UseBackendConf;

  /**
   * @required false
   * @default true
   * @description 无边框样式
   */
  @property({
    attribute: false,
  })
  bordered = true;

  /**
   * @detail `any`
   * @description 下拉选中变化时被触发，`event.detail` 为当前选择项的值
   */
  @event({ type: "general.select.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail `{label: string, value: any, [key: string]: any}	`
   * @description 下拉选中变化时被触发，`event.detail` 为当前整个选择项包含其他字段值(暂不支持 `mode`为 `tags`的场景)
   */
  @event({ type: "general.select.change.v2" }) changeEventV2: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail `GeneralComplexOption`
   * @description value对应的选项数据变化时触发
   */
  @event({ type: "value.option.data.change" })
  optionDataChangeEvent: EventEmitter<
    GeneralComplexOption | GeneralComplexOption[]
  >;
  /**
   * @detail `{options:GeneralComplexOption[],name:string}`
   * @description 选项数据变化时触发
   */
  @event({ type: "general.select.options.change" })
  optionsChangeEvent: EventEmitter<{
    options: GeneralComplexOption[];
    name: string;
  }>;
  /**
   * @detail `-`
   * @description 获得焦点时触发
   */
  @event({ type: "general.select.focus" }) focusEvent: EventEmitter;
  /**
   * @detail `-`
   * @description 失焦时触发
   */
  @event({ type: "general.select.blur" }) blurEvent: EventEmitter;
  /**
   * @detail `string`
   * @description 搜索时被触发，`event.detail` 为当前输入的值
   */
  @event({ type: "general.select.search" }) searchEvent: EventEmitter<string>;

  /**
   * @detail `string`
   * @description 搜索时被触发，带防抖动。
   */
  @event({ type: "general.select.debounceSearch" })
  private _debounceSearchEvent: EventEmitter<string>;

  private _handleChange = (
    value: any,
    options: GeneralComplexOption[]
  ): void => {
    this.value = value;
    this.options = options;
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };

  private _handleChangeV2 = (value: any): void => {
    Promise.resolve().then(() => {
      this.changeEventV2.emit(value);
    });
  };

  private _handleOptionDataChange = (
    data: GeneralComplexOption | GeneralComplexOption[]
  ): void => {
    this.optionDataChangeEvent.emit(data);
  };

  private _handleOptionsChange = (
    options: GeneralComplexOption[],
    name: string
  ): void => {
    this.optionsChangeEvent.emit({ options, name });
  };

  private _handleFocus = (): void => {
    this.focusEvent.emit();
  };

  private _handleBlur = (): void => {
    this.blurEvent.emit();
  };
  private _handleSearch = (value: string): void => {
    this.searchEvent.emit(value);
  };
  private _handleDebounceSearch = (value: string): void => {
    this._debounceSearchEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const options = uniqBy(
        (isEmpty(this.emptyOption) ? [] : [this.emptyOption]).concat(
          formatOptions(this.options, this.fields as any)
        ),
        "value"
      );
      ReactDOM.render(
        <BrickWrapper>
          <GeneralSelect
            dropdownMatchSelectWidth={this.dropdownMatchSelectWidth}
            formElement={this.getFormElement()}
            name={this.name}
            options={options}
            fields={this.fields}
            groupBy={this.groupBy}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            mode={this.mode}
            placeholder={this.placeholder}
            value={this.value}
            required={this.required}
            hiddenCheckedValueSuffix={this.hiddenCheckedValueSuffix}
            showSearch={this.showSearch}
            disabled={this.disabled}
            message={this.message}
            validator={this.validator}
            validateTrigger={this.validateTrigger}
            notRender={this.notRender}
            inputBoxStyle={this.inputBoxStyle}
            onChange={this._handleChange}
            onChangeV2={this._handleChangeV2}
            onOptionDataChange={this._handleOptionDataChange}
            onOptionsChange={this._handleOptionsChange}
            allowClear={this.allowClear}
            suffix={this.suffix}
            defaultActiveFirstOption={this.defaultActiveFirstOption}
            suffixStyle={this.suffixStyle}
            suffixBrick={this.suffixBrick}
            suffixBrickStyle={this.suffixBrickStyle}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onSearch={this._handleSearch}
            useBackend={this.useBackend}
            onDebounceSearch={this._handleDebounceSearch}
            debounceSearchDelay={this.debounceSearchDelay}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            size={this.size}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            tokenSeparators={this.tokenSeparators}
            emptyProps={this.emptyProps}
            popoverPositionType={this.popoverPositionType}
            {...(this.mode === "tags" ? { pattern: this.pattern } : {})}
            filterByLabelAndValue={this.filterByLabelAndValue}
            dropdownStyle={this.dropdownStyle}
            bordered={this.bordered}
            maxTagCount={this.maxTagCount}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-select", GeneralSelectElement);
