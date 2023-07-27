import { Story } from "../../../interfaces";
import docMD from "../../../docs/agile/tpl-edit-issue-modal.md";
import { ISSUE_NAME } from "../../../constants";

export const story: Story = {
  storyId: "agile.tpl-edit-issue-modal",
  type: "brick",
  author: "alren",
  text: {
    en: "issue edit modal",
    zh: "编辑ISSUE弹框模板"
  },
  icon: {
    lib: "fa",
    icon: "comments",
    prefix: "fas"
  },
  description: {
    en: "issue edit modal",
    zh: "封装了标准issue编辑的弹框"
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
                buttonName: "click"
              },
              events: {
                "general.button.click": [
                  {
                    target: "agile\\.tpl-edit-issue-modal",
                    method: "setInitValue",
                    args: [
                      {
                        author: "${SYS.userInstanceId}",
                        title: "edit demo"
                      }
                    ]
                  },
                  {
                    target: "agile\\.tpl-edit-issue-modal",
                    properties: {
                      issueId: ISSUE_NAME,
                      staticValues: {
                        step: "to-be-developed"
                      }
                    }
                  },
                  {
                    target: "agile\\.tpl-edit-issue-modal",
                    method: "open"
                  }
                ]
              }
            },
            {
              brick: "agile.tpl-edit-issue-modal",
              slots: {
                endItems: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "custom",
                        label: "自定义",
                        placeholder: "通过插槽额外添加的表单项"
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  ],
  doc: docMD
};
