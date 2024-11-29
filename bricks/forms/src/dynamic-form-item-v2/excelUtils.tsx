import { isNil } from "lodash";
import { Column } from "../interfaces";

export const exportToExcel = async (
  columns: Column[],
  fileName: string
): Promise<void> => {
  const { utils: XLSXUtils, writeFile: XLSXWriteFile } = await import(
    /* webpackChunkName: "chunks/xlsx.015f" */
    "xlsx"
  );

  const headers = columns.map((col) => ({
    key: col.name,
    header: col.label || col.name,
  }));

  const worksheet = XLSXUtils.json_to_sheet([{}], {
    header: headers.map((h) => h.key),
  });

  // Add header row with labels
  XLSXUtils.sheet_add_aoa(worksheet, [headers.map((h) => h.header)], {
    origin: "A1",
  });

  const workbook = XLSXUtils.book_new();
  XLSXUtils.book_append_sheet(workbook, worksheet, "Template");
  XLSXWriteFile(workbook, `${fileName}.xlsx`);
};

export const importFromExcel = async (
  file: File,
  columns: Column[]
): Promise<Record<string, any>[]> => {
  // sha1 hash of "dynamic-form-item-v2" starts with "015f"
  const { utils: XLSXUtils, read: XLSXRead } = await import(
    /* webpackChunkName: "chunks/xlsx.015f" */
    "xlsx"
  );

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) {
        reject(new Error("Failed to read file"));
        return;
      }

      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSXRead(data, { type: "array" });

      if (!workbook.SheetNames.length) {
        reject(new Error("No sheets found in workbook"));
        return;
      }

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: Record<string, string>[] = XLSXUtils.sheet_to_json(
        worksheet,
        {
          raw: false, // 返回格式化的字符串
        }
      );

      // 增强数据验证和转换逻辑
      const transformedData = jsonData.map((row: Record<string, string>) => {
        const transformedRow: Record<string, any> = {};

        columns.forEach((col) => {
          const header = col.label || col.name;
          const value = row[header];
          // 添加类型检查和转换
          transformedRow[col.name] = validateAndTransformValue(value, col);
        });

        return transformedRow;
      });

      resolve(transformedData);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};

export function validateAndTransformValue(
  value: string | undefined,
  column: Column
): any {
  // 如果值为空，则返回空值
  const trimValue = value?.trim();
  if (trimValue === undefined || trimValue === "") {
    return undefined;
  }

  // 根据类型，处理不同的值
  switch (column.type) {
    case "cascader":
      try {
        const parsedValue = JSON.parse(trimValue);
        if (Array.isArray(parsedValue)) {
          return parsedValue;
        }
      } catch {
        // eslint-disable-next-line no-empty
      }
      // 尝试按 / 分割
      return trimValue.split("/").map((v) => v.trim());

    case "inputNumber":
      // 兼容非数字(NaN)
      return Number(trimValue) || 0;

    case "select":
      if (column.props?.mode === "multiple") {
        try {
          const parsedValue = JSON.parse(trimValue);
          if (Array.isArray(parsedValue)) {
            return parsedValue;
          }
        } catch {
          // eslint-disable-next-line no-empty
        }
        // 如果换行符数量小于等于1，则按逗号分割
        const trySplitLines = trimValue.split("\n").map((v) => v.trim());
        if (trySplitLines.length <= 1) {
          return trimValue.split(",").map((v) => v.trim());
        }
        return trySplitLines;
      } else {
        return trimValue;
      }

    case "checkbox": {
      const trimmedValue = trimValue.toLowerCase();
      // 明确的 false 值
      if (
        trimmedValue === "false" ||
        trimmedValue === "0" ||
        trimmedValue === "no" ||
        trimmedValue === "n" ||
        trimmedValue === "否"
      ) {
        return false;
      }
      // 其他所有情况都是 true
      return true;
    }

    case "textArea":
    case "input":
    case "inputPassword":
    case "autoComplete":
    default:
      return trimValue;
  }
}
