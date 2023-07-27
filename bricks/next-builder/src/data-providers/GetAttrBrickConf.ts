import { createProviderClass } from "@next-core/brick-utils";
import {
  attrTypeDefinition,
  attrTypeBrickConfOfForms,
  attrTypeBrickConfOfDisplay,
  generalOptionsOfDisplay,
} from "./constants";

export interface Attribute {
  name: string;
  id: string;
  instanceId: string;
  required: boolean;
  unique?: boolean;
  value: {
    type: string;
    regex?: string[];
  };
}

export type BrickType = "table" | "forms" | "descriptions";

export interface GetAttrBrickConfParams {
  type: BrickType;
  attrList?: Attribute[];
}

export interface AttrBrickConfList extends Attribute {
  rowKey: string;
  attrBrickConf: {
    text: string;
    options: Record<string, any>[];
  };
}

export interface GetAttrBrickConfResponse {
  type: BrickType;
  attrBrickConfList: AttrBrickConfList[];
}

export function GetAttrBrickConf(
  params: GetAttrBrickConfParams
): GetAttrBrickConfResponse {
  return {
    type: params.type,
    attrBrickConfList: (params.attrList ?? []).map((attr) => {
      return {
        ...attr,
        rowKey: attr.instanceId + "-" + params.type,
        attrBrickConf: {
          text: attrTypeDefinition[attr.value.type].text,
          options:
            params.type === "forms"
              ? attrTypeBrickConfOfForms(attr)
              : attrTypeBrickConfOfDisplay(attr, params.type).concat(
                  generalOptionsOfDisplay(attr, params.type)
                ),
        },
      };
    }),
  };
}

customElements.define(
  "next-builder.provider-get-attr-brick-conf",
  createProviderClass(GetAttrBrickConf)
);
