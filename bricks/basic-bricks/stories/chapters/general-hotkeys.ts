import { Story } from "@next-core/brick-types";

export const generalHotkeysStory: Story = {
  storyId: "basic-bricks.general-hotkeys",
  category: "other",
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
    lib: "fa",
    icon: "pencil-alt",
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
