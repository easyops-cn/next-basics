import { UseBrickConf, BrickConf } from "@next-core/brick-types";

export interface BrickInfoItem {
  label: string;
  brick: string;
  brickType?: string;
  propertyGenerator(...data: any[]): Record<string, any>;
}

export interface BrickData {
  brick?: string;
  instanceId?: string;
  properties?: string;
}

export interface ProviderParams {
  dataType: DataType;
  dataName: string;
  instanceId: string;
}

export type ProviderNameFn = (params: ProviderParams) => string;
export interface BaseParams {
  generatorProviderName?: ProviderNameFn;
  updatedBrickFields?: string[];
}

export interface InitValue {
  useBrickList: BrickInfoItem[];
  brickData: BrickData;
  attrMap: Map<string, Attr>;
  contextModel?: ContextModel;
  dataType: DataType;
  appId?: string;
}

export interface ContextModel {
  id: string;
  sourceType: string;
  fields: Field[];
  children?: {
    brick: string;
    [key: string]: any;
  }[];
}

export interface Attr {
  id: string;
  name: string;
  required?: "true" | "false";
  value: {
    type: string;
  };
  [key: string]: any;
}

export interface Model {
  attrList: Attr[];
}

export interface ModelConfig {
  dataName?: string;
  origin?: string;
  modelId?: string;
  provider?: string;
  filter?: Record<string, any>;
  fields?: Field[];
}

export interface Field {
  name: string;
  id: string;
  type: string;
  brick?: string;
  brickInstanceId?: string;
  brickType?: string;
}

export type DataType = "template" | "snippet" | "route";

export interface InsertType {
  appId: string;
  brick: string;
  mountPoint: string;
  parent: string;
  type: string;
  properties: string;
}

export interface UpdateType {
  objectId: string;
  instanceId: string;
  property: {
    brick?: string;
    properties?: string;
    [key: string]: any;
  };
}

export interface DeleteType {
  objectId: string;
  instanceId: string;
}

export interface NormalizedResult {
  insert?: InsertType[];
  update?: UpdateType[];
  delete?: DeleteType[];
}

export type SupportedBrick =
  | "forms.general-form"
  | "presentational-bricks.brick-table";

export interface Column {
  key: string;
  dataIndex: string;
  title: string;
  useBrick?: UseBrickConf;
}

export interface NodeDataOfSnippet {
  brick: string;
  bricks: BrickConf[];
  type: string;
}

export type DragStatus = "inside" | "top" | "bottom";
export interface CreateSnippetConf {
  dragOverInstanceId: string;
  dragStatus: DragStatus;
  mountPoint: string;
  nodeData: NodeDataOfSnippet;
  parent?: string;
  parentNode?: {
    brick: string;
    instanceId: string;
    [key: string]: any;
  };
}

export interface SnippetParams {
  modelConfig: ModelConfig;
  snippetData: CreateSnippetConf;
}

export interface NormalizedSnippet {
  appId: string;
  dragOverInstanceId: string;
  dragStatus: DragStatus;
  mountPoint: string;
  brick: string;
  type: string;
  parent: string;
  nodeData: NodeDataOfSnippet;
  snippetBricks: NodeDataOfSnippet;
}
