import { GeneralComplexOption } from "@next-libs/forms";
import {
  CascaderExpandTrigger,
  CascaderOptionType,
  FieldNamesType,
} from "antd/lib/cascader";
import { Rule } from "antd/lib/form";

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
  options: GeneralComplexOption<string | number>[];
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
}

export interface CascaderProps extends BasicProps {
  /**
   * 是否支持清除
   */
  allowClear?: boolean;
  /**
   * 候选项
   */
  options: CascaderOptionType[];
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

export interface InputColumn {
  // type: ComponentType.INPUT;
  type: "input";
  props: InputProps;
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
  rules?: ({ unique: boolean; message: string } & Rule)[];
  /**
   * 表单项所占份额
   */
  flex?: string | number;
  /**
   * 表单项默认值
   */
  defaultValue?: any;
}

export type Column = BasicColumn &
  (
    | InputColumn
    | InputNumberColumn
    | InputPasswordColumn
    | SelectColumn
    | CascaderColumn
  );
