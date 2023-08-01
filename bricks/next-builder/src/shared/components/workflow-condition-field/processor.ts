import { TypeFieldItem, TypeFieldGroup } from "../../../interface";

type FieldOptionItem = Partial<TypeFieldItem>;
type ProcessFieldGroupItem = FieldOptionItem | TypeFieldGroup;

export function processFieldGroup(
  fieldList: FieldOptionItem[]
): ProcessFieldGroupItem[] {
  const options = [] as ProcessFieldGroupItem[];

  fieldList?.forEach((field) => {
    if (field.groupId) {
      const find = options.find((item) => item.groupId === field.groupId);

      if (!find) {
        options.push({
          groupLabel: field.groupLabel,
          groupId: field.groupId,
          children: [field],
        });
      } else {
        (find as TypeFieldGroup).children.push(field);
      }
    } else {
      options.push(field);
    }
  });

  return options;
}

export function filterFieldOptions(
  fieldList: FieldOptionItem[],
  q: string
): FieldOptionItem[] {
  if (!q) return fieldList;

  return fieldList?.filter(
    (item) =>
      item.groupId?.toLowerCase().includes(q.toLowerCase()) ||
      item.groupLabel?.toLowerCase().includes(q.toLowerCase()) ||
      item.name?.toLowerCase().includes(q.toLowerCase()) ||
      item.id?.toLowerCase().includes(q.toLowerCase())
  );
}
