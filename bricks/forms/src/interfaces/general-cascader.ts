import { CascaderOptionType } from "antd/lib/cascader";

export interface ProcessedOptionData {
  layerIndex: number;
  curOption: CascaderOptionType;
  selectedOptions: CascaderOptionType[];
}
export interface selectedDataType {
  value: (string | number)[];
  selectedOptions: CascaderOptionType[];
}
