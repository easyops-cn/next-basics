import { PropertyType } from "../interfaces";

export const supportBasicType = [
  "boolean",
  "number",
  "string",
  "string[]",
  "MenuIcon",
  "Color",
];

export const OTHER_FORM_ITEM_FIELD = "others";

export const commonProps: PropertyType[] = [
  {
    name: "id",
    type: "string",
    description: "构件 ID",
  },
];
