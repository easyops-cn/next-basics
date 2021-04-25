import { BrickOptionItem, BuilderCanvasType, ToolboxTab } from "./interfaces";

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
    name: "forms.general-textarea",
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
    name: "presentational-bricks.brick-general-search",
  },
  {
    type: "brick",
    name: "presentational-bricks.brick-tree",
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
