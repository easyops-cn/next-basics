import { Story } from "@next-core/brick-types";
import { generalFormSvg } from "../images";
export const story: Story = {
  storyId: "forms.general-form",
  type: "brick",
  category: "form-input-basic",
  author: "steve",
  text: {
    en: "General Form",
    zh: "普通表单",
  },
  description: {
    en: "",
    zh: "通用表单容器",
  },
  icon: {
    imgSrc: generalFormSvg,
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-modal",
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        textContent: "模板相关说明",
                      },
                    },
                  ],
                },
              },
              properties: {
                okText: "确定",
                modalTitle: "提示",
              },
            },
            {
              brick: "forms.general-form",
              properties: {
                name: "hello",
                values: {
                  username: "easyops",
                  nickname: "lucy",
                },
                valueTypes: {
                  time: "moment|YYYY-MM-DD",
                },
              },
              events: {
                "validate.success": {
                  action: "console.log",
                  args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
                },
                "validate.error": {
                  action: "console.warn",
                  args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
                },
              },
              slots: {
                items: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "providers-of-cmdb.cmdb-object-api-get-object-all",
                      bg: true,
                    },
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
                      brick: "forms.user-or-user-group-select",
                      properties: {
                        name: "user",
                        label: "选择用户（组）",
                        placeholder: "请输入用户名",
                      },
                      lifeCycle: {
                        useResolves: [
                          {
                            name: "objectList",
                            field: "data",
                            provider:
                              "providers-of-cmdb\\.cmdb-object-api-get-object-all",
                          },
                        ],
                      },
                    },
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "password",
                        type: "password",
                        label: "密码",
                        required: true,
                        min: 7,
                        message: {
                          required: "密码为必填项",
                          min: "密码至少包含7位",
                        },
                        placeholder: "请输入密码",
                      },
                    },
                    {
                      brick: "forms.general-text-area",
                      properties: {
                        name: "description",
                        label: "描述",
                        value: "This is a long description",
                        placeholder: "请填写描述",
                        helpBrick: {
                          useBrick: {
                            brick: "basic-bricks.general-button",
                            properties: {
                              buttonType: "link",
                              buttonName: "模板说明",
                            },
                            events: {
                              "general.button.click": {
                                target: "basic-bricks\\.general-modal",
                                method: "open",
                              },
                            },
                          },
                          placement: "right",
                          containerStyle: {
                            marginLeft: "-5px",
                          },
                        },
                        autoSize: { minRows: 3, maxRows: 8 },
                        required: true,
                        max: 10,
                        message: {
                          required: "请输入内容",
                          max: "最长长度限制，10",
                        },
                      },
                    },
                    {
                      brick: "forms.general-select",
                      properties: {
                        name: "nickname",
                        label: "昵称",
                        placeholder: "请输入密码",
                        options: ["jack", "lucy"],
                      },
                    },
                    {
                      brick: "forms.general-date-picker",
                      properties: {
                        name: "time",
                        label: "时间",
                        placeholder: "when",
                        helpBrick: "这里是一些说明信息",
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
        },
      },
      description: {
        title: "普通表单",
        message:
          "非动态表单，包含了多种常见表单子项，例如 普通输入框、多行输入框、下拉选择、时间选择、用户选择、密码等",
      },
    },
    {
      description: {
        title: "动态表单",
        message: "通过表单子项的notRender属性和setNotRender方法，实现动态表单",
      },
      brick: "forms.general-form",
      events: {
        "validate.error": {
          action: "console.warn",
          args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
        },
        "validate.success": {
          action: "console.log",
          args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
        },
      },
      properties: {
        name: "hello",
        values: {
          change: "descriptionA",
          username: "easyops",
        },
      },
      slots: {
        items: {
          bricks: [
            {
              brick: "forms.general-input",
              properties: {
                label: "用户名",
                message: {
                  pattern:
                    "只能包含小写字母、数字和-，且要以字母开头，不能超过64个字符",
                  required: "用户名为必填项",
                },
                name: "username",
                pattern: "^[a-z][-a-z0-9]{0,63}$",
                placeholder: "请输入用户名",
                required: true,
              },
            },
            {
              brick: "forms.general-radio",
              events: {
                "general.radio.change": [
                  {
                    args: ["<% EVENT.detail !== 'descriptionA' %>"],
                    method: "setNotRender",
                    target: "#descriptionA",
                  },
                  {
                    args: ["<% EVENT.detail !== 'descriptionB' %>"],
                    method: "setNotRender",
                    target: "#descriptionB",
                  },
                ],
              },
              properties: {
                label: "动态切换",
                name: "change",
                options: ["descriptionA", "descriptionB"],
              },
            },
            {
              brick: "forms.general-text-area",
              properties: {
                autoSize: {
                  maxRows: 8,
                  minRows: 3,
                },
                id: "descriptionA",
                label: "描述A",
                max: 10,
                message: {
                  max: "最长长度限制，10",
                  required: "请输入内容",
                },
                name: "descriptionA",
                placeholder: "请填写描述",
                required: true,
                value: "This is a long description",
              },
            },
            {
              brick: "forms.general-select",
              properties: {
                hidden: true,
                id: "descriptionB",
                inputBoxStyle: {
                  width: "100%",
                },
                label: "描述B",
                name: "descriptionB",
                notRender: true,
                options: [
                  {
                    label: "男",
                    value: "male",
                  },
                  {
                    label: "女",
                    value: "female",
                  },
                ],
                placeholder: "请填写描述",
                required: true,
              },
            },
            {
              brick: "forms.general-buttons",
              events: {
                "cancel.button.click": {
                  action: "console.log",
                },
                "submit.button.click": {
                  action: "console.log",
                },
              },
              properties: {
                cancelText: "取消",
                showCancelButton: true,
                submitText: "提交",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "帮助提示",
        message: "在表单中增加一些帮助、提示信息",
      },
      brick: "div",
      slots: {
        "": {
          bricks: [
            {
              brick: "basic-bricks.general-modal",
              properties: {
                modalTitle: "提示",
                okText: "确定",
                id: "helpModal",
              },
              slots: {
                content: {
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        textContent: "模板相关说明",
                      },
                    },
                  ],
                  type: "bricks",
                },
              },
            },
            {
              brick: "forms.general-form",
              events: {
                "validate.error": {
                  action: "console.warn",
                  args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
                },
                "validate.success": {
                  action: "console.log",
                  args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
                },
              },
              properties: {
                name: "hello",
                values: {
                  nickname: "lucy",
                  username: "easyops",
                },
              },
              slots: {
                items: {
                  bricks: [
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "username",
                        label: "用户名",
                        labelTooltip: "一些帮助信息",
                        placeholder: "请输入用户名",
                        required: true,
                      },
                    },
                    {
                      brick: "forms.general-text-area",
                      properties: {
                        autoSize: {
                          maxRows: 8,
                          minRows: 3,
                        },
                        helpBrick: {
                          containerStyle: {
                            marginLeft: "-5px",
                          },
                          placement: "right",
                          useBrick: {
                            brick: "basic-bricks.general-button",
                            events: {
                              "general.button.click": {
                                method: "open",
                                target: "#helpModal",
                              },
                            },
                            properties: {
                              buttonName: "模板说明",
                              buttonType: "link",
                            },
                          },
                        },
                        label: "描述",
                        max: 10,
                        message: {
                          max: "最长长度限制，10",
                          required: "请输入内容",
                        },
                        name: "description",
                        placeholder: "请填写描述",
                        required: true,
                      },
                    },
                    {
                      brick: "forms.general-select",
                      properties: {
                        label: "昵称",
                        name: "nickname",
                        inputBoxStyle: {
                          width: "100%",
                        },
                        options: ["jack", "lucy"],
                        placeholder: "请输入密码",
                        helpBrick: "这里是一些说明信息",
                      },
                    },
                    {
                      brick: "forms.general-buttons",
                      properties: {
                        cancelText: "取消",
                        showCancelButton: true,
                        submitText: "提交",
                      },
                    },
                  ],
                  type: "bricks",
                },
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "获取当前表单值",
        message: "通过getFieldsValue方法获取表单值，展示当前表单填写情况",
      },
      brick: "forms.general-form",
      events: {
        "validate.error": {
          action: "console.warn",
          args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
        },
        "validate.success": {
          action: "console.log",
          args: ["<% EVENT.type %>", "<% EVENT.detail %>"],
        },
      },
      properties: {
        id: "preview-form",
        values: {
          description: "lucy",
          username: "easyops",
        },
      },
      slots: {
        items: {
          bricks: [
            {
              brick: "basic-bricks.general-button",
              events: {
                "general.button.click": [
                  {
                    target: "#preview-form",
                    method: "getFieldsValue",
                    callback: {
                      success: [
                        {
                          target: "#preview-alert",
                          properties: {
                            hidden: false,
                            message:
                              "<% `用户名：${EVENT.detail.username} 描述：${EVENT.detail.description}` %>",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
              properties: {
                buttonName: "预览表单填写效果",
              },
            },
            {
              brick: "presentational-bricks.brick-alert",
              properties: {
                id: "preview-alert",
                hidden: true,
                showIcon: true,
                type: "info",
                style: {
                  margin: "20px 0",
                },
              },
            },
            {
              brick: "forms.general-input",
              properties: {
                label: "用户名",
                labelTooltip: "一些帮助信息",
                name: "username",
                placeholder: "请输入用户名",
                required: true,
              },
            },
            {
              brick: "forms.general-text-area",
              properties: {
                autoSize: {
                  maxRows: 8,
                  minRows: 3,
                },
                label: "描述",
                name: "description",
                placeholder: "请填写描述",
                required: true,
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                cancelText: "取消",
                showCancelButton: true,
                submitText: "提交",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
  ],
};

export default story;
