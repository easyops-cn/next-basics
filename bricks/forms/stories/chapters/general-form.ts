import { Story } from "@next-core/brick-types";

export const story: Story = {
  storyId: "forms.general-form",
  type: "brick",
  category: "form-input",
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
                        textContent: "这里可以写一些提示信息",
                      },
                    },
                  ],
                },
              },
              properties: {
                id: "labelHelpModal",
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
                  change: "descriptionA",
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
                      brick: "providers-of-cmdb.cmdb-object-api-get-object-all",
                      bg: true,
                    },
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "username",
                        label: "用户名",
                        required: true,
                        pattern: "^[a-z][-a-z0-9]{0,63}$",
                        message: {
                          required: "用户名为必填项",
                          pattern:
                            "只能包含小写字母、数字和-，且要以字母开头，不能超过64个字符",
                        },
                        placeholder: "请输入用户名",
                        labelBrick: {
                          useBrick: {
                            brick: "presentational-bricks.brick-link",
                            properties: {
                              icon: {
                                lib: "antd",
                                icon: "info-circle",
                                theme: "outlined",
                                color: "#0071eb",
                              },
                            },
                            events: {
                              "link.click": {
                                target: "#labelHelpModal",
                                method: "open",
                              },
                            },
                          },
                        },
                      },
                    },
                    {
                      brick: "forms.general-radio",
                      properties: {
                        name: "change",
                        label: "动态切换",
                        options: ["descriptionA", "descriptionB"],
                      },
                      events: {
                        "general.radio.change": [
                          {
                            target: "#descriptionA",
                            method: "setNotRender",
                            args: ["<% EVENT.detail !== 'descriptionA' %>"],
                          },
                          {
                            target: "#descriptionB",
                            method: "setNotRender",
                            args: ["<% EVENT.detail !== 'descriptionB' %>"],
                          },
                        ],
                      },
                    },
                    {
                      brick: "forms.general-text-area",
                      properties: {
                        name: "descriptionA",
                        id: "descriptionA",
                        label: "描述A",
                        value: "This is a long description",
                        placeholder: "请填写描述",
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
                        name: "descriptionB",
                        id: "descriptionB",
                        hidden: true,
                        notRender: true,
                        label: "描述B",
                        placeholder: "请填写描述",
                        required: true,
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
                        inputBoxStyle: {
                          width: "100%",
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
        },
      },
      description: {
        title: "动态表单",
        message: "通过表单子项的notRender属性和setNotRender方法，实现动态表单",
      },
    },
  ],
};

export default story;
