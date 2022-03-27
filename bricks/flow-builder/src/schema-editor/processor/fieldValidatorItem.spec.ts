import {
  processValidatorInitValue,
  formatValidatorData,
} from "./filedValidatorItem";

describe("processor", () => {
  describe("processValidatorInitValue", () => {
    it("should work", () => {
      const result = processValidatorInitValue({ pattern: "\\w+" });
      expect(result).toEqual({ pattern: "\\w+" });

      const result2 = processValidatorInitValue({ lt: 10, gt: 8 });
      expect(result2).toEqual({
        compare: [
          { method: "lt", value: 10 },
          { method: "gt", value: 8 },
        ],
      });

      const result3 = processValidatorInitValue();
      expect(result3).toEqual({});
    });
  });

  describe("formatValidatorData", () => {
    it("should work", () => {
      const result = formatValidatorData({ pattern: "\\w+", type: "string" });
      expect(result).toEqual({ pattern: "\\w+" });

      const result2 = formatValidatorData({
        compare: [
          { method: "lt", value: 10 },
          { method: "gt", value: 8 },
        ],
        type: "int",
      });
      expect(result2).toEqual({ lt: 10, gt: 8 });

      const result3 = formatValidatorData({});
      expect(result3).toEqual(undefined);

      const result4 = formatValidatorData({
        compare: [{ method: undefined, value: undefined }],
        type: "int",
      });
      expect(result4).toEqual({});

      const result5 = formatValidatorData({
        compare: [{ method: "lt", value: 0 }],
        type: "int",
      });
      expect(result5).toEqual({ lt: 0 });
    });
  });
});
