export const NS_SHARED_EDITORS = "shared-editors";

export enum K {
  SHARED_EDITORS = "SHARED_EDITORS",
  SCHEMA_ITEM_NORMAL = "SCHEMA_ITEM_NORMAL",
  SCHEMA_ITEM_REF = "SCHEMA_ITEM_REF",
}

export type Locale = { [key in K]: string };
