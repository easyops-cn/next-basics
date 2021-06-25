import {
  BrickOptionItem,
  ToolboxTab,
  LibraryMenuItem,
  LayerType,
} from "./interfaces";
import i18next from "i18next";
import { K, NS_NEXT_BUILDER } from "../i18n/constants";

export const brickSearchResultLimit = 24;

export const widgetSearchResultLimit = 12;

// 调整成通过 type和id 来指定常用的构件，布局，挂件的显示顺序，这里还有 name 字段是为了兼容左上角的添加构件的使用场景，
// 开关固化后可删除 name 字段
export const frequentlyUsedBricks: BrickOptionItem[] = [
  {
    type: "brick",
    name: "basic-bricks.micro-view",
    id: "basic-bricks.micro-view",
  },
  {
    type: "brick",
    name: "basic-bricks.general-button",
    id: "basic-bricks.general-button",
  },
  {
    type: "brick",
    name: "basic-bricks.general-card",
    id: "basic-bricks.general-card",
  },
  {
    type: "brick",
    name: "basic-bricks.easy-view",
    id: "basic-bricks.easy-view",
  },
  {
    type: "brick",
    name: "basic-bricks.general-modal",
    id: "basic-bricks.general-modal",
  },
  {
    type: "brick",
    name: "basic-bricks.general-drawer",
    id: "basic-bricks.general-drawer",
  },
  {
    type: "brick",
    name: "basic-bricks.general-custom-buttons",
    id: "basic-bricks.general-custom-buttons",
  },
  {
    type: "brick",
    name: "basic-bricks.popover-container",
    id: "basic-bricks.popover-container",
  },
  {
    type: "brick",
    name: "forms.general-form",
    id: "forms.general-form",
  },
  {
    type: "brick",
    name: "forms.general-input",
    id: "forms.general-input",
  },
  {
    type: "brick",
    name: "forms.general-select",
    id: "forms.general-select",
  },
  {
    type: "brick",
    name: "forms.general-radio",
    id: "forms.general-radio",
  },
  {
    type: "brick",
    name: "forms.general-time-picker",
    id: "forms.general-time-picker",
  },
  {
    type: "brick",
    name: "forms.cmdb-instance-select",
    id: "forms.cmdb-instance-select",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-value-mapping",
    id: "presentational-bricks.brick-value-mapping",
  },
  {
    type: "brick",
    name: "forms.general-buttons",
    id: "forms.general-buttons",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-link",
    id: "presentational-bricks.brick-link",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-table",
    id: "presentational-bricks.brick-table",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-descriptions",
    id: "presentational-bricks.brick-descriptions",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-tag",
    id: "presentational-bricks.brick-tag",
  },
  {
    type: "brick",
    name: "presentational-bricks.modal-confirm",
    id: "presentational-bricks.modal-confirm",
  },
  {
    type: "brick",
    name: "container-brick.search-bar",
    id: "container-brick.search-bar",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-general-search",
    id: "presentational-bricks.brick-general-search",
  },
  {
    type: "brick",
    name: "presentational-bricks.general-image",
    id: "presentational-bricks.general-image",
  },
];

export const frequentlyUsedLayout: BrickOptionItem[] = [
  { type: "snippet", id: "basic-bricks.easy-view[classic]" },
  { type: "snippet", id: "basic-bricks.easy-view[basic]" },
  { type: "snippet", id: "basic-bricks.easy-view[right-aligned-menu]" },
];

export const frequentlyUsedWidget: BrickOptionItem[] = [];

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
        key: "page",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT_PAGE}`),
      },
      {
        key: "grid",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT_GRID}`),
      },
      {
        key: "sidebar",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT_WITH_SIDEBAR}`),
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
