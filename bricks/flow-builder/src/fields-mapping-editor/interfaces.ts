export interface FieldItem {
  name: string;
  key?: string;
  type: string;
  description?: string;
  required?: boolean;
  value?: unknown;
  fields?: FieldItem[];
}

export interface SimplifiedFieldItem {
  name: string;
  type: string;
  value?: unknown;
  fields?: SimplifiedFieldItem[];
}

export type FlatFieldChildrenMap = Record<string, FieldItem[]>;
