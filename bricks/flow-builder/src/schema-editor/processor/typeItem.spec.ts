import {
  processFilterModes,
  processTypeItemData,
  processTypeItemInitValue,
} from "./typeItem";

describe("typeItem processor", () => {
  describe("processTypeItemInitValue", () => {
    it("should work", () => {
      const result = processTypeItemInitValue("string");

      expect(result).toEqual({ value: "string", isArray: false });

      const result2 = processTypeItemInitValue("string[]");

      expect(result2).toEqual({ value: "string", isArray: true });

      const result3 = processTypeItemInitValue();

      expect(result3).toEqual({ value: "", isArray: false });
    });
  });

  describe("processFilterModes", () => {
    it("should work", () => {
      const list = [
        { name: "Host", namespaceId: "api.easyops.host" },
        {
          name: "DeployType",
          namespaceId: "api.easyops.DeployType",
          fields: [{ name: "name", type: "string" }],
        },
      ];

      const result = processFilterModes(list, "object");

      expect(result).toEqual([
        {
          group: "flow-builder:SIMPLE_TYPE",
          items: [{ label: "object", value: "object" }],
        },
        {
          group: "flow-builder:FROM_MODEL",
          items: [
            { label: "Host", value: "Host" },
            { label: "DeployType", value: "DeployType" },
          ],
        },
      ]);

      const result2 = processFilterModes(list);

      expect(result2).toEqual([
        {
          group: "flow-builder:SIMPLE_TYPE",
          items: [
            { label: "string", value: "string" },
            { label: "bool", value: "bool" },
            { label: "int", value: "int" },
            { label: "int64", value: "int64" },
            { label: "float", value: "float" },
            { label: "map", value: "map" },
            { label: "object", value: "object" },
            { label: "value", value: "value" },
            { label: "file", value: "file" },
          ],
        },
        {
          group: "flow-builder:FROM_MODEL",
          items: [
            { label: "Host", value: "Host" },
            { label: "DeployType", value: "DeployType" },
          ],
        },
      ]);
    });
  });

  describe("processTypeItemData", () => {
    it("should work", () => {
      const result = processTypeItemData({ value: "string", isArray: false });

      expect(result).toEqual("string");

      const result2 = processTypeItemData({ value: "string", isArray: true });

      expect(result2).toEqual("string[]");
    });
  });
});
