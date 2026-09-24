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
   */
  disabled?: boolean | ((row: Record<string, any>, index: number) => boolean);
  placeholder?: string;
}

export interface InputProps extends BasicProps {
  /**
   * 声明 input 类型，同原生 input 标签的 type 属性
   */
  type?: string;
  /**
   * 最大长度
   */
  maxLength?: number;
  /**
   * 可以点击清除图标删除内容
   */
  allowClear?: boolean;
}

export interface InputNumberProps extends BasicProps {
  /**
   * 最大值
   */
  max?: number;
  /**
   * 最小值
   */
  min?: number;
  /**
   * 每次改变步数，可以为小数
   */
  step?: number | string;
  /**
   * 数值精度
   */
  precision?: number;
}

export interface InputPasswordProps extends BasicProps {
  /**
   * 是否显示切换按钮
   */
  visibilityToggle?: boolean;
}

export interface SelectProps extends BasicProps {
  /**
   * 可以点击清除图标删除内容
   */
  allowClear?: boolean;
  /**
   * 设置 Select 的模式为多选或标签
   */
  mode?: "multiple" | "tags";
  /**
   * 候选项列表
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
   */
  showSearch?: boolean;
  /**
   * 基于 `options` 列表中的某个字段进行分组显示
   */
  groupBy?: string;
  /**
   * 在 mode 为 `tags` 和 `multiple` 模式下自动分词的分隔符
   */
  tokenSeparators?: string[];
  /**
   * 最多显示多少个 tag
   */
  maxTagCount?: number | "responsive";
  /**
   * 下拉选项的渲染方式
   */
  popoverPositionType?: "default" | "parent";
  /**
   * 支持在文本后添加自定义构件 具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf
   */
  suffix?: UseBrickConf;
  /**
   * 设置后置构件容器的样式
   */
  suffixStyle?: React.CSSProperties;
}

export interface CascaderProps extends BasicProps {
  /**
   * 是否支持清除
   */
  allowClear?: boolean;
  /**
   * 候选项
   */
  options: CascaderOptionType[] | CascaderOptionType[][];
  /**
   * 次级菜单的展开方式，可选 `click` 和 `hover`
   */
  expandTrigger?: CascaderExpandTrigger;
  /**
   * 浮层预设位置
   */
  popupPlacement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  /**
   * 支持搜索
   */
  showSearch?: boolean;
  /**
   * 自定义 options 中 label value children 的字段
   */
  fieldNames?: FieldNamesType;
}

export interface EditorProps {
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 语言模式
   */
  mode?: string;
  /**
   * 最小行数
   */
  minLines?: number;
  /**
   * 最大行数
   */
  maxLines?: number;
  /**
   * 主题
   */
  theme?: string;

  /**
   * 显示左侧区域槽
   */
  showGutter?: boolean;
  /**
   * 只读模式
   */
  readOnly?: boolean;
  /**
   * 显示行数
   */
  showLineNumbers?: boolean;
  /**
   * 显示复制按钮
   */
  showCopyButton?: boolean;
  /**
   * 显示展开按钮
   */
  showExpandButton?: boolean;
  /**
   * 是否开启自动补全
   */
  enableLiveAutocompletion?: boolean;
  /**
   * 显示打印边距
   */
  printMargin?: boolean;
  /**
   * 自定义自动补全
   */
  customCompleters?: string[];
}

export interface AutoCompleteProps extends BasicProps {
  /**
   * 是否支持清除
   */
  allowClear?: boolean;
  /**
   * 候选项
   */
  options: string[] | OptionType[];
  /**
   * 是否为追加模式
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

/**
 * 列级联动返回结果，支持字段值更新和 options 更新。
 * 用于 onValuesChange 回调的返回值。
 */
export interface ColumnLinkageResult {
  /** 字段值更新：key 为字段 name，value 为要设置的值（传 null 清空） */
  fieldUpdates?: Record<string, any>;
  /** options 更新：key 为字段 name，value 为该字段的下拉选项数组 */
  optionUpdates?: Record<string, { label: string; value: string | number }[]>;
}

/**
 * fieldUpdates 中的路径配置。支持条件判断，只有 when 为 true 或未设置时才执行更新。
 */
export interface FieldPathConfig {
  /** 响应数据中的点分路径，如 "data.list.0.hac_name" */
  path: string;
  /**
   * 条件表达式，可使用 `response` 变量。
   * 例：`"response.data.list.length === 1"`
   * 不设置或返回 truthy 值时执行更新，falsy 值时跳过该字段。
   */
  when?: string;
}

/**
 * fieldUpdates 中的查找配置。从响应列表中按条件查找匹配项并提取字段值。
 * 对应业务场景：从 NCWARE_DOMAIN 返回列表中，查找 name === rowValue.vm_name 的项，取其 default_IP。
 */
export interface FieldFindConfig {
  /** 查找类型，固定为 "find" */
  type: "find";
  /** 响应中列表数组的点分路径，如 "data.list" */
  listPath: string;
  /** 列表中用于匹配的字段名，如 "name" */
  matchField: string;
  /**
   * 匹配值。支持 `${rowValue.xxx}` 模板语法，
   * 组件在运行时替换为实际行数据。如 "${rowValue.vm_name}"。
   */
  matchValue: string;
  /** 匹配成功后要提取的字段名，如 "default_IP" */
  extractField: string;
  /**
   * 条件表达式，可使用 `response` 变量。
   * 不设置或返回 truthy 值时执行更新，falsy 值时跳过。
   */
  when?: string;
}

/**
 * 声明式联动配置。组件内部根据该配置发起 API 请求并映射响应结果。
 * body 中的字符串值支持 `${rowValue.xxx}` 模板语法，组件在运行时替换为实际行数据。
 * fieldUpdates / optionUpdates 中的值为响应数据的点分路径（如 "data.list.0.name"）。
 */
export interface ColumnLinkage {
  /** API 请求地址 */
  url: string;
  /** 请求方法，默认 POST */
  method?: "POST" | "GET";
  /**
   * 请求体。其中的字符串值支持 `${rowValue.xxx}` 模板语法，
   * 组件在运行时会将模板替换为当前行的实际数据。
   */
  body?: Record<string, any>;
  /**
   * 条件表达式，用于根据响应数据决定是否执行更新。
   * 表达式中可使用 `response` 变量访问完整的 API 响应数据。
   * 例：`"response.data.list.length === 1"`
   * 不设置或返回 truthy 值时执行更新，返回 falsy 值时跳过。
   */
  condition?: string;
  /**
   * 响应字段到表单字段的映射。
   * key 为表单字段 name，value 可以是：
   * - 字符串：响应数据中的点分路径，如 `"data.list.0.default_IP"`
   * - FieldPathConfig：带条件的路径配置
   * - FieldFindConfig：从列表中按条件查找并提取字段值
   */
  fieldUpdates?: Record<string, string | FieldPathConfig | FieldFindConfig>;
  /**
   * 响应字段到下拉选项的映射。
   * key 为表单字段 name，value 配置了响应列表路径及 label/value 字段名。
   */
  optionUpdates?: Record<
    string,
    {
      /** 响应中列表数组的点分路径，如 "data.list" */
      path: string;
      /** 列表中每项用作 label 的字段名 */
      labelField: string;
      /** 列表中每项用作 value 的字段名 */
      valueField: string;
      /** 限制返回条数，如 20 表示只取前 20 条作为 options */
      maxItems?: number;
    }
  >;
}

export interface BasicColumn {
  /**
   * 表单项字段说明
   */
  label?: string;
  /**
   * 表单项字段名
   */
  name: string;
  /**
   * 表单项校验规则
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
   */
  flex?: string | number;
  /**
   * 表单项默认值
   */
  defaultValue?: any;
  /**
   * gridColumns 设置后，每个表单项所占的列数
   */
  span?: number;
  /**
   * 表单项提示信息
   */
  tooltip?: string;
  /**
   * 当该表单项的值变化时触发，返回需要联动更新的其他字段及其值。
   * 返回一个对象，key 为同行其他字段的 name，value 为要设置的值（传 null 清空）。
   * 返回 undefined/null/空对象表示不做联动。
   */
  onValuesChange?: (
    rowValue: Record<string, any>,
    rowIndex: number,
    fieldName: string
  ) => Record<string, any> | ColumnLinkageResult | void;
  /**
   * 声明式联动配置。导入数据后，组件内部根据该配置自动发起 API 请求并映射响应结果，
   * 无需在外部 YAML 中编写联动逻辑。
   * 支持单个配置或配置数组（同一列需要调多个 API 时使用数组）。
   */
  linkage?: ColumnLinkage | ColumnLinkage[];
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
