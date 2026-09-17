import { UseBrickConf } from "@next-core/brick-types";
import { GeneralComplexOption } from "@next-libs/forms";
import {
  CascaderExpandTrigger,
  CascaderOptionType,
  FieldNamesType,
} from "antd/lib/cascader";
import { Rule, RuleObject } from "antd/lib/form";
import { StoreValue } from "antd/lib/form/interface";
import { OptionType } from ".";
import { CheckboxProps } from "antd";
import { TextAreaProps } from "antd/lib/input";
import { TimeRangePickerItemProps } from "../dynamic-form-item-v2/TimeRangePicker";

export enum ComponentType {
  INPUT = "input",
  INPUT_NUMBER = "inputNumber",
  INPUT_PASSWORD = "inputPassword",
  SELECT = "select",
  CASCADER = "cascader",
}

interface BasicProps {
  /**
   * 是否禁用状态
   * @description.en Whether it is in disabled state
   */
  disabled?: boolean | ((row: Record<string, any>, index: number) => boolean);
  placeholder?: string;
}

export interface InputProps extends BasicProps {
  /**
   * 声明 input 类型，同原生 input 标签的 type 属性
   * @description.en Declares the input type, same as the type attribute of the native input tag
   */
  type?: string;
  /**
   * 最大长度
   * @description.en Maximum length
   */
  maxLength?: number;
  /**
   * 可以点击清除图标删除内容
   * @description.en Click the clear icon to delete the content
   */
  allowClear?: boolean;
}

export interface InputNumberProps extends BasicProps {
  /**
   * 最大值
   * @description.en Maximum value
   */
  max?: number;
  /**
   * 最小值
   * @description.en Minimum value
   */
  min?: number;
  /**
   * 每次改变步数，可以为小数
   * @description.en Step of each change, can be a decimal
   */
  step?: number | string;
  /**
   * 数值精度
   * @description.en Numeric precision
   */
  precision?: number;
}

export interface InputPasswordProps extends BasicProps {
  /**
   * 是否显示切换按钮
   * @description.en Whether to show the toggle button
   */
  visibilityToggle?: boolean;
}

export interface SelectProps extends BasicProps {
  /**
   * 可以点击清除图标删除内容
   * @description.en Click the clear icon to delete the content
   */
  allowClear?: boolean;
  /**
   * 设置 Select 的模式为多选或标签
   * @description.en Set the mode of Select to multiple or tags
   */
  mode?: "multiple" | "tags";
  /**
   * 候选项列表
   * @description.en List of options
   */
  options:
    | GeneralComplexOption<string | number>[]
    | GeneralComplexOption<string | number>[][]
    | ((
        row: Record<string, any>,
        index: number
      ) =>
        | GeneralComplexOption<string | number>[]
        | GeneralComplexOption<string | number>[][]);
  /**
   * 支持搜索
   * @description.en Support search
   */
  showSearch?: boolean;
  /**
   * 基于 `options` 列表中的某个字段进行分组显示
   * @description.en Group and display by a field in the `options` list
   */
  groupBy?: string;
  /**
   * 在 mode 为 `tags` 和 `multiple` 模式下自动分词的分隔符
   * @description.en Separator for automatic tokenization when mode is `tags` or `multiple`
   */
  tokenSeparators?: string[];
  /**
   * 最多显示多少个 tag
   * @description.en Maximum number of tags to display
   */
  maxTagCount?: number | "responsive";
  /**
   * 下拉选项的渲染方式
   * @description.en Rendering method of the dropdown options
   */
  popoverPositionType?: "default" | "parent";
  /**
   * 支持在文本后添加自定义构件 具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf
   * @description.en Support adding a custom brick after the text, see [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf
   */
  suffix?: UseBrickConf;
  /**
   * 设置后置构件容器的样式
   * @description.en Set the style of the suffix brick container
   */
  suffixStyle?: React.CSSProperties;
}

export interface CascaderProps extends BasicProps {
  /**
   * 是否支持清除
   * @description.en Whether clearing is supported
   */
  allowClear?: boolean;
  /**
   * 候选项
   * @description.en Options
   */
  options: CascaderOptionType[] | CascaderOptionType[][];
  /**
   * 次级菜单的展开方式，可选 `click` 和 `hover`
   * @description.en Expansion method of the secondary menu, can be `click` or `hover`
   */
  expandTrigger?: CascaderExpandTrigger;
  /**
   * 浮层预设位置
   * @description.en Preset position of the popup
   */
  popupPlacement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  /**
   * 支持搜索
   * @description.en Support search
   */
  showSearch?: boolean;
  /**
   * 自定义 options 中 label value children 的字段
   * @description.en Customize the label, value and children fields in options
   */
  fieldNames?: FieldNamesType;
}

export interface EditorProps {
  /**
   * 占位符
   * @description.en Placeholder
   */
  placeholder?: string;
  /**
   * 语言模式
   * @description.en Language mode
   */
  mode?: string;
  /**
   * 最小行数
   * @description.en Minimum number of lines
   */
  minLines?: number;
  /**
   * 最大行数
   * @description.en Maximum number of lines
   */
  maxLines?: number;
  /**
   * 主题
   * @description.en Theme
   */
  theme?: string;

  /**
   * 显示左侧区域槽
   * @description.en Show the gutter area on the left
   */
  showGutter?: boolean;
  /**
   * 只读模式
   * @description.en Read-only mode
   */
  readOnly?: boolean;
  /**
   * 显示行数
   * @description.en Show line numbers
   */
  showLineNumbers?: boolean;
  /**
   * 显示复制按钮
   * @description.en Show the copy button
   */
  showCopyButton?: boolean;
  /**
   * 显示展开按钮
   * @description.en Show the expand button
   */
  showExpandButton?: boolean;
  /**
   * 是否开启自动补全
   * @description.en Whether to enable auto-completion
   */
  enableLiveAutocompletion?: boolean;
  /**
   * 显示打印边距
   * @description.en Show the print margin
   */
  printMargin?: boolean;
  /**
   * 自定义自动补全
   * @description.en Custom auto-completion
   */
  customCompleters?: string[];
}

export interface AutoCompleteProps extends BasicProps {
  /**
   * 是否支持清除
   * @description.en Whether clearing is supported
   */
  allowClear?: boolean;
  /**
   * 候选项
   * @description.en Options
   */
  options: string[] | OptionType[];
  /**
   * 是否为追加模式
   * @description.en Whether it is in append mode
   */
  isAppendMode?: boolean;
}

export interface InputColumn {
  // type: ComponentType.INPUT;
  type: "input";
  props: InputProps;
}

export interface CheckboxColumn {
  type: "checkbox";
  props: CheckboxProps & { text: string };
}

export interface SelectColumn {
  // type: ComponentType.SELECT;
  type: "select";
  props: SelectProps;
}

export interface InputNumberColumn {
  // type: ComponentType.INPUT_NUMBER;
  type: "inputNumber";
  props: InputNumberProps;
}

export interface InputPasswordColumn {
  // type: ComponentType.INPUT_PASSWORD;
  type: "inputPassword";
  props: InputPasswordProps;
}

export interface CascaderColumn {
  // type: ComponentType.CASCADER;
  type: "cascader";
  props: CascaderProps;
}

export interface EditorColumn {
  type: "editor";
  props: EditorProps;
}

export interface AutoCompleteColumn {
  type: "autoComplete";
  props: AutoCompleteProps;
}

export interface TextAreaColumn {
  type: "textArea";
  props: TextAreaProps;
}

export interface DateRangePickerColumn {
  type: "timeRangePicker";
  props: TimeRangePickerItemProps;
}

export interface BasicColumn {
  /**
   * 表单项字段说明
   * @description.en Description of the form item field
   */
  label?: string;
  /**
   * 表单项字段名
   * @description.en Field name of the form item
   */
  name: string;
  /**
   * 表单项校验规则
   * @description.en Validation rules of the form item
   */
  rules?: ({ unique: boolean; message: string } & Rule & {
      message?: string;
      validator: (
        rule: RuleObject,
        value: StoreValue,
        callback: (error?: string) => void,
        fullValue: {
          formValue: Record<string, any>[];
          rowValue: Record<string, any>;
          rowIndex: number;
          column?: Column;
        }
      ) => Promise<void | any> | void;
    })[];
  /**
   * 表单项所占份额
   * @description.en Share of the form item
   */
  flex?: string | number;
  /**
   * 表单项默认值
   * @description.en Default value of the form item
   */
  defaultValue?: any;
  /**
   * gridColumns 设置后，每个表单项所占的列数
   * @description.en Number of columns occupied by each form item after gridColumns is set
   */
  span?: number;
  /**
   * 表单项提示信息
   * @description.en Tooltip of the form item
   */
  tooltip?: string;
  /**
   * 当该表单项的值变化时触发，返回需要联动更新的其他字段及其值。
   * 返回一个对象，key 为同行其他字段的 name，value 为要设置的值（传 null 清空）。
   * 返回 undefined/null/空对象表示不做联动。
   * @description.en Triggered when the value of this form item changes, and returns the other fields to be updated by linkage and their values; returns an object whose key is the name of another field in the same row and value is the value to set (pass null to clear); returns undefined/null/an empty object to indicate no linkage.
   */
  onValuesChange?: (
    rowValue: Record<string, any>,
    rowIndex: number,
    fieldName: string
  ) => Record<string, any> | void;
}

export type Column = BasicColumn &
  (
    | InputColumn
    | InputNumberColumn
    | InputPasswordColumn
    | SelectColumn
    | CascaderColumn
    | EditorColumn
    | AutoCompleteColumn
    | CheckboxColumn
    | TextAreaColumn
    | DateRangePickerColumn
  );
