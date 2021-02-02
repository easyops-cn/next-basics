import doc from "../../../docs/forms/dynamic-form-input-item.md";
import { Story } from "../../../interfaces";

const story: Story = {
  storyId: "forms.dynamic-form-input-item",
  deprecated: true,
  type: "brick",
  author: "jo",
  text: {
    en: "Dynamic Add or Remove Input Item",
    zh: "动态的输入表单项",
  },
  description: {
    en:
      "Form Item Data Is An Array, And Each Row Can Be Added Or Deleted Dynamically",
    zh: "表单项是数组形式的结构，可以动态增加或删除每一行",
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
            { name: "test", host: "192.1681.100", type: "测试" },
            { name: "test2", host: "192.1681.95", type: "生产" },
          ],
        },
        valueTypes: {
          time: "moment|YYYY-MM-DD",
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
              brick: "forms.dynamic-form-input-item",
              properties: {
                label: "动态表单项",
                name: "dynamic",
                columns: [
                  {
                    name: "name",
                    label: "名称",
                    rules: [{ required: true, message: "请填写名称" }],
                  },
                  { name: "host", label: "主机", placeholder: "请填写主机IP" },
                  { name: "type", label: "类型" },
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
