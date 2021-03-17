export function searchList(
  list: Record<string, any>,
  q: string,
  field?: string
) {
  const trimQ = q?.trim()??"";
  return list.filter((v: any) =>
    (field ? v[field] : v)?.toLowerCase().includes(trimQ.toLowerCase() ?? "")
  );
}