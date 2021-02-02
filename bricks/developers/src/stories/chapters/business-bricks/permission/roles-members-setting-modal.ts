import { Story } from "../../../interfaces";
import docMD from "../../../docs/permission/roles-members-setting-modal.md";

export const story: Story = {
  storyId: "permission.roles-members-setting-modal",
  type: "template",
  author: "cyril",
  text: {
    en: "roles-members-setting-modal",
    zh: "角色成员设置弹窗",
  },
  description: {
    en: "set users and groups to roles",
    zh: "设置角色成员",
  },
  icon: {
    lib: "fa",
    icon: "user",
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
                buttonName: "成员设置",
                buttonIcon: "user",
              },
              events: {
                "general.button.click": {
                  target: "#roles-members-setting-modal",
                  method: "open",
                },
              },
            },
            {
              template: "permission.roles-members-setting-modal",
              params: {
                id: "roles-members-setting-modal",
                title: "仪表盘成员设置",
                roles: [
                  {
                    name: "仪表盘管理人员",
                    optionsMode: "all",
                    placeholder: "选择可管理仪表盘成员和使用仪表盘的用户组",
                    labelTooltip: {
                      content: "仪表盘管理人员tooltip",
                      icon: {
                        lib: "fa",
                        icon: "question-circle",
                      },
                      style: {
                        minWidth: "200px",
                      },
                    },
                  },
                  {
                    name: "仪表盘使用人员",
                    optionsMode: "all",
                    placeholder: "选择可使用仪表盘的用户组",
                  },
                  {
                    name: "仪表盘访问人员",
                    optionsMode: "all",
                    placeholder: "选择仅可访问仪表盘的用户组",
                  },
                ],
                width: "800px",
                labelCol: {
                  span: 4,
                },
                wrapperCol: {
                  span: 17,
                },
              },
            },
          ],
        },
      },
    },
  ],
  doc: docMD,
};
