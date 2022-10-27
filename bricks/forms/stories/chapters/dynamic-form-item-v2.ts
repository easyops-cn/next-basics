import { Story } from "@next-core/brick-types";
import { dynamicFormItemV2 } from "../images";

export const DynamicFormItemV2Story: Story = {
  storyId: "forms.dynamic-form-item-v2",
  type: "brick",
  category: "form-input-advanced",
  author: "nlicroshan",
  text: {
    en: "Dynamic Form Item V2",
    zh: "动态表单项V2",
  },
  description: {
    en: "Multi-column display, dynamically add or delete each row of form items, currently supports input , select, and other related types",
    zh: "多列显示可以动态增加或删除的表单项，目前支持 input 和 select 等多种类型",
  },
  icon: {
    imgSrc: dynamicFormItemV2,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.dynamic-form-item-v2",
          events: {
            "item.change": [
              {
                action: "console.log",
                args: ["item.change", "${event.detail}"],
              },
            ],
            "row.add": [
              {
                action: "console.log",
                args: ["row.add", "${event.detail}"],
              },
            ],
            "row.remove": [
              {
                action: "console.log",
                args: ["row.remove", "${event.detail}"],
              },
            ],
          },
          properties: {
            columns: [
              {
                name: "input",
                props: {
                  allowClear: true,
                  placeholder: "input",
                },
                rules: [
                  {
                    message: "input为必填项",
                    required: true,
                  },
                ],
                type: "input",
              },
              {
                name: "inputNumber",
                props: {
                  max: 9,
                  min: 1,
                  placeholder: "inputNumber",
                },
                type: "inputNumber",
              },
              {
                name: "inputPassword",
                props: {
                  placeholder: "inputPassword",
                },
                type: "inputPassword",
              },
              {
                name: "select",
                props: {
                  allowClear: true,
                  options: [
                    {
                      label: "aa",
                      value: "kaa",
                    },
                    {
                      label: "bb",
                      value: "kbb",
                    },
                    {
                      label: "cc",
                      value: "kcc",
                    },
                  ],
                  placeholder: "select",
                },
                type: "select",
              },
              {
                name: "cascader",
                props: {
                  allowClear: false,
                  expandTrigger: "hover",
                  options: [
                    {
                      children: [
                        {
                          children: [
                            {
                              label: "xihu",
                              value: "xihu",
                            },
                          ],
                          label: "hangzhou",
                          value: "hangzhou",
                        },
                      ],
                      label: "zhejiang",
                      value: "zhejiang",
                    },
                    {
                      children: [
                        {
                          label: "guangzhou",
                          value: "guangzhou",
                        },
                      ],
                      label: "guangdong",
                      value: "guangdong",
                    },
                  ],
                  popupPlacement: "topLeft",
                  showSearch: true,
                },
                type: "cascader",
              },
            ],
            label: "动态表单项v2",
            name: "dynamic",
            required: true,
          },
        },
      ],
      snippetId: "dynamic-form-item-v2[basic]",
      title: {
        en: "Basic Dynamic Form Item V2",
        zh: "基础动态表单项V2",
      },
    },
    {
      description: {
        title: "基本用法",
        message: "混合多种表单类型",
      },
      brick: "forms.general-form",
      events: {
        "validate.error": {
          action: "console.log",
          args: ["error", "${EVENT.detail}"],
        },
        "validate.success": {
          action: "console.log",
          args: ["success", "${EVENT.detail}"],
        },
      },
      properties: {
        values: {
          dynamic: [
            {
              input: "abc",
            },
          ],
        },
      },
      slots: {
        items: {
          bricks: [
            {
              brick: "forms.dynamic-form-item-v2",
              events: {
                "row.add": [
                  {
                    action: "console.log",
                    args: ["row.add", "${event.detail}"],
                  },
                ],
                "row.remove": [
                  {
                    action: "console.log",
                    args: ["row.remove", "${event.detail}"],
                  },
                ],
                "item.change": [
                  {
                    action: "console.log",
                    args: ["item.change", "${event.detail}"],
                  },
                ],
              },
              properties: {
                label: "动态表单项v2",
                name: "dynamic",
                required: true,
                columns: [
                  {
                    props: {
                      placeholder: "input",
                      allowClear: true,
                    },
                    rules: [
                      {
                        message: "input为必填项",
                        required: true,
                      },
                    ],
                    name: "input",
                    type: "input",
                  },
                  {
                    props: {
                      placeholder: "inputNumber",
                      min: 1,
                      max: 9,
                    },
                    name: "inputNumber",
                    type: "inputNumber",
                  },
                  {
                    props: {
                      placeholder: "inputPassword",
                    },
                    name: "inputPassword",
                    type: "inputPassword",
                  },
                  {
                    props: {
                      placeholder: "select",
                      allowClear: true,
                      options: [
                        {
                          label: "aa",
                          value: "kaa",
                        },
                        {
                          label: "bb",
                          value: "kbb",
                        },
                        {
                          label: "cc",
                          value: "kcc",
                        },
                      ],
                    },
                    name: "select",
                    type: "select",
                  },
                  {
                    name: "cascader",
                    type: "cascader",
                    props: {
                      allowClear: false,
                      expandTrigger: "hover",
                      popupPlacement: "topLeft",
                      showSearch: true,
                      options: [
                        {
                          children: [
                            {
                              children: [
                                {
                                  label: "xihu",
                                  value: "xihu",
                                },
                              ],
                              label: "hangzhou",
                              value: "hangzhou",
                            },
                          ],
                          label: "zhejiang",
                          value: "zhejiang",
                        },
                        {
                          children: [
                            {
                              label: "guangzhou",
                              value: "guangzhou",
                            },
                          ],
                          label: "guangdong",
                          value: "guangdong",
                        },
                      ],
                    },
                  },
                ],
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
    {
      description: {
        title: "隐藏/禁用添加按钮",
        message:
          "设置hideAddButton、disabledAddButton达到隐藏/禁用添加按钮的场景",
      },
      brick: "forms.general-form",
      events: {
        "validate.error": {
          action: "console.log",
          args: ["error", "${EVENT.detail}"],
        },
        "validate.success": {
          action: "console.log",
          args: ["success", "${EVENT.detail}"],
        },
      },
      properties: {
        values: {
          dynamic: [
            {
              input: "abc",
            },
          ],
        },
      },
      slots: {
        items: {
          bricks: [
            {
              brick: "forms.dynamic-form-item-v2",
              events: {
                "row.add": [
                  {
                    action: "console.log",
                    args: ["row.add", "${event.detail}"],
                  },
                ],
                "row.remove": [
                  {
                    action: "console.log",
                    args: ["row.remove", "${event.detail}"],
                  },
                ],
                "item.change": [
                  {
                    action: "console.log",
                    args: ["item.change", "${event.detail}"],
                  },
                ],
              },
              properties: {
                label: "动态表单项v2",
                name: "dynamic",
                required: true,
                hideAddButton: "<% (value) => value.length >=3 %>",
                columns: [
                  {
                    props: {
                      placeholder: "input",
                      allowClear: true,
                    },
                    name: "input",
                    type: "input",
                  },
                  {
                    props: {
                      placeholder: "select",
                      allowClear: true,
                      options: [
                        {
                          label: "aa",
                          value: "kaa",
                        },
                        {
                          label: "bb",
                          value: "kbb",
                        },
                        {
                          label: "cc",
                          value: "kcc",
                        },
                      ],
                    },
                    name: "select",
                    type: "select",
                  },
                ],
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
    {
      description: {
        title: "设置表单项禁用和禁止移除",
        message:
          "设置disabled、hideRemoveButton、disabledRemoveButton达到表单项禁用和禁止移除",
      },
      brick: "forms.general-form",
      events: {
        "validate.error": {
          action: "console.log",
          args: ["error", "${EVENT.detail}"],
        },
        "validate.success": {
          action: "console.log",
          args: ["success", "${EVENT.detail}"],
        },
      },
      properties: {
        values: {
          dynamic: [
            {
              input: "abc",
            },
          ],
        },
      },
      slots: {
        items: {
          bricks: [
            {
              brick: "forms.dynamic-form-item-v2",
              events: {
                "row.add": [
                  {
                    action: "console.log",
                    args: ["row.add", "${event.detail}"],
                  },
                ],
                "row.remove": [
                  {
                    action: "console.log",
                    args: ["row.remove", "${event.detail}"],
                  },
                ],
                "item.change": [
                  {
                    action: "console.log",
                    args: ["item.change", "${event.detail}"],
                  },
                ],
              },
              properties: {
                label: "动态表单项v2",
                name: "dynamic",
                required: true,
                disabledRemoveButton: "<% (row,index) => index === 0 %>",
                columns: [
                  {
                    props: {
                      placeholder: "先输入第一项",
                      allowClear: true,
                    },
                    name: "input",
                    type: "input",
                  },
                  {
                    props: {
                      placeholder: "再输入第二项",
                      allowClear: true,
                      disabled: "<% (row) => !row.input %>",
                      options: [
                        {
                          label: "aa",
                          value: "kaa",
                        },
                        {
                          label: "bb",
                          value: "kbb",
                        },
                        {
                          label: "cc",
                          value: "kcc",
                        },
                      ],
                    },
                    name: "select",
                    type: "select",
                  },
                ],
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
