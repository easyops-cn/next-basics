import { Locale, K } from "../constants";

const locale: Locale = {
  [K.FLOW_BUILDER]: "Flow Builder",
  [K.SCHEMA_ITEM_NORMAL]: "Normal Inteface",
  [K.SCHEMA_ITEM_REF]: "Reference Inteface",
  [K.PATTERN_INPUT_PLANCEHOLDER]: "Please input RegExp",
  [K.ENUM_INPUT_PLANCEHOLDER]: "Please input enum value",
  [K.COMPARE_METHOD_PLANCEHOLDER]: "Compare method",
  [K.COMPARE_VALUE_PLANCEHOLDER]:
    "Please select compare method before input number",
  [K.ARRAY]: "array",
  [K.SIMPLE_TYPE]: "Simple Type",
  [K.MODEL_TYPE]: "Model Type",
  [K.REF_VALIDATE_REQUIRED_MSG]: "Pealse select field of Ref",
  [K.MODEL_SEARCH_PLANCEHOLDER]: "Search with keyword",
  [K.FIELDS_MAPPING_REQUIRED_MSG]: "{{name}} is required",
  [K.EDIT]: "Edit",
  [K.CANCEL]: "Cancel",
  [K.SAVE]: "Save",
  [K.EDITOR_PLACEHOLDER]:
    "The Cel expression is wrapped with `<% %>`, e.g., <% xxx %>",
};

export default locale;
