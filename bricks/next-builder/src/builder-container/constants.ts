import { BrickOptionItem, ToolboxTab, LibraryMenuItem } from "./interfaces";
import i18next from "i18next";
import { K, NS_NEXT_BUILDER } from "../i18n/constants";

export const brickSearchResultLimit = 24;

export const widgetSearchResultLimit = 12;

export const frequentlyUsedBricks: Pick<BrickOptionItem, "type" | "id">[] = [
  {
    type: "brick",
    id: "basic-bricks.micro-view",
  },
  {
    type: "brick",
    id: "basic-bricks.general-button",
  },
  {
    type: "brick",
    id: "basic-bricks.general-card",
  },
  {
    type: "brick",
    id: "basic-bricks.easy-view",
  },
  {
    type: "brick",
    id: "basic-bricks.general-modal",
  },
  {
    type: "brick",
    id: "basic-bricks.general-drawer",
  },
  {
    type: "brick",
    id: "basic-bricks.general-custom-buttons",
  },
  {
    type: "brick",
    id: "basic-bricks.popover-container",
  },
  {
    type: "brick",
    id: "forms.general-form",
  },
  {
    type: "brick",
    id: "forms.general-input",
  },
  {
    type: "brick",
    id: "forms.general-select",
  },
  {
    type: "brick",
    id: "forms.general-radio",
  },
  {
    type: "brick",
    id: "forms.general-time-picker",
  },
  {
    type: "brick",
    id: "forms.cmdb-instance-select",
  },
  {
    type: "brick",
    id: "presentational-bricks.brick-value-mapping",
  },
  {
    type: "brick",
    id: "forms.general-buttons",
  },
  {
    type: "brick",
    id: "presentational-bricks.brick-link",
  },
  {
    type: "brick",
    id: "presentational-bricks.brick-table",
  },
  {
    type: "brick",
    id: "presentational-bricks.brick-descriptions",
  },
  {
    type: "brick",
    id: "presentational-bricks.brick-tag",
  },
  {
    type: "brick",
    id: "presentational-bricks.modal-confirm",
  },
  {
    type: "brick",
    id: "container-brick.search-bar",
  },
  {
    type: "brick",
    id: "presentational-bricks.brick-general-search",
  },
  {
    type: "brick",
    id: "presentational-bricks.general-image",
  },
];

export const frequentlyUsedLayout: Pick<BrickOptionItem, "type" | "id">[] = [
  {
    type: "snippet",
    id: "basic-bricks.easy-view[classic-titlebar-toolbar-content]",
  },
  {
    type: "snippet",
    id: "basic-bricks.easy-view[classic-header-content-left1-right2]",
  },
  { type: "snippet", id: "basic-bricks.easy-view[with-sub-menu]" },
  { type: "snippet", id: "basic-bricks.easy-view[classic-two-col]" },
  {
    type: "snippet",
    id: "basic-bricks.easy-view[classic-header-content-footer]",
  },
];

export const frequentlyUsedWidget: Pick<BrickOptionItem, "type" | "id">[] = [];

export const treeViewPaddingUnit = 14;

export const defaultToolboxTab = ToolboxTab.TREE_VIEW;

export const localStorageKeyForShowRelatedNodesBasedOnEvents =
  "next-builder-show-related-bricks-based-on-events";

export const LIB_ALL_CATEGORY = "all";
export const brickMenus: LibraryMenuItem[] = [
  {
    key: LIB_ALL_CATEGORY,
    children: [
      {
        key: LIB_ALL_CATEGORY,
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_RECOMMENDED}`),
      },
    ],
  },
  {
    key: "atom",
    title: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_ATOM}`),
    type: "group",
    children: [
      {
        key: "layout",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_LAYOUT}`),
      },
      {
        key: "card",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CARD}`),
      },
      {
        key: "general-tables",
        text: i18next.t(
          `${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_GENERAL_TABLES}`
        ),
      },
      {
        key: "description",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_DESCRIPTION}`),
      },
      {
        key: "chart",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CHART}`),
      },
      {
        key: "value-mapping",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_VALUE_MAPPING}`),
      },
      {
        key: "data-view",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_DATA_VIEW}`),
      },
      {
        key: "form-input",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FORM_INPUT}`),
      },
      {
        key: "navigation",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_NAVIGATION}`),
      },
      {
        key: "feedback-and-tooltip",
        text: i18next.t(
          `${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FEEDBACK_AND_TOOLTIP}`
        ),
      },
      {
        key: "data-convert",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_DATA_CONVERT}`),
      },
      {
        key: "topology",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_TOPOLOGY}`),
      },
      {
        key: "other",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_OTHER}`),
      },
    ],
  },
];

export const layoutMenus: LibraryMenuItem[] = [
  {
    key: LIB_ALL_CATEGORY,
    children: [
      {
        key: LIB_ALL_CATEGORY,
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_RECOMMENDED}`),
      },
    ],
  },
  {
    key: "layout",
    title: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT_LIBRARY}`),
    type: "group",
    children: [
      {
        key: "classic",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT_CLASSIC}`),
      },
      {
        key: "banner",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT_BANNER}`),
      },
      {
        key: "menu",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT_MENU}`),
      },
    ],
  },
];

export const widgetMenus: LibraryMenuItem[] = [
  {
    key: LIB_ALL_CATEGORY,
    children: [
      {
        key: LIB_ALL_CATEGORY,
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_RECOMMENDED}`),
      },
    ],
  },
  {
    key: "widget",
    title: i18next.t(`${NS_NEXT_BUILDER}:${K.WIDGET_LIBRARY}`),
    type: "group",
    children: [
      {
        key: "layout",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_LAYOUT}`),
      },
      {
        key: "card",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CARD}`),
      },
      {
        key: "general-tables",
        text: i18next.t(
          `${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_GENERAL_TABLES}`
        ),
      },
      {
        key: "description",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_DESCRIPTION}`),
      },
      {
        key: "chart",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CHART}`),
      },
      {
        key: "value-mapping",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_VALUE_MAPPING}`),
      },
      {
        key: "data-view",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_DATA_VIEW}`),
      },
      {
        key: "form-input",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FORM_INPUT}`),
      },
      {
        key: "navigation",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_NAVIGATION}`),
      },
      {
        key: "feedback-and-tooltip",
        text: i18next.t(
          `${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FEEDBACK_AND_TOOLTIP}`
        ),
      },
      {
        key: "data-convert",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_DATA_CONVERT}`),
      },
      {
        key: "topology",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_TOPOLOGY}`),
      },
      {
        key: "other",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_OTHER}`),
      },
    ],
  },
];
