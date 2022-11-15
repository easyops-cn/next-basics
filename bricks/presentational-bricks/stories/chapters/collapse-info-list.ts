import { Story } from "@next-core/brick-types";
import { CollapseInfoListSvg } from "../images";
export const CostTimeStory: Story = {
  storyId: "presentational-bricks.collapse-info-list",
  category: "display-component",
  type: "brick",
  author: "dophijing",
  text: {
    en: "Collapse info list",
    zh: "折叠展示列表",
  },
  description: {
    en: "For a streamlined display of collapsed information",
    zh: "用于精简的折叠信息展示",
  },
  icon: {
    imgSrc: CollapseInfoListSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.collapse-info-list",
      properties: {
        extraBrick: {
          useBrick: {
            brick: "basic-bricks.general-custom-buttons",
            events: {
              viewMore: {
                action: "console.log",
                args: ["<% EVENT.detail %>"],
              },
            },
            properties: {
              alignment: "end",
              customButtons: [
                {
                  color: "#8c8c8c",
                  eventName: "viewMore",
                  icon: "file",
                  isDropdown: true,
                  text: "详情",
                },
              ],
              isMoreButton: true,
              moreBtnIcon: {
                icon: "more",
                lib: "antd",
                theme: "outlined",
              },
              moreButtonShape: "no",
            },
            transform: {
              dataSource: "<% DATA %>",
            },
          },
        },
        titleBrick: {
          useBrick: {
            brick: "presentational-bricks.brick-tag",
            properties: {
              color: "green",
              showCard: false,
              showTagCircle: true,
              tagList: ["Active", "Normal"],
            },
          },
        },
        dataSource: [
          {
            title: "VCPU_count（必填）",
            key: "vcpu",
            detail: "指定内存大小，单位GiB。这是一段参数说",
          },
          {
            title: "App_package_version",
            key: "app",
            detail: "参数的数据类型，可选值：String、Number",
          },
        ],
      },
    },
  ],
  previewColumns: 2,
};
