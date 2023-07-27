import { WorkFLowValueType } from "../interface";
import { processCreateFormValue } from "./processor";

describe("processor", () => {
  describe("processCreateFormValue", () => {
    it.each([
      [
        [
          {
            name: "名称",
            id: "name",
            type: "string",
            required: true,
          },
          {
            name: "年龄",
            id: "age",
            type: "number",
            required: true,
          },
          {
            name: "数量",
            id: "count",
            type: "number",
            required: false,
          },
        ],
        undefined,
        {
          age: { type: "const", value: undefined },
          count: { type: "const", value: undefined },
          name: { type: "const", value: undefined },
        },
      ],
      [
        [
          {
            name: "名称",
            id: "name",
            type: "string",
            required: true,
          },
          {
            name: "年龄",
            id: "age",
            type: "number",
            required: true,
          },
          {
            name: "数量",
            id: "count",
            type: "number",
            required: false,
          },
        ],
        {
          name: {
            type: WorkFLowValueType.EXPR,
            value: "startId.stepData.ip",
          },
        },
        {
          age: { type: "const", value: undefined },
          count: { type: "const", value: undefined },
          name: { type: "expr", value: "startId.stepData.ip" },
        },
      ],
    ])("should work", (fieldList, value, result) => {
      expect(processCreateFormValue(fieldList, value)).toEqual(result);
    });
  });
});
