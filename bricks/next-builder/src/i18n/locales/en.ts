import { Locale, K } from "../constants";

const locale: Locale = {
  [K.NEXT_BUILDER]: "Next Builder",
  [K.LIBRARY]: "Library",
  [K.EVENTS]: "Events",
  [K.DATA]: "Data (Context)",
  [K.SEARCH_BRICKS_IN_LIBRARY]: "Search bricks in library",
  [K.SEARCH_DATA]: "Search data",
  [K.SEARCH_BRICKS_WITH_EVENTS]: "Search bricks with events",
  [K.SEARCH_ROUTE]: "Search route",
  [K.ADD_DATA]: "Add Data",
  [K.SETTING]: "Setting",
  [K.VIEW_ROUTE]: "View Route",
  [K.BUILD_AND_PUSH_TOOLTIP]: "Build & Push (Ctrl+B)",
  [K.PREVIEW]: "Preview",
  [K.BRICK_LIBRARY]: "Brick Library",
  [K.TIPS]: "Tips",
  [K.STORYBOARD_VIEW_TIPS_1_ROUTE]:
    "<i>Storyboard</i> view shows the brick tree of current route.",
  [K.STORYBOARD_VIEW_TIPS_1_TEMPLATE]:
    "<i>Storyboard</i> view shows the brick tree of current template.",
  [K.STORYBOARD_VIEW_TIPS_2]:
    "Drag bricks or mount-points to reorder them. Or drag bricks to move them between mount-points.",
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
};

export default locale;
