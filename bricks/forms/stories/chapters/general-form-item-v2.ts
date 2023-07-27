import { Story } from "@next-core/brick-types";
import { generalFormItemSvg } from "../images";
export const generalFormItemV2Story: Story = {
  storyId: "forms.general-form-item-v2",
  type: "brick",
  category: "form-input-basic",
  author: "william",
  text: {
    en: "Form Item v2",
    zh: "表单项 v2",
  },
  description: {
    en: "",
    zh: "",
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
                      brick: "forms.general-form-item-v2",
                      properties: {
                        name: "a",
                        label: "一个字段",
                        required: true,
                        message: {
                          required: "当前值为空，请点击按钮赋值",
                        },
                        controlBrick: {
                          useBrick: [
                            {
                              brick: "basic-bricks.general-button",
                              properties: {
                                id: "assign-button",
                                buttonName: "点击赋值为 123",
                                value: 123,
                              },
                              events: {
                                "general.button.click": {
                                  target: "forms\\.general-form-item-v2",
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
                        "general-form-item-v2.change": [
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
