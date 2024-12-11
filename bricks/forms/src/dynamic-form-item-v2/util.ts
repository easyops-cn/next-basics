import { GeneralComplexOption } from "@next-libs/forms";

export const getRealValue = (
  property: boolean | ((...args: any[]) => boolean),
  args: any[]
): boolean => {
  if (typeof property === "function") {
    return property(...args);
  }
  return property;
};

export const getRealValueOptions = (
  property:
    | GeneralComplexOption<string | number>[]
    | GeneralComplexOption<string | number>[][]
    | ((
        ...args: any[]
      ) =>
        | GeneralComplexOption<string | number>[]
        | GeneralComplexOption<string | number>[][]),
  args: any[]
):
  | GeneralComplexOption<string | number>[]
  | GeneralComplexOption<string | number>[][] => {
  if (typeof property === "function") {
    return property(...args);
  }
  return property;
};
