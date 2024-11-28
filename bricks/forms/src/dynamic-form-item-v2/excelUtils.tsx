import { isNil } from "lodash";
import { Column } from "../interfaces";

export const exportToExcel = async (
  columns: Column[],
  fileName: string
): Promise<void> => {
  const XLSX = (
    await import(
      /* webpackChunkName: "chunks/xlsx.015f" */
      "xlsx"
    )
  ).default;

  const headers = columns.map((col) => ({
    key: col.name,
    header: col.label || col.name,
  }));

  const worksheet = XLSX.utils.json_to_sheet([{}], {
    header: headers.map((h) => h.key),
  });

  // Add header row with labels
  XLSX.utils.sheet_add_aoa(worksheet, [headers.map((h) => h.header)], {
    origin: "A1",
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const importFromExcel = async (
  file: File,
  columns: Column[]
): Promise<Record<string, any>[]> => {
  // sha1 hash of "dynamic-form-item-v2" starts with "015f"
  const XLSX = (
    await import(
      /* webpackChunkName: "chunks/xlsx.015f" */
      "xlsx"
    )
  ).default;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) {
        reject(new Error("Failed to read file"));
        return;
      }

      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      if (!workbook.SheetNames.length) {
        reject(new Error("No sheets found in workbook"));
        return;
      }

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        defval: null, // 设置空单元格的默认值
      });

      // 增强数据验证和转换逻辑
      const transformedData = jsonData.map((row: any, index: number) => {
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

export function validateAndTransformValue(value: any, column: Column): any {
  switch (column.type) {
    case "cascader":
      if (typeof value === "string") {
        try {
          const parsedValue = JSON.parse(value);
          return Array.isArray(parsedValue) ? parsedValue : [];
        } catch {
          return [];
        }
      } else if (Array.isArray(value)) {
        return value;
      }
      return [];

    case "inputNumber":
      return Number(value) || 0;

    case "select":
      if (column.props?.mode === "multiple") {
        if (Array.isArray(value)) {
          return value;
        } else if (typeof value === "string") {
          try {
            const parsedValue = JSON.parse(value);
            if (Array.isArray(parsedValue)) {
              return parsedValue;
            }
          } catch {
            // eslint-disable-next-line no-empty
          }
          return value ? value.split(",").map((v) => v.trim()) : [];
        }
        return isNil(value) ? [] : [value];
      }
      return value;

    case "checkbox":
      if (typeof value === "string") {
        const trimmedValue = value.trim().toLowerCase();
        // 明确的 false 值
        if (
          trimmedValue === "false" ||
          trimmedValue === "0" ||
          trimmedValue === "no" ||
          trimmedValue === "n" ||
          trimmedValue === ""
        ) {
          return false;
        }
        // 其他所有情况都是 true
        return true;
      }
      return Boolean(value);

    case "textArea":
    case "input":
    case "inputPassword":
    case "autoComplete":
    default:
      return value;
  }
}
