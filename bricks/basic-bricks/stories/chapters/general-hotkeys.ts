import { Story } from "@next-core/brick-types";
import { generalHotkeysSvg } from "../images";
export const generalHotkeysStory: Story = {
  storyId: "basic-bricks.general-hotkeys",
  category: "interact-baisc",
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
        "hotkey.save": [{ action: "console.log" }],
        "hotkey.build": [{ action: "console.log" }],
      },
    },
  ],
};
