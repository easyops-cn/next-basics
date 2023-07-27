import { isNil } from "lodash";
import { CreateDataItemValue } from "./WorkflowCreateDataItem";
import { TypeFieldItem, WorkFLowValueType } from "../interface";

export function processCreateFormValue(
  fieldList: TypeFieldItem[],
  value: CreateDataItemValue
): CreateDataItemValue {
  return fieldList?.reduce((obj, item) => {
    return {
      ...obj,
      [item.id]: {
        type: value?.[item.id]?.type || WorkFLowValueType.CONST,
        value: isNil(value?.[item.id]) ? undefined : value[item.id].value,
      },
    };
  }, {});
}
