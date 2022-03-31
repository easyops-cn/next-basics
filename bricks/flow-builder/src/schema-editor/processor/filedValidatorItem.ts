import { isNil } from "lodash";
import { ProcessValidateField } from "../components/field-validator-item/FieldValidatorItem";
import { NumberCompareItem } from "../components/field-validator-item/NumberValidatorInput";
import { compareMethodList, numberTypeList } from "../constants";
import { ValidateField } from "../interfaces";

export function processValidatorInitValue(
  data: ValidateField = {}
): ProcessValidateField {
  if (!data) return;
  const result: ProcessValidateField = {};
  for (const [key, value] of Object.entries(data)) {
    if (compareMethodList.includes(key)) {
      result.compare = result.compare || [];
      result.compare.push({ method: key, value } as NumberCompareItem);
    } else {
      result[key as keyof ProcessValidateField] = value;
    }
  }

  return result;
}

export function formatValidatorData(data: ProcessValidateField): ValidateField {
  if (numberTypeList.includes(data.type)) {
    return data.compare?.reduce((obj, item) => {
      if (item.method && !isNil(item.value)) {
        obj[item.method] = item.value;
      }
      return obj;
    }, {} as ValidateField);
  } else if (data.type === "string") {
    return {
      pattern: data.pattern,
    };
  }
}
