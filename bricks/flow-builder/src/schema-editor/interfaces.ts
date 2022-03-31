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
  refRequired?: string[];
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
  import?: string[];
}

export interface AddedSchemaFormItem extends SchemaItemProperty {
  origin: "normal" | "reference";
}

export interface ModelFieldItem {
  name: string;
  type?: string;
  description?: string;
}

export interface EditorOfContext {
  onEdit?(data: SchemaItemProperty, traceId?: string): void;
  onRemove?(traceId: string): void;
  onCreate?(data: SchemaItemProperty, traceId: string): void;
  onModal?(
    itemData: SchemaItemProperty,
    isEdit: boolean,
    trackId: string
  ): void;
}
