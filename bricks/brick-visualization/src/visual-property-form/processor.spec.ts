import {
  isAdvanceMode,
  mergeProperties,
  calculateValue,
  processFormValue,
} from "./processor";

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.mock("@next-libs/editor-components", () => {});

describe("processor test", () => {
  describe("isAdvanceMode", () => {
    it.each([
      ["<% CTX.name %>", true],
      ["${QUERY.a}", true],
      ["abc", false],
      [true, false],
      [1234, false],
    ])("%s should return %p", (value, result) => {
      expect(isAdvanceMode(value)).toEqual(result);
    });
  });

  describe("mergeProperties", () => {
    it("should return empty if no params", () => {
      const result = mergeProperties();
      expect(result).toEqual([]);
    });

    it("should return merged properties", () => {
      const propertyList = [
        { name: "name", type: "string", description: "名称" },
        { name: "age", type: "number", description: "年龄" },
      ];

      const brickProperties = {
        name: "lucy",
        age: "<% CTX.age %>",
      };

      expect(mergeProperties(propertyList, brickProperties)).toEqual([
        {
          name: "name",
          type: "string",
          description: "名称",
          value: "lucy",
          mode: "normal",
        },
        {
          name: "age",
          type: "number",
          description: "年龄",
          value: "<% CTX.age %>",
          mode: "andvanced",
        },
      ]);
    });
  });

  describe("calculateValue", () => {
    it("should return empty if no parmas", () => {
      const result = calculateValue();
      expect(result).toEqual({ others: "" });
    });
    it("should calculate init value", () => {
      const propertyList = [
        { name: "name", type: "string", description: "名称" },
        { name: "age", type: "number", description: "年龄" },
      ];

      const brickProperties = {
        name: "lucy",
        age: 123,
        hobby: "run",
        category: "student",
      };
      const result = calculateValue(propertyList, brickProperties);
      expect(result).toEqual({
        age: 123,
        name: "lucy\n",
        others: "hobby: run\ncategory: student\n",
      });
    });

    it("should calculate init value with complex parmas", () => {
      const propertyList = [
        { name: "name", type: "string", description: "名称" },
        { name: "age", type: "number", description: "年龄" },
      ];

      const brickProperties = {
        name: "lucy",
        age: 123,
        hot: true,
        hobby: "run",
        category: "<% CTX.category %>",
      };
      const result = calculateValue(propertyList, brickProperties);
      expect(result).toEqual({
        age: 123,
        name: "lucy\n",
        others: "hot: true\nhobby: run\ncategory: <% CTX.category %>\n",
      });
    });
  });

  describe("processFormValue", () => {
    it("should return empty if no value", () => {
      const result = processFormValue();

      expect(result).toEqual({});
    });

    it("shuold return processed value", () => {
      const values = {
        name: "reuqired",
        label: "是否必填",
        options: "- true\n- false",
        type: "<% CTX.type %>",
        count: 234,
        required: true,
        others: "a: 3\nb: 4\ntest: true",
      };

      const result = processFormValue(values);

      expect(result).toEqual({
        name: "reuqired",
        label: "是否必填",
        options: [true, false],
        type: "<% CTX.type %>",
        count: 234,
        required: true,
        a: 3,
        b: 4,
        test: true,
      });
    });
  });
});
