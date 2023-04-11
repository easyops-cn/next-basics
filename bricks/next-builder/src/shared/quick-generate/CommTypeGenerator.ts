import {
  BrickInfoItem,
  Attr,
  Field,
  BrickData,
  ModelConfig,
  DataType,
  ProviderNameFn,
  BaseParams,
  InitValue,
  ContextModel,
  NormalizedResult,
} from "./interface";
import { defaultUpdatedBrickFields } from "./constants";

export abstract class CommonTypeGenerator {
  useBrickList: BrickInfoItem[];
  appId: string;
  brickData: BrickData;
  attrMap: Map<string, Attr>;
  dataType: DataType;
  contextModel: ContextModel;
  generatorProviderName: ProviderNameFn;
  needCustomProcessor: boolean;
  updatedBrickFields: string[];

  constructor(params: BaseParams) {
    const { generatorProviderName, updatedBrickFields } = params;
    this.generatorProviderName = generatorProviderName;
    this.updatedBrickFields = updatedBrickFields || defaultUpdatedBrickFields;
  }

  setData({
    useBrickList,
    brickData,
    attrMap,
    contextModel,
    dataType,
    appId,
  }: InitValue): void {
    this.useBrickList = useBrickList;
    this.brickData = brickData;
    this.attrMap = attrMap;
    this.contextModel = contextModel;
    this.dataType = dataType;
    this.appId = appId;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  processFinalMergeValue(data: any, curConf: ModelConfig): any {}

  abstract getDefaultMergeValue(curConf: ModelConfig): any;

  abstract handleDelete(field: Field, data: any): void;

  abstract handleUpdate(field: Field, data: any): void;

  abstract handleInsert(field: Field, data: any): void;

  abstract getCreateData(conf: ModelConfig): NormalizedResult;

  abstract calcPrevFields(): Field[];

  getMergeData(curConf: ModelConfig): any {
    const prevFields = this.calcPrevFields() ?? [];
    const curFields = curConf.fields ?? [];

    const data = this.getDefaultMergeValue(curConf);

    prevFields.forEach((prev) => {
      if (!curFields.some((now) => now.id === prev.id)) {
        this.handleDelete(prev, data);
      } else {
        const find = curFields.find((now) => now.id === prev.id);

        // istanbul ignore else
        if (find.brick && find.brick !== prev.brick) {
          this.handleUpdate(
            {
              ...find,
              brickInstanceId: prev.brickInstanceId,
            },
            data
          );
        }
      }
    });

    curFields.forEach((now) => {
      if (!prevFields.some((prev) => prev.id === now.id)) {
        this.handleInsert(now, data);
      }
    });

    if (this.needCustomProcessor) {
      return this.processFinalMergeValue(data, curConf);
    }

    return data;
  }
}

export function getSingleInstance<T = CommonTypeGenerator>(
  CustomClass: T
): (...args: any[]) => T {
  let instance: T;

  return (...args: any[]) => {
    return instance || (instance = new CustomClass(...args));
  };
}
