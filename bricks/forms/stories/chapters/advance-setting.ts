import { Story } from "@next-core/brick-types";
import { advanceSetting } from "../images";
export const advanceSettingStory: Story = {
  storyId: "forms.advance-setting",
  category: "form-input",
  type: "brick",
  author: "momo",
  text: {
    en: "advance-setting",
    zh: "高级设置",
  },
  description: {
    en: "",
    zh: "",
  },
  icon: {
    imgSrc: advanceSetting,
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
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
                      brick: "forms.advance-setting",
                      properties: {
                        foldName: "查看",
                      },
                      slots: {
                        content: {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "forms.general-text-area",
                              properties: {
                                name: "descriptionA",
                                id: "descriptionA",
                                label: "描述A",
                                value: "This is a long description",
                                placeholder: "请填写描述",
                                autoSize: {
                                  minRows: 3,
                                  maxRows: 8,
                                },
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
                          ],
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
    },
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-form",
              properties: {
                layout: "vertical",
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
                      brick: "forms.advance-setting",
                      properties: {
                        id: "vertical",
                        foldName: "高级设置...",
                        showDivider: false,
                        showFoldIcon: false,
                      },
                      slots: {
                        content: {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "forms.general-text-area",
                              properties: {
                                name: "descriptionA",
                                id: "descriptionA",
                                label: "描述A",
                                value: "This is a long description",
                                placeholder: "请填写描述",
                                autoSize: {
                                  minRows: 3,
                                  maxRows: 8,
                                },
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
                          ],
                        },
                      },
                      events: {
                        "advance.setting.expand": [
                          {
                            action: "console.log",
                          },
                          {
                            target: "#vertical",
                            properties: {
                              foldName: "高级设置折叠",
                            },
                          },
                        ],
                        "advance.setting.collapse": {
                          target: "#vertical",
                          properties: {
                            foldName: "高级设置...",
                          },
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
    },
  ],
};
