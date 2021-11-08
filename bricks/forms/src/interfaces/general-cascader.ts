import { CascaderOptionType } from "antd/lib/cascader";

export interface ProcessedOptionData {
  layerIndex: number;
  curOption: CascaderOptionType;
  selectedOptions: CascaderOptionType[];
}
