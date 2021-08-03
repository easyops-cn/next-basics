export interface FieldItem {
  name: string;
  key?: string;
  type: string;
  description?: string;
  required?: boolean;
  value?: unknown;
  fields?: FieldItem[];
}

export type FlatFieldChildrenMap = Record<string, FieldItem[]>;
