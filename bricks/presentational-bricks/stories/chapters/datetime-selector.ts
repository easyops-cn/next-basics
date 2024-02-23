import { Story } from "@next-core/brick-types";
import { datetimeSelectorCustomSvg, dateTimeSelectorSvg } from "../images";
import { dateTimeSelectorNormalSvg } from "../images";
export const DatetimeSelectorStory: Story = {
  storyId: "presentational-bricks.datetime-selector",
  category: "form-input-basic",
  type: "brick",
  author: "jo",
  text: {
    en: "Datetime Selector",
    zh: "日期时间选择器",
  },
  description: {
    en: "designed for selecting date and time ranges. It offers a range of features that cater to various scenarios, including basic and custom time range options, event handling, and URL parameter updates",
    zh: "适用于各种日期和时间范围的选择场景。它具备丰富的特性，包括基础的默认时间范围选项和自定义时间范围选项，以及事件处理和URL参数更新等功能",
  },
  icon: {
    imgSrc: dateTimeSelectorSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.datetime-selector[normal]",
      title: {
        zh: "基础默认时间范围选项",
        en: "",
      },
      thumbnail: dateTimeSelectorNormalSvg,
      bricks: [
        {
          description: {
            title: "默认时间范围选项",
          },
          brick: "presentational-bricks.datetime-selector",
          properties: {
            from: "<% QUERY.from || 'now/d' %>",
            to: "<% QUERY.to %>",
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
      ],
    },
    {
      snippetId: "presentational-bricks.datetime-selector[custom]",
      title: {
        zh: "自定义时间范围选项",
        en: "",
      },
      thumbnail: datetimeSelectorCustomSvg,
      bricks: [
        {
          description: {
            title: "自定义时间范围选项",
          },
          brick: "presentational-bricks.datetime-selector",
          properties: {
            shouldUpdateUrlParams: false,
            from: "<% QUERY.from || 'now/d' %>",
            to: "<% QUERY.to %>",
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
    },
  ],
};
