import { Story } from "@next-core/brick-types";
import {
  cardItemNormalSvg,
  cardItemSvg,
  cardItemWithRightTagSvg,
  cardBlueSvg,
  cardOperate1Svg,
  cardOperate2Svg,
} from "../images";
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
    imgSrc: cardItemSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.card-item[normal]",
      title: {
        zh: "通用卡片项",
        en: "",
      },
      message: {
        zh: "可以配置 `operate`,`topRightOperate`,`bottomRightOperate` 等操作区的插槽。适用场景：用户可凭借图标颜色来区分不同卡片，图标具有分类意义（区分类型／状态）而存在。",
        en: "",
      },
      thumbnail: cardItemNormalSvg,
      bricks: [
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
              width: "308px",
            },
            cardLayoutType: "icon-small-align-left",
            urlTemplate: "/#{id}",
            fields: {
              cardTitle: "name",
              cardSubtitle: "cardSubtitle",
              descriptionList: "descriptionList",
              topInformation: "topInformation",
            },
            imgSrc: cardBlueSvg,
            showImg: true,
            shape: "square",
            dataSource: {
              id: "1",
              name: "资源监控微应用",
              cardSubtitle: "资源监控微应用相关前后台",
              topInformation: "初级应用",
            },
          },
          slots: {
            operate: {
              type: "bricks",
              bricks: [
                {
                  brick: "presentational-bricks.brick-tag",
                  properties: {
                    closable: false,
                    tagStyle: {
                      borderRadius: "3px",
                    },
                    showCard: false,
                    tagList: [
                      { key: "1", label: "IT资源管理" },
                      { key: "2", label: "资源套餐" },
                      { key: "3", label: "存储设备" },
                    ],
                  },
                },
              ],
            },
            extraOperate: {
              type: "bricks",
              bricks: [
                {
                  brick: "presentational-bricks.general-tooltip",
                  properties: {
                    content: "实例",
                    style: {
                      marginRight: "8px",
                    },
                    displayBrick: {
                      useBrick: {
                        brick: "presentational-bricks.basic-icon",
                        properties: {
                          size: "20px",
                          icon: {
                            lib: "easyops",
                            category: "default",
                            icon: "card-diff",
                            color: "rgba(157, 168, 184, 1)",
                          },
                        },
                      },
                    },
                  },
                },
                {
                  brick: "presentational-bricks.general-tooltip",
                  properties: {
                    content: "实例",
                    displayBrick: {
                      useBrick: {
                        brick: "presentational-bricks.basic-icon",
                        properties: {
                          size: "20px",
                          icon: {
                            lib: "easyops",
                            category: "default",
                            icon: "card-task-delivery",
                            color: "rgba(157, 168, 184, 1)",
                          },
                        },
                      },
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
                    isMoreButton: true,
                    moreButtonShape: "no",
                    style: {
                      marginTop: "-2px",
                      marginRight: "-14px",
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
            },
          },
        },
      ],
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
          width: "308px",
        },
        cardLayoutType: "icon-small-align-left",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          cardSubtitle: "cardSubtitle",
          descriptionList: "descriptionList",
          topInformation: "topInformation",
        },
        imgSrc: cardBlueSvg,
        showImg: true,
        shape: "square",
        dataSource: {
          id: "1",
          name: "资源监控微应用",
          cardSubtitle: "资源监控微应用相关前后台",
          topInformation: "初级应用",
        },
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.brick-tag",
              properties: {
                closable: false,
                tagStyle: {
                  borderRadius: "3px",
                },
                showCard: false,
                tagList: [
                  { key: "1", label: "IT资源管理" },
                  { key: "2", label: "资源套餐" },
                  { key: "3", label: "存储设备" },
                ],
              },
            },
          ],
        },
        extraOperate: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.general-tooltip",
              properties: {
                content: "实例",
                style: {
                  marginRight: "8px",
                },
                displayBrick: {
                  useBrick: {
                    brick: "presentational-bricks.basic-icon",
                    properties: {
                      size: "20px",
                      icon: {
                        lib: "easyops",
                        category: "default",
                        icon: "card-diff",
                        color: "rgba(157, 168, 184, 1)",
                      },
                    },
                  },
                },
              },
            },
            {
              brick: "presentational-bricks.general-tooltip",
              properties: {
                content: "实例",
                displayBrick: {
                  useBrick: {
                    brick: "presentational-bricks.basic-icon",
                    properties: {
                      size: "20px",
                      icon: {
                        lib: "easyops",
                        category: "default",
                        icon: "card-task-delivery",
                        color: "rgba(157, 168, 184, 1)",
                      },
                    },
                  },
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
                isMoreButton: true,
                style: {
                  marginTop: "-2px",
                  marginRight: "-14px",
                },
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
        title: "单个扩展区样式展示",
        message:
          "· 扩展区展示标签信息，这里标签用于承载分类/状态之类信息。不要超过2行展示，需特殊强调的场景，可使用彩色标签",
      },
      properties: {
        disabled: true,
        style: {
          width: "308px",
        },
        cardLayoutType: "icon-small-align-left",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          cardSubtitle: "cardSubtitle",
          descriptionList: "descriptionList",
        },
        imgSrc: cardBlueSvg,
        showImg: true,
        shape: "square",
        dataSource: {
          id: "1",
          name: "资源监控微应用",
          cardSubtitle: "资源监控微应用相关前后台",
        },
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.brick-tag",
              properties: {
                closable: false,
                tagStyle: {
                  borderRadius: "3px",
                },
                showCard: false,
                tagList: [
                  { key: "1", label: "IT资源管理" },
                  { key: "2", label: "资源套餐" },
                  { key: "3", label: "存储设备" },
                ],
              },
            },
          ],
        },
      },
    },
    {
      brick: "presentational-bricks.card-item",
      description: {
        title: "单个扩展区样式展示",
        message:
          "展示统计数，如收藏/关注次数，下载次数。统计类信息置于扩展区左侧，其他附加信息如关注人头像等置于右侧",
      },
      properties: {
        disabled: true,
        style: {
          width: "308px",
        },
        cardLayoutType: "icon-small-align-left",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          cardSubtitle: "cardSubtitle",
          descriptionList: "descriptionList",
        },
        imgSrc: cardBlueSvg,
        showImg: true,
        shape: "square",
        dataSource: {
          id: "1",
          name: "资源监控微应用",
          cardSubtitle: "资源监控微应用相关前后台",
        },
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.basic-icon",
              properties: {
                size: "20px",
                icon: {
                  imgSrc: cardOperate2Svg,
                },
              },
            },
            {
              brick: "span",
              properties: {
                textContent: "7",
                style: {
                  paddingTop: "2px",
                  marginRight: "8px",
                },
              },
            },
            {
              brick: "presentational-bricks.basic-icon",
              properties: {
                size: "20px",
                icon: {
                  imgSrc: cardOperate1Svg,
                },
              },
            },
            {
              brick: "span",
              properties: {
                textContent: "516",
                style: {
                  paddingTop: "2px",
                },
              },
            },
          ],
        },
        bottomRightOperate: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.brick-user",
              properties: {
                size: "small",
                hideUsername: true,
                userNameOrId: "name",
                iconUrl:
                  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              },
            },
          ],
        },
      },
    },
    {
      brick: "presentational-bricks.card-item",
      description: {
        title: "单个扩展区样式展示",
        message: "辅助信息跟操作同时存在时，操作置于右",
      },
      properties: {
        disabled: true,
        style: {
          width: "308px",
        },
        cardLayoutType: "icon-small-align-left",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          cardSubtitle: "cardSubtitle",
          descriptionList: "descriptionList",
        },
        imgSrc: cardBlueSvg,
        showImg: true,
        shape: "square",
        dataSource: {
          id: "1",
          name: "资源监控微应用",
          cardSubtitle: "资源监控微应用相关前后台",
        },
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.brick-user",
              properties: {
                size: "small",
                userNameOrId: "张元",
                iconUrl:
                  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              },
            },
            {
              brick: "span",
              properties: {
                textContent: "更新于2小时前",
              },
            },
          ],
        },
        bottomRightOperate: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-switch",
            },
          ],
        },
      },
    },
    {
      brick: "presentational-bricks.card-item",
      description: {
        title: "单个扩展区样式展示",
        message:
          "扩展区收纳操作场景，操作应是针对卡片详情内容的快捷功能性操作，对于卡片的操作我们是放置在卡片右上角 … 收纳。",
      },
      properties: {
        disabled: true,
        style: {
          width: "308px",
        },
        cardLayoutType: "icon-small-align-left",
        urlTemplate: "/#{id}",
        fields: {
          cardTitle: "name",
          cardSubtitle: "cardSubtitle",
          descriptionList: "descriptionList",
        },
        imgSrc: cardBlueSvg,
        showImg: true,
        shape: "square",
        dataSource: {
          id: "1",
          name: "资源监控微应用",
          cardSubtitle: "资源监控微应用相关前后台",
        },
      },
      slots: {
        operate: {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.general-tooltip",
              properties: {
                content: "实例",
                style: {
                  marginRight: "8px",
                },
                displayBrick: {
                  useBrick: {
                    brick: "presentational-bricks.basic-icon",
                    properties: {
                      size: "20px",
                      icon: {
                        lib: "easyops",
                        category: "default",
                        icon: "card-diff",
                        color: "rgba(157, 168, 184, 1)",
                      },
                    },
                  },
                },
              },
            },
            {
              brick: "presentational-bricks.general-tooltip",
              properties: {
                content: "实例",
                displayBrick: {
                  useBrick: {
                    brick: "presentational-bricks.basic-icon",
                    properties: {
                      size: "20px",
                      icon: {
                        lib: "easyops",
                        category: "default",
                        icon: "card-task-delivery",
                        color: "rgba(157, 168, 184, 1)",
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      snippetId: "presentational-bricks.card-item[with-right-tag]",
      title: {
        zh: "可配置角标和图片图标",
        en: "",
      },
      message: {
        zh: "角标可选颜色 `tagConfig.color` 以及文字 `tagConfig.text` 等信息。图片图标需要配置 `showImg` 和对应的图片资源地址 `imgSrc`",
        en: "",
      },
      thumbnail: cardItemWithRightTagSvg,
      bricks: [
        {
          brick: "presentational-bricks.card-item",
          properties: {
            style: {
              width: "308px",
            },
            iconColor: "geekblue",
            cardLayoutType: "icon-small-align-left",
            urlTemplate: "/#{id}",
            fields: {
              cardTitle: "name",
              cardSubtitle: "cardSubtitle",
              descriptionList: "descriptionList",
              topInformation: "topInformation",
            },
            icon: {
              lib: "fa",
              icon: "chart-pie",
            },
            showImg: true,
            imgSrc:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            dataSource: {
              id: "1",
              name: "资源监控微应用",
              cardSubtitle: "资源监控微应用相关前后台",
              topInformation: "初级应用",
            },
          },
          slots: {
            operate: {
              type: "bricks",
              bricks: [
                {
                  brick: "presentational-bricks.brick-tag",
                  properties: {
                    closable: false,
                    tagStyle: {
                      borderRadius: "3px",
                    },
                    showCard: false,
                    tagList: [
                      { key: "1", label: "IT资源管理" },
                      { key: "2", label: "资源套餐" },
                      { key: "3", label: "存储设备" },
                    ],
                  },
                },
              ],
            },
            extraOperate: {
              type: "bricks",
              bricks: [
                {
                  brick: "presentational-bricks.general-tooltip",
                  properties: {
                    content: "实例",
                    style: {
                      marginRight: "8px",
                    },
                    displayBrick: {
                      useBrick: {
                        brick: "presentational-bricks.basic-icon",
                        properties: {
                          size: "20px",
                          icon: {
                            lib: "easyops",
                            category: "default",
                            icon: "card-diff",
                            color: "rgba(157, 168, 184, 1)",
                          },
                        },
                      },
                    },
                  },
                },
                {
                  brick: "presentational-bricks.general-tooltip",
                  properties: {
                    content: "实例",
                    displayBrick: {
                      useBrick: {
                        brick: "presentational-bricks.basic-icon",
                        properties: {
                          size: "20px",
                          icon: {
                            lib: "easyops",
                            category: "default",
                            icon: "card-task-delivery",
                            color: "rgba(157, 168, 184, 1)",
                          },
                        },
                      },
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
                    isMoreButton: true,
                    moreButtonShape: "no",
                    style: {
                      marginTop: "-2px",
                      marginRight: "-14px",
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
            },
          },
        },
      ],
    },
  ],
};
