import { collectSharedTypeList } from "./processor";

describe("processor", () => {
  describe("collectSharedTypeList", () => {
    it.each([
      [null, []],
      [
        {
          properties: [
            {
              name: "inputStyle",
              type: "CSSProperties",
            },
          ],
        },
        [
          {
            type: "CSSProperties",
            description:
              "`CSSProperties` 包含的样式属性可查看该 [文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)，需注意文档中的属性需要转为小驼峰命名的方式，具体可 [查看](https://zh-hans.reactjs.org/docs/dom-elements.html#style)",
          },
        ],
      ],
      [
        {
          properties: [
            {
              name: "inputStyle",
              type: "CSSProperties",
            },
          ],
          interface: [
            {
              name: "buttonType",
              type: "ButtonType",
              kind: "type",
            },
            {
              name: "LabelTooltipProps",
              kind: "interface",
              children: [
                {
                  name: "inputStyle",
                  type: "CSSProperties",
                  required: false,
                  description: "样式",
                },
              ],
            },
            {
              name: "type",
              kind: "enum",
              children: [
                {
                  name: "primary",
                  value: "primary",
                  description: "初级",
                },
                {
                  name: "default",
                  value: "default",
                  description: "默认",
                },
              ],
            },
          ],
        },
        [
          {
            type: "CSSProperties",
            description:
              "`CSSProperties` 包含的样式属性可查看该 [文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)，需注意文档中的属性需要转为小驼峰命名的方式，具体可 [查看](https://zh-hans.reactjs.org/docs/dom-elements.html#style)",
          },
          {
            type: "ButtonType",
            description: `type ButtonType = "link" | "default" | "primary" | "ghost" | "dashed" | "icon" | "text"`,
          },
        ],
      ],
    ])("should work %i", (doc, result) => {
      expect(collectSharedTypeList(doc)).toEqual(result);
    });
  });
});
