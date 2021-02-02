import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-list/searchable-card-list.md";

export const story: Story = {
  storyId: "general-list.searchable-card-list",
  type: "template",
  author: "lynette",
  text: {
    en: "searchable-card-list",
    zh: "可搜索卡片列表"
  },
  description: {
    en: "searchable card list template",
    zh: "可配置搜索框、toolbar、卡片列表，后面还可能扩展分页器"
  },
  icon: {
    lib: "fa",
    icon: "list"
  },
  conf: [
    {
      template: "general-list.searchable-card-list",
      params: {
        toolbarBricks: [
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "新建"
            },
            events: {
              "general.button.click": {
                action: "console.log"
              }
            }
          },
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "删除",
              buttonProps: {
                type: "danger"
              }
            },
            events: {
              "general.button.click": {
                action: "console.log"
              }
            }
          }
        ],
        fields: {
          cardTitle: "title",
          descriptionList: "descriptionList"
        },
        icon: {
          lib: "easyops",
          category: "app",
          icon: "k8s"
        },
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            title: "k8s1",
            descriptionList: [
              "Deployment 工作模式",
              "1 个负载均衡器",
              "1 个负载均衡器"
            ]
          },
          {
            id: "2",
            title: "k8s2",
            descriptionList: ["Deployment 工作模式", "1 个负载均衡器"]
          },
          {
            id: "3",
            title: "k8s3",
            descriptionList: ["2 个负载均衡器"]
          },
          {
            id: "4",
            title: "k8s4",
            descriptionList: [
              "Deployment 工作模式",
              "1 个负载均衡器",
              "1 个负载均衡器"
            ]
          },
          {
            id: "5",
            title: "k8s5",
            descriptionList: ["1 个负载均衡器"]
          }
        ],
        operateBricks: [
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id"
            },
            properties: {
              buttonName: "构建",
              buttonType: "primary",
              buttonShape: "round",
              buttonSize: "small"
            },
            events: {
              "general.button.click": {
                action: "console.log"
              }
            }
          },
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id"
            },
            properties: {
              buttonName: "设置",
              buttonType: "link",
              buttonShape: "round",
              buttonSize: "small"
            },
            events: {
              "general.button.click": {
                action: "history.push",
                args: ["/${event.detail.id}/${event.detail.title}"]
              }
            }
          }
        ],
        namespace: "general-list-demo",
        property: "id",
        visitCountLimit: 5,
        label: "title",
        showRecent: true
      }
    },
    {
      template: "general-list.searchable-card-list",
      params: {
        afterSearchBricks: [
          {
            brick: "presentational-bricks.datetime-selector",
            properties: {
              from: "now/d"
            }
          }
        ],
        belowSearchBricks: [
          {
            brick: "presentational-bricks.brick-tag",
            properties: {
              componentType: "CheckableTag",
              tagList: [
                { key: "dev", label: "开发" },
                { key: "test", label: "测试" },
                { key: "prerelease", label: "预发布" },
                { key: "prod", label: "生产" }
              ],
              multipleCheck: false,
              configProps: {
                color: "#108ee9"
              },
              default: "dev",
              showCard: false,
              tagStyle: {
                marginBottom: 0
              }
            },
            events: {
              "checked.update": [
                {
                  action: "console.log"
                }
              ]
            }
          }
        ],
        toolbarBricks: [
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "新建"
            },
            events: {
              "general.button.click": {
                action: "console.log"
              }
            }
          },
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "删除",
              buttonProps: {
                type: "danger"
              }
            },
            events: {
              "general.button.click": {
                action: "console.log"
              }
            }
          }
        ],
        fields: {
          cardTitle: "title",
          descriptionList: "descriptionList"
        },
        icon: {
          lib: "easyops",
          category: "app",
          icon: "k8s"
        },
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            title: "k8s1",
            descriptionList: [
              "Deployment 工作模式",
              "1 个负载均衡器",
              "1 个负载均衡器"
            ]
          },
          {
            id: "2",
            title: "k8s2",
            descriptionList: ["Deployment 工作模式", "1 个负载均衡器"]
          },
          {
            id: "3",
            title: "k8s3",
            descriptionList: ["2 个负载均衡器"]
          },
          {
            id: "4",
            title: "k8s4",
            descriptionList: [
              "Deployment 工作模式",
              "1 个负载均衡器",
              "1 个负载均衡器"
            ]
          },
          {
            id: "5",
            title: "k8s5",
            descriptionList: ["1 个负载均衡器"]
          }
        ],
        operateBricks: [
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id"
            },
            properties: {
              buttonName: "构建",
              buttonType: "primary",
              buttonShape: "round",
              buttonSize: "small"
            },
            events: {
              "general.button.click": {
                action: "console.log"
              }
            }
          },
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id"
            },
            properties: {
              buttonName: "设置",
              buttonType: "link",
              buttonShape: "round",
              buttonSize: "small"
            },
            events: {
              "general.button.click": {
                action: "history.push",
                args: ["/${event.detail.id}/${event.detail.title}"]
              }
            }
          }
        ]
      }
    }
  ],
  doc: docMD
};
