import { Story } from "@next-core/brick-types";

export const GeneralModalStory: Story = {
  storyId: "forms.general-modal",
  category: "form-input",
  type: "brick",
  text: {
    en: "General Modal",
    zh: "表单通用模态框",
  },
  description: {
    en: "General modal in form",
    zh: "既可以作为一个独立的模态框表单，也可以作为表单里面的某个表单项存在",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      description: {
        title: "",
        message:
          "本示例额外使用了通过target改变具体构件方法的知识点，具体可查看[设置指定构件方法方式](/next-docs/docs/brick-next/events#custom-handlers-method)",
      },
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "编辑",
                buttonIcon: "edit",
              },
              events: {
                "general.button.click": {
                  target: "#modal-form-1",
                  method: "open",
                },
              },
            },
            {
              brick: "forms.general-modal",
              properties: {
                id: "modal-form-1",
                modalTitle: "编辑信息",
              },
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "forms.general-form",
                      properties: {
                        values: {
                          level: "high",
                        },
                      },
                      events: {
                        "validate.success": [
                          {
                            action: "console.log",
                            args: ["${EVENT.type}", "${EVENT.detail}"],
                          },
                          {
                            target: "forms\\.general-modal",
                            method: "close",
                          },
                        ],
                        "validate.error": {
                          action: "console.warn",
                          args: ["${EVENT.type}", "${EVENT.detail}"],
                        },
                      },
                      slots: {
                        items: {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "forms.general-input",
                              properties: {
                                name: "age",
                                label: "年龄",
                                placeholder: "请输入年龄",
                                required: true,
                              },
                            },
                            {
                              brick: "forms.general-input",
                              properties: {
                                name: "level",
                                label: "级别",
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "forms.general-form",
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-input",
              properties: {
                label: "角色",
                name: "role",
                placeholder: "请输入角色",
              },
            },
            {
              brick: "forms.general-modal",
              properties: {
                id: "modal-form-2",
                btnText: "添加用户",
                name: "otherInfo",
                label: "用户",
                modalTitle: "添加用户",
                required: true,
                titleIcon: {
                  icon: "plus",
                  lib: "antd",
                },
              },
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "forms.general-form",
                      properties: {
                        values: {
                          age: "18",
                        },
                      },
                      events: {
                        "validate.success": [
                          {
                            action: "console.log",
                            args: ["${EVENT.type}", "${EVENT.detail}"],
                          },
                          {
                            target: "#modal-form-2",
                            method: "updateValue",
                            args: ["${event.detail}"],
                          },
                          {
                            target: "#modal-form-2",
                            method: "close",
                          },
                        ],
                        "validate.error": {
                          action: "console.warn",
                          args: ["${EVENT.type}", "${EVENT.detail}"],
                        },
                      },
                      slots: {
                        items: {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "forms.general-input",
                              properties: {
                                name: "age",
                                label: "年龄",
                                placeholder: "请输入年龄",
                                required: true,
                              },
                            },
                            {
                              brick: "forms.general-input",
                              properties: {
                                name: "level",
                                label: "级别",
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  ],
};
