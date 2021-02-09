import { Story } from "@next-core/brick-types";

export const generalFormItemStory: Story = {
  storyId: "forms.general-form-item",
  type: "brick",
  category: "form-input",
  author: "william",
  text: {
    en: "General Form Item",
    zh: "普通表单项",
  },
  description: {
    en: "",
    zh: "",
  },
  icon: {
    lib: "fa",
    icon: "pen",
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
                          {
                            target:
                              "basic-bricks\\.general-button#assign-button",
                            properties: {
                              buttonName: "点击赋值为 ${EVENT.detail}",
                              value: "${EVENT.detail}",
                            },
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
