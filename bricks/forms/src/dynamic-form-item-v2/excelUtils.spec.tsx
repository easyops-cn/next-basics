import { describe, it, expect, jest } from "@jest/globals";
import {
  exportToExcel,
  importFromExcel,
  validateAndTransformValue,
} from "./excelUtils";
import { Column } from "../interfaces";
import * as XLSX from "xlsx";

// Mock XLSX module
jest.mock("xlsx", () => ({
  utils: {
    json_to_sheet: jest.fn(),
    book_new: jest.fn(),
    book_append_sheet: jest.fn(),
    sheet_to_json: jest.fn(),
    sheet_add_aoa: jest.fn(),
  },
  read: jest.fn(),
  writeFile: jest.fn(),
}));

describe("excelUtils", () => {
  describe("exportToExcel", () => {
    const mockColumns: Column[] = [
      { name: "name", label: "姓名", type: "input", props: {} },
      { name: "age", type: "inputNumber", props: {} },
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should create worksheet with correct headers", () => {
      exportToExcel(mockColumns, "test");

      expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([{}], {
        header: ["name", "age"],
      });

      expect(XLSX.utils.sheet_add_aoa).toHaveBeenCalledWith(
        undefined,
        [["姓名", "age"]],
        { origin: "A1" }
      );
    });

    it("should create and save workbook", () => {
      const mockWorksheet = {};
      const mockWorkbook = {};

      (XLSX.utils.json_to_sheet as jest.Mock).mockReturnValue(mockWorksheet);
      (XLSX.utils.book_new as jest.Mock).mockReturnValue(mockWorkbook);

      exportToExcel(mockColumns, "test");

      expect(XLSX.utils.book_new).toHaveBeenCalled();
      expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith(
        mockWorkbook,
        mockWorksheet,
        "Template"
      );
      expect(XLSX.writeFile).toHaveBeenCalledWith(mockWorkbook, "test.xlsx");
    });
  });

  describe("importFromExcel", () => {
    const mockColumns: Column[] = [
      { name: "name", label: "姓名", type: "input", props: {} },
      { name: "age", type: "inputNumber", props: {} },
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should successfully import excel file", async () => {
      const mockData = [{ 姓名: "John", age: "25" }];

      const mockFileReader = {
        readAsArrayBuffer: jest.fn(function (this: any, blob: Blob) {
          this.onload({ target: { result: new ArrayBuffer(8) } });
        }),
      };

      (global as any).FileReader = jest.fn(() => mockFileReader);

      (XLSX.read as jest.Mock).mockReturnValue({
        SheetNames: ["Sheet1"],
        Sheets: { Sheet1: {} },
      });
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockData);

      const file = new File([""], "test.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const result = await importFromExcel(file, mockColumns);

      expect(result).toEqual([{ name: "John", age: 25 }]);
    });

    it("should handle file reading error", async () => {
      const mockFileReader = {
        readAsArrayBuffer: jest.fn(function (this: any, blob: Blob) {
          this.onerror(new Error("File reading failed"));
        }),
      };

      (global as any).FileReader = jest.fn(() => mockFileReader);

      const file = new File([""], "test.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      await expect(importFromExcel(file, mockColumns)).rejects.toThrow();
    });

    it("should handle empty workbook", async () => {
      const mockFileReader = {
        readAsArrayBuffer: jest.fn(function (this: any, blob: Blob) {
          this.onload({ target: { result: new ArrayBuffer(8) } });
        }),
      };

      (global as any).FileReader = jest.fn(() => mockFileReader);

      (XLSX.read as jest.Mock).mockReturnValue({
        SheetNames: [],
      });

      const file = new File([""], "test.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      await expect(importFromExcel(file, mockColumns)).rejects.toThrow(
        "No sheets found in workbook"
      );
    });

    it("should handle null file content", async () => {
      const mockFileReader = {
        readAsArrayBuffer: jest.fn(function (this: any, blob: Blob) {
          this.onload({ target: { result: null } });
        }),
      };

      (global as any).FileReader = jest.fn(() => mockFileReader);

      const file = new File([""], "test.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      await expect(importFromExcel(file, mockColumns)).rejects.toThrow(
        "Failed to read file"
      );
    });

    it("should handle undefined file content", async () => {
      const mockFileReader = {
        readAsArrayBuffer: jest.fn(function (this: any, blob: Blob) {
          this.onload({});
        }),
      };

      (global as any).FileReader = jest.fn(() => mockFileReader);

      const file = new File([""], "test.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      await expect(importFromExcel(file, mockColumns)).rejects.toThrow(
        "Failed to read file"
      );
    });
  });

  describe("validateAndTransformValue", () => {
    describe("cascader type", () => {
      const column: Column = { name: "test", type: "cascader", props: {} };

      it("should handle valid JSON string", () => {
        expect(validateAndTransformValue('["a","b"]', column)).toEqual([
          "a",
          "b",
        ]);
        expect(validateAndTransformValue('{"a":"b"}', column)).toEqual([]);
      });

      it("should handle invalid JSON string", () => {
        expect(validateAndTransformValue("invalid json", column)).toEqual([]);
      });

      it("should handle array value", () => {
        expect(validateAndTransformValue(["a", "b"], column)).toEqual([
          "a",
          "b",
        ]);
      });

      it("should handle non-array value", () => {
        expect(validateAndTransformValue(123, column)).toEqual([]);
        expect(validateAndTransformValue(null, column)).toEqual([]);
        expect(validateAndTransformValue(undefined, column)).toEqual([]);
      });
    });

    describe("inputNumber type", () => {
      const column: Column = { name: "test", type: "inputNumber", props: {} };

      it("should convert string to number", () => {
        expect(validateAndTransformValue("123", column)).toBe(123);
        expect(validateAndTransformValue("123.45", column)).toBe(123.45);
      });

      it("should handle invalid number string", () => {
        expect(validateAndTransformValue("abc", column)).toBe(0);
        expect(validateAndTransformValue("", column)).toBe(0);
      });

      it("should handle non-string values", () => {
        expect(validateAndTransformValue(123, column)).toBe(123);
        expect(validateAndTransformValue(null, column)).toBe(0);
        expect(validateAndTransformValue(undefined, column)).toBe(0);
      });
    });

    describe("select type with multiple mode", () => {
      const column: Column = {
        name: "test",
        type: "select",
        props: { mode: "multiple" },
      };

      it("should handle array values", () => {
        expect(validateAndTransformValue(["a", "b"], column)).toEqual([
          "a",
          "b",
        ]);
      });

      it("should handle comma-separated string", () => {
        expect(validateAndTransformValue("a,b", column)).toEqual(["a", "b"]);
        expect(validateAndTransformValue("a, b", column)).toEqual(["a", "b"]);
      });

      it("should handle JSON-like string", () => {
        expect(validateAndTransformValue('["a","b"]', column)).toEqual([
          "a",
          "b",
        ]);
        expect(validateAndTransformValue("{}", column)).toEqual(["{}"]);
      });

      it("should handle empty value", () => {
        expect(validateAndTransformValue("", column)).toEqual([]);
        expect(validateAndTransformValue(null, column)).toEqual([]);
        expect(validateAndTransformValue(undefined, column)).toEqual([]);
      });

      it("should handle single value", () => {
        expect(validateAndTransformValue(true, column)).toEqual([true]);
      });
    });

    describe("select type common", () => {
      const column: Column = {
        name: "test",
        type: "select",
        props: {},
      };

      it("should handle value", () => {
        expect(validateAndTransformValue("aaa", column)).toEqual("aaa");
      });
    });

    describe("checkbox type", () => {
      const column: Column = { name: "test", type: "checkbox", props: {} };

      it("should handle boolean strings", () => {
        expect(validateAndTransformValue("true", column)).toBe(true);
        expect(validateAndTransformValue("false", column)).toBe(false);
        expect(validateAndTransformValue("TRUE", column)).toBe(true);
        expect(validateAndTransformValue("FALSE", column)).toBe(false);
      });

      it("should handle number-like strings", () => {
        expect(validateAndTransformValue("1", column)).toBe(true);
        expect(validateAndTransformValue("0", column)).toBe(false);
        expect(validateAndTransformValue(" 0 ", column)).toBe(false);
        expect(validateAndTransformValue(" 1 ", column)).toBe(true);
      });

      it("should handle yes/no strings", () => {
        expect(validateAndTransformValue("yes", column)).toBe(true);
        expect(validateAndTransformValue("no", column)).toBe(false);
        expect(validateAndTransformValue("YES", column)).toBe(true);
        expect(validateAndTransformValue("NO", column)).toBe(false);
        expect(validateAndTransformValue("y", column)).toBe(true);
        expect(validateAndTransformValue("n", column)).toBe(false);
        expect(validateAndTransformValue("Y", column)).toBe(true);
        expect(validateAndTransformValue("N", column)).toBe(false);
      });

      it("should handle empty strings", () => {
        expect(validateAndTransformValue("", column)).toBe(false);
        expect(validateAndTransformValue(" ", column)).toBe(false);
      });

      it("should handle boolean values", () => {
        expect(validateAndTransformValue(true, column)).toBe(true);
        expect(validateAndTransformValue(false, column)).toBe(false);
      });

      it("should handle null/undefined", () => {
        expect(validateAndTransformValue(null, column)).toBe(false);
        expect(validateAndTransformValue(undefined, column)).toBe(false);
      });

      it("should handle other strings", () => {
        expect(validateAndTransformValue("other", column)).toBe(true);
        expect(validateAndTransformValue("test", column)).toBe(true);
      });
    });

    describe("text input types", () => {
      const textTypes: Column["type"][] = [
        "textArea",
        "input",
        "inputPassword",
        "autoComplete",
      ];

      textTypes.forEach((type) => {
        it(`should pass through values for ${type}`, () => {
          const column: Column = { name: "test", type, props: {} };

          expect(validateAndTransformValue("test value", column)).toBe(
            "test value"
          );
          expect(validateAndTransformValue("", column)).toBe("");
          expect(validateAndTransformValue(123, column)).toBe(123);
          expect(validateAndTransformValue(null, column)).toBe(null);
        });
      });
    });
  });
});