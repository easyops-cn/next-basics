import { Story } from "@next-core/brick-types";

export const CardItemStory: Story = {
  storyId: "presentational-bricks.card-item",
  category: "card-info",
  type: "brick",
  author: "lynette",
  text: {
    en: "Information Display Card",
    zh: "信息展示卡片",
  },
  description: {
    en: "General card item",
    zh: "通用卡片项",
  },
  icon: {
    lib: "fa",
    icon: "clock",
  },
  conf: [
    {
      brick: "presentational-bricks.card-item",
      description: {
        title:
          "卡片布局为 `icon-small-align-left` 类型，小尺寸 icon 位于左边。",
        message:
          "可以配置 `operate`,`topRightOperate`,`bottomRightOperate` 等操作区的插槽。适用场景：用户可凭借图标颜色来区分不同卡片，图标具有分类意义（区分类型／状态）而存在。",
      },
      properties: {
        style: {
          width: "300px",
        },
        iconColor: "geekblue",
        cardLayoutType: "icon-small-align-left",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          cardSubtitle: "cardSubtitle",
          descriptionList: "descriptionList",
        },
        icon: {
          lib: "fa",
          icon: "chart-pie",
        },
        dataSource: {
          id: "1",
          name: "标题在这里",
          cardSubtitle: "副标题文字",
          descriptionList:
            "这里是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的辅助说明文字。",
        },
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "主按钮",
                buttonShape: "round",
                buttonType: "primary",
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
              properties: {
                buttonName: "次按钮",
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
        },
        bottomRightOperate: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-custom-buttons",
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
        },
      },
    },
    {
      brick: "presentational-bricks.card-item",
      description: {
        title: "卡片布局为 `icon-align-right` 类型，icon 位于右边。",
        message: "可以配置 `operate`,`bottomRightOperate` 等操作区的插槽。",
      },
      properties: {
        style: {
          width: "300px",
        },
        cardLayoutType: "icon-align-right",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          descriptionList: "descriptionList",
        },
        icon: {
          lib: "easyops",
          category: "app",
          icon: "k8s",
        },
        dataSource: {
          id: "1",
          name: "k8s",
          descriptionList:
            "这里是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的辅助说明文字。",
        },
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "主按钮",
                buttonShape: "round",
                buttonType: "primary",
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
              properties: {
                buttonName: "次按钮",
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
        },
        bottomRightOperate: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-custom-buttons",
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
        },
      },
    },
    {
      brick: "presentational-bricks.card-item",
      description: {
        title: "卡片布局为 `icon-align-left` 类型，icon 位于左边。",
        message:
          "可以配置 `operate`,`topRightOperate`,`bottomRightOperate` 等操作区的插槽。适用场景：用户可凭借图标颜色和形状来区分不同卡片，图标具有分类意义（区分类型／状态）而存在。",
      },
      properties: {
        cardLayoutType: "icon-align-left",
        iconColor: "cyan",
        hideDescCircle: true,
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          descriptionList: "descriptionList",
        },
        icon: {
          lib: "fa",
          icon: "check-circle",
        },
        dataSource: {
          id: "1",
          name: "Test 采集",
          descriptionList: [
            "采集插件：GAG 服务配置信息采集",
            "执行目标：GAG 服务",
            "采集频率：10分钟（00:00 到 23:59 时段执行）",
          ],
        },
      },
    },
    {
      brick: "presentational-bricks.card-item",
      description: {
        title: "禁用卡片",
        message:
          "禁用的卡片不可点击跳转。操作区配置了 slot 的卡片，请按需配置子构件的属性，例如将按钮设置成 disabled 等。",
      },
      properties: {
        disabled: true,
        style: {
          width: "300px",
        },
        iconColor: "geekblue",
        cardLayoutType: "icon-small-align-left",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          cardSubtitle: "cardSubtitle",
          descriptionList: "descriptionList",
        },
        icon: {
          lib: "fa",
          icon: "chart-pie",
        },
        dataSource: {
          id: "1",
          name: "标题在这里",
          cardSubtitle: "副标题文字",
          descriptionList:
            "这里是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的辅助说明文字。",
        },
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                disabled: true,
                buttonName: "主按钮",
                buttonShape: "round",
                buttonType: "primary",
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
              properties: {
                disabled: true,
                buttonName: "次按钮",
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
        },
        bottomRightOperate: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-custom-buttons",
              properties: {
                isMoreButton: true,
                moreButtonShape: "no",
                customButtons: [
                  {
                    isDropdown: true,
                    text: "设为默认",
                    icon: "setting",
                    disabled: true,
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
        },
      },
    },
    {
      brick: "presentational-bricks.card-item",
      description: {
        title: "卡片布局为 `icon-align-middle` 类型，icon 居中。",
        message:
          "可以配置 `operate`,`topRightOperate` 等操作区的插槽。适用场景：不需要用户凭借右下角图标来区分不同类型卡片，图标常作为装饰来丰富卡片样式存在。",
      },
      properties: {
        style: {
          width: "300px",
        },
        iconColor: "geekblue",
        reverseBgColor: true,
        cardLayoutType: "icon-align-middle",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          descriptionList: "descriptionList",
        },
        icon: {
          lib: "fa",
          icon: "chart-pie",
        },
        dataSource: {
          id: "1",
          name: "标题在这里",
          descriptionList:
            "http://chphl pgkk boli faa iihall/15 55 5onetab.html",
        },
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
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
        },
        topRightOperate: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-custom-buttons",
              properties: {
                moreBtnIcon: {
                  lib: "antd",
                  icon: "more",
                  theme: "outlined",
                },
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
        },
      },
    },
    {
      brick: "presentational-bricks.card-item",
      description: {
        title: "可配置角标和图片图标",
        message:
          "角标可选颜色 `tagConfig.color` 以及文字 `tagConfig.text` 等信息。图片图标需要配置 `showImg` 和对应的图片资源地址 `imgSrc`",
      },
      properties: {
        style: {
          width: "300px",
        },
        cardLayoutType: "block-icon-align-left",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          descriptionList: "descriptionList",
        },
        dataSource: {
          id: "1",
          name: "标题在这里",
          descriptionList:
            "http://chphl pgkk boli faa iihall/15 55 5onetab.html",
        },
        tagConfig: {
          text: "已审批",
          color: "blue",
          triangle: false,
        },
        showImg: true,
        imgSrc:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
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
        },
      },
    },
  ],
};
