import doc from "../../../docs/visit-history/recent-visit.md";
import { Story } from "../../../interfaces";

export const story: Story = {
  storyId: "visit-history.recent-visit",
  category: "interact-basic",
  type: "brick",
  author: "lynette",
  text: {
    en: "Recent visit",
    zh: "最近访问",
  },
  description: {
    en: "Recent visit",
    zh: "可以配置最近n条记录的最近访问构件",
  },
  icon: {
    lib: "fa",
    icon: "eye",
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "visit-history.push-history-record",
              bg: true,
              properties: {
                namespace: "recent-visit-demo",
                property: "id",
                data: {
                  id: "1",
                  name: "history",
                },
              },
            },
            {
              brick: "visit-history.recent-visit",
              properties: {
                namespace: "recent-visit-demo",
                property: "id",
                fields: {
                  label: "name",
                },
                detailUrlTemplate: "/developers/brick-book/atom/recent-visit",
                visitCountLimit: 10,
              },
              events: {
                "recent.visit.click": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
  ],
  doc,
};
