import doc from "../../../docs/forms/dynamic-form-item.md";
import { Story } from "../../../interfaces";

const story: Story = {
  storyId: "forms.dynamic-form-item",
  type: "brick",
  author: "jo",
  text: {
    en: "Dynamic Add or Remove form Item",
    zh: "动态表单项",
  },
  description: {
    en:
      "Multi-column display, dynamically add or delete each row of form items, currently supports input and select types",
    zh: "多列显示可以动态增加或删除的表单项，目前支持 input 和 select 类型",
  },
  icon: {
    lib: "fa",
    icon: "columns",
  },
  conf: [
    {
      brick: "forms.general-form",
      properties: {
        values: {
          username: "easyops",
          dynamic: [
            {
              type: "origin",
              operate: "equal",
              content: "app",
              password: "QQ==",
            },
          ],
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
              brick: "forms.general-input",
              properties: {
                name: "username",
                label: "用户名",
                labelTooltip: {
                  content: "昵称",
                  icon: {
                    lib: "antd",
                    type: "user",
                  },
                },
                required: true,
                pattern: "^[a-z][-a-z0-9]{0,63}$",
                message: {
                  required: "用户名为必填项",
                  pattern:
                    "只能包含小写字母、数字和-，且要以字母开头，不能超过64个字符",
                },
                placeholder: "请输入用户名",
              },
            },
            {
              brick: "forms.dynamic-form-item",
              properties: {
                label: "动态表单项",
                name: "dynamic",
                columns: [
                  {
                    name: "type",
                    rules: [{ required: true, message: "请填写名称" }],
                    type: "select",
                    selectProps: {
                      allowClear: true,
                      placeholder: "匹配项目",
                      options: [
                        {
                          label: "原始告警内容",
                          value: "origin",
                        },
                        {
                          label: "事件来源",
                          value: "event",
                        },
                        {
                          label: "告警指标",
                          value: "alert",
                        },
                      ],
                    },
                  },
                  {
                    name: "operate",
                    type: "select",
                    defaultValue: "contain",
                    selectProps: {
                      allowClear: true,
                      placeholder: "比较器",
                      options: [
                        { label: "包含", value: "contain" },
                        { label: "等于", value: "equal" },
                      ],
                    },
                  },
                  {
                    name: "content",
                    type: "input",
                    inputProps: {
                      placeholder: "值",
                    },
                    rules: [
                      {
                        uniq: true,
                        message: "变量值只能唯一",
                      },
                    ],
                  },
                  {
                    name: "password",
                    type: "password",
                    encrypt: true,
                    inputProps: {
                      placeholder: "input password",
                    },
                    rules: [
                      {
                        required: true,
                        message: "必填",
                      },
                    ],
                  },
                ],
              },
              events: {
                "item.change": {
                  action: "console.log",
                },
                "item.add": {
                  action: "console.log",
                },
                "item.remove": {
                  action: "console.log",
                },
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
  doc,
};

export default story;
