export interface EditorTitleProps {
  title: string;
  width?: number | string;
}

export enum CurMode {
  Create = "create",
  Edit = "editor",
}

export interface ValidateField {
  gte?: number;
  lte?: number;
  gt?: number;
  lt?: number;
  pattern?: string;
}

export interface SchemaItemProperty
  extends Omit<SchemaRootNodeProperty, "required" | "default"> {
  required?: boolean;
  default?: string | number;
  validate?: ValidateField;
  enum?: string[] | number[];
}

export interface SchemaRootNodeProperty {
  name: string;
  required?: string[];
  type?: string;
  ref?: string;
  default?: Record<string, unknown>;
  description?: string;
  fields?: SchemaItemProperty[];
}

export interface AddedSchemaFormItem extends SchemaItemProperty {
  origin: "normal" | "reference";
}

export interface ModelFieldItem {
  name: string;
  type?: string;
  description?: string;
}
