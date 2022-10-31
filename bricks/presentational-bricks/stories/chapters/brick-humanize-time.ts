import { Story } from "@next-core/brick-types";
import { brickHumanizeTimeSvg } from "../images";
import { brickHumanizeTimeFullSvg } from "../images";
export const BrickHumanizeTimeStory: Story = {
  storyId: "presentational-bricks.brick-humanize-time",
  category: "data-transform",
  type: "brick",
  author: "ice",
  text: {
    en: "humanize time",
    zh: "人性化时间展示",
  },
  description: {
    en: "1h ago",
    zh: "如：3天前、过去2小时等。也可显示消耗时间，如1小时2分钟，也可显示为链接",
  },
  icon: {
    imgSrc: brickHumanizeTimeSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-humanize-time[full]",
      title: {
        en: "Humanize time(full)",
        zh: "人性化时间展示(完整)",
      },
      thumbnail: brickHumanizeTimeFullSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-humanize-time",
          properties: {
            value: 1571017058,
            formatter: "full",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-humanize-time[accurate]",
      title: {
        en: "Humanize time(accurate)",
        zh: "人性化时间展示(精确)",
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-humanize-time",
          properties: {
            value: 1571017058,
            formatter: "accurate",
            isCostTime: true,
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-humanize-time[accurate]",
      title: {
        en: "Humanize time(relative)",
        zh: "人性化时间展示(相对)",
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-humanize-time",
          properties: {
            value: 1571017058000,
            isMicrosecond: true,
            formatter: "relative",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-humanize-time[cost]",
      title: {
        en: "Humanize time(cost)",
        zh: "人性化时间展示(耗时)",
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-humanize-time",
          properties: {
            value: 1000,
            formatter: "relative",
            isCostTime: true,
          },
        },
      ],
    },
    {
      brick: "presentational-bricks.brick-humanize-time",
      properties: {
        value: 1571017058,
        formatter: "full",
        link: {
          url: "/aaa/bbb",
          target: "_blank",
        },
      },
    },
    {
      brick: "presentational-bricks.brick-humanize-time",
      properties: {
        value: 0,
        formatter: "full",
      },
    },
    {
      snippetId: "presentational-bricks.brick-humanize-time[format]",
      title: {
        en: "Humanize time(format)",
        zh: "人性化时间展示(格式化)",
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-humanize-time",
          properties: {
            value: "2020-02-27 16:36",
            inputFormat: "YYYY-MM-DD",
            outputFormat: "YYYY-MM-DD",
          },
        },
      ],
    },
  ],
  previewColumns: 2,
};
