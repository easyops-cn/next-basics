export function searchList<T>(
  list: Array<T>,
  q: string,
  field: string
): Array<T> {
  const lowerCaseQuery = q?.trim().toLowerCase();
  if (!lowerCaseQuery) {
    return list.slice();
  }
  return list.filter((v: unknown) => {
    const value = (v as Record<typeof field, unknown>)[field];
    return (
      typeof value === "string" && value.toLowerCase().includes(lowerCaseQuery)
    );
  });
}
