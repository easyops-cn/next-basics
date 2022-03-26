import { Locale, K } from "../constants";

const locale: Locale = {
  [K.FLOW_BUILDER]: "Flow Builder",
  [K.SCHEMA_ITEM_NORMAL]: "Normal Interface",
  [K.SCHEMA_ITEM_REF]: "Reference",
  [K.SCHEMA_ITEM_MODEL]: "Model",
  [K.PATTERN_INPUT_PLACEHOLDER]: "Please input RegExp",
  [K.ENUM_INPUT_PLACEHOLDER]: "Please input enum value",
  [K.COMPARE_METHOD_PLACEHOLDER]: "Compare method",
  [K.COMPARE_VALUE_PLACEHOLDER]:
    "Please select compare method before input number",
  [K.FIELDS_MAPPING_EDIT_TOOLTIP]:
    "Can't edit sub-attributes under the `object[]` type",
  [K.ARRAY]: "array",
  [K.SIMPLE_TYPE]: "Simple Type",
  [K.MODEL_TYPE]: "Model Type",
  [K.REF_VALIDATE_REQUIRED_MSG]: "Please select field of Ref",
  [K.MODEL_SEARCH_PLACEHOLDER]: "Search with keyword",
  [K.FIELDS_MAPPING_REQUIRED_MSG]: "{{name}} is required",
  [K.EDIT]: "Edit",
  [K.CANCEL]: "Cancel",
  [K.SAVE]: "Save",
  [K.EDITOR_PLACEHOLDER]:
    "The Cel expression is wrapped with `<% %>`, e.g., <% xxx %>",
  [K.CONST]: "Const",
  [K.FIELDS_MAPPING]: "Fields Mapping",
  [K.CEL]: "Cel",
  [K.NAME_LABEL]: "Name",
  [K.REQUIRED_LABEL]: "Required",
  [K.TYPE_LABEL]: "Type",
  [K.DESCRIPTION_LABEL]: "Description",
  [K.SETTING_LABEL]: "Setting",
  [K.CATEGORY_LABEL]: "Category",
  [K.DEFAULT_LABEL]: "Default",
  [K.REFERENCE_LABEL]: "Ref",
  [K.ENUM_LABEL]: "Enum",
  [K.VALIDATOR_LABEL]: "Validator",
  [K.FIELD_PARAMS]: "Params",
  [K.ADD_FIELD_PARAMS_TIPS]: "add `{{name}}` children properties",
  [K.MODEL_DEFINITION_UPDATE_MESSAGE]:
    "The model has been updated, whether to get the latest model definition",
};

export default locale;
