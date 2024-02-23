import { Story } from "@next-core/brick-types";
import { generalVideoNormalSvg, generalVideoSvg } from "../images";

export const GeneralVideoStory: Story = {
  storyId: "presentational-bricks.general-video",
  category: "display-component",
  type: "brick",
  author: "alren",
  text: {
    en: "Video Player",
    zh: "视频播放器",
  },
  description: {
    en: "This component facilitates the integration of video content with a simple setup, providing a seamless user experience. It offers a range of customizable properties such as the video source URL, preview/playback mode, video title display, and player height, making it adaptable to various project requirements",
    zh: "专门用于视频展示和播放。该构件通过简单的设置即可集成视频内容，为用户提供流畅的体验。它拥有包括视频源URL、预览/播放模式、视频标题显示以及播放器高度等可自定义属性，能够适应各种项目需求",
  },
  icon: {
    imgSrc: generalVideoSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.general-video[normal]",
      title: {
        en: "",
        zh: "基础播放视频或预览视频",
      },
      thumbnail: generalVideoNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.general-video",
          properties: {
            source:
              "http://cdn.uwintech.cn/data/brick_next/1.创建第1个Micro-App.mp4",
            preview: true,
            height: 150,
          },
        },
      ],
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
