import { Story } from "@next-core/brick-types";
import { generalHotkeysSvg } from "../images";
export const generalHotkeysStory: Story = {
  storyId: "basic-bricks.general-hotkeys",
  category: "interact-basic",
  type: "brick",
  author: "lynette",
  text: {
    en: "General Hotkeys",
    zh: "通用快捷键",
  },
  description: {
    en: "General Hotkeys",
    zh: "可配置通用快捷键以及相关事件名",
  },
  icon: {
    imgSrc: generalHotkeysSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.general-hotkeys",
          properties: {
            hotkeysConfig: [
              {
                key: "command+s",
                eventName: "hotkey.save",
              },
              {
                key: "command+b",
                eventName: "hotkey.build",
              },
            ],
          },
          events: {
            "hotkey.save": [
              {
                action: "message.info",
                args: ["save"],
              },
            ],
            "hotkey.build": [
              {
                action: "message.info",
                args: ["build"],
              },
            ],
          },
        },
      ],
      snippetId: "basic-bricks.general-hotkeys[basic]",
      title: {
        en: "Basic General Hotkeys",
        zh: "基础通用快捷键",
      },
    },
  ],
};
