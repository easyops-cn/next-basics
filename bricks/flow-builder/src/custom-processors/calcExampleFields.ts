import { getRuntime } from "@next-core/brick-kit";

interface Field {
  name?: string;
  type?: string;
  ref?: string;
  fields?: Field[];
}

function isFieldRef(field: Field): boolean {
  return !!field.ref;
}

function getFieldType(field: Field): string {
  return isFieldRef(field) ? field.ref : field.type;
}

function isArrayType(field: Field): boolean {
  return isFieldRef(field)
    ? field.ref.endsWith("[]")
    : field.type.endsWith("[]");
}

function _calcExampleFields(fields: Field[], data: Record<string, any>): void {
  fields?.forEach((item) => {
    const type = getFieldType(item);
    if (isArrayType(item)) {
      if (type === "object[]") {
        const obj = {};
        data[item.name] = [obj];

        _calcExampleFields(item.fields, obj);
      } else {
        data[item.name] = [type.replace("[]", "")];
      }
    } else {
      if (type === "object") {
        const obj = {};
        data[item.name] = obj;
        _calcExampleFields(item.fields, obj);
      } else {
        data[item.name] = type;
      }
    }
  });
}

export function calcExampleFields(fields: Field[]): any {
  const collectedData = {};

  _calcExampleFields(fields, collectedData);

  return collectedData;
}

getRuntime().registerCustomProcessor(
  "flowBuilder.calcExampleFields",
  calcExampleFields
);
