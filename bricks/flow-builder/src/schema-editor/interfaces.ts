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
  importModelDefinition?: ModelDefinition[];
}

export interface AddedSchemaFormItem extends SchemaItemProperty {
  origin: "normal" | "reference";
}

export interface ModelFieldItem {
  name: string;
  type?: string;
  description?: string;
}

export interface ModelDefinition {
  name: string;
  fields?: SchemaItemProperty[];
  updated?: boolean;
}

export interface EditorOfContext {
  modelDefinitionList: ModelDefinition[];
  onEdit?(data: SchemaItemProperty, traceId?: string): void;
  onRemove?(traceId: string): void;
  onCreate?(
    data: SchemaItemProperty | SchemaItemProperty[],
    traceId: string
  ): void;
  onModal?(
    itemData: SchemaItemProperty,
    isEdit: boolean,
    trackId: string
  ): void;
  showModelDefinition(modelDefinition: ModelDefinition, traceId: string): void;
  hideModelDefinition?(traceId: string): void;
  updateModelDefinition?(): void;
}
