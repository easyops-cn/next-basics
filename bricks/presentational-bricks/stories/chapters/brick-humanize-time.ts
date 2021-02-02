import { Story } from "@next-core/brick-types";

export const BrickHumanizeTimeStory: Story = {
  storyId: "presentational-bricks.brick-humanize-time",
  category: "value-mapping",
  type: "brick",
  author: "ice",
  text: {
    en: "humanize time",
    zh: "人性化时间展示",
  },
  description: {
    en: "1h ago",
    zh:
      "如：3天前、过去2小时等。也可显示消耗时间，如1小时2分钟，也可显示为链接",
  },
  icon: {
    lib: "fa",
    icon: "clock",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-humanize-time",
      properties: {
        value: 1571017058,
        formatter: "full",
      },
    },
    {
      brick: "presentational-bricks.brick-humanize-time",
      properties: {
        value: 1571017058,
        formatter: "accurate",
        isCostTime: true,
      },
    },
    {
      brick: "presentational-bricks.brick-humanize-time",
      properties: {
        value: 1571017058000,
        isMicrosecond: true,
        formatter: "relative",
      },
    },
    {
      brick: "presentational-bricks.brick-humanize-time",
      properties: {
        value: 1000,
        formatter: "relative",
        isCostTime: true,
      },
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
      brick: "presentational-bricks.brick-humanize-time",
      properties: {
        value: "2020-02-27 16:36",
        inputFormat: "YYYY-MM-DD",
        outputFormat: "YYYY-MM-DD",
      },
    },
  ],
  previewColumns: 2,
};
