import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-list/collapsible-card-list.md";

export const story: Story = {
  storyId: "general-list.collapsible-card-list",
  type: "template",
  author: "lynette",
  text: {
    en: "collapsible card list",
    zh: "折叠卡片列表"
  },
  description: {
    en: "collapsible card list template",
    zh: "可配置折叠卡片的title、icon、操作区构件、内容区构件"
  },
  icon: {
    lib: "fa",
    icon: "list"
  },
  conf: [
    {
      template: "general-list.collapsible-card-list",
      params: {
        disableClickHeaderToClose: true,
        fields: {
          cardTitle: "title",
          cardDesc: "version"
        },
        icon: {
          lib: "antd",
          type: "gitlab"
        },
        contentStyle: {
          paddingBottom: "6px"
        },
        subscriptConfig: {
          field: "id",
          value: "1",
          hideOperate: true
        },
        dataSource: [
          {
            id: "1",
            title: "工具1",
            version: "0.0",
            creator: "easyops0",
            memo: "一个好用的工具"
          },
          {
            id: "2",
            title: "工具2",
            version: "0.1",
            creator: "easyops1",
            memo: "清理磁盘工具"
          },
          {
            id: "3",
            title: "工具3",
            version: "0.2",
            creator: "easyops2"
          },
          {
            id: "4",
            title: "工具4",
            version: "0.3",
            creator: "easyops3"
          },
          {
            id: "5",
            title: "工具5",
            version: "0.4",
            creator: "easyops4"
          }
        ],
        operateBricks: [
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id"
            },
            eventMethodMap: [
              {
                eventName: "general.button.click",
                method: "open"
              }
            ],
            properties: {
              buttonName: "编辑",
              buttonType: "primary"
            },
            events: {
              "general.button.click": [
                {
                  action: "console.log"
                }
              ]
            }
          },
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id"
            },
            properties: {
              buttonName: "删除",
              buttonType: "danger"
            },
            events: {
              "general.button.click": [
                {
                  action: "console.log"
                }
              ]
            }
          }
        ],
        contentBricks: [
          {
            brick: "forms.general-form",
            propertyFieldMap: {
              "values.creator": "creator",
              "values.version": "version"
            },
            events: {
              "validate.success": {
                action: "console.log",
                args: ["${EVENT.type}", "${EVENT.detail}"]
              },
              "validate.error": {
                action: "console.warn",
                args: ["${EVENT.type}", "${EVENT.detail}"]
              }
            },
            slots: {
              items: {
                type: "bricks",
                bricks: [
                  {
                    brick: "forms.general-input",
                    properties: {
                      name: "creator",
                      label: "创建者",
                      placeholder: "请输入创建者"
                    }
                  },
                  {
                    brick: "forms.general-input",
                    properties: {
                      name: "version",
                      label: "版本号",
                      placeholder: "请输入版本号"
                    }
                  },
                  {
                    brick: "forms.general-buttons",
                    eventMethodMap: [
                      {
                        eventName: "cancel.button.click",
                        method: "close"
                      }
                    ],
                    properties: {
                      showCancelButton: true,
                      submitText: "提交",
                      submitType: "primary",
                      cancelText: "取消",
                      cancelType: "default"
                    },
                    events: {
                      "submit.button.click": {
                        action: "console.log"
                      },
                      "cancel.button.click": {
                        action: "console.log"
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      template: "general-list.collapsible-card-list",
      params: {
        customHeaderBricks: [
          {
            brick: "div",
            properties: {
              textContent: "自定义头部内容"
            }
          }
        ],
        customHeader: true,
        disableClickHeaderToClose: true,
        fields: {
          cardTitle: "title"
        },
        icon: {
          lib: "antd",
          type: "gitlab"
        },
        contentStyle: {
          paddingBottom: "6px"
        },
        dataSource: [
          {
            id: "1",
            title: "工具1",
            version: "0.0",
            creator: "easyops0"
          },
          {
            id: "2",
            title: "工具2",
            version: "0.1",
            creator: "easyops1"
          }
        ],
        operateBricks: [
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id"
            },
            eventMethodMap: [
              {
                eventName: "general.button.click",
                method: "open"
              }
            ],
            properties: {
              buttonName: "编辑",
              buttonType: "primary"
            },
            events: {
              "general.button.click": [
                {
                  action: "console.log"
                }
              ]
            }
          },
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id"
            },
            properties: {
              buttonName: "删除",
              buttonType: "danger"
            },
            events: {
              "general.button.click": [
                {
                  action: "console.log"
                }
              ]
            }
          }
        ],
        contentBricks: [
          {
            brick: "presentational-bricks.brick-form",
            propertyFieldMap: {
              "fields[0].defaultValue": "creator",
              "fields[1].defaultValue": "version",
              "fields[2].defaultValue": "memo"
            },
            eventMethodMap: [
              {
                eventName: "brick.form.cancel",
                method: "close"
              }
            ],
            properties: {
              showCard: false,
              resetDataAfterCancel: true,
              layout: "horizontal",
              tailFormBtnLayout: {
                wrapperCol: { span: 10, offset: 5 }
              },
              labelCol: {
                span: 5
              },
              wrapperCol: {
                span: 10
              },
              fields: [
                {
                  field: "creator",
                  fieldPath: "[0].creator",
                  label: "创建者",
                  component: "Input",
                  isRequire: true,
                  rules: [
                    {
                      required: true,
                      message: "请输入创建者"
                    }
                  ]
                },
                {
                  field: "version",
                  fieldPath: "[0].version",
                  label: "版本号",
                  component: "Input",
                  isRequire: true,
                  rules: [
                    {
                      required: true,
                      message: "请输入版本号"
                    }
                  ]
                },
                {
                  field: "memo",
                  fieldPath: "[0].memo",
                  label: "备注",
                  component: "Input",
                  isRequire: true
                }
              ]
            },
            events: {
              "brick.form.submit": {
                action: "console.log"
              }
            }
          }
        ]
      }
    }
  ],
  doc: docMD
};
