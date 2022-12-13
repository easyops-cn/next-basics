import { Story } from "@next-core/brick-types";
import { generalAnchorSvg } from "../images";
import { generalAnchorBasicSvg } from "../images";
import { generalAnchorRadioSvg } from "../images";
export const generalAnchorStory: Story = {
  storyId: "basic-bricks.general-anchor",
  category: "interact-basic",
  type: "brick",
  author: "astrid",
  text: {
    en: "anchor brick",
    zh: "锚点",
  },
  description: {
    en: "",
    zh: "用于跳转到页面指定位置",
  },
  icon: {
    imgSrc: generalAnchorSvg,
  },
  conf: [
    {
      bricks: [
        {
          description: {
            title: "基本",
            message: "",
          },
          brick: "basic-bricks.general-anchor",
          properties: {
            anchorList: [
              {
                title: "应用资源",
                href: "http://192.168.100.162/next/resource-monitor#saas-monitor",
              },
              {
                title: "平台资源",
                href: "http://192.168.100.162/next/resource-monitor#paas-monitor",
              },
              {
                title: "基础设施",
                href: "http://192.168.100.162/next/resource-monitor#iaas-monitor",
              },
            ],
          },
        },
      ],
      snippetId: "basic-bricks.general-anchor[basic]",
      title: {
        en: "Basic General Anchor",
        zh: "基础锚点",
      },
      thumbnail: generalAnchorBasicSvg,
    },
    {
      bricks: [
        {
          description: {
            title: "`type`为`radio`",
            message: "用于某些特定场景，有固定的样式",
          },
          brick: "basic-bricks.general-anchor",
          properties: {
            type: "radio",
            anchorList: [
              {
                title: "应用资源",
                href: "http://192.168.100.162/next/resource-monitor#saas-monitor",
              },
              {
                title: "平台资源",
                href: "http://192.168.100.162/next/resource-monitor#paas-monitor",
              },
              {
                title: "基础设施",
                href: "http://192.168.100.162/next/resource-monitor#iaas-monitor",
              },
            ],
          },
        },
      ],
      snippetId: "basic-bricks.general-anchor[radio]",
      title: {
        en: "Radio General Anchor",
        zh: "radio样式锚点",
      },
      thumbnail: generalAnchorRadioSvg,
    },
  ],
  previewColumns: 1,
};
