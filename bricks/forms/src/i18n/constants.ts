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
  GLOBALLY_UNIQUE_IDENTIFIER = "GLOBALLY_UNIQUE_IDENTIFIER",
  ATTRIBUTE_NAME = "ATTRIBUTE_NAME",
}

export type Locale = { [key in K]: string };
