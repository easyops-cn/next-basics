import { Story } from "@next-core/brick-types";

export const generalCardStory: Story = {
  storyId: "basic-bricks.general-card",
  category: "card",
  type: "brick",
  author: "lynette",
  text: {
    en: "Card",
    zh: "通用卡片",
  },
  tags: [],
  description: {
    en: "card",
    zh: "常见于为多个构件提供统一的卡片容器，比如将搜索框与表格放在一起",
  },
  icon: {
    lib: "fa",
    icon: "address-card",
  },
  conf: [
    {
      brick: "basic-bricks.general-card",
      properties: {
        configProps: {
          title: "卡片标题",
        },
        hasExtraSlot: true,
      },
      slots: {
        content: {
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "内容",
              },
            },
          ],
          type: "bricks",
        },
        extra: {
          bricks: [
            {
              brick: "basic-bricks.general-button",
              events: {
                "general.button.click": {
                  action: "console.log",
                },
              },
              properties: {
                buttonIcon: "plus",
                buttonShape: "circle",
                buttonType: "icon",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      brick: "basic-bricks.general-card",
      properties: {
        cardTitle: "标题",
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "内容",
              },
            },
          ],
        },
        titleSuffix: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.general-tooltip",
              properties: {
                type: "popover",
                content: [
                  "名称：APP",
                  "创建时间：2020-01-02",
                  "修改时间：2020-01-22",
                  "描述：测试应用",
                ],
                icon: {
                  lib: "fa",
                  icon: "info-circle",
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "basic-bricks.general-card",
      properties: {
        cardTitle: "关系管理",
        operationButtons: [
          {
            configProps: {
              icon: "minus",
              style: {
                marginLeft: 8,
                width: 28,
                height: 28,
              },
            },
            id: "instance-remove-relation",
            eventName: "instance.remove.relation",
          },
        ],
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "关系实例列表",
              },
            },
            {
              brick: "presentational-bricks.modal-confirm",
              properties: {
                id: "deleteModal",
                title: "移除确认框",
                content: "确认移除该节点吗？",
                okType: "danger",
                okText: "移除",
              },
            },
          ],
        },
      },
      events: {
        "instance.remove.relation": {
          target: "presentational-bricks\\.modal-confirm",
          method: "open",
        },
      },
    },
    {
      brick: "basic-bricks.grid-layout",
      properties: {
        columns: 6,
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.grid-layout",
              properties: {
                columns: 2,
                columnSpan: 4,
                row: 2,
              },
              slots: {
                items: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        style: {
                          gridColumn: "span 1",
                          height: "100px",
                          backgroundColor: "orange",
                        },
                      },
                    },
                    {
                      brick: "div",
                      properties: {
                        style: {
                          gridColumn: "span 1",
                          height: "100px",
                          backgroundColor: "orange",
                        },
                      },
                    },
                    {
                      brick: "div",
                      properties: {
                        style: {
                          gridColumn: "span 2",
                          height: "200px",
                          backgroundColor: "aquamarine ",
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "basic-bricks.general-card",
              properties: {
                cardTitle: "高度撑满父容器的卡片",
                style: {
                  gridColumn: "span 2",
                },
                fillVertical: true,
              },
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        textContent: "123",
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
      description: {
        title: "使用footer插槽",
        message:
          "适用于多表单使用，具体场景请参考http://192.168.100.162/next/resource-events/alert-config/inhibition-rule/create",
      },
      brick: "forms.general-form",
      properties: {
        values: {
          username: "easyops",
        },
      },
      slots: {
        items: {
          bricks: [
            {
              brick: "basic-bricks.general-card",
              properties: {
                configProps: {
                  title: "表单和折叠容器一起使用",
                },
                hasExtraSlot: true,
                isFixedFooter: false,
              },
              slots: {
                content: {
                  bricks: [
                    {
                      brick: "container-brick.collapse-container",
                      properties: {
                        expandAll: true,
                        type: "white-header-with-white-content",
                        panelsList: [
                          {
                            key: "0",
                            panelTitle: "基础信息",
                          },
                          {
                            key: "1",
                            panelTitle: "高级设置",
                          },
                        ],
                      },
                      slots: {
                        "0": {
                          bricks: [
                            {
                              brick: "forms.general-input",
                              properties: {
                                label: "用户名",
                                labelTooltip: {
                                  content: "昵称",
                                  icon: {
                                    lib: "antd",
                                    type: "user",
                                  },
                                },
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
                              brick: "forms.general-input",
                              properties: {
                                label: "密码",
                                message: {
                                  min: "密码至少包含7位",
                                  required: "密码为必填项",
                                },
                                min: 7,
                                name: "password",
                                placeholder: "请输入密码",
                                required: true,
                                type: "password",
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
                                        target: "basic-bricks\\.general-modal",
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
                                value: "This is a long description",
                              },
                            },
                          ],
                          type: "bricks",
                        },
                        "1": {
                          bricks: [
                            {
                              brick: "forms.general-switch",
                              properties: {
                                name: "enabled",
                                label: "是否启用",
                                required: true,
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
                extra: {
                  bricks: [
                    {
                      brick: "basic-bricks.general-button",
                      events: {
                        "general.button.click": {
                          action: "console.log",
                        },
                      },
                      properties: {
                        buttonIcon: "plus",
                        buttonShape: "circle",
                        buttonType: "icon",
                      },
                    },
                  ],
                  type: "bricks",
                },
                footer: {
                  bricks: [
                    {
                      brick: "forms.general-buttons",
                      properties: {
                        showCancelButton: true,
                        submitText: "提交",
                        cancelText: "取消",
                        wrapperCol: {
                          span: 24,
                        },
                        style: {
                          padding: "0 20px 8px",
                        },
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
                  type: "bricks",
                },
              },
            },
          ],
          type: "bricks",
        },
      },
    },
  ],
};
