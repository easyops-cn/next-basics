import React from "react";
import i18next from "i18next";
import {
  frequentlyUsedBricks,
  frequentlyUsedV3Bricks,
} from "../builder-container/constants";
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
  v3Brick: frequentlyUsedV3Bricks,
  brick: frequentlyUsedBricks,
  layout: [],
  customTemplate: [],
  widget: [],
  snippet: [],
  formItem: [],
};

export const componetSortConf: Record<string, number> = {
  v3Brick: 0,
  brick: 1,
  widget: 2,
  snippet: 3,
  layout: 4,
  customTemplate: 5,
  customSnippet: 6,
  formItem: 7,
  workflow: 8,
};

export const i18nTransform: Record<string, string> = {
  v3Brick: i18next.t(`${NS_NEXT_BUILDER}:${K.V3_BRICK}`),
  brick: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK}`),
  layout: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT}`),
  customTemplate: i18next.t(`${NS_NEXT_BUILDER}:${K.CUSTOMTEMPLATE}`),
  customSnippet: i18next.t(`${NS_NEXT_BUILDER}:${K.CUSTOMSNIPPET}`),
  widget: i18next.t(`${NS_NEXT_BUILDER}:${K.WIDGET}`),
  snippet: i18next.t(`${NS_NEXT_BUILDER}:${K.SNIPPET}`),
  formItem: i18next.t(`${NS_NEXT_BUILDER}:${K.FORMITEM}`),
  workflow: i18next.t(`${NS_NEXT_BUILDER}:${K.WORKFLOW}`),
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
    key: "table",
    text: i18next.t(`${NS_NEXT_BUILDER}:${K.BRICK_CATEGORY_TABLE}`),
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

const v3BrickGroup = [
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
  v3Brick: v3BrickGroup,
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

export const suggestFormBricks: Pick<BrickOptionItem, "type" | "id">[] = [
  {
    type: "brick",
    id: "forms.general-input",
  },
  {
    type: "brick",
    id: "forms.general-input-number",
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
    id: "forms.general-checkbox",
  },
  {
    type: "brick",
    id: "forms.general-switch",
  },
  {
    type: "brick",
    id: "forms.general-time-picker",
  },
  {
    type: "brick",
    id: "forms.general-date-picker",
  },
  {
    type: "brick",
    id: "forms.time-range-picker",
  },
  {
    type: "brick",
    id: "presentational-bricks.datetime-selector",
  },
  {
    type: "brick",
    id: "forms.general-textarea",
  },
  {
    type: "brick",
    id: "forms.general-slide",
  },
  {
    type: "brick",
    id: "forms.general-auto-complete",
  },
  {
    type: "brick",
    id: "forms.input-with-unit",
  },
  {
    type: "brick",
    id: "forms.general-buttons",
  },
  {
    type: "brick",
    id: "forms.tree-select",
  },
  {
    type: "brick",
    id: "forms.icon-select",
  },
  {
    type: "brick",
    id: "forms.general-cascader",
  },
  {
    type: "brick",
    id: "forms.upload-img",
  },
  {
    type: "brick",
    id: "forms.upload-files",
  },
  {
    type: "brick",
    id: "forms.upload-files-v2",
  },
  {
    type: "brick",
    id: "forms.general-form-item",
  },
  {
    type: "brick",
    id: "code-bricks.code-editor",
  },
  {
    type: "brick",
    id: "code.vs-code-editor",
  },
  {
    type: "brick",
    id: "presentational-bricks.markdown-editor",
  },
  {
    type: "brick",
    id: "forms.general-structs-form-item",
  },
  {
    type: "brick",
    id: "forms.general-modal",
  },
  {
    type: "brick",
    id: "forms.dynamic-form-item-v2",
  },
  {
    type: "brick",
    id: "forms.advance-setting",
  },
  {
    type: "brick",
    id: "forms.form-modal",
  },
];

export const suggestV3FormBricks: Pick<BrickOptionItem, "type" | "id">[] = [
  {
    type: "brick",
    id: "eo-input",
  },
  {
    type: "brick",
    id: "eo-select",
  },
  {
    type: "brick",
    id: "eo-radio",
  },
  {
    type: "brick",
    id: "eo-checkbox",
  },
  {
    type: "brick",
    id: "eo-switch",
  },
  {
    type: "brick",
    id: "eo-textarea",
  },
  {
    type: "brick",
    id: "eo-submit-buttons",
  },
  {
    type: "brick",
    id: "eo-icon-select",
  },
  {
    type: "brick",
    id: "eo-upload-image",
  },
  {
    type: "brick",
    id: "eo-upload-file",
  },
  {
    type: "brick",
    id: "eo-form-item",
  },
  {
    type: "brick",
    id: "eo-dynamic-form-item",
  },
];

// 不在forms-NB但是归类为表单项构件
export const otherFormBrick = [
  "presentational-bricks.datetime-selector",
  "code-bricks.code-editor",
  "presentational-bricks.markdown-editor",
  "code.vs-code-editor",
];
