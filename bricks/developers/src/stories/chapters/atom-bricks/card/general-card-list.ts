import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-list/general-card-list.md";

export const story: Story = {
  storyId: "general-list.general-card-list",
  type: "template",
  author: "lynette",
  text: {
    en: "general card list",
    zh: "通用卡片列表",
  },
  description: {
    en: "general card list template",
    zh: "可配置卡片的icon、title、描述信息、操作区的模板",
  },
  icon: {
    lib: "fa",
    icon: "list",
  },
  conf: [
    {
      template: "general-list.general-card-list",
      params: {
        showPagination: true,
        fields: {
          cardTitle: "title",
          descriptionList: "descriptionList",
          cardTitleTag: "status",
        },
        icon: {
          lib: "easyops",
          category: "app",
          icon: "k8s",
        },
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            title: "k8s1",
            status: "normal",
            descriptionList: [
              "Deployment 工作模式",
              "1 个负载均衡器",
              "1 个负载均衡器",
            ],
          },
          {
            id: "2",
            title: "k8s2",
            status: "normal",
            descriptionList: ["1 个负载均衡器"],
            default: true,
          },
          {
            id: "3",
            title: "k8s3",
            status: "normal",
            descriptionList: [
              "Deployment 工作模式",
              "1 个负载均衡器",
              "1 个负载均衡器",
            ],
          },
          {
            id: "4",
            title: "k8s4",
            status: "warning",
            descriptionList: ["1 个负载均衡器"],
          },
          {
            id: "5",
            title: "k8s5",
            status: "failed",
            descriptionList: ["1 个负载均衡器"],
          },
        ],
        cardTitleTagMapping: {
          normal: {
            text: "正常",
            color: "green-inverse",
          },
          warning: {
            text: "警告",
            color: "orange-inverse",
          },
          failed: {
            text: "异常",
            color: "red-inverse",
          },
        },
        operateBricks: [
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id",
            },
            properties: {
              buttonName: "构建",
              buttonType: "primary",
              buttonShape: "round",
              buttonSize: "small",
            },
            events: {
              "general.button.click": {
                action: "console.log",
              },
            },
          },
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id",
            },
            properties: {
              buttonName: "设置",
              buttonType: "link",
              buttonShape: "round",
              buttonSize: "small",
            },
            events: {
              "general.button.click": {
                action: "console.log",
              },
            },
          },
        ],
        topRightOperateBricks: [
          {
            brick: "basic-bricks.general-custom-buttons",
            propertyFieldMap: {
              dataSource: "",
            },
            properties: {
              isMoreButton: true,
              moreButtonShape: "no",
              customButtons: [
                {
                  isDropdown: true,
                  text: "设为默认",
                  icon: "setting",
                  eventName: "instance.set.default",
                },
                {
                  isDropdown: true,
                  text: "删除",
                  icon: "delete",
                  color: "#E02020",
                  eventName: "instance.delete",
                },
              ],
            },
            events: {
              "instance.set.default": {
                action: "console.log",
              },
              "instance.delete": {
                action: "console.log",
              },
            },
          },
        ],
        tagConfig: {
          field: "default",
          value: true,
          text: "默认",
          hideOperate: true,
          triangle: false,
        },
      },
    },
    {
      template: "general-list.general-card-list",
      params: {
        cardLayoutType: "icon-small-align-left",
        descMaxLine: 2,
        fields: {
          cardTitle: "title",
          descriptionList: "desc",
          cardSubtitle: "subtitle",
          iconColor: "iconColor",
        },
        icon: {
          lib: "fa",
          icon: "chart-pie",
        },
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            title: "消息订阅",
            subtitle: "自动发现实例关系",
            desc:
              "chrome-extension://chphl pgkk boli fa imnlloiipkdnihall/onetab.html",
            iconColor: "geekblue",
          },
          {
            id: "2",
            title: "消息订阅",
            subtitle: "自动发现实例关系",
            desc:
              "chrome-extension://chphl pgkk boli fa imnlloiipkdnihall/onetab.html",
            iconColor: "green",
          },
          {
            id: "3",
            title: "消息订阅",
            subtitle: "自动发现实例关系",
            desc:
              "chrome-extension://chphl pgkk boli fa imnlloiipkdnihall/onetab.html",
            iconColor: "cyan",
          },
        ],
      },
    },
    {
      template: "general-list.general-card-list",
      params: {
        descMaxLine: 2,
        cardLayoutType: "icon-align-right",
        fields: {
          cardTitle: "name",
          descriptionList: "desc",
          iconColor: "iconColor",
          icon: "icon",
        },
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            name: "标题1",
            desc:
              "这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述信息啦啦啦",
            iconColor: "red",
            icon: {
              lib: "fa",
              icon: "exclamation-circle",
            },
          },
          {
            id: "2",
            name: "标题2",
            desc: "这是一段短短的描述信息啦啦啦",
            iconColor: "green",
            icon: {
              lib: "fa",
              icon: "check-circle",
            },
          },
          {
            id: "3",
            name: "标题3",
            desc:
              "这是一段很长很长很长很长很长很长很长很长很长很长很长很长的描述信息啦啦啦",
            iconColor: "cyan",
            icon: {
              lib: "fa",
              icon: "pause-circle",
            },
          },
        ],
      },
    },
    {
      template: "general-list.general-card-list",
      params: {
        cardLayoutType: "icon-align-left",
        icon: {
          lib: "fa",
          icon: "chart-pie",
        },
        cardTitleTagMapping: {
          true: {
            text: "已发布",
            color: "green",
          },
          waiting: {
            text: "待发布",
            color: "blue",
          },
        },
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            cardTitle: "开发环境配置",
            cardSubtitle: "有 3 条修改",
            iconColor: "blue",
            cardTitleTag: "waiting",
          },
          {
            id: "2",
            cardTitle: "测试环境配置",
            cardSubtitle: "有 3 条修改",
            iconColor: "green",
            cardTitleTag: "true",
          },
          {
            id: "3",
            cardTitle: "预发布环境配置",
            cardSubtitle: "有 2 条修改",
            iconColor: "cyan",
          },
          {
            id: "4",
            cardTitle: "生产环境配置",
            cardSubtitle: "有 2 条修改",
            iconColor: "orange",
          },
        ],
      },
    },
    {
      template: "general-list.general-card-list",
      description: {
        title: "卡片布局为 `icon-align-middle` 类型，icon 居中。",
        message:
          "可以配置 `operate`,`topRightOperate` 等操作区的插槽。适用场景：不需要用户凭借右下角图标来区分不同类型卡片，图标常作为装饰来丰富卡片样式存在。",
      },
      params: {
        cardLayoutType: "icon-align-middle",
        urlTemplate: "/#{id}",
        descMaxLine: 2,

        operateBricks: [
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id",
            },
            properties: {
              buttonName: "编辑",
              buttonIcon: "edit",
              buttonSize: "small",
            },
            events: {
              "general.button.click": {
                action: "console.log",
              },
            },
          },
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id",
            },
            properties: {
              buttonName: "了解详情",
              buttonType: "text",
              buttonSize: "small",
              fadedText: true,
            },
            events: {
              "general.button.click": {
                action: "console.log",
              },
            },
          },
        ],
        topRightOperateBricks: [
          {
            brick: "basic-bricks.general-custom-buttons",
            propertyFieldMap: {
              dataSource: "",
            },
            properties: {
              isMoreButton: true,
              moreButtonShape: "no",
              moreBtnIcon: {
                lib: "antd",
                icon: "more",
                theme: "outlined",
              },
              customButtons: [
                {
                  isDropdown: true,
                  text: "设为默认",
                  icon: "setting",
                  eventName: "instance.set.default",
                },
                {
                  isDropdown: true,
                  text: "删除",
                  icon: "delete",
                  color: "#E02020",
                  eventName: "instance.delete",
                },
              ],
            },
            events: {
              "instance.set.default": {
                action: "console.log",
              },
              "instance.delete": {
                action: "console.log",
              },
            },
          },
        ],
        dataSource: [
          {
            id: "1",
            cardTitle: "消息订阅",
            icon: {
              lib: "fa",
              icon: "chart-pie",
              color: "blue",
            },
            descriptionList:
              "http://chphl pgkk boli faa iihall/15 55 5onetab.html",
          },
          {
            id: "2",
            cardTitle: "指定链接01",
            icon: {
              lib: "fa",
              icon: "chart-pie",
              color: "green",
            },
            descriptionList:
              "http://chphl pgkk boli faa iihall/15 55 5onetab.html",
          },
          {
            id: "3",
            cardTitle: "自定义项目",
            descriptionList:
              "http://chphl pgkk boli faa iihall/15 55 5onetab.html",
            icon: {
              lib: "fa",
              icon: "chart-pie",
              color: "cyan",
            },
          },
          {
            id: "4",
            cardTitle: "指定链接02",
            icon: {
              lib: "fa",
              icon: "chart-pie",
              color: "green",
            },
            descriptionList:
              "http://chphl pgkk boli faa iihall/15 55 5onetab.html",
          },
        ],
      },
    },
    {
      template: "general-list.general-card-list",
      params: {
        cardWidth: "400px",
        cardLayoutType: "icon-align-left",
        fields: {
          cardTitle: "name",
          descriptionList: "desc",
          cardSubtitle: "subtitle",
          iconColor: "iconColor",
          icon: "icon",
        },
        hideDescCircle: true,
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            name: "Test 采集",
            desc: [
              "采集插件：GAG 服务配置信息采集",
              "执行目标：GAG 服务",
              "采集频率：10分钟（00:00 到 23:59 时段执行）",
            ],
            iconColor: "red",
            icon: {
              lib: "fa",
              icon: "exclamation-circle",
            },
          },
          {
            id: "2",
            name: "Test 采集",
            desc: ["采集插件：GAG 服务配置信息采集", "执行目标：GAG 服务"],
            iconColor: "green",
            icon: {
              lib: "fa",
              icon: "check-circle",
            },
          },
          {
            id: "3",
            name: "Test 采集",
            desc: [
              "采集插件：GAG 服务配置信息采集",
              "执行目标：GAG 服务",
              "采集频率：10分钟（00:00 到 23:59 时段执行）",
            ],
            iconColor: "cyan",
            icon: {
              lib: "fa",
              icon: "pause-circle",
            },
          },
        ],
      },
    },
    {
      description: {
        title: "卡片无描述",
        message: "alwaysShowDescription搭配descriptionDataType使用使卡片等高",
      },
      template: "general-list.general-card-list",
      params: {
        cardWidth: "400px",
        cardLayoutType: "icon-align-left",
        alwaysShowDescription: true,
        descriptionDataType: "list",
        fields: {
          cardTitle: "name",
          descriptionList: "desc",
          cardSubtitle: "subtitle",
          iconColor: "iconColor",
          icon: "icon",
        },
        hideDescCircle: true,
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            name: "Test 采集",
            iconColor: "red",
            icon: {
              lib: "fa",
              icon: "exclamation-circle",
            },
          },
          {
            id: "2",
            name: "Test 采集",
            desc: ["采集插件：GAG 服务配置信息采集", "执行目标：GAG 服务"],
            iconColor: "green",
            icon: {
              lib: "fa",
              icon: "check-circle",
            },
          },
        ],
      },
    },
    {
      description: {
        title: "根据字段禁用卡片",
        message: "可以配置 `fields.disabled` 字段，设置禁用卡片的字段来源。",
      },
      template: "general-list.general-card-list",
      params: {
        showPagination: false,
        fields: {
          disabled: "cardDisabled",
          cardTitle: "title",
          descriptionList: "descriptionList",
        },
        icon: {
          lib: "easyops",
          category: "app",
          icon: "k8s",
        },
        urlTemplate: "/#{id}",
        dataSource: [
          {
            id: "1",
            title: "k8s1",
            descriptionList: [
              "Deployment 工作模式",
              "1 个负载均衡器",
              "1 个负载均衡器",
            ],
            cardDisabled: true,
          },
          {
            id: "2",
            title: "k8s2",
            descriptionList: ["1 个负载均衡器"],
            default: true,
          },
        ],
        operateBricks: [
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id",
              disabled: "cardDisabled",
            },
            properties: {
              buttonName: "构建",
              buttonType: "primary",
              buttonShape: "round",
              buttonSize: "small",
            },
            events: {
              "general.button.click": {
                action: "console.log",
              },
            },
          },
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id",
              disabled: "cardDisabled",
            },
            properties: {
              buttonName: "设置",
              buttonType: "link",
              buttonShape: "round",
              buttonSize: "small",
            },
            events: {
              "general.button.click": {
                action: "console.log",
              },
            },
          },
        ],
        topRightOperateBricks: [
          {
            brick: "basic-bricks.general-custom-buttons",
            propertyFieldMap: {
              dataSource: "",
            },
            properties: {
              isMoreButton: true,
              moreButtonShape: "no",
              customButtons: [
                {
                  isDropdown: true,
                  text: "删除",
                  icon: "delete",
                  color: "#E02020",
                  eventName: "instance.delete",
                },
              ],
            },
            events: {
              "instance.set.default": {
                action: "console.log",
              },
              "instance.delete": {
                action: "console.log",
              },
            },
          },
        ],
      },
    },
    {
      description: {
        title: "可配置角标和图片图标",
        message:
          "角标可选颜色 `tagConfig.color` 以及文字 `tagConfig.text` 等信息。图片图标需要配置 `showImg` 和对应的图片资源地址 `imgSrc`",
      },
      template: "general-list.general-card-list",
      params: {
        cardLayoutType: "icon-align-middle",
        showPagination: false,
        fields: {
          cardTitle: "title",
          descriptionList: "descriptionList",
        },
        urlTemplate: "/#{id}",
        showImg: true,
        dataSource: [
          {
            id: "1",
            title: "Ansible-PlayBook",
            descriptionList: ["应用/北方公司"],
            imgSrc:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            tagConfig: {
              text: "已审批",
              color: "green",
              triangle: false,
            },
          },
          {
            id: "2",
            title: "Ansible-PlayBook",
            descriptionList: ["应用/南方公司"],
            imgSrc:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            tagConfig: {
              text: "待审批",
              color: "orange",
              triangle: false,
            },
          },
        ],
        operateBricks: [
          {
            brick: "basic-bricks.general-button",
            propertyFieldMap: {
              detail: "id",
              disabled: "cardDisabled",
            },
            properties: {
              buttonName: "执行",
              buttonType: "primary",
              buttonShape: "round",
              buttonSize: "small",
            },
            events: {
              "general.button.click": {
                action: "console.log",
              },
            },
          },
        ],
      },
    },
  ],
  doc: docMD,
};
