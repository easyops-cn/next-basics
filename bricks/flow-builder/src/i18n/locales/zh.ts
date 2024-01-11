import { Locale, K } from "../constants";

const locale: Locale = {
  [K.FLOW_BUILDER]: "Flow Builder",
  [K.SCHEMA_ITEM_NORMAL]: "普通类型",
  [K.SCHEMA_ITEM_REF]: "引用",
  [K.SCHEMA_ITEM_MODEL]: "模型",
  [K.PATTERN_INPUT_PLACEHOLDER]: "填写相应的正则表达式",
  [K.ENUM_INPUT_PLACEHOLDER]: "填写相应的枚举值",
  [K.COMPARE_METHOD_PLACEHOLDER]: "比较器",
  [K.COMPARE_VALUE_PLACEHOLDER]: "请先选择比较器再填写相应的数值",
  [K.FIELDS_MAPPING_EDIT_TOOLTIP]: "不能编辑 `object[]` 类型下的子属性",
  [K.ARRAY]: "数组",
  [K.SIMPLE_TYPE]: "简单类型",
  [K.CUSTOM_TYPE]: "自定义类型",
  [K.MODEL_TYPE]: "模型",
  [K.REF_VALIDATE_REQUIRED_MSG]: "请选择引用的字段",
  [K.MODEL_SEARCH_PLACEHOLDER]: "按关键字搜索",
  [K.REF_FIELD_SELECT_PLACEHOLDER]: "请先选择引用的模型",
  [K.FIELDS_MAPPING_REQUIRED_MSG]: "请输入{{name}}",
  [K.EDIT]: "编辑",
  [K.CANCEL]: "取消",
  [K.SAVE]: "保存",
  [K.EDITOR_PLACEHOLDER]: "Cel 表达式使用 `<% %>` 包裹, e.g.,<% xxx %>",
  [K.CONST]: "常量",
  [K.FIELDS_MAPPING]: "字段映射",
  [K.CEL]: "Cel",
  [K.NAME_LABEL]: "名称",
  [K.REQUIRED_LABEL]: "必填",
  [K.TYPE_LABEL]: "类型",
  [K.DESCRIPTION_LABEL]: "描述",
  [K.SETTING_LABEL]: "设置",
  [K.CATEGORY_LABEL]: "分类",
  [K.DEFAULT_LABEL]: "默认值",
  [K.REFERENCE_LABEL]: "引用(Ref)",
  [K.ENUM_LABEL]: "枚举值",
  [K.VALIDATOR_LABEL]: "校验器(validator)",
  [K.FIELD_PARAMS]: "参数",
  [K.ADD_FIELD_PARAMS_TIPS]: "添加 `{{name}}` 的子属性",
  [K.MODEL_DEFINITION_UPDATE_MESSAGE]: "有更新",
  [K.MODEL_DEFINITION_CREATE_TIPS]: "找不到模型？前往新建",
  [K.RESPONSE_WRAPPER_TIPS]:
    'wrapper 默认为true，会在 response 返回数据后额外包装一层{"code": 0, "error": "", "message": "", "data": response}，如果想要自定义整个 response_message 可以设置为false',
};

export default locale;
