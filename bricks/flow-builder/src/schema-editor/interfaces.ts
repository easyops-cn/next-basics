export interface EditorTitleProps {
  title: string;
  width?: number | string;
}

export enum CurMode {
  Create = "create",
  Edit = "editor",
}

export interface SchemaItemProperty
  extends Omit<SchemaRootNodeProperty, "required"> {
  required?: boolean;
}

export interface SchemaRootNodeProperty {
  name: string;
  required?: string[];
  type?: string;
  ref?: string;
  description?: string;
  fields?: SchemaItemProperty[];
}

export interface AddedSchemaFormItem extends SchemaItemProperty {
  origin: "normal" | "reference";
}
