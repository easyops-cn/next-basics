import {
  getGridTemplateColumns,
  calcItemPosition,
  isTypeChange,
  processItemInitValue,
  processItemData,
  processFormInitvalue,
  processFormData,
} from "./processor";

describe("processor tst", () => {
  describe("getGridTemplateColumns", () => {
    it("should return correct value", () => {
      const result = getGridTemplateColumns([
        { width: "50px", title: "a" },
        { width: "100px", title: "b" },
        { title: "c" },
      ]);

      expect(result).toEqual("50px 100px 1fr");
    });
  });

  describe("calcItemPosition", () => {
    it("should return correct value", () => {
      const result = calcItemPosition("root");

      expect(result).toEqual([]);

      const result2 = calcItemPosition("root-1");

      expect(result2).toEqual(["fields", "1"]);

      const result3 = calcItemPosition("root-1-3");

      expect(result3).toEqual(["fields", "1", "fields", "3"]);
    });
  });

  describe("isTypeChange", () => {
    it("should return true or false accroding type", () => {
      const result = isTypeChange(
        { name: "a", type: "object" },
        { name: "a", type: "string" }
      );

      expect(result).toEqual(true);

      const result2 = isTypeChange(
        { name: "a", type: "object" },
        { name: "a", ref: "Custom[]" }
      );

      expect(result2).toEqual(true);

      const result3 = isTypeChange(
        { name: "a", ref: "Type" },
        { name: "a", type: "number" }
      );

      expect(result3).toEqual(true);

      const result4 = isTypeChange(
        { name: "a", ref: "Type" },
        { name: "a", ref: "Custom" }
      );

      expect(result4).toEqual(true);

      const result5 = isTypeChange(
        { name: "a", type: "number" },
        { name: "a", type: "number" }
      );

      expect(result5).toEqual(false);

      const result6 = isTypeChange(
        { name: "a", ref: "Custom" },
        { name: "a", ref: "Custom" }
      );

      expect(result6).toEqual(false);
    });
  });

  describe("processItemInitValue", () => {
    it("should process value", () => {
      const result = processItemInitValue({ name: "a", ref: "IP" });
      expect(result).toEqual({ name: "a", ref: "IP", origin: "reference" });

      const result2 = processItemInitValue({ name: "a", type: "IP" });
      expect(result2).toEqual({ name: "a", type: "IP", origin: "normal" });

      const result3 = processItemInitValue();
      expect(result3).toEqual({ origin: "normal" });
    });
  });

  describe("processItemData", () => {
    it("should process value", () => {
      const result = processItemData({
        name: "a",
        ref: "IP",
        origin: "reference",
      });
      expect(result).toEqual({ name: "a", ref: "IP" });

      const result2 = processItemData({
        name: "a",
        type: "string",
        origin: "normal",
      });
      expect(result2).toEqual({ name: "a", type: "string" });

      const result3 = processItemData();
      expect(result3).toEqual({});
    });
  });

  describe("processFormInitvalue", () => {
    it("should process value with required", () => {
      const initValue = {
        name: "request",
        type: "object",
        required: ["labels", "instanceId", "TrackData.instanceId", "request"],
        fields: [
          {
            name: "needNotify",
            type: "bool",
            description: "是否需要通知",
          },
          { name: "labels", type: "DeployLabel", description: "标签" },
          {
            name: "strategyList",
            type: "object",
            fields: [
              {
                name: "packageId",
                type: "package_id",
                description: "packageId",
              },
            ],
            description: "策略列表",
          },
          {
            ref: "TrackData.instanceId",
          },
        ],
      };

      const result = processFormInitvalue(initValue);
      expect(result).toEqual({
        fields: [
          { description: "是否需要通知", name: "needNotify", type: "bool" },
          {
            description: "标签",
            name: "labels",
            required: true,
            type: "DeployLabel",
          },
          {
            description: "策略列表",
            fields: [
              {
                description: "packageId",
                name: "packageId",
                type: "package_id",
              },
            ],
            name: "strategyList",
            type: "object",
          },
          { ref: "TrackData.instanceId", required: true },
        ],
        name: "request",
        type: "object",
        required: true,
      });
    });

    it("should process value without required", () => {
      const initValue = {
        name: "request",
        type: "object",
        fields: [
          {
            name: "needNotify",
            type: "bool",
            description: "是否需要通知",
          },
          { name: "labels", type: "DeployLabel", description: "标签" },
          {
            name: "strategyList",
            type: "object",
            fields: [
              {
                name: "packageId",
                type: "package_id",
                description: "packageId",
              },
            ],
            description: "策略列表",
          },
          {
            ref: "TrackData.instanceId",
          },
        ],
      };

      const result = processFormInitvalue(initValue);
      expect(result).toEqual({
        name: "request",
        type: "object",
        fields: [
          {
            name: "needNotify",
            type: "bool",
            description: "是否需要通知",
          },
          { name: "labels", type: "DeployLabel", description: "标签" },
          {
            name: "strategyList",
            type: "object",
            fields: [
              {
                name: "packageId",
                type: "package_id",
                description: "packageId",
              },
            ],
            description: "策略列表",
          },
          {
            ref: "TrackData.instanceId",
          },
        ],
      });
    });

    it("should process value when rootnode is ref type", () => {
      const initValue = {
        ref: "request",
        required: ["request"],
      };

      const result = processFormInitvalue(initValue);
      expect(result).toEqual({ ref: "request", required: true, fields: [] });
    });
  });

  describe("processFormData", () => {
    it("should process form data", () => {
      const formData = {
        fields: [
          { description: "是否需要通知", name: "needNotify", type: "bool" },
          {
            description: "标签",
            name: "labels",
            required: true,
            type: "DeployLabel",
          },
          {
            description: "策略列表",
            fields: [
              {
                description: "packageId",
                name: "packageId",
                type: "package_id",
              },
            ],
            name: "strategyList",
            type: "object",
          },
          { ref: "TrackData.instanceId", required: true },
        ],
        name: "request",
        type: "object",
      };

      const result = processFormData(formData);

      expect(result).toEqual({
        fields: [
          { description: "是否需要通知", name: "needNotify", type: "bool" },
          { description: "标签", name: "labels", type: "DeployLabel" },
          {
            description: "策略列表",
            fields: [
              {
                description: "packageId",
                name: "packageId",
                type: "package_id",
              },
            ],
            name: "strategyList",
            type: "object",
          },
          { ref: "TrackData.instanceId" },
        ],
        name: "request",
        required: ["labels", "TrackData.instanceId"],
        type: "object",
      });
    });

    it("should process form data with single node", () => {
      const formData = { name: "request", type: "object", required: true };

      const result = processFormData(formData);

      expect(result).toEqual({
        name: "request",
        type: "object",
        required: ["request"],
        fields: [],
      });
    });
  });
});
