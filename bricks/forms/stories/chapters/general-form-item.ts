import { Story } from "@next-core/brick-types";
import { generalFormItemSvg } from "../images";
export const generalFormItemStory: Story = {
  storyId: "forms.general-form-item",
  type: "brick",
  category: "form-input-basic",
  author: "william",
  text: {
    en: "Form Item",
    zh: "表单项",
  },
  description: {
    en: "If you use properties such as `labelTooltip`, `labelBrick`, `helpBrick`, etc. as exceptions, use the forms.general-form-item-v2 brick instead.",
    zh: "如使用 `labelTooltip`、`labelBrick`、`helpBrick` 等属性异常时，请改用 forms.general-form-item-v2 构件",
  },
  icon: {
    imgSrc: generalFormItemSvg,
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-form",
              slots: {
                items: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "forms.general-form-item",
                      properties: {
                        name: "a",
                        label: "一个字段",
                        required: true,
                        message: {
                          required: "当前值为空，请点击按钮赋值",
                        },
                      },
                      slots: {
                        control: {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "basic-bricks.general-button",
                              properties: {
                                id: "assign-button",
                                buttonName: "点击赋值为 123",
                                value: 123,
                              },
                              events: {
                                "general.button.click": {
                                  target: "forms\\.general-form-item",
                                  properties: {
                                    value: "${EVENT.target.value}",
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                      events: {
                        "general-form-item.change": [
                          {
                            action: "console.log",
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              events: {
                "validate.success": {
                  action: "console.log",
                },
                "validate.error": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "validate()",
              },
              events: {
                "general.button.click": {
                  target: "forms\\.general-form",
                  method: "validate",
                },
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "setInitValue({a: 456})",
              },
              events: {
                "general.button.click": {
                  target: "forms\\.general-form",
                  method: "setInitValue",
                  args: [{ a: 456 }],
                },
              },
            },
          ],
        },
      },
    },
  ],
};
