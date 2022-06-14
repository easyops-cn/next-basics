import { PropertyType } from "../interfaces";

export const groupI18nMap = {
  basic: {
    en: "Basic",
    zh: "常用",
  },
  ui: {
    en: "UI",
    zh: "样式",
  },
  advanced: {
    en: "Advanced",
    zh: "高级",
  },
  other: {
    en: "Other",
    zh: "其他",
  },
};

export const supportBasicType = [
  "boolean",
  "number",
  "string",
  "string[]",
  "MenuIcon",
  "Color",
];

export const supportMenuType = ["Menu", "SidebarSubMenu"];

export const OTHER_FORM_ITEM_FIELD = "others";

export const commonProps: PropertyType[] = [
  {
    name: "id",
    type: "string",
    description: "构件 ID",
    group: "basic",
    groupI18N: groupI18nMap,
  },
  {
    name: "style",
    type: "Record<string, any>",
    description: "构件样式",
    group: "ui",
    groupI18N: groupI18nMap,
  },
];
