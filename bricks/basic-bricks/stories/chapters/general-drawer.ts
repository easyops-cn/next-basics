import { Story } from "@next-core/brick-types";
import { generalDrawerSvg } from "../images";
import { generalDrawerBasicSvg } from "../images";
export const generalDrawerStory: Story = {
  storyId: "basic-bricks.general-drawer",
  category: "container-display",
  type: "brick",
  author: "ice",
  text: {
    en: "General Drawer",
    zh: "Drawer抽屉",
  },
  description: {
    en: "provide slot to hold other custom elements",
    zh: "提供插槽以展示其他构件",
  },
  icon: {
    imgSrc: generalDrawerSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.general-drawer",
          properties: {
            customTitle: "预览",
            id: "title-demo2",
            maskClosable: true,
            width: 750,
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "presentational-bricks.brick-descriptions",
                  properties: {
                    column: 2,
                    descriptionTitle: "基本信息",
                    itemList: [
                      {
                        label: "名称",
                        text: "easyops",
                      },
                      {
                        label: "环境类型",
                        text: "无",
                      },
                      {
                        label: "授权模式",
                        text: "clientCert",
                      },
                      {
                        label: "服务供应商",
                      },
                    ],
                    showCard: false,
                  },
                },
                {
                  brick: "presentational-bricks.brick-descriptions",
                  properties: {
                    column: 2,
                    descriptionTitle: "集群规格",
                    itemList: [
                      {
                        label: "集群来源",
                        text: "导入",
                      },
                      {
                        label: "Manter节点数量",
                        text: "3个",
                      },
                      {
                        label: "可分配CPU",
                        text: "12 Cores",
                      },
                      {
                        label: "可分配内存",
                        text: "44.8GIB",
                      },
                    ],
                    showCard: false,
                    style: {
                      marginTop: "20px",
                    },
                  },
                },
              ],
              type: "bricks",
            },
            headerRight: {
              bricks: [
                {
                  brick: "basic-bricks.general-custom-buttons",
                  properties: {
                    customButtons: [
                      {
                        buttonType: "link",
                        icon: {
                          color: "#167be0",
                          icon: "share-alt",
                          lib: "fa",
                          prefix: "fas",
                        },
                        isDropdown: false,
                        tooltip: "分享",
                        tooltipPlacement: "bottom",
                      },
                    ],
                  },
                },
              ],
              type: "bricks",
            },
          },
        },
      ],
      snippetId: "basic-bricks.general-drawer[basic]",
      title: {
        en: "Basic General Drawer",
        zh: "基础抽屉",
      },
      thumbnail: {
        imgSrc: generalDrawerBasicSvg,
      },
      actions: [
        {
          text: "open()",
          method: "open",
        },
      ],
    },
    {
      description: {
        title: "承载表单等操作场景",
        message:
          "设置需要点击关闭按钮收回抽屉，全局完成类操作置于抽屉底部，使用文字按钮，放于左下角，放置三个，其中一个为主按钮，放于所有按钮的最左侧；≥3 的情况下，展示两个常用按钮，其他按钮用更多收起。",
      },
      brick: "div",
      slots: {
        "": {
          bricks: [
            {
              brick: "presentational-bricks.card-item",
              properties: {
                cardLayoutType: "icon-small-align-left",
                cardSubtitle: "副标题文字",
                descriptionList: "点击进行更改",
                cardTitle: "test",
                icon: {
                  icon: "chart-pie",
                  lib: "fa",
                },
                iconColor: "geekblue",
                style: {
                  width: "300px",
                },
              },
              events: {
                "presentational-bricks.card-item.click": {
                  method: "open",
                  target: "#title-demo1",
                },
              },
            },
            {
              brick: "basic-bricks.general-drawer",
              properties: {
                id: "title-demo1",
                customTitle: "添加信息",
                closable: true,
                maskClosable: false,
                hasFooter: true,
                width: 600,
              },
              slots: {
                content: {
                  bricks: [
                    {
                      brick: "forms.general-form",
                      slots: {
                        items: {
                          bricks: [
                            {
                              brick: "forms.general-input",
                              properties: {
                                label: "标题",
                                name: "title",
                                placeholder: "请输入标题",
                                required: true,
                              },
                            },
                            {
                              brick: "forms.general-input",
                              properties: {
                                label: "副标题",
                                name: "subTitle",
                                placeholder: "请输入副标题",
                                required: true,
                              },
                            },
                            {
                              brick: "forms.general-select",
                              properties: {
                                label: "更多",
                                name: "more",
                                options: ["jack", "lucy"],
                                placeholder: "请进行选择",
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
                footer: {
                  bricks: [
                    {
                      brick: "basic-bricks.general-custom-buttons",
                      properties: {
                        style: {
                          marginRight: "var(--page-card-gap)",
                          marginLeft: "15px",
                        },
                        alignment: "start",
                        customButtons: [
                          {
                            buttonType: "primary",
                            text: "保存",
                            eventName: "drawer.close",
                          },
                          {
                            text: "取消",
                            buttonType: "text",
                            eventName: "drawer.close",
                          },
                        ],
                      },
                      events: {
                        "drawer.close": {
                          target: "#title-demo1",
                          method: "close",
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
    {
      description: {
        title: "承载详细信息",
        message: "点击抽屉外区域收回抽屉，抽屉右上角，使用按钮纯图标按钮",
      },
      brick: "div",
      slots: {
        "": {
          bricks: [
            {
              brick: "presentational-bricks.card-item",
              properties: {
                cardLayoutType: "icon-small-align-left",
                cardSubtitle: "副标题文字",
                descriptionList: "点击查看详细信息",
                cardTitle: "test",
                icon: {
                  icon: "chart-pie",
                  lib: "fa",
                },
                iconColor: "geekblue",
                style: {
                  width: "300px",
                },
              },
              events: {
                "presentational-bricks.card-item.click": {
                  method: "open",
                  target: "#title-demo2",
                },
              },
            },
            {
              brick: "basic-bricks.general-drawer",
              properties: {
                id: "title-demo2",
                customTitle: "预览",
                maskClosable: true,
                width: 750,
              },
              slots: {
                content: {
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-descriptions",
                      properties: {
                        showCard: false,
                        column: 2,
                        descriptionTitle: "基本信息",
                        itemList: [
                          {
                            label: "名称",
                            text: "easyops",
                          },
                          {
                            label: "环境类型",
                            text: "无",
                          },
                          {
                            label: "授权模式",
                            text: "clientCert",
                          },
                          {
                            label: "服务供应商",
                          },
                        ],
                      },
                    },
                    {
                      brick: "presentational-bricks.brick-descriptions",
                      properties: {
                        showCard: false,
                        column: 2,
                        style: {
                          marginTop: "20px",
                        },
                        descriptionTitle: "集群规格",
                        itemList: [
                          {
                            label: "集群来源",
                            text: "导入",
                          },
                          {
                            label: "Manter节点数量",
                            text: "3个",
                          },
                          {
                            label: "可分配CPU",
                            text: "12 Cores",
                          },
                          {
                            label: "可分配内存",
                            text: "44.8GIB",
                          },
                        ],
                      },
                    },
                  ],
                  type: "bricks",
                },
                headerRight: {
                  bricks: [
                    {
                      brick: "basic-bricks.general-custom-buttons",
                      properties: {
                        customButtons: [
                          {
                            buttonType: "link",
                            isDropdown: false,
                            tooltipPlacement: "bottom",
                            icon: {
                              lib: "fa",
                              icon: "share-alt",
                              prefix: "fas",
                              color: "#167be0",
                            },
                            tooltip: "分享",
                          },
                        ],
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
