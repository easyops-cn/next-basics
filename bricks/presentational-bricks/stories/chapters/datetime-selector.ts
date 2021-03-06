import { Story } from "@next-core/brick-types";

export const DatetimeSelectorStory: Story = {
  storyId: "presentational-bricks.datetime-selector",
  category: "form-input",
  type: "brick",
  author: "jo",
  text: {
    en: "Datetime Selector",
    zh: "时间选择器",
  },
  description: {
    en: "used to datetime filter",
    zh:
      "常用于时间的过滤，支持快速选择时间区间和自定义，例如图表或表格的时间过滤",
  },
  icon: {
    lib: "fa",
    icon: "clock",
  },
  conf: [
    {
      brick: "presentational-bricks.datetime-selector",
      properties: {
        from: '${query.from="now/d"}',
        to: "${query.to}",
      },
      events: {
        "datetime.selected.v2": {
          action: "console.log",
        },
        "datetime.selected.v3": {
          action: "console.log",
        },
      },
    },
    {
      brick: "presentational-bricks.datetime-selector",
      properties: {
        shouldUpdateUrlParams: false,
        from: '${query.from="now/d"}',
        to: "${query.to}",
        type: "custom",
        customTimeRange: [
          {
            range: "now-1h",
            text: "近1小时",
          },
          {
            range: "now-1d",
            text: "近24小时",
          },
          {
            range: "now/d",
            text: "今天",
          },
          {
            range: "now-7d",
            text: "近7天",
          },
          {
            range: "now-30d",
            text: "近30天",
          },
          {
            range: "now-1y",
            text: "近一年",
          },
        ],
      },
    },
  ],
};
