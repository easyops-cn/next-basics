import { Story } from "@next-core/brick-types";
import { userOrUserGroupSelectSvg } from "../images";
export const userGroupSelectStory: Story = {
  storyId: "forms.user-or-user-group-select",
  type: "brick",
  category: "form-input-business",
  author: "lynette",
  text: {
    en: "user-or-user-group-select",
    zh: "用户（组）选择器",
  },
  description: {
    en: "support to select user or user group by modal or select",
    zh: "支持配置选择用户／用户组，下拉框／弹框选择等",
  },
  icon: {
    imgSrc: userOrUserGroupSelectSvg,
  },
  conf: [
    {
      bricks: [
        {
          description: {
            title: "基本用法",
          },
          brick: "forms.user-or-user-group-select",
          events: {
            "user.group.change": {
              action: "console.log",
            },
          },
          properties: {
            mergeUseAndUserGroup: true,
            name: "username",
            staticList: ["easyops"],
            style: {
              width: "500px",
            },
            value: ["easyops"],
          },
        },
      ],
      snippetId: "forms.user-or-user-group-select[basic]",
      title: {
        en: "Basic User or User Group Select",
        zh: "基础用户(组)选择器",
      },
    },
    {
      bricks: [
        {
          description: {
            title: "支持白名单配置",
          },
          brick: "forms.user-or-user-group-select",
          events: {
            "user.group.change": {
              action: "console.log",
            },
          },
          properties: {
            mergeUseAndUserGroup: true,
            name: "username",
            staticList: ["easyops"],
            style: {
              width: "500px",
            },
            value: ["easyops"],
          },
        },
      ],
      snippetId: "forms.user-or-user-group-select[blank-list]",
      title: {
        en: "User or User Group Select with Blank List",
        zh: "带白名单配置的基础用户(组)选择器",
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
