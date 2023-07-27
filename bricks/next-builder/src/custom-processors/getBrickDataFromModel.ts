import { getRuntime } from "@next-core/brick-kit";
import {
  ContextModel,
  ModelConfig,
  Attr,
  ProviderNameFn,
  SupportedBrick,
  NormalizedResult,
  Model,
  DataType,
} from "../shared/quick-generate/interface";
import { generatorFactory } from "../shared/quick-generate/factory";
import { CommonTypeGenerator } from "../shared/quick-generate/CommTypeGenerator";
import { values } from "lodash";

interface DataOfModel {
  contextModel: ContextModel;
  config: ModelConfig;
  brickData: {
    brick: string;
    instanceId: string;
    [key: string]: any;
  };
  modelData: Model;
  constantMaps: Record<string, any>;
  generatorProviderName: ProviderNameFn;
}

interface ExtraOption {
  appId: string;
  rootType: DataType;
}

export function getBrickDataFromModel(
  params: DataOfModel,
  option: ExtraOption,
  isEdit: boolean
): NormalizedResult {
  const {
    contextModel,
    config,
    brickData,
    modelData,
    constantMaps,
    generatorProviderName,
  } = params;

  const { appId, rootType: dataType } = option;
  const attrMap = new Map<string, Attr>();

  modelData.attrList?.forEach((attr) => {
    attrMap.set(attr.id, attr);
  });

  const { brickMap, updatedBrickFields } = constantMaps;
  const useBrickList = values(brickMap[brickData.brick]);

  const instance: CommonTypeGenerator = generatorFactory(
    brickData.brick as SupportedBrick,
    {
      generatorProviderName,
      updatedBrickFields,
    }
  );

  instance.setData({
    useBrickList,
    brickData,
    attrMap,
    contextModel,
    dataType,
    appId,
  });

  if (!isEdit) {
    return instance.getCreateData(config);
  } else {
    return instance.getMergeData(config);
  }
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getBrickDataFromModel",
  getBrickDataFromModel
);
