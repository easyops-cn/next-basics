import { BrickOptionItem, ToolboxTab, LibraryMenuItem } from "./interfaces";
import { Story } from "@next-core/brick-types";
import i18next from "i18next";
import { K, NS_NEXT_BUILDER } from "../i18n/constants";

export const brickSearchResultLimit = 24;

export const frequentlyUsedBricks: BrickOptionItem[] = [
  {
    type: "brick",
    name: "basic-bricks.micro-view",
  },
  {
    type: "brick",
    name: "basic-bricks.general-button",
  },
  {
    type: "brick",
    name: "basic-bricks.general-card",
  },
  {
    type: "brick",
    name: "basic-bricks.easy-view",
  },
  {
    type: "brick",
    name: "basic-bricks.general-modal",
  },
  {
    type: "brick",
    name: "basic-bricks.general-drawer",
  },
  {
    type: "brick",
    name: "basic-bricks.general-custom-buttons",
  },
  {
    type: "brick",
    name: "basic-bricks.popover-container",
  },
  {
    type: "brick",
    name: "forms.general-form",
  },
  {
    type: "brick",
    name: "forms.general-input",
  },
  {
    type: "brick",
    name: "forms.general-select",
  },
  {
    type: "brick",
    name: "forms.general-radio",
  },
  {
    type: "brick",
    name: "forms.general-time-picker",
  },
  {
    type: "brick",
    name: "forms.cmdb-instance-select",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-value-mapping",
  },
  {
    type: "brick",
    name: "forms.general-buttons",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-link",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-table",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-descriptions",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-tag",
  },
  {
    type: "brick",
    name: "presentational-bricks.modal-confirm",
  },
  {
    type: "brick",
    name: "container-brick.search-bar",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-general-search",
  },
  {
    type: "brick",
    name: "presentational-bricks.general-image",
  },
];

export const treeViewPaddingUnit = 14;

export const defaultToolboxTab = ToolboxTab.TREE_VIEW;

export const localStorageKeyForShowRelatedNodesBasedOnEvents =
  "next-builder-show-related-bricks-based-on-events";

export const LIB_ALL_CATEGORY = "all";
export const libCategoryList: LibraryMenuItem[] = [
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
