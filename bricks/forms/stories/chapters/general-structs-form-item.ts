import { Story } from "@next-core/brick-types";
import { generalStructsFormItem } from "../images";

export const structsFormItemStory: Story = {
  storyId: "forms.general-structs-form-item",
  category: "form-input-advanced",
  type: "brick",
  author: "ann",
  text: {
    en: "Editable table",
    zh: "可编辑表格",
  },
  description: {
    en: "",
    zh: "添加/编辑结构体",
  },
  icon: {
    imgSrc: generalStructsFormItem,
  },
  conf: [
    {
      brick: "forms.general-structs-form-item",
      properties: {
        label: "参数",
        btnText: "添加参数",
        structDefaultValues: {
          type: "string",
        },
        value: [
          {
            name: "param1",
            type: "string",
            description: "参数说明1",
          },
          {
            name: "param1",
            type: "string",
            description: "参数说明1",
          },
        ],
        fieldsMap: {
          name: "参数名",
          description: "参数说明",
          type: "参数类型",
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-form",
              properties: {
                labelCol: {
                  md: { span: 6 },
                },
                wrapperCol: {
                  md: { span: 18 },
                },
              },
              slots: {
                items: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "name",
                        required: true,
                        label: "参数名",
                      },
                    },
                    {
                      brick: "forms.general-radio",
                      properties: {
                        name: "type",
                        required: true,
                        label: "参数类型",
                        options: [
                          {
                            label: "字符串",
                            value: "string",
                          },
                          {
                            label: "整型",
                            value: "int",
                          },
                        ],
                      },
                    },
                    {
                      brick: "forms.general-text-area",
                      properties: {
                        name: "description",
                        required: false,
                        label: "说明",
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      events: {
        "struct.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          username: "easyops",
          paramList: [
            {
              name: "param1",
              type: "string",
              description: "参数说明1",
            },
          ],
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
                required: true,
              },
            },
            {
              brick: "forms.general-structs-form-item",
              properties: {
                label: "参数列表",
                name: "paramList",
                btnText: "添加参数",
                multiple: false,
                // value: [],
                fieldsMap: {
                  name: "参数名",
                  description: "参数说明",
                  type: "参数类型",
                },
              },
              slots: {
                items: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "forms.general-form",
                      properties: {
                        labelCol: {
                          md: { span: 6 },
                        },
                        wrapperCol: {
                          md: { span: 18 },
                        },
                      },
                      slots: {
                        items: {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "forms.general-input",
                              properties: {
                                name: "name",
                                required: true,
                                label: "参数名",
                              },
                            },
                            {
                              brick: "forms.general-radio",
                              properties: {
                                name: "type",
                                required: true,
                                label: "参数类型",
                                options: [
                                  {
                                    label: "字符串",
                                    value: "string",
                                  },
                                  {
                                    label: "整型",
                                    value: "int",
                                  },
                                ],
                              },
                            },
                            {
                              brick: "forms.general-text-area",
                              properties: {
                                name: "description",
                                required: false,
                                label: "说明",
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
              events: {
                "struct.data.get": {
                  action: "console.log",
                },
                "struct.change": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                submitText: "提交",
              },
              events: {
                "submit.button.click": {
                  target: "forms\\.general-form",
                  method: "validate",
                },
              },
            },
          ],
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
          args: ["${event.detail}"],
        },
      },
    },
  ],
};
