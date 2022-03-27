import {
  getGridTemplateColumns,
  calcItemPosition,
  isTypeChange,
  processItemInitValue,
  processItemData,
  processFormInitvalue,
  processFormData,
  getRefRequiredFields,
  filterTitleList,
} from "./schemaEditor";
import { ProcessValidateField } from "../components/field-validator-item/FieldValidatorItem";
import { ContractContext } from "../ContractContext";

describe("processor tst", () => {
  describe("filterTitleList", () => {
    it("should return correct title list", () => {
      expect(
        filterTitleList(
          [
            { width: "50px", title: "a", key: "a" },
            { width: "100px", title: "b", key: "b" },
            { title: "Setting", key: "setting" },
          ],
          false
        )
      ).toEqual([
        { width: "50px", title: "a", key: "a" },
        { width: "100px", title: "b", key: "b" },
        { title: "Setting", key: "setting" },
      ]);

      expect(
        filterTitleList(
          [
            { width: "50px", title: "a", key: "a" },
            { width: "100px", title: "b", key: "b" },
            { title: "Setting", key: "setting" },
          ],
          true
        )
      ).toEqual([
        { width: "50px", title: "a", key: "a" },
        { width: "100px", title: "b", key: "b" },
      ]);
    });
  });

  describe("getGridTemplateColumns", () => {
    it("should return correct value", () => {
      const result = getGridTemplateColumns([
        { width: "50px", title: "a", key: "a" },
        { width: "100px", title: "b", key: "b" },
        { title: "c", key: "c" },
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
    it("should return true or false according type", () => {
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

      const result7 = isTypeChange(
        { name: "a", type: "" },
        { name: "a", type: "string" }
      );
      expect(result7).toEqual(true);

      const result8 = isTypeChange(
        { name: "a", ref: "Custom" },
        { name: "a", type: "" }
      );
      expect(result8).toEqual(true);

      const result9 = isTypeChange(
        { name: "a", type: "" },
        { name: "a", type: "" }
      );
      expect(result9).toEqual(false);
    });
  });

  describe("processItemInitValue", () => {
    it("should process value", () => {
      const result = processItemInitValue({ name: "a", ref: "IP" });
      expect(result).toEqual({ name: "a", ref: "IP", origin: "reference" });

      const result2 = processItemInitValue({ name: "a", type: "IP" });
      expect(result2).toEqual({ name: "a", type: "IP", origin: "model" });

      const result3 = processItemInitValue();
      expect(result3).toEqual({ origin: "normal" });

      const result4 = processItemInitValue({ name: "name", type: "string" });
      expect(result4).toEqual({
        name: "name",
        origin: "normal",
        type: "string",
        validate: {},
      });
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

      const result4 = processItemData({
        name: "a",
        type: "string",
        origin: "normal",
        validate: {
          type: "string",
          pattern: "\\w+",
        } as ProcessValidateField,
      });
      expect(result4).toEqual({
        name: "a",
        type: "string",
        validate: {
          pattern: "\\w+",
        },
      });
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
          {
            name: "labels",
            type: "DeployLabel",
            description: "标签",
            default: undefined,
          },
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

    it("should process value with default", () => {
      const initValue = {
        default: {
          needNotify: true,
        },
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
            default: true,
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

    it("should process value with ref required field", () => {
      const initValue = {
        name: "request",
        type: "object",
        required: ["labels", "TrackData.instanceId", "TrackData.name"],
        fields: [
          {
            name: "needNotify",
            type: "bool",
            description: "是否需要通知",
          },
          {
            name: "labels",
            type: "DeployLabel",
            description: "标签",
          },
          {
            ref: "TrackData.*",
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
            ref: "TrackData.*",
            refRequired: ["TrackData.instanceId", "TrackData.name"],
          },
        ],
        name: "request",
        type: "object",
      });
    });
  });

  describe("processFormData", () => {
    beforeEach(() => {
      jest.resetModules();
    });

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
        default: {},
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
        default: {},
        name: "request",
        type: "object",
        required: ["request"],
        fields: [],
      });
    });

    it("should process form data with default", () => {
      const formData = {
        fields: [
          {
            description: "是否需要通知",
            name: "needNotify",
            type: "bool",
            default: true,
          },
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
        default: { needNotify: true },
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

      const result2 = processFormData({
        name: "name",
        type: "string",
        required: true,
        default: "lucy",
      });
      expect(result2).toEqual({
        default: { name: "lucy" },
        fields: [],
        name: "name",
        required: ["name"],
        type: "string",
      });
    });

    it("should process form data with ref required fields", () => {
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
            ref: "TrackData.*",
            refRequired: ["TrackData.instanceId", "TrackData.name"],
          },
        ],
        name: "request",
        type: "object",
      };

      const result = processFormData(formData);
      expect(result).toEqual({
        default: {},
        fields: [
          { description: "是否需要通知", name: "needNotify", type: "bool" },
          { description: "标签", name: "labels", type: "DeployLabel" },
          { ref: "TrackData.*" },
        ],
        name: "request",
        required: ["labels", "TrackData.instanceId", "TrackData.name"],
        type: "object",
      });
    });

    it("should process form data with import data", () => {
      const contract = ContractContext.getInstance();

      contract.addImportNamespace("DeployLabel", "api.easyops.DeployLabel");
      const formData = {
        fields: [
          {
            description: "是否需要通知",
            name: "needNotify",
            type: "bool",
            default: true,
          },
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
        default: { needNotify: true },
        import: ["api.easyops.DeployLabel"],
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

      ContractContext.cleanInstance();
    });
  });

  describe("getRefRequiredFields", () => {
    it("should return empty if no ref", () => {
      const result = getRefRequiredFields(undefined, undefined);

      expect(result).toEqual(undefined);
    });
  });
});
