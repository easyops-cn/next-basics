export const NS_NEXT_BUILDER = "next-builder";

export enum K {
  NEXT_BUILDER = "NEXT_BUILDER",
  LIBRARY = "LIBRARY",
  EVENTS = "EVENTS",
  DATA = "DATA",
  SEARCH_BRICKS_IN_LIBRARY = "SEARCH_BRICKS_IN_LIBRARY",
  SEARCH_DATA = "SEARCH_DATA",
  SEARCH_BRICKS_WITH_EVENTS = "SEARCH_BRICKS_WITH_EVENTS",
  SEARCH_ROUTE = "SEARCH_ROUTE",
  SEARCH_TEMPLATE = "SEARCH_TEMPLATE",
  SEARCH_SNIPPET = "SEARCH_SNIPPET",
  ADD_DATA = "ADD_DATA",
  SETTINGS = "SETTINGS",
  VIEW_ROUTE = "VIEW_ROUTE",
  VIEW_TEMPLATE = "VIEW_TEMPLATE",
  VIEW_SNIPPET = "VIEW_SNIPPET",
  BUILD_AND_PUSH_TOOLTIP = "BUILD_AND_PUSH_TOOLTIP",
  PREVIEW = "PREVIEW",
  BRICK_LIBRARY = "BRICK_LIBRARY",
  WIDGET_LIBRARY = "WIDGET_LIBRARY",
  LAYOUT_LIBRARY = "LAYOUT_LIBRARY",
  TIPS = "TIPS",
  ENTER_FULLSCREEN = "ENTER_FULLSCREEN",
  EXIT_FULLSCREEN = "EXIT_FULLSCREEN",
  CLOSE = "CLOSE",
  METHOD = "METHOD",
  MORE = "MORE",
  EVENTS_HANDLER_BUILTIN_ACTION = "EVENTS_HANDLER_BUILTIN_ACTION",
  EVENTS_HANDLER_USE_PROVIDER = "EVENTS_HANDLER_USE_PROVIDER",
  EVENTS_CUSTOM_BRICK_INTERACTION = "EVENTS_CUSTOM_BRICK_INTERACTION",
  EVENTS_HANLDER_CONDITIONAL = "EVENTS_HANLDER_CONDITIONAL",
  CUSTOM_EVENTS_SET_PROP = "CUSTOM_EVENTS_SET_PROP",
  CUSTOM_EVENTS_USE_METHOD = "CUSTOM_EVENTS_USE_METHOD",
  NO_EVENTS_TO_ADD = "NO_EVENTS_TO_ADD",
  DO_NOT_SUPPORT_VISUAL_CONFIG = "DO_NOT_SUPPORT_VISUAL_CONFIG",
  SELECT_ACTION_LABEL = "EVENTS_SELECT_ACTION_LABEL",
  BRICK_SELECTOR_LABEL = "BRICK_ID_LABEL",
  CALLBACK_LABEL = "CALLBACK_LABEL",
  PROPERTIES_LABEL = "PROPERTIES_LABEL",
  USE_METHOD_LABEL = "USE_METHOD_LABEL",
  ARGS_LABEL = "ARGS_LABEL",
  PROVIDER_TYPE_LABEL = "PROVIDER_TYPE_LABEL",
  HANDLE_TYPE_LABEL = "HANDLE_TYPE_LABEL",
  POLLING_LABEL = "POLLING_LABEL",
  BRICK_EVENT_LABEL = "BRICK_EVENT_LABEL",
  POLLING_ITEM_PLACEHOLDER = "POLLING_ITEM_PLACEHOLDER",
  BUILTIN_PROVIDER = "BUILTIN_PROVIDER",
  IF_LABEL = "IF_LABEL",
  TRANSFORM_LABEL = "TRANSFORM_LABEL",
  TRANSFORM_FROM_LABEL = "FIELD_LABEL",
  SEGUE_ID_ITEM_LABEL = "SEGUE_ID_ITEM_LABEL",
  HISTORY_PATH_ITEM_LABEL = "HISTORY_PATH_ITEM_LABEL",
  HISTORY_PATH_ITEM_TOOLTIP = "HISTORY_PATH_ITEM_TOOLTIP",
  TRANSFORM_MAP_ARRAY = "TRANSFORM_MAP_ARRAY",
  TRANSFORM_MAP_ARRAY_TOOLTIP = "TRANSFORM_MAP_ARRAY_TOOLTIP",
  REJECT_LABEL = "REJECT_LABEL",
  TRANSFORM_FROM_TOOLTIP = "TRANSFORM_FROM_TOOLTIP",
  FLOW_API = "FLOW_API",
  WORKFLOW = "WORKFLOW",
  VISUAL_EVENT_ADD_CUSTOM_EVENT_PLACEHOLDER = "VISUAL_EVENT_ADD_CUSTOM_EVENT_PLACEHOLDER",
  LINK_TO_DEVELOPER_PROVIDER_DOC = "LINK_TO_DEVELOPER_PROVIDER_DOC",
  LINK_TO_FLOWER_BUILDER = "LINK_TO_FLOWER_BUILDER",
  LINK_TO_NEXT_DOCS = "LINK_TO_NEXT_DOCS",
  NODE_ACTION_EVENTS_VIEW = "NODE_ACTION_EVENTS_VIEW",
  NODE_ACTION_COPY = "NODE_ACTION_COPY",
  NODE_ACTION_CUT = "NODE_ACTION_CUT",
  NODE_ACTION_PASTE = "NODE_ACTION_PASTE",
  NODE_ACTION_CLEAR_CLIPBOARD = "NODE_ACTION_CLEAR_CLIPBOARD",
  NODE_ACTION_CONVERT_TO_TEMPLATE = "NODE_ACTION_CONVERT_TO_TEMPLATE",
  NODE_ACTION_APPEND_BRICK = "NODE_ACTION_APPEND_BRICK",
  NODE_ACTION_APPEND_ROUTE = "NODE_ACTION_APPEND_ROUTE",
  NODE_ACTION_DELETE = "NODE_ACTION_DELETE",
  NODE_ACTION_VIEW_ROUTE = "NODE_ACTION_VIEW_ROUTE",
  STORYBOARD_VIEW_TIPS_1_ROUTE = "STORYBOARD_VIEW_TIPS_1_ROUTE",
  STORYBOARD_VIEW_TIPS_1_TEMPLATE = "STORYBOARD_VIEW_TIPS_1_TEMPLATE",
  STORYBOARD_VIEW_TIPS_2 = "STORYBOARD_VIEW_TIPS_2",
  STORYBOARD_VIEW_TIPS_3 = "STORYBOARD_VIEW_TIPS_3",
  LIBRARY_VIEW_TIPS_1 = "LIBRARY_VIEW_TIPS_1",
  LIBRARY_VIEW_TIPS_2 = "LIBRARY_VIEW_TIPS_2",
  EVENTS_VIEW_TIPS_1 = "EVENTS_VIEW_TIPS_1",
  EVENTS_VIEW_TIPS_2 = "EVENTS_VIEW_TIPS_2",
  DATA_VIEW_TIPS_1 = "DATA_VIEW_TIPS_1",
  DATA_VIEW_TIPS_2 = "DATA_VIEW_TIPS_2",
  DATA_VIEW_TIPS_3 = "DATA_VIEW_TIPS_3",
  FIND_BRICKS_BY_CONFIGURATION = "FIND_BRICKS_BY_CONFIGURATION",
  SHOW_RELATED_NODES_BASED_ON_EVENTS_WHEN_HOVERING = "SHOW_RELATED_NODES_BASED_ON_EVENTS_WHEN_HOVERING",
  CANVAS_TYPE_MAIN = "CANVAS_TYPE_MAIN",
  CANVAS_TYPE_PORTAL = "CANVAS_TYPE_PORTAL",
  BRICK_CATEGORY_RECOMMENDED = "RECOMMENDED",
  BRICK_CATEGORY_ATOM = "ATOM",
  BRICK_CATEGORY_LAYOUT = "LAYOUT",
  BRICK_CATEGORY_CARD = "CARD",
  BRICK_CATEGORY_GENERAL_TABLES = "GENERAL_TABLES",
  BRICK_CATEGORY_DESCRIPTION = "DESCRIPTION",
  BRICK_CATEGORY_CHART = "CHART",
  BRICK_CATEGORY_VALUE_MAPPING = "VALUE_MAPPING",
  BRICK_CATEGORY_DATA_VIEW = "DATA_VIEW",
  BRICK_CATEGORY_FORM_INPUT = "FORM_INPUT",
  BRICK_CATEGORY_NAVIGATION = "NAVIGATION",
  BRICK_CATEGORY_FEEDBACK_AND_TOOLTIP = "FEEDBACK_AND_TOOLTIP",
  BRICK_CATEGORY_DATA_CONVERT = "DATA_CONVERT",
  BRICK_CATEGORY_TOPOLOGY = "TOPOLOGY",
  BRICK_CATEGORY_FORM_INPUT_BASIC = "FORM_INPUT_BASIC",
  BRICK_CATEGORY_FORM_INPUT_ADVANCED = "FORM_INPUT_ADVANCED",
  BRICK_CATEGORY_FORM_INPUT_BUSINESS = "FORM_INPUT_BUSINESS",
  BRICK_CATEGORY_INTERACT_BASIC = "INTERACT_BASIC",
  BRICK_CATEGORY_TABLE = "TABLE",
  BRICK_CATEGORY_TEXT = "TEXT",
  BRICK_CATEGORY_CARD_INFO = "CARD_INFO",
  BRICK_CATEGORY_CARD_STATISTIC = "CARD_STATISTIC",
  BRICK_CATEGORY_DISPLAY_COMPONENT = "DISPLAY_COMPONENT",
  BRICK_CATEGORY_DATA_TRANSFORM = "DATA_TRANSFORM",
  BRICK_CATEGORY_CONTAINER_DISPLAY = "CONTAINER_DISPLAY",
  BRICK_CATEGORY_CONTAINER_LAYOUT = "CONTAINER_LAYOUT",
  BRICK_CATEGORY_BIG_SCREEN_CONTENT = "BIG_SCREEN_CONTENT",
  BRICK_CATEGORY_BIG_SCREEN_LAYOUT = "BIG_SCREEN_LAYOUT",
  BRICK_CATEGORY_OTHER = "OTHER",
  LAYOUT_CLASSIC = "LAYOUT_CLASSIC",
  LAYOUT_BANNER = "LAYOUT_BANNER",
  LAYOUT_MENU = "LAYOUT_MENU",
  RECOMMENDED_ACTIONS = "RECOMMENDED_ACTIONS",
  BRICK_CATEGORY_LIST = "BRICK_CATEGORY_LIST",
  BRICK_CATEGORY_ENTRY = "BRICK_CATEGORY_ENTRY",
  BRICK_CATEGORY_CARD_LIST = "BRICK_CATEGORY_CARD_LIST",
  BRICK_CATEGORY_NUMBER = "BRICK_CATEGORY_NUMBER",
  BRICK_CATEGORY_LIST_INFO = "BRICK_CATEGORY_LIST_INFO",
  BRICK_CATEGORY_FEEDBACK = "BRICK_CATEGORY_FEEDBACK",
  CONTRACT_OPTIONS_TIPS_PREFIX = "CONTRACT_OPTIONS_TIPS_PREFIX",
  CONTRACT_OPTIONS_TIPS_SUFFIX = "CONTRACT_OPTIONS_TIPS_SUFFIX",
  CONTRACT_VALIDATE_MESSAGE = "CONTRACT_VALIDATE_MESSAGE",
  ADD_FIELD = "ADD_FIELD",
  CURRENT_FIELD = "CURRENT_FIELD",
  SET_TO_NEW_VALUE = "SET_TO_NEW_VALUE",
  BRICK_SUGGEST = "BRICK_SUGGEST",
  BRICK = "BRICK",
  V3_BRICK = "V3_BRICK",
  V3_PROVIDER = "V3_PROVIDER",
  V3_BRICK_FEEDBACK = "V3_BRICK_FEEDBACK",
  WIDGET = "WIDGET",
  SNIPPET = "SNIPPET",
  TEMPLATE = "TEMPLATE",
  CUSTOMTEMPLATE = "CUSTOMTEMPLATE",
  CUSTOMSNIPPET = "CUSTOMSNIPPET",
  LAYOUT = "LAYOUT",
  FORMITEM = "FORMITEM",
  DOCUMENT = "DOCUMENT",
  SELF_BRICK_SNIPPETS = "SELF_BRICK_SNIPPETS",
  SCENE_SNIPPETS = "SCENE_SNIPPETS",
  ANALYZING = "ANALYZING",
  EVERYTHING_IS_OK = "EVERYTHING_IS_OK",
  THERE_ARE_PROBLEMS = "THERE_ARE_PROBLEMS",
  THERE_ARE_NOTICES = "THERE_ARE_NOTICES",
  VIEW_PROBLEMATIC_BRICK = "VIEW_PROBLEMATIC_BRICK",
  VIEW_PROBLEMATIC_ROUTE = "VIEW_PROBLEMATIC_ROUTE",
  VIEW_PROBLEMATIC_TEMPLATE = "VIEW_PROBLEMATIC_TEMPLATE",
  REQUIRED_FIELD_MESSAGE = "REQUIRED_FIELD_MESSAGE",
  REGEX_FIELD_MESSAGE = "REGEX_FIELD_MESSAGE",
  SELECT_WORKFLOW_FIELD_PLACEHOLDER = "SELECT_WORKFLOW_FIELD_PLACEHOLDER",
  SEARCH_WORKFLOW_NODE_FIELD = "SEARCH_WORKFLOW_NODE_FIELD",
  USE_FLOW_STEP_FIELD = "USE_FLOW_STEP_FIELD",
  USE_FLOW_CONST_VALUE = "USE_FLOW_CONST_VALUE",
  USE_WORKFLOW_NODE_VALUE = "USE_WORKFLOW_NODE_VALUE",
  FIXED_VALUE = "FIXED_VALUE",
  DYNAMIC_VALUE = "DYNAMIC_VALUE",
  WHEN = "WHEN",
  SEARCH_FIELD = "SEARCH_FIELD",
  SET_FILTER_CONDITION = "SET_FILTER_CONDITION",
  CONDITION = "CONDITION",
  CONDITION_GROUP = "CONDITION_GROUP",
  EDIT_FIELD_NOT_FOUND_MSG = "EDIT_FIELD_NOT_FOUND_MSG",
  INSTRUCTIONS_FOR_USE = "INSTRUCTIONS_FOR_USE",
  ALL = "ALL",
}

export type Locale = { [key in K]: string };
