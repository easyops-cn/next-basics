export const NS_FORMS = "forms";

export enum K {
  FORMS = "FORMS",
  CMDB_INSTANCE_SELECT_PANEL_MODAL_TITLE = "CMDB_INSTANCE_SELECT_PANEL_MODAL_TITLE",
  CMDB_INSTANCE_SELECT_PANEL_ADD_LINK = "CMDB_INSTANCE_SELECT_PANEL_ADD_LINK",
  TO = "TO",
  START_TIME_END_TIME_CANNOT_EQUAL = "START_TIME_END_TIME_CANNOT_EQUAL",
  START_TIME_REQUIRED = "START_TIME_REQUIRED",
  END_TIME_REQUIRED = "END_TIME_REQUIRED",
  BACKGROUND_SEARCH = "BACKGROUND_SEARCH",
  DRAGGABLE_UPLOAD_TEXT = "DRAGGABLE_UPLOAD_TEXT",
  DRAGGABLE_UPLOAD_HINT = "DRAGGABLE_UPLOAD_HINT",
  SELECT_ICON = "SELECT_ICON",
  SET_COLOR = "SET_COLOR",
  ICON = "ICON",
  CLEAR = "CLEAR",
  COPY_SUCCESS = "COPY_SUCCESS",
  USERS = "USERS",
  USER_GROUPS = "USER_GROUPS",
  SWITCH = "SWITCH",
  FILTER_FROM_CMDB = "FILTER_FROM_CMDB",
  USERS_RESULT_LABEL = "USERS_RESULT_LABEL",
  USER_GROUPS_RESULT_LABEL = "USER_GROUPS_RESULT_LABEL",
  NO_DATA = "NO_DATA",
  ATTRIBUTE_DEFAULT_VALUE = "ATTRIBUTE_DEFAULT_VALUE",
  CONFIRM = "CONFIRM",
  CANCEL = "CANCEL",
  DUPLICATE_STRUCTURE_ITEM_ID = "DUPLICATE_STRUCTURE_ITEM_ID",
  GLOBALLY_UNIQUE_IDENTIFIER = "GLOBALLY_UNIQUE_IDENTIFIER",
  ATTRIBUTE_NAME = "ATTRIBUTE_NAME",
  ATTRIBUTE_ID = "ATTRIBUTE_ID",
  MUST_NEED_ATTRIBUTE_ID = "MUST_NEED_ATTRIBUTE_ID",
  ATTRIBUTE_ID_LIMIT = "ATTRIBUTE_ID_LIMIT",
  PLEASE_INPUT_ATTRIBUTE_ID = "PLEASE_INPUT_ATTRIBUTE_ID",
  ATTRIBUTE_NAME_LIMIT = "ATTRIBUTE_NAME_LIMIT",
  PLEASE_INPUT_ATTRIBUTE_NAME = "PLEASE_INPUT_ATTRIBUTE_NAME",
  VALUE_TYPE = "VALUE_TYPE",
  PLEASE_SELECT_VALUE_TYPE = "PLEASE_SELECT_VALUE_TYPE",
  ATTRIBUTE_CATEGROY = "ATTRIBUTE_CATEGROY",
  PLEASE_INPUT_ATTRIBUTE_CATEGROY = "PLEASE_INPUT_ATTRIBUTE_CATEGROY",
  REQUIRED = "REQUIRED",
  READONLY = "READONLY",
  UNIQUE = "UNIQUE",
  LIMIT = "LIMIT",
  REGULAR = "REGULAR",
  FORMAT = "FORMAT",
  CLICK_TO_SELECT_DATE = "CLICK_TO_SELECT_DATE",
  ENUMERATION_VALUE = "ENUMERATION_VALUE",
  ENUM_REGEX_JSON = "ENUM_REGEX_JSON",
  PLEASE_INPUT_ENUMERATED_VALUE = "PLEASE_INPUT_ENUMERATED_VALUE",
  FLOAT_LIMIT = "FLOAT_LIMIT",
  THIS_IS_NOT_MANDATORY = "THIS_IS_NOT_MANDATORY",
  DISPLAY_AS = "DISPLAY_AS",
  MULTI_LINE_STR = "MULTI_LINE_STR",
  DEFAULT = "DEFAULT",
  STRUCTURE_ITEM_ID = "STRUCTURE_ITEM_ID",
  STRUCTURE_ITEM_NAME = "STRUCTURE_ITEM_NAME",
  TYPE = "TYPE",
  HANDEL = "HANDEL",
  STRUCTURE_BODY_DEFINATION = "STRUCTURE_BODY_DEFINATION",
  NEW_DEFINATION = "NEW_DEFINATION",
  IFEM = "IFEM",
  ADD_STRUCTURE_ITEM = "ADD_STRUCTURE_ITEM",
  SELECT_MODEL = "SELECT_MODEL",
  CITE_MODEL = "CITE_MODEL",
  EDIT_STRUCTURE_ITEM = "EDIT_STRUCTURE_ITEM",
  INPUT_STRUCTURE_ITEM_ID = "INPUT_STRUCTURE_ITEM_ID",
  INPUT_STRUCTURE_ITEM_NAME = "INPUT_STRUCTURE_ITEM_NAME",
  STRUCTURE_ITEM_ID_LIMIT = "STRUCTURE_ITEM_ID_LIMIT",
  ENTER_TYPE = "ENTER_TYPE",
  SELECT_ATTRIBUTE = "SELECT_ATTRIBUTE",
  SELECT_ONE_CMDB_RESOURCE_MODEL = "SELECT_ONE_CMDB_RESOURCE_MODEL",
  ATTRIBUTE_TYPE = "ATTRIBUTE_TYPE",
  TAG = "TAG",
  ARRAY_LIMIT = "ARRAY_LIMIT",
  ADVANCED = "ADVANCED",
  PREFIX_IDENTIFIER = "PREFIX_IDENTIFIER",
  NUMBER_LENGTH = "NUMBER_LENGTH",
  THE_DEFAULT_IS_ONE = "THE_DEFAULT_IS_ONE",
  INITIAL = "INITIAL",
  PLEASE_ENTER_A_LEGAL_PREFIX = "PLEASE_ENTER_A_LEGAL_PREFIX",
  PLEASE_ENTER_A_LEGAL_STARTING_VALUE = "PLEASE_ENTER_A_LEGAL_STARTING_VALUE",
  STRING_TYPE = "STRING_TYPE",
  PLEASE_ENTER_THE_LENGTH_OF_THE_SERIAL_NUMBER = "PLEASE_ENTER_THE_LENGTH_OF_THE_SERIAL_NUMBER",
  DEFAULT_DIFFERENT_REGULAR = "DEFAULT_DIFFERENT_REGULAR",
  FIXED_VALUE = "FIXED_VALUE",
  BUILT_IN_FUNCTION = "BUILT_IN_FUNCTION",
  SELF_INCREASE_ID = "SELF_INCREASE_ID",
  SERIAL_NUMBER = "SERIAL_NUMBER",
  ENUMS = "ENUMS",
  INTEGER = "INTEGER",
  DATE = "DATE",
  ENUMERATION = "ENUMERATION",
  ARRAY = "ARRAY",
  FOREIGN_KEY_SINGLE_INSTANCE = "FOREIGN_KEY_SINGLE_INSTANCE",
  FOREIGN_KEY_MULTIPLE_INSTANCES = "FOREIGN_KEY_MULTIPLE_INSTANCES",
  STRUCTURE_ONE_LINE = "STRUCTURE_ONE_LINE",
  STRUCTURE_MULTIPLE_LINES = "STRUCTURE_MULTIPLE_LINES",
  BOOLEAN = "BOOLEAN",
  FLOAT = "FLOAT",
  TIME = "TIME",
  TITLE_ADD_STRUCTURE_ITEM = "TITLE_ADD_STRUCTURE_ITEM",
  TITLE_EDIT_STRUCTURE_ITEM = "TITLE_EDIT_STRUCTURE_ITEM",
  NOTICE = "NOTICE",
  DELETE_STRUCTURE_ITEM_PREFIX = "DELETE_STRUCTURE_ITEM_PREFIX",
  DELETE_STRUCTURE_ITEM_POSTFIX = "DELETE_STRUCTURE_ITEM_POSTFIX",
  DAY = "DAY",
  WEEK = "WEEK",
  HOUR = "HOUR",
  MINUTE = "MINUTE",
  SECOND = "SECOND",
  MILLSECOND = "MILLSECOND",
  CLICK_AND_DRAP_FIEL = "CLICK_AND_DRAP_FIEL",
  VOLUME_TOO_BIG = "VOLUME_TOO_BIG",
  ADD = "ADD",
  MONTH = "MONTH",
  CORRECT_CRONT_MSG = "CORRECT_CRONT_MSG",
}

export type Locale = { [key in K]: string };
