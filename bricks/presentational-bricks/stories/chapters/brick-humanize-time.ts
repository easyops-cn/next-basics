import { Story } from "@next-core/brick-types";
import {
  brickHumanizeTimeAccurateSvg,
  brickHumanizeTimeCostSvg,
  brickHumanizeTimeFormatSvg,
  brickHumanizeTimeRelativeSvg,
  brickHumanizeTimeSvg,
} from "../images";
import { brickHumanizeTimeFullSvg } from "../images";
export const BrickHumanizeTimeStory: Story = {
  storyId: "presentational-bricks.brick-humanize-time",
  category: "data-transform",
  type: "brick",
  author: "ice",
  text: {
    en: "a versatile component designed for displaying time in a human-readable format within a front-end application. It accepts a timestamp or a string value and offers various configurations to tailor the output according to different needs",
    zh: "以易于理解的方式显示时间信息的多功能构件。它接收时间戳或字符串值，并提供了多种配置选项，以根据不同需求定制输出",
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
      thumbnail: brickHumanizeTimeAccurateSvg,
    },
    {
      snippetId: "presentational-bricks.brick-humanize-time[relative]",
      title: {
        en: "Humanize time(relative)",
        zh: "人性化时间展示(相对)",
      },
      thumbnail: brickHumanizeTimeRelativeSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-humanize-time",
          properties: {
            value: 1571017058000,
            isMillisecond: true,
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
      thumbnail: brickHumanizeTimeCostSvg,
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
      thumbnail: brickHumanizeTimeFormatSvg,
    },
  ],
  previewColumns: 2,
};
