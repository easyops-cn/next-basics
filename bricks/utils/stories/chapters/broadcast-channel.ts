import { Story } from "@next-core/brick-types";
import { broadcastChannelSvg } from "../images";
export const broadcastChanel: Story = {
  storyId: "utils.broadcast-channel",
  category: "other",
  type: "brick",
  author: "steve",
  text: {
    en: "Broadcast Channel",
    zh: "广播频道",
  },
  description: {
    en: "Create a broadcast channel which allow basic communication between browser tabs (or iframes), on the same origin.",
    zh: "创建一个广播频道，可以允许在浏览器同源的标签页（或 iframes）之间进行基本的通信。",
  },
  icon: {
    imgSrc: broadcastChannelSvg,
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "utils.broadcast-channel",
              properties: {
                channelName: "developers:test-broadcast-channel",
                id: "test-broadcast-channel",
              },
              events: {
                "channel.message": {
                  action: "console.log",
                  args: ["channel.message:", "<% EVENT.detail %>"],
                },
              },
              portal: true,
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "Post a message",
              },
              events: {
                "general.button.click": {
                  target: "#test-broadcast-channel",
                  method: "postMessage",
                  args: [{ hello: "world" }],
                },
              },
            },
          ],
        },
      },
    },
    {
      bricks: [
        {
          brick: "utils.broadcast-channel",
          events: {
            "channel.message": {
              action: "console.log",
              args: ["channel.message:", "<% EVENT.detail %>"],
            },
          },
          portal: true,
          properties: {
            channelName: "developers:test-broadcast-channel",
            id: "test-broadcast-channel",
          },
        },
      ],
      snippetId: "utils.broadcast-channel[basic]",
      title: {
        en: "Basic Broadcast Channel",
        zh: "基础广播频道",
      },
      actions: [
        {
          text: "postMessage()",
          method: "postMessage",
          args: [
            {
              hello: "world",
            },
          ],
        },
      ],
    },
  ],
};
