import { WorkflowDataItem } from "../../../interface";
export function getFilterDataList(
  dataList: WorkflowDataItem[],
  q: string
): WorkflowDataItem[] {
  if (!q) {
    return dataList;
  } else {
    const result = [] as WorkflowDataItem[];

    dataList.forEach((item) => {
      const searchKey = q.toLowerCase();

      const list = item.options || [];

      const machList = list.filter(
        (row) =>
          row.value.toLowerCase().includes(searchKey) ||
          row.label.toLowerCase().includes(searchKey)
      );

      if (machList.length) {
        result.push({
          ...item,
          options: machList,
        });
      }
    });

    return result;
  }
}

export function findFieldLabelOfData(
  dataList: WorkflowDataItem[],
  fieldValue = ""
): string[] {
  const [dataName] = fieldValue.split(".");

  const selectedData = dataList.find((item) => item.value === dataName);

  const value = selectedData?.options?.find(
    (item) => item.value === fieldValue
  )?.label;

  return [selectedData?.label, value];
}
