import { Locale, K } from "../constants";

const locale: Locale = {
  [K.FLOW_BUILDER]: "Flow Builder",
  [K.SCHEMA_ITEM_NORMAL]: "普通类型",
  [K.SCHEMA_ITEM_REF]: "引用类型",
  [K.PATTERN_INPUT_PLANCEHOLDER]: "填写相应的正则表达式",
  [K.ENUM_INPUT_PLANCEHOLDER]: "填写相应的枚举值",
  [K.COMPARE_METHOD_PLANCEHOLDER]: "比较器",
  [K.COMPARE_VALUE_PLANCEHOLDER]: "请先选择比较器再填写相应的数值",
  [K.ARRAY]: "数组",
  [K.SIMPLE_TYPE]: "简单属性",
  [K.MODEL_TYPE]: "模型",
  [K.REF_VALIDATE_REQUIRED_MSG]: "请选择引用的字段",
  [K.MODEL_SEARCH_PLANCEHOLDER]: "按关键字搜索",
  [K.FIELDS_MAPPING_REQUIRED_MSG]: "请输入{{name}}",
  [K.EDIT]: "编辑",
  [K.CANCEL]: "取消",
  [K.SAVE]: "保存",
  [K.EDITOR_PLACEHOLDER]: "Cel 表达式使用 `<% %>` 包裹, e.g.,<% xxx %>",
  [K.CONST]: "常量",
  [K.FIELDS_MAPPING]: "字段映射",
  [K.CEL]: "Cel",
};

export default locale;
