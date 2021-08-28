export interface FieldItem {
  name: string;
  key?: string;
  type: string;
  source?: string;
  description?: string;
  required?: boolean;
  value?: unknown;
  fields?: FieldItem[];
}

export interface SimplifiedFieldItem {
  name: string;
  type: string;
  value?: unknown;
  source?: string;
  fields?: SimplifiedFieldItem[];
}

export type FlatFieldChildrenMap = Record<string, FieldItem[]>;
