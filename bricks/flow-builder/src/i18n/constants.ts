export const NS_FLOW_BUILDER = "flow-builder";

export enum K {
  FLOW_BUILDER = "FLOW_BUILDER",
  SCHEMA_ITEM_NORMAL = "SCHEMA_ITEM_NORMAL",
  SCHEMA_ITEM_REF = "SCHEMA_ITEM_REF",
  SCHEMA_ITEM_MODEL = "SCHEMA_ITEM_MODEL",
  PATTERN_INPUT_PLACEHOLDER = "PATTERN_INPUT_PLACEHOLDER",
  ENUM_INPUT_PLACEHOLDER = "ENUM_INPUT_PLACEHOLDER",
  COMPARE_METHOD_PLACEHOLDER = "COMPARE_METHOD_PLACEHOLDER",
  COMPARE_VALUE_PLACEHOLDER = "COMPARE_VALUE_PLACEHOLDER",
  MODEL_SEARCH_PLACEHOLDER = "MODEL_SEARCH_PLACEHOLDER",
  FIELDS_MAPPING_EDIT_TOOLTIP = "FIELDS_MAPPING_EDIT_TOOLTIP",
  ARRAY = "ARRAY",
  SIMPLE_TYPE = "SIMPLE_TYPE",
  CUSTOM_TYPE = "CUSTOM_TYPE",
  MODEL_TYPE = "FROM_MODEL",
  REF_VALIDATE_REQUIRED_MSG = "REF_VALIDATE_REQUIRED_MSG",
  FIELDS_MAPPING_REQUIRED_MSG = "FIELDS_MAPPING_REQUIRED_MSG",
  EDIT = "EDIT",
  SAVE = "SAVE",
  CANCEL = "CANCEL",
  EDITOR_PLACEHOLDER = "EDITOR_PLACEHOLDER",
  CONST = "CONST",
  FIELDS_MAPPING = "FIELDS_MAPPING",
  CEL = "CEL",
  NAME_LABEL = "NAME_LABEL",
  REQUIRED_LABEL = "REQUIRED_LABEL",
  TYPE_LABEL = "TYPE_LABEL",
  DESCRIPTION_LABEL = "DESCRIPTION_LABEL",
  SETTING_LABEL = "SETTING_LABEL",
  CATEGORY_LABEL = "CATEGORY_LABEL",
  REFERENCE_LABEL = "REFERENCE_LABEL",
  DEFAULT_LABEL = "DEFAULT_LABEL",
  ENUM_LABEL = "ENUM_LABEL",
  VALIDATOR_LABEL = "VALIDATOR_LABEL",
  FIELD_PARAMS = "FIELD_PARAMS",
  ADD_FIELD_PARAMS_TIPS = "ADD_FIELD_PARAMS_TIPS",
  MODEL_DEFINITION_UPDATE_MESSAGE = "MODEL_DEFINITION_UPDATE_MESSAGE",
  MODEL_DEFINITION_CREATE_TIPS = "MODEL_DEFINITION_CREATE_TIPS",
}

export type Locale = { [key in K]: string };
