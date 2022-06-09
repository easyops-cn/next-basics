import { PropertyType } from "../interfaces";

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
  },
  {
    name: "style",
    type: "Record<string, any>",
    description: "构件样式",
  },
];
