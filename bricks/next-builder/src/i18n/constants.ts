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
  ADD_DATA = "ADD_DATA",
  SETTINGS = "SETTINGS",
  VIEW_ROUTE = "VIEW_ROUTE",
  VIEW_TEMPLATE = "VIEW_TEMPLATE",
  BUILD_AND_PUSH_TOOLTIP = "BUILD_AND_PUSH_TOOLTIP",
  PREVIEW = "PREVIEW",
  BRICK_LIBRARY = "BRICK_LIBRARY",
  TIPS = "TIPS",
  ENTER_FULLSCREEN = "ENTER_FULLSCREEN",
  EXIT_FULLSCREEN = "EXIT_FULLSCREEN",
  NODE_ACTION_EVENTS_VIEW = "NODE_ACTION_EVENTS_VIEW",
  NODE_ACTION_COPY = "NODE_ACTION_COPY",
  NODE_ACTION_CUT = "NODE_ACTION_CUT",
  NODE_ACTION_PASTE = "NODE_ACTION_PASTE",
  NODE_ACTION_APPEND_BRICK = "NODE_ACTION_APPEND_BRICK",
  NODE_ACTION_DELETE = "NODE_ACTION_DELETE",
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
}

export type Locale = { [key in K]: string };
