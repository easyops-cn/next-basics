import { Locale, K } from "../constants";

const locale: Locale = {
  [K.NEXT_BUILDER]: "Next Builder",
  [K.LIBRARY]: "Library",
  [K.EVENTS]: "Events",
  [K.DATA]: "Data (Context)",
  [K.SEARCH_BRICKS_IN_LIBRARY]: "Search bricks in library",
  [K.SEARCH_DATA]: "Find data by configuration",
  [K.SEARCH_BRICKS_WITH_EVENTS]: "Search bricks with events",
  [K.SEARCH_ROUTE]: "Search route",
  [K.SEARCH_TEMPLATE]: "Search template",
  [K.SEARCH_SNIPPET]: "Search snippet",
  [K.ADD_DATA]: "Add Data",
  [K.SETTINGS]: "Settings",
  [K.VIEW_ROUTE]: "View Route",
  [K.VIEW_TEMPLATE]: "View Template",
  [K.VIEW_SNIPPET]: "View Snippet",
  [K.BUILD_AND_PUSH_TOOLTIP]: "Build & Push (Ctrl+B)",
  [K.PREVIEW]: "Preview",
  [K.BRICK_LIBRARY]: "Brick Library",
  [K.LAYOUT_LIBRARY]: "Layout",
  [K.WIDGET_LIBRARY]: "Widget",
  [K.TIPS]: "Tips",
  [K.ENTER_FULLSCREEN]: "Enter fullscreen",
  [K.EXIT_FULLSCREEN]: "Exit fullscreen",
  [K.CLOSE]: "Close",
  [K.MORE]: "More",
  [K.NODE_ACTION_EVENTS_VIEW]: "Events view",
  [K.NODE_ACTION_COPY]: "Copy",
  [K.NODE_ACTION_CUT]: "Cut",
  [K.NODE_ACTION_PASTE]: "Paste",
  [K.NODE_ACTION_CLEAR_CLIPBOARD]: "Clear clipboard",
  [K.NODE_ACTION_APPEND_BRICK]: "Append brick",
  [K.NODE_ACTION_APPEND_ROUTE]: "Append route",
  [K.NODE_ACTION_CONVERT_TO_TEMPLATE]: "Convert to template",
  [K.NODE_ACTION_DELETE]: "Delete",
  [K.NODE_ACTION_VIEW_ROUTE]: "View route",
  [K.STORYBOARD_VIEW_TIPS_1_ROUTE]:
    "<i>Storyboard</i> view shows the brick tree of current route.",
  [K.STORYBOARD_VIEW_TIPS_1_TEMPLATE]:
    "<i>Storyboard</i> view shows the brick tree of current template.",
  [K.STORYBOARD_VIEW_TIPS_2]:
    "Drag bricks or mount-points to reorder them. Or drag a brick to move it to another mount-point.",
  [K.STORYBOARD_VIEW_TIPS_3]:
    "Enter keywords in the search box, and search for bricks in the Storyboard based on their configurations.",
  [K.LIBRARY_VIEW_TIPS_1]: "<i>Library</i> lists available bricks in library.",
  [K.LIBRARY_VIEW_TIPS_2]: "Search and drag bricks onto canvas.",
  [K.EVENTS_VIEW_TIPS_1]:
    "<i>Events</i> view shows bricks with event listeners or being target of events.",
  [K.EVENTS_VIEW_TIPS_2]: "Click a brick to show its event graph.",
  [K.DATA_VIEW_TIPS_1]:
    "In <i>Data</i> view, you can manage your data of the current route.",
  [K.DATA_VIEW_TIPS_2]:
    "Data can be variable values, or responses from remote by using a provider brick.",
  [K.DATA_VIEW_TIPS_3]: "It is also as known as <i>Context</i> in storyboard.",
  [K.FIND_BRICKS_BY_CONFIGURATION]: "Find bricks by configuration",
  [K.SHOW_RELATED_NODES_BASED_ON_EVENTS_WHEN_HOVERING]:
    "Show related nodes based on events when hovering",
  [K.CANVAS_TYPE_MAIN]: "Main",
  [K.CANVAS_TYPE_PORTAL]: "Portal",
  [K.BRICK_CATEGORY_RECOMMENDED]: "Recommended",
  [K.BRICK_CATEGORY_ATOM]: "Atom",
  [K.BRICK_CATEGORY_LAYOUT]: "Layout",
  [K.BRICK_CATEGORY_CARD]: "Card",
  [K.BRICK_CATEGORY_GENERAL_TABLES]: "General Table",
  [K.BRICK_CATEGORY_DESCRIPTION]: "Description",
  [K.BRICK_CATEGORY_CHART]: "Chart",
  [K.BRICK_CATEGORY_VALUE_MAPPING]: "Value Mapping",
  [K.BRICK_CATEGORY_DATA_VIEW]: "Data View",
  [K.BRICK_CATEGORY_FORM_INPUT]: "Form Input",
  [K.BRICK_CATEGORY_NAVIGATION]: "Navigation",
  [K.BRICK_CATEGORY_FEEDBACK_AND_TOOLTIP]: "Feedback And Tooltips",
  [K.BRICK_CATEGORY_DATA_CONVERT]: "Data Convert",
  [K.BRICK_CATEGORY_TOPOLOGY]: "Topology",
  [K.BRICK_CATEGORY_FORM_INPUT_BASIC]: "Basic Form Input",
  [K.BRICK_CATEGORY_FORM_INPUT_ADVANCED]: "Advanced Form Input",
  [K.BRICK_CATEGORY_FORM_INPUT_BUSINESS]: "Business Form Input",
  [K.BRICK_CATEGORY_INTERACT_BASIC]: "Basic Interact",
  [K.BRICK_CATEGORY_TABLE]: "TABLE",
  [K.BRICK_CATEGORY_TEXT]: "Text",
  [K.BRICK_CATEGORY_CARD_INFO]: "Info Card",
  [K.BRICK_CATEGORY_CARD_STATISTIC]: "Statistic Card",
  [K.BRICK_CATEGORY_DISPLAY_COMPONENT]: "Display Component",
  [K.BRICK_CATEGORY_DATA_TRANSFORM]: "Data Transform",
  [K.BRICK_CATEGORY_CONTAINER_DISPLAY]: "Display Container",
  [K.BRICK_CATEGORY_CONTAINER_LAYOUT]: "Layout Container",
  [K.BRICK_CATEGORY_BIG_SCREEN_CONTENT]: "Big Screen Content",
  [K.BRICK_CATEGORY_BIG_SCREEN_LAYOUT]: "Big Screen Layout",
  [K.BRICK_CATEGORY_OTHER]: "Other",
  [K.LAYOUT_CLASSIC]: "Classic Layout",
  [K.LAYOUT_BANNER]: "Banner Layout",
  [K.LAYOUT_MENU]: "With Menu Layout",
  [K.METHOD]: "Method",
  [K.EVENTS_HANDLER_BUILTIN_ACTION]: "Builtin Action",
  [K.EVENTS_HANDLER_USE_PROVIDER]: "Use Provider",
  [K.CUSTOM_EVENTS_SET_PROP]: "Set Brick Properties",
  [K.CUSTOM_EVENTS_USE_METHOD]: "Use Brick Method",
  [K.EVENTS_CUSTOM_BRICK_INTERACTION]: "Custom Brick Interaction",
  [K.NO_EVENTS_TO_ADD]: "No Events To Add",
  [K.DO_NOT_SUPPORT_VISUAL_CONFIG]:
    "The current event handler uses the legacy configuration, which is not currently supported, please switch to yaml mode to modify",
  [K.SELECT_ACTION_LABEL]: "Select Action",
  [K.PROVIDER_TYPE_LABEL]: "Provider Type",
  [K.BRICK_SELECTOR_LABEL]: "Brick",
  [K.USE_METHOD_LABEL]: "Use Method",
  [K.ARGS_LABEL]: "Args",
  [K.HANDLE_TYPE_LABEL]: "Handler",
  [K.CALLBACK_LABEL]: "Callback",
  [K.PROPERTIES_LABEL]: "Properties",
  [K.BUILTIN_PROVIDER]: "Builtin Provider",
  [K.IF_LABEL]: "If",
  [K.POLLING_LABEL]: "Polling",
  [K.TRANSFORM_LABEL]: "Transform",
  [K.TRANSFORM_FROM_LABEL]: "TransformFrom",
  [K.BRICK_EVENT_LABEL]: "Event Type",
  [K.SEGUE_ID_ITEM_LABEL]: "Segue ID",
  [K.HISTORY_PATH_ITEM_LABEL]: "Path",
  [K.HISTORY_PATH_ITEM_TOOLTIP]:
    "The url of the new page that needs to be link",
  [K.TRANSFORM_MAP_ARRAY]: "transformMapArray",
  [K.TRANSFORM_MAP_ARRAY_TOOLTIP]:
    "Set Array mapping processing mode in transform, usually no additional settings, just use the default value",
  [K.REJECT_LABEL]: "OnReject",
  [K.TRANSFORM_FROM_TOOLTIP]:
    "Use the specified field of the returned data as the data source.",
  [K.POLLING_ITEM_PLACEHOLDER]: "Please input polling parameters",
  [K.FLOW_API]: "Contract",
  [K.VISUAL_EVENT_ADD_CUSTOM_EVENT_PLACEHOLDER]:
    "Press enter to complete the input",
  [K.LINK_TO_DEVELOPER_PROVIDER_DOC]:
    "Link to provider documents of developers",
  [K.LINK_TO_FLOWER_BUILDER]: "Link to flow builder app",
  [K.LINK_TO_NEXT_DOCS]: "Link to next document",
  [K.RECOMMENDED_ACTIONS]: "Recommended actions",
  [K.BRICK_CATEGORY_LIST]: "List",
  [K.BRICK_CATEGORY_CARD_LIST]: "Card List",
  [K.BRICK_CATEGORY_ENTRY]: "Entry Card",
  [K.BRICK_CATEGORY_NUMBER]: "Statistics Number",
  [K.BRICK_CATEGORY_LIST_INFO]: "Info List",
  [K.BRICK_CATEGORY_FEEDBACK]: "Feedback",
  [K.CONTRACT_OPTIONS_TIPS_PREFIX]: "Only the first",
  [K.CONTRACT_OPTIONS_TIPS_SUFFIX]:
    "items are displayed, please search for more results",
  [K.CONTRACT_VALIDATE_MESSAGE]: "Please fill in the correct contract name ",
  [K.BRICK_SUGGEST]: "Suggest",
  [K.BRICK]: "Atom Brick",
  [K.WIDGET]: "Widget",
  [K.SNIPPET]: "Snippet",
  [K.TEMPLATE]: "Template",
  [K.CUSTOMTEMPLATE]: "Custom template",
  [K.CUSTOMSNIPPET]: "Custom snippet",
  [K.LAYOUT]: "Layout",
  [K.FORMITEM]: "FORMITEM",
  [K.DOCUMENT]: "Document",
  [K.SELF_BRICK_SNIPPETS]: "Single brick snippets",
  [K.SCENE_SNIPPETS]: "Scene snippets",
  [K.ANALYZING]: "Analyzing...",
  [K.EVERYTHING_IS_OK]: "Everything is OK.",
  [K.THERE_ARE_PROBLEMS]: "🚨 There are problems!",
  [K.VIEW_PROBLEMATIC_BRICK]: "View problematic brick",
  [K.VIEW_PROBLEMATIC_ROUTE]: "View problematic route",
  [K.VIEW_PROBLEMATIC_TEMPLATE]: "View problematic template",
};

export default locale;
