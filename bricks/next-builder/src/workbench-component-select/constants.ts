import i18next from "i18next";
import { frequentlyUsedBricks } from "../builder-container/constants";
import { BrickOptionItem } from "../builder-container/interfaces";
import { K, NS_NEXT_BUILDER } from "../i18n/constants";

interface suggestType {
  [k: string]: Partial<BrickOptionItem>[];
}

export const suggest: suggestType = {
  brick: frequentlyUsedBricks,
  layout: [],
  customTemplate: [],
  widget: [],
  snippet: [],
  formItem: [],
};

export const i18nTransform: Record<string, string> = {
  brick: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK}`),
  layout: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT}`),
  customTemplate: i18next.t(`${NS_NEXT_BUILDER}:${K.CUSTOMTEMPLATE}`),
  widget: i18next.t(`${NS_NEXT_BUILDER}:${K.WIDGET}`),
  snippet: i18next.t(`${NS_NEXT_BUILDER}:${K.SNIPPET}`),
  formItem: i18next.t(`${NS_NEXT_BUILDER}:${K.FORMITEM}`),
};

const brickGroup = [
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
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_GENERAL_TABLES}`),
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
  {
    key: "template",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.TEMPLATE}`),
  },
];

const layoutGroup = [
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
];

const widgetGroup = [
  {
    key: "list",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_LIST}`),
  },
  {
    key: "card-list",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CARD_LIST}`),
  },
  {
    key: "entry",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_ENTRY}`),
  },
  {
    key: "num",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_NUMBER}`),
  },
];

export type groupItem = {
  key: string;
  text: string;
  children?: Partial<BrickOptionItem>[];
};

export const suggestGroup: groupItem[] = [
  {
    key: "suggest",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_SUGGEST}`),
  },
];

type componentGroup = Record<string, groupItem[]>;

export const defaultGroup: componentGroup = {
  brick: brickGroup,
  widget: widgetGroup,
  layout: layoutGroup,
};
