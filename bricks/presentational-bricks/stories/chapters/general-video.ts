import { Story } from "@next-core/brick-types";

export const GeneralVideoStory: Story = {
  storyId: "presentational-bricks.general-video",
  category: "data-view",
  type: "brick",
  author: "alren",
  text: {
    en: "Video Player",
    zh: "视频播放器",
  },
  description: {
    en: "play video",
    zh: "播放视频或预览视频",
  },
  icon: {
    lib: "fa",
    icon: "bell",
  },
  conf: [
    {
      brick: "presentational-bricks.general-video",
      properties: {
        source:
          "http://cdn.uwintech.cn/data/brick_next/1.创建第1个Micro-App.mp4",
        preview: true,
        height: 150,
      },
    },
    {
      brick: "presentational-bricks.general-video",
      properties: {
        source:
          "http://cdn.uwintech.cn/data/brick_next/1.创建第1个Micro-App.mp4",
        preview: false,
      },
    },
  ],
};
