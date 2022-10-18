import React from "react";
import i18next from "i18next";
import { frequentlyUsedBricks } from "../builder-container/constants";
import { BrickOptionItem } from "../builder-container/interfaces";
import { K, NS_NEXT_BUILDER } from "../i18n/constants";

interface suggestType {
  [k: string]: Partial<BrickOptionItem>[];
}

export interface BrickSortField {
  group: string;
  position: string[];
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
    key: "form-input-basic",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FORM_INPUT_BASIC}`),
  },
  {
    key: "form-input-advanced",
    text: i18next.t(
      `${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FORM_INPUT_ADVANCED}`
    ),
  },
  {
    key: "form-input-business",
    text: i18next.t(
      `${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FORM_INPUT_BUSINESS}`
    ),
  },
  {
    key: "interact-basic",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_INTERACT_BASIC}`),
  },
  {
    key: "form",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FORM}`),
  },
  {
    key: "text",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_TEXT}`),
  },
  {
    key: "card-info",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CARD_INFO}`),
  },
  {
    key: "card-statistic",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CARD_STATISTIC}`),
  },
  {
    key: "display-component",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_DISPLAY_COMPONENT}`),
  },
  {
    key: "chart",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CHART}`),
  },
  {
    key: "topology",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_TOPOLOGY}`),
  },
  {
    key: "data-transform",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_DATA_TRANSFORM}`),
  },
  {
    key: "container-display",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CONTAINER_DISPLAY}`),
  },
  {
    key: "container-layout",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CONTAINER_LAYOUT}`),
  },
  {
    key: "feedback-and-tooltip",
    text: i18next.t(
      `${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FEEDBACK_AND_TOOLTIP}`
    ),
  },
  {
    key: "navigation",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_NAVIGATION}`),
  },
  {
    key: "big-screen-content",
    text: i18next.t(
      `${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_BIG_SCREEN_CONTENT}`
    ),
  },
  {
    key: "big-screen-layout",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_BIG_SCREEN_LAYOUT}`),
  },
  {
    key: "other",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_OTHER}`),
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
    key: "list-info",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_LIST_INFO}`),
  },
  {
    key: "card-info",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CARD_INFO}`),
  },
  {
    key: "card-statistic",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_CARD_STATISTIC}`),
  },
  {
    key: "entry",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_ENTRY}`),
  },
  {
    key: "feedback",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_FEEDBACK}`),
  },
  {
    key: "navigation",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_NAVIGATION}`),
  },
  {
    key: "layout",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_LAYOUT}`),
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

interface ComSelectContext {
  snippetsOfBrickMap?: Map<string, Map<SnippetType, BrickOptionItem[]>>;
}

export const ComponentSelectContext = React.createContext<ComSelectContext>({});

export const defaultBlankListOfBricks: string[] = [
  "business-website.basic-view",
  "business-website.basic-footer",
  "business-website.basic-header",
  "business-website.cart-item",
  "basic-bricks.header-bar",
  "presentational-bricks.single-field-edit",
  "forms.form-modal",
  "presentational-bricks.statistic-card",
  "presentational-bricks.brick-placeholder",
  "uw-presentation.logo-matrix",
  "presentational-bricks.brick-alert-level",
  "presentational-bricks.brick-alert-number",
  "presentational-bricks.brick-alert-value",
  "presentational-bricks.brick-alert-status",
  "presentational-bricks.brick-cluster-type",
  "presentational-bricks.agent-status",
];

export enum SnippetType {
  SelfBrick = "selfBrick",
  Scene = "scene",
}
