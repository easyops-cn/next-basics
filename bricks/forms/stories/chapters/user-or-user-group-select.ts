import { Story } from "@next-core/brick-types";

export const userGroupSelectStory: Story = {
  storyId: "forms.user-or-user-group-select",
  type: "brick",
  category: "form-input",
  author: "lynette",
  text: {
    en: "user-or-user-group-select",
    zh: "用户（组）选择",
  },
  description: {
    en: "support to select user or user group by modal or select",
    zh: "支持配置选择用户／用户组，下拉框／弹框选择等",
  },
  icon: {
    lib: "fa",
    icon: "link",
  },
  conf: [
    {
      description: {
        title: "基本用法",
      },
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "forms.user-or-user-group-select",
              properties: {
                style: {
                  width: "500px",
                },
              },
              events: {
                "user.group.change": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "支持白名单配置",
      },
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "forms.user-or-user-group-select",
              properties: {
                style: {
                  width: "500px",
                },
                name: "username",
                mergeUseAndUserGroup: true,
                value: ["easyops"],
                staticList: ["easyops"],
              },
              events: {
                "user.group.change": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title:
          "objectList 由外部提供数据时请使用`providers-of-cmdb.cmdb-object-api-get-object-all`",
      },
      brick: "forms.general-form",
      properties: {
        values: {
          username: {
            selectedUser: ["easyops"],
          },
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
          args: ["${EVENT.type}", "${EVENT.detail}"],
        },
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
              brick: "forms.user-or-user-group-select",
              properties: {
                name: "username",
                label: "选择用户（组）",
                placeholder: "请输入用户名",
              },
              lifeCycle: {
                useResolves: [
                  {
                    name: "objectList",
                    field: "data",
                    useProvider:
                      "providers-of-cmdb.cmdb-object-api-get-object-ref",
                    args: [{ ref_object: "USER,USER_GROUP" }],
                  },
                ],
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                showCancelButton: true,
                submitText: "提交",
                cancelText: "取消",
              },
              events: {
                "submit.button.click": {
                  action: "console.log",
                },
                "cancel.button.click": {
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
