import { getTargetBrick } from "./processor";

describe("processor", () => {
  describe("getTargetBrick", () => {
    it.each([
      [
        [
          {
            brick: "forms.general-input",
            label: "输入框",
            propertyGenerator: ({ attrData }) => ({
              name: attrData.id,
              label: attrData.name,
              required: attrData.required === "true",
            }),
          },
          {
            brick: "presentational-bricks.brick-link",
            label: "链接",
            propertyGenerator: () => ({
              label: "查看",
            }),
          },
          {
            brick: "forms.general-date-picker",
            label: "日期选择器",
            propertyGenerator: ({ attrData }) => ({
              name: attrData.id,
              label: attrData.name,
              required: attrData.required === "true",
            }),
          },
        ],
        {
          name: "name",
          id: "name",
          label: "名称",
          type: "string",
          brick: "forms.general-input",
        },
        { brick: "forms.general-input", label: "输入框" },
      ],
      [
        [
          {
            brick: "forms.general-input",
            label: "输入框",
            propertyGenerator: ({ attrData }) => ({
              name: attrData.id,
              label: attrData.name,
              required: attrData.required === "true",
            }),
          },
          {
            brick: "presentational-bricks.brick-link",
            brickType: "button",
            label: "链接",
            propertyGenerator: () => ({
              label: "查看",
            }),
          },
          {
            brick: "forms.general-date-picker",
            label: "日期选择器",
            propertyGenerator: ({ attrData }) => ({
              name: attrData.id,
              label: attrData.name,
              required: attrData.required === "true",
            }),
          },
        ],
        {
          name: "id",
          id: "id",
          label: "id",
          type: "string",
          brick: "presentational-bricks.brick-link",
          brickType: "button",
        },
        {
          brick: "presentational-bricks.brick-link",
          brickType: "button",
          label: "链接",
        },
      ],
    ])("should work", (useBrickList, field, result) => {
      expect(getTargetBrick(useBrickList, field)).toEqual(
        expect.objectContaining(result)
      );
    });
  });
});
