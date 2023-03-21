import { UseBrickConf } from "@next-core/brick-types";

export interface BrickInfoItem {
  label: string;
  brick: string;
  propertyGenerator(...data: any[]): Record<string, any>;
}

export interface BrickData {
  brick?: string;
  instanceId?: string;
  properties?: string;
}

export type ProviderNameFn = (dataType: DataType, instanceId: string) => string;
export interface BaseParams {
  useBrickList: BrickInfoItem[];
  generatorProviderName?: ProviderNameFn;
  updatedBrickFields?: string[];
}

export interface InitValue {
  brickData: BrickData;
  attrMap: Map<string, Attr>;
  contextModel: ContextModel;
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

export interface ModelConfig {
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
}

export type DataType = "state" | "context";

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
