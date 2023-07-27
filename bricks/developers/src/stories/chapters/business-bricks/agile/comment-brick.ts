import { Story } from "../../../interfaces";
import docMD from "../../../docs/agile/comment-brick.md";

export const story: Story = {
  storyId: "agile.comment-brick",
  type: "brick",
  author: "lynette",
  text: {
    en: "comment brick",
    zh: "评论构件"
  },
  icon: {
    lib: "fa",
    icon: "comments",
    prefix: "fas"
  },
  description: {
    en: "comment brick",
    zh: "包括评论列表和发表评论"
  },
  conf: [
    {
      brick: "container-brick.tabs-container",
      properties: {
        tabList: [
          {
            text: "评论",
            key: "comment"
          }
        ],
        slotType: "bricks"
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "agile.comment-brick",
              properties: {
                placeholder: "请添加评论",
                comments: [
                  {
                    id: "1",
                    ctime: "2020-02-11 11:27:01",
                    body: "comment 1",
                    author: {
                      name: "alrenhuang",
                      user_icon:
                        "http://p.qlogo.cn/bizmail/O1tyN98UWdKvhH2dtsicBEXOOD05XSFBKWe6XjicImtWrLzRFFZBKEqw/0"
                    }
                  },
                  {
                    id: "2",
                    ctime: "2020-02-11 11:42:50",
                    body: "comment 2",
                    author: {
                      name: "leon",
                      user_icon:
                        "http://p.qlogo.cn/bizmail/d47GDej7HBmeibwD2tQVh8szhfBP6TrZIZcamNxY6xRsm4yHf2C63mA/0"
                    }
                  }
                ]
              },
              events: {
                "add.comment": {
                  action: "console.log"
                },
                "edit.comment": {
                  action: "console.log"
                },
                "delete.comment": {
                  action: "console.log"
                }
              }
            }
          ]
        }
      }
    }
  ],
  doc: docMD
};
