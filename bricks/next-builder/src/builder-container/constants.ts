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
    name: "basic-bricks.grid-layout",
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
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.RECOMMEND}`),
      },
    ],
  },
  {
    key: "atom",
    title: i18next.t(`${NS_NEXT_BUILDER}:${K.ATOM}`),
    type: "group",
    children: [
      { key: "layout", text: i18next.t(`${NS_NEXT_BUILDER}:${K.LAYOUT}`) },
      { key: "card", text: i18next.t(`${NS_NEXT_BUILDER}:${K.CARD}`) },
      {
        key: "general-tables",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.GENERAL_TABLES}`),
      },
      {
        key: "description",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.DESCRIPTION}`),
      },
      { key: "chart", text: i18next.t(`${NS_NEXT_BUILDER}:${K.CHART}`) },
      {
        key: "value-mapping",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.VALUE_MAPPING}`),
      },
      {
        key: "data-view",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.DATA_VIEW}`),
      },
      {
        key: "form-input",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.FORM_INPUT}`),
      },
      {
        key: "navigation",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.NAVIGATION}`),
      },
      {
        key: "feedback-and-tooltip",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.FEEDBACK_AND_TOOLTIP}`),
      },
      {
        key: "data-convert",
        text: i18next.t(`${NS_NEXT_BUILDER}:${K.DATA_CONVERT}`),
      },
      { key: "topology", text: i18next.t(`${NS_NEXT_BUILDER}:${K.TOPOLOGY}`) },
      { key: "other", text: i18next.t(`${NS_NEXT_BUILDER}:${K.OTHER}`) },
    ],
  },
];

// used temporary, remove after doc migration finish
export const chartStory = [
  {
    category: "chart",
    storyId: "general-charts.statistic-card",
    type: "brick",
    text: {
      en: "statistic card",
      zh: "统计卡片",
    },
    icon: {
      lib: "fa",
      icon: "dolly",
    },
  },
  {
    category: "chart",
    storyId: "general-charts.statistic-item",
    type: "brick",
    text: {
      en: "statistic item",
      zh: "统计项",
    },
    icon: {
      lib: "fa",
      icon: "dolly",
    },
  },
  {
    category: "chart",
    storyId: "chart-v2.line-chart",
    type: "brick",
    text: {
      en: "chart-v2 Line Chart",
      zh: "chart-v2 折线图",
    },
    icon: { lib: "fa", icon: "chart-line" },
  },
  {
    category: "chart",
    storyId: "chart-v2.area-chart",
    type: "brick",
    text: {
      en: "chart-v2 Area Chart",
      zh: "chart-v2 面积图",
    },
    icon: { lib: "fa", icon: "chart-area" },
  },
  {
    category: "chart",
    storyId: "chart-v2.bar-chart",
    type: "brick",
    text: {
      en: "chart-v2 Bar Chart",
      zh: "chart-v2 柱状图",
    },
    icon: { lib: "fa", icon: "chart-bar" },
  },
  {
    category: "chart",
    storyId: "chart-v2.horizontal-bar-chart",
    type: "brick",
    text: {
      en: "chart-v2 Horizontal Bar Chart",
      zh: "chart-v2 横向柱状图",
    },
    icon: { lib: "fa", icon: "align-left" },
  },
  {
    category: "chart",
    storyId: "chart-v2.pie-chart",
    type: "brick",
    text: {
      en: "chart-v2 Pie Chart",
      zh: "chart-v2 饼图",
    },
    icon: { lib: "fa", icon: "chart-pie" },
  },
  {
    category: "chart",
    storyId: "chart-v2.donut-chart",
    type: "brick",
    text: {
      en: "chart-v2 Donut Chart",
      zh: "chart-v2 环图",
    },
    icon: { lib: "fa", icon: "dot-circle" },
  },
  {
    category: "chart",
    storyId: "chart-v2.gauge-chart",
    type: "brick",
    text: {
      en: "chart-v2 Gauge Chart",
      zh: "chart-v2 仪表盘",
    },
    icon: { lib: "easyops", category: "app", icon: "monitor-dashboard" },
  },
  {
    category: "chart",
    storyId: "chart-v2.time-series-chart",
    type: "brick",
    text: {
      en: "chart-v2 Time Chart",
      zh: "chart-v2 时间序列图",
    },
    icon: { lib: "fa", icon: "chart-line" },
  },
  {
    category: "chart",
    storyId: "chart-v2.radar-chart",
    type: "brick",
    text: {
      en: "chart-v2 radar Chart",
      zh: "chart-v2 雷达图",
    },
    icon: { lib: "fa", icon: "chart-line" },
  },
  {
    category: "chart",
    storyId: "chart-v2.map-chart",
    type: "brick",
    text: {
      en: "chart-v2 map Chart",
      zh: "chart-v2 地图",
    },
    icon: { lib: "fa", icon: "chart-line" },
  },
  {
    category: "chart",
    storyId: "chart-v2.time-bar-chart",
    type: "brick",
    text: {
      en: "chart-v2 time bar Chart",
      zh: "chart-v2 时间条形图",
    },
    icon: { lib: "fa", icon: "chart-line" },
  },
] as Story[];
