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
export interface GeneralSelectElementProps {
  name?: string;
  value?: any;
  options?: GeneralOption[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  message?: Record<string, string>;
  validateTrigger?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: "small" | "middle" | "large";
  optionsWrap?: boolean;
  suffix?: {
    useBrick: UseBrickConf;
  };
  suffixStyle?: React.CSSProperties;
  mode?: string;
  tokenSeparators?: string[];
  maxTagCount?: maxTagCountType;
  inputBoxStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  groupBy?: string;
  optionsMode?: string;
  fields?: Partial<GeneralComplexOption>;
  popoverPositionType?: GeneralSelectProps["popoverPositionType"];
  filterByLabelAndValue?: boolean;
  filterByCaption?: boolean;
  defaultActiveFirstOption?: boolean;
  useBackend?: UseBackendConf;
  suffixBrick?: UseBrickConf;
  suffixBrickStyle?: React.CSSProperties;
}


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

export class GeneralSelectElement extends FormItemElement  implements GeneralSelectElementProps {
  /* =========================== Group: basic =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @description 选择框 name 值, 即唯一 id
   * @description.en Name value of the select box, i.e. the unique id
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string|number|string[]|number[]
   * @required false
   * @default -
   * @description 初始值
   * @description.en Initial value
   * @group basic
   */
  @property({
    attribute: false,
  })
  value: any;

  /**
   * @required true
   * @description 候选项列表
   * @description.en List of options
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
   * @description 占位符
   * @description.en Placeholder
   * @group basic
   */
  @property({ attribute: false }) declare placeholder: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @description 标签文字
   * @description.en Label text
   * @group formLabel
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: formValidation =========================== */

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填
   * @description.en Whether it is required
   * @group formValidation
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind Record<string,string>
   * @required false
   * @default -
   * @description 校验文本信息
   * @description.en Validation message
   * @group formValidation
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind string
   * @required false
   * @default false
   * @description 触发验证的时机
   * @description.en Timing to trigger validation
   * @group formValidation
   */
  @property({ attribute: false }) declare validateTrigger: string;

  /* =========================== Group: ui =========================== */

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用
   * @description.en Whether to disable
   * @group ui
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否只读
   * @description.en Whether it is read-only
   * @group ui
   */
  @property({ type: Boolean })
  readOnly: boolean;

  /**
   * @kind "small" | "middle" | "large"
   * @required false
   * @default middle
   * @description 选择框大小
   * @description.en Size of the select box
   * @enums "small"|"middle"|"large"
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
  @property()
  size: "small" | "middle" | "large";

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 支持清除选项
   * @description.en Support clearing the selected option
   * @group ui
   */
  @property({
    attribute: false,
  })
  allowClear = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 支持搜索
   * @description.en Support search
   * @group ui
   */
  @property({
    attribute: false,
  })
  showSearch = true;

  /**
   * @required false
   * @default true
   * @description 无边框样式
   * @description.en Borderless style
   * @group ui
   */
  @property({
    attribute: false,
  })
  bordered = true;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 下拉框选项是否支持换行
   * @description.en Whether the dropdown options support line wrapping
   * @group ui
   */
  @property({
    type: Boolean,
  })
  optionsWrap: boolean;

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

  /**
   * @kind object
   * @required false
   * @default -
   * @description 设置后置构件容器的样式
   * @description.en Set the style of the suffix brick container
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
   * @description.en The dropdown menu has the same width as the selector
   * @group ui
   */
  @property({
    attribute: false,
  })
  dropdownMatchSelectWidth = true;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏当前选中项的suffix构件
   * @description.en Whether to hide the suffix brick of the currently selected item
   * @group ui
   */
  @property({
    attribute: false,
  })
  hiddenCheckedValueSuffix = false;

  /**
   * @kind "multiple"|"tags"
   * @required false
   * @default single
   * @description 选择框模式， 多选 或 标签
   * @description.en Select box mode: multiple or tags
   * @enums "multiple"|"tags"
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Single",
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
   * @kind string[]
   * @required false
   * @default -
   * @description 在 mode 为 `多选` 和 `标签` 的模式下定义自动分词的分隔符
   * @description.en Define the separators for automatic tokenization when mode is `multiple` or `tags`
   * @group ui
   */
  @property({
    attribute: false,
  })
  tokenSeparators: string[];

  /**
   * @kind maxTagCountType
   * @required false
   * @description 最多显示多少个 tag，响应式模式会对性能产生损耗
   * @description.en Maximum number of tags to display; responsive mode causes a performance loss
   * @group ui
   */
  @property({
    attribute: false,
  })
  maxTagCount: maxTagCountType;

  /**
   * @description 空候选项，将插入到候选项列表最前面
   * @description.en Empty option, which will be inserted at the beginning of the option list
   * @group ui
   */
  @property({ attribute: false })
  emptyOption?: GeneralComplexOption;

  /**
   * @description 空option 时候可以自定义 EasyopsEmpty 配置实现自定义的无数据提示
   * @description.en When there are no options, a custom EasyopsEmpty configuration can be set to implement a custom empty data prompt
   * @group ui
   */
  @property({ attribute: false })
  emptyProps?: EasyopsEmptyProps;

  /* =========================== Group: style =========================== */

  /**
   * @kind object
   * @required false
   * @default
   * @description 输入框样式
   * @description.en Input box style
   * @group style
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;

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

  /* =========================== Group: advanced =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @description 基于 `options` 列表中的某个字段进行分组显示
   * @description.en Group and display based on a field in the `options` list
   * @group advanced
   */
  @property({
    attribute: false,
  })
  groupBy: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description optionsMode为 tags 时，下拉选项支持标签样式,此模式不支持select本身的mode为tags、multiple
   * @description.en When optionsMode is tags, the dropdown options support the tag style; this mode does not support the select's own mode being tags or multiple
   * @group advanced
   */
  @property({
    attribute: false,
  })
  optionsMode: string;

  /**
   * @kind {label: string, value: string}
   * @required false
   * @default -
   * @description 列表指定字段作为 label 和 value
   * @description.en Specify fields in the list as label and value
   * @group advanced
   */
  @property({
    attribute: false,
  })
  fields: Partial<GeneralComplexOption>;

  /**
   * @kind default | parent
   * @required -
   * @default default
   * @description 下拉选项的渲染方式，`default` 为默认(表示渲染在 body 当中)，`parent` 表示渲染在该元素的父节点上，当发现下拉菜单跟随页面滚动，需要设置该属性为 `parent`
   * @description.en Rendering method of the dropdown options: `default` is the default (rendered in the body), `parent` means rendering on the parent node of this element; when the dropdown menu is found to scroll with the page, set this property to `parent`
   * @group advanced
   */
  @property()
  popoverPositionType: GeneralSelectProps["popoverPositionType"];

  /**
   * @default 300
   * @description 设置防抖动搜索的时间间隔。
   * @description.en Set the time interval for debounced search.
   * @group advanced
   */
  @property({ type: Number })
  debounceSearchDelay?: number;

  /**
   * @default false
   * @required false
   * @description 搜索时是否同时根据value和label过滤options，否则只根据label过滤
   * @description.en Whether to filter options by both value and label when searching, otherwise only by label
   * @group advanced
   */
  @property({ type: Boolean })
  filterByLabelAndValue: boolean;

  /**
   * @default false
   * @required false
   * @description 搜索时是否根据caption过滤options
   * @description.en Whether to filter options by caption when searching
   * @group advanced
   */
  @property({ type: Boolean })
  filterByCaption: boolean;

  /**
   * @default false
   * @required false
   * @description 是否默认高亮第一个选项
   * @description.en Whether to highlight the first option by default
   */
  @property({ type: Boolean })
  defaultActiveFirstOption: boolean;

  /**
   * @required false
   * @default -
   * @description 后端搜索
   * @description.en Backend search
   * @group advanced
   */
  @property({
    attribute: false,
  })
  useBackend: UseBackendConf;

  /* =========================== Group: other =========================== */

  /**
   * @kind UseBrickConf
   * @required false
   * @default -
   * @description 支持在文本后添加自定义构件 [UseBrickConf](http://docs.developers.easyops.cn/docs/brick-next/transform)
   * @description.en Support adding a custom brick after the text [UseBrickConf](http://docs.developers.easyops.cn/docs/brick-next/transform)
   * @group other
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
   * @description.en [Deprecated] Set the style of the suffix brick container
   * @deprecated
   * @group other
   */
  @property({
    attribute: false,
  })
  suffixBrickStyle: React.CSSProperties = {};

  /* =========================== events =========================== */

  /**
   * @detail `any`
   * @description 下拉选中变化时被触发，`event.detail` 为当前选择项的值
   * @description.en Triggered when the dropdown selection changes; `event.detail` is the value of the currently selected item
   */
  @event({ type: "general.select.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail `{label: string, value: any, [key: string]: any}	`
   * @description 下拉选中变化时被触发，`event.detail` 为当前整个选择项包含其他字段值(暂不支持 `mode`为 `tags`的场景)
   * @description.en Triggered when the dropdown selection changes; `event.detail` is the entire currently selected option including other field values (the scenario where `mode` is `tags` is not supported yet)
   */
  @event({ type: "general.select.change.v2" }) changeEventV2: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail `GeneralComplexOption`
   * @description value对应的选项数据变化时触发
   * @description.en Triggered when the option data corresponding to value changes
   */
  @event({ type: "value.option.data.change" })
  optionDataChangeEvent: EventEmitter<
    GeneralComplexOption | GeneralComplexOption[]
  >;
  /**
   * @detail `{options:GeneralComplexOption[],name:string}`
   * @description 选项数据变化时触发
   * @description.en Triggered when the option data changes
   */
  @event({ type: "general.select.options.change" })
  optionsChangeEvent: EventEmitter<{
    options: GeneralComplexOption[];
    name: string;
  }>;
  /**
   * @detail `-`
   * @description 获得焦点时触发
   * @description.en Triggered when focused
   */
  @event({ type: "general.select.focus" }) focusEvent: EventEmitter;
  /**
   * @detail `-`
   * @description 失焦时触发
   * @description.en Triggered when blurred
   */
  @event({ type: "general.select.blur" }) blurEvent: EventEmitter;
  /**
   * @detail `string`
   * @description 搜索时被触发，`event.detail` 为当前输入的值
   * @description.en Triggered when searching; `event.detail` is the currently entered value
   */
  @event({ type: "general.select.search" }) searchEvent: EventEmitter<string>;

  /**
   * @detail `string`
   * @description 搜索时被触发，带防抖动。
   * @description.en Triggered when searching, with debounce.
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

    // 新增规范化事件（向后兼容）
    this.dispatchEvent(
      new CustomEvent("general.select.debounce.search", {
        detail: value,
      })
    );
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
            optionsWrap={this.optionsWrap}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            tokenSeparators={this.tokenSeparators}
            emptyProps={this.emptyProps}
            popoverPositionType={this.popoverPositionType}
            {...(this.mode === "tags" ? { pattern: this.pattern } : {})}
            filterByLabelAndValue={this.filterByLabelAndValue}
            filterByCaption={this.filterByCaption}
            dropdownStyle={this.dropdownStyle}
            bordered={this.bordered}
            maxTagCount={this.maxTagCount}
            optionsMode={this.optionsMode}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-select", GeneralSelectElement);
