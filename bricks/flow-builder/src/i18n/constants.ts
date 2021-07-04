export const NS_FLOW_BUILDER = "flow-builder";

export enum K {
  FLOW_BUILDER = "FLOW_BUILDER",
  SCHEMA_ITEM_NORMAL = "SCHEMA_ITEM_NORMAL",
  SCHEMA_ITEM_REF = "SCHEMA_ITEM_REF",
}

export type Locale = { [key in K]: string };
