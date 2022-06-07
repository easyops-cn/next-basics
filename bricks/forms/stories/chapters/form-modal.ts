import { Story } from "@next-core/brick-types";

export const formModalStory: Story = {
  storyId: "forms.form-modal",
  category: "form-input",
  type: "brick",
  text: {
    en: "Form Modal",
    zh: "表单模态框",
  },
  description: {
    en: "Form modal. If is used as form item, please use forms.general-form instead.",
    zh: "表单模态框。要作为表单项，请使用 forms.general-form。",
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
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "编辑",
                buttonIcon: "edit",
                dataset: {
                  testid: "basic-usage-demo-button",
                },
              },
              events: {
                "general.button.click": {
                  target: "#form-modal-1",
                  method: "open",
                },
              },
            },
            {
              brick: "forms.form-modal",
              properties: {
                id: "form-modal-1",
                dataset: {
                  testid: "basic-usage-demo-modal",
                },
                titleIcon: {
                  icon: "plus",
                  lib: "antd",
                },
                modalTitle: "编辑信息",
                dataSource: {
                  level: "high",
                },
                form: {
                  useBrick: {
                    transform: {
                      values: "<% DATA %>",
                    },
                    events: {
                      "validate.success": [
                        {
                          action: "console.log",
                          args: ["${EVENT.type}", "${EVENT.detail}"],
                        },
                        {
                          target: "forms\\.form-modal",
                          method: "close",
                        },
                      ],
                      "validate.error": {
                        action: "console.warn",
                        args: ["${EVENT.type}", "${EVENT.detail}"],
                      },
                    },
                  },
                },
                items: {
                  useBrick: [
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
              events: {
                "formModal.open": {
                  action: "console.log",
                },
                "formModal.close": {
                  action: "console.log",
                },
                "formModal.ok": {
                  action: "console.log",
                },
                "formModal.cancel": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
  ],
};
