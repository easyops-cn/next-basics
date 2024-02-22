import { Story } from "@next-core/brick-types";
import { generalBadgeSvg } from "../images";
export const GeneralBadgeStory: Story = {
  storyId: "presentational-bricks.general-badge",
  category: "display-component",
  type: "brick",
  author: "Jimmy",
  text: {
    en: "badge",
    zh: "徽标数",
  },
  description: {
    en: "a versatile display component that serves as a notification badge, capable of presenting text, icons, and even other bricks within it. This component is ideal for scenarios where you need to draw attention to dynamic updates or counts, such as new messages or notifications. It offers a variety of customizable properties including content, color, count display, and data sources",
    zh: "可用作通知徽标，能够展示文本、图标，甚至其他构件内部内容。该组件非常适合需要在动态更新或计数时吸引用户注意的场景，如新消息或通知。它提供了一系列可自定义的属性，包括内容、颜色、计数显示和数据源",
  },
  icon: {
    imgSrc: generalBadgeSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.general-badge",
      properties: {
        count: 15,
        overflowCount: 99,
        content: "我的通知",
      },
      description: {
        title: "基本",
        message: "内容是普通的文字",
      },
    },
    {
      brick: "presentational-bricks.general-badge",
      properties: {
        dataSource: {
          username: "easyops",
        },
        count: 0,
        overflowCount: 99,
        color: "green",
        showZero: true,
        content: {
          useBrick: {
            brick: "presentational-bricks.brick-user",
            properties: {
              userNameOrId: "alrenhuang",
              hideUsername: true,
              size: "large",
            },
          },
        },
      },
      description: {
        title: "内容中使用构件",
        message: "内容使用了构件替代普通文字，例如：用户头像构件",
      },
    },
    {
      brick: "presentational-bricks.general-badge",
      properties: {
        count: 100,
        overflowCount: 99,
        color: "red",
        content: {
          useBrick: {
            brick: "div",
            properties: {
              textContent: "更大的字体",
              style: {
                "font-size": "16px",
              },
            },
          },
        },
      },
      description: {
        title: "更多选项",
        message: "可以设置封顶的数字值、字体等",
      },
    },
    {
      brick: "presentational-bricks.general-badge",
      properties: {
        count: 100,
        overflowCount: 99,
        color: "red",
        dot: true,
        contentIcon: {
          lib: "antd",
          icon: "notification",
          theme: "outlined",
        },
      },
      description: {
        title: "内容使用Icon",
        message: "可以使用Icon作为内容，配合小红点",
      },
    },
  ],
  previewColumns: 2,
};
