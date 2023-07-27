import { getRuntime } from "@next-core/brick-kit";
import { values, get } from "lodash";
import {
  ModelConfig,
  CreateSnippetConf,
  ProviderNameFn,
  Attr,
  Model,
  BrickData,
  SupportedBrick,
  DataType,
} from "../shared/quick-generate/interface";
import { generatorFactory } from "../shared/quick-generate/factory";

interface SnippetParams {
  appId: string;
  config: ModelConfig;
  snippetData: CreateSnippetConf;
  generatorProviderName: ProviderNameFn;
  constantMaps: Record<string, any>;
  modelData: Model;
  brickData: BrickData;
  dataType: DataType;
}

interface ExtraOption {
  appId: string;
  rootType: DataType;
}

export function getSnippetDataFromModel(
  snippetParams: SnippetParams,
  option: ExtraOption
): any {
  const {
    brickData,
    modelData,
    constantMaps,
    generatorProviderName,
    config,
    snippetData,
  } = snippetParams;

  const { appId, rootType: dataType } = option;

  const attrMap = new Map<string, Attr>();

  modelData.attrList?.forEach((attr) => {
    attrMap.set(attr.id, attr);
  });

  const { brickMap, updatedBrickFields } = constantMaps;
  const curBrick = get(snippetData, "nodeData.bricks[0].brick");
  const useBrickList = values(brickMap[curBrick]);

  const instance = generatorFactory(brickData.brick as SupportedBrick, {
    generatorProviderName,
    updatedBrickFields,
  });

  instance.setData({
    brickData,
    useBrickList,
    attrMap,
    dataType,
    appId,
  });

  return instance.processSnippetData({
    modelConfig: config,
    snippetData,
  });
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getSnippetDataFromModel",
  getSnippetDataFromModel
);
