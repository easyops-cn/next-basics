import { Story } from "../../../interfaces";
import docMD from "../../../docs/agile/tpl-issue-detail-drawer.md";
import { ISSUE_NAME } from '../../../constants';

export const story: Story = {
  storyId: "agile.tpl-issue-detail-drawer",
  type: "brick",
  author: "alren",
  text: {
    en: "issue detail drawer",
    zh: "ISSUE详情抽屉"
  },
  icon: {
    lib: "fa",
    icon: "comments",
    prefix: "fas"
  },
  description: {
    en: "issue detail drawer",
    zh: "显示issue的详情内容及一些常用操作"
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "显示issue详情"
              },
              events: {
                "general.button.click": {
                  target: "agile\\.tpl-issue-detail-drawer",
                  method: "open",
                  args: [ISSUE_NAME]
                }
              }
            },
            {
              brick: "agile.tpl-issue-detail-drawer"
            }
          ]
        }
      }
    }
  ],
  doc: docMD
};
