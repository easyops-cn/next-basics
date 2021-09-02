import { getRuntime } from "@next-core/brick-kit";
import { isNil } from "lodash";
import { yamlStringify } from "../fields-mapping-editor/processor";

interface Field {
  name: string;
  source?:
    | "const" /* number, boolean, string 类型为 const 类型 */
    | "fieldsMapping"
    | "cel";
  value?: unknown;
}

interface ProcessedField extends Field {
  constValue?: string;
  fieldsMappingValue?: string;
  celValue?: string;
}

export function isCelMode(raw: string): boolean {
  return /^\s*<%~?\s/.test(raw) && /\s%>\s*$/.test(raw);
}

export function getProcessedCelValue(raw: string): string {
  return raw.replace(/^\s*<%~?\s|\s%>\s*$/g, "");
}

export function isInvalidValue(value: unknown): boolean {
  return isNil(value) || value === "";
}

export function processFieldInitValue(fieldData: Field): ProcessedField {
  const { source, value } = fieldData;
  if (isInvalidValue(source) && isInvalidValue(value)) {
    return {
      ...fieldData,
      source: "const",
    };
  }

  if (!isInvalidValue(source) && isInvalidValue(value)) {
    return fieldData;
  }

  if (isInvalidValue(source) && !isInvalidValue(value)) {
    switch (typeof value) {
      case "number":
      case "boolean":
        return {
          ...fieldData,
          source: "const",
          constValue: String(value),
        };

      case "object":
        return {
          ...fieldData,
          source: "cel",
          celValue: yamlStringify(value),
        };

      case "string":
        return isCelMode(value as string)
          ? {
              ...fieldData,
              source: "cel",
              celValue: getProcessedCelValue(value as string),
            }
          : {
              ...fieldData,
              source: "const",
              constValue: value,
            };
      /* istanbul ignore next */
      default:
        throw new Error("Unsupported Field Type");
    }
  }

  if (!isInvalidValue(source) && !isInvalidValue(value)) {
    if (source === "const") {
      return {
        ...fieldData,
        constValue: String(value),
      };
    } else if (source === "fieldsMapping") {
      return {
        ...fieldData,
        fieldsMappingValue: getProcessedCelValue(value as string),
      };
    } else {
      return {
        ...fieldData,
        celValue:
          typeof value === "string"
            ? getProcessedCelValue(value as string)
            : yamlStringify(value),
      };
    }
  }
}

getRuntime().registerCustomProcessor(
  "flowBuilder.processFieldInitValue",
  processFieldInitValue
);
