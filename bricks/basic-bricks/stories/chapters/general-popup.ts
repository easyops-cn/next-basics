import { Story } from "@next-core/brick-types";
import { generalPopupSvg } from "../images";
export const generalPopupStory: Story = {
  storyId: "basic-bricks.general-popup",
  category: "container-display",
  type: "brick",
  author: "sailor",
  text: {
    en: "General Popup",
    zh: "可拖拽弹框",
  },
  description: {
    en: "provide slot to hold other custom elements",
    zh: "提供插槽以展示其他构件",
  },
  icon: {
    imgSrc: generalPopupSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.general-button",
          properties: {
            buttonName: "打开",
            dataset: {
              testid: "basic-usage-demo",
            },
          },
          events: {
            "general.button.click": [
              {
                target: "#popup",
                method: "open",
              },
            ],
          },
        },
        {
          brick: "basic-bricks.general-popup",
          properties: {
            id: "popup",
            popupTitle: "预览",
            popupWidth: "750px",
            popupHeight: "600px",
            dragHeaderStyle: {
              background: "#E0E4E5",
            },
            dragWrapperStyle: {
              border: "none",
            },
            openDirection: "rightTop",
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
          },
        },
      ],
      title: {
        en: "General Popup",
        zh: "可拖拽弹框",
      },
    },
  ],
};
