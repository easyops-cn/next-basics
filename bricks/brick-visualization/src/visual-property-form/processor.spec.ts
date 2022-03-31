import {
  isAdvanceMode,
  mergeProperties,
  calculateValue,
  processFormValue,
  groupByType,
  isUseYamlParse,
  extractCommonProps,
} from "./processor";

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.mock("@next-libs/code-editor-components", () => {});

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
          mode: "advanced",
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
        { name: "nickname", type: "string", description: "昵称" },
        { name: "count", type: "number", description: "数量" },
        { name: "menu1", type: "Menu", description: "菜单一" },
        { name: "menu2", type: "SidebarSubMenu", description: "菜单二" },
        { name: "menu3", type: "Menu", description: "菜单三" },
        { name: "menu4", type: "SidebarSubMenu", description: "菜单四" },
        { name: "menu5", type: "Menu", description: "菜单五" },
      ];

      const brickProperties = {
        name: "lucy",
        age: 123,
        hobby: "run",
        category: "student",
        menu1: "<% APP.getMenu(menu-1) %>",
        menu2: "<% APP.getMenu('menu-2') %>",
        menu3: '<% APP.getMenu("menu-3") %>',
        menu4: "x",
        menu5: "<% APP.getMenu(menu-5 %>",
      };
      const result = calculateValue(propertyList, brickProperties);
      expect(result).toEqual({
        age: 123,
        count: undefined,
        nickname: undefined,
        name: "lucy",
        others: "hobby: run\ncategory: student\n",
        menu1: "menu-1",
        menu2: "menu-2",
        menu3: "menu-3",
        menu4: "x",
        menu5: "<% APP.getMenu(menu-5 %>",
      });
    });

    it("should calculate init value with complex parmas", () => {
      const propertyList = [
        { name: "name", type: "string", description: "名称" },
        { name: "age", type: "number", description: "年龄" },
        { name: "label", type: "LabelProps", description: "标签" },
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
        name: "lucy",
        lable: undefined,
        others: "hot: true\nhobby: run\ncategory: <% CTX.category %>\n",
      });

      const brickProperties2 = {
        name: "lucy",
        age: 12,
        label: "name",
      };
      const result2 = calculateValue(propertyList, brickProperties2);

      expect(result2).toEqual({
        name: "lucy",
        age: 12,
        label: "name\n",
        others: "",
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
        menu1: "menu-1",
        menu2: "<% APP.getMenu('menu-2') %>",
        menu3: '<% APP.getMenu("menu-3") %>',
      };

      const result = processFormValue(values, [
        { name: "options", type: "OptionsProps" },
        { name: "type", type: "string", mode: "advanced" },
        { name: "menu1", type: "Menu" },
        { name: "menu2", type: "SidebarSubMenu" },
        { name: "menu3", type: "Menu" },
      ]);

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
        menu1: "<% APP.getMenu('menu-1') %>",
        menu2: "<% APP.getMenu('menu-2') %>",
        menu3: '<% APP.getMenu("menu-3") %>',
      });
    });
  });

  describe("groupbyType", () => {
    it("shoould return empty if no value", () => {
      const result = groupByType();
      expect(result).toEqual([]);
    });

    it("should return new group", () => {
      const typeList = [
        {
          name: "name",
          type: "string",
          description: "名称",
          mode: "normal",
          group: "basic",
        },
        { name: "age", type: "number", description: "年龄", mode: "normal" },
        {
          name: "value",
          type: "Value",
          description: "值",
          mode: "advanced",
          group: "advanced",
        },
      ] as any;

      const result = groupByType(typeList);

      expect(result).toEqual([
        [
          "basic",
          [
            {
              name: "name",
              type: "string",
              description: "名称",
              mode: "normal",
              group: "basic",
            },
            {
              name: "age",
              type: "number",
              description: "年龄",
              mode: "normal",
            },
          ],
        ],
        [
          "advanced",
          [
            {
              name: "value",
              type: "Value",
              description: "值",
              mode: "advanced",
              group: "advanced",
            },
          ],
        ],
      ]);
    });
  });

  describe("useYamlParse", () => {
    it.each([
      [
        { key: "name", value: "tester" },
        [{ name: "name", type: "string", mode: "normal" }],
        false,
      ],
      [
        { key: "showCard", value: "${CTX.showCard}" },
        [{ name: "showCard", type: "boolean", mode: "advanced" }],
        true,
      ],
      [
        { key: "label", value: ["a", "b"] },
        [{ name: "label", type: "LabelProps" }],
        false,
      ],
      [
        { key: "options", value: "a: 3\nb: 4\n" },
        [{ name: "options", type: "OptionsProps" }],
        true,
      ],
      [
        { key: "color", value: "#efefef" },
        [{ name: "color", type: "Color", mode: "normal" }],
        false,
      ],
      [{ key: "tooltips", value: "some text" }, [], false],
      [{ key: "others", value: "label: name\nvalue: tester\n" }, [], true],
    ])("%s and %p should return %s", (field, typeList, result) => {
      expect(isUseYamlParse(field, typeList)).toEqual(result);
    });
  });

  describe("extractCommonProps", () => {
    it("should extra common properties", () => {
      const typeList = [
        {
          name: "name",
          type: "stirng",
          description: "名称",
        },
        {
          name: "age",
          type: "number",
          description: "年龄",
        },
      ];

      const result = extractCommonProps(typeList);
      expect(result).toEqual([
        { name: "id", type: "string", description: "构件 ID" },
        {
          name: "name",
          type: "stirng",
          description: "名称",
        },
        {
          name: "age",
          type: "number",
          description: "年龄",
        },
      ]);
    });

    it("should return empty array if typeList is empty", () => {
      const result = extractCommonProps([]);
      expect(result).toEqual([]);
    });
  });
});
