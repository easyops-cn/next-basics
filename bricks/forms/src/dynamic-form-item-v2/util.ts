export const getRealValue = (
  property: boolean | ((...args: any[]) => boolean),
  args: any[]
): boolean => {
  if (typeof property === "function") {
    return property(...args);
  }
  return property;
};
