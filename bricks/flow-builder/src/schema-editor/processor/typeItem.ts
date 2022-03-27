import {
  ContractModel,
  mixGroupContract,
  ProcessTypeValue,
} from "../components/type-item/TypeItem";
import { innerTypeList } from "../constants";
import { isEmpty } from "lodash";
import i18next from "i18next";
import { K, NS_FLOW_BUILDER } from "../../i18n/constants";

export function processTypeItemInitValue(value: string): ProcessTypeValue {
  if (/.*\[\]$/.test(value)) {
    return {
      value: extractType(value),
      isArray: true,
    };
  }
  return {
    value,
    isArray: false,
  };
}

export function processTypeItemData(data: ProcessTypeValue): string {
  return data.isArray ? `${data.value}[]` : data.value;
}

export function extractType(type = ""): string {
  return type.replace(/\[\]$/, "");
}

export function processFilterModes(
  modelList: ContractModel[],
  q = "",
  type: "normal" | "model"
): mixGroupContract[] {
  const basicGroup = {
    group: i18next.t(`${NS_FLOW_BUILDER}:${K.SIMPLE_TYPE}`),
    items: [],
  } as mixGroupContract;

  if (type === "normal") {
    innerTypeList
      .filter((type) => type.includes(q.toLowerCase()))
      .forEach((type) => {
        basicGroup.items.push({ label: type, value: type });
      });
  }

  const ModelGroup = {
    group: i18next.t(`${NS_FLOW_BUILDER}:${K.MODEL_TYPE}`),
    items: [],
  } as mixGroupContract;

  if (type === "model") {
    modelList.forEach((item) => {
      ModelGroup.items.push({ label: item.name, value: item.name });
    });
  }

  return [basicGroup, ModelGroup].filter((item) => !isEmpty(item.items));
}
