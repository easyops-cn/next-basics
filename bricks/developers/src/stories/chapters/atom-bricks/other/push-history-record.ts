import doc from "../../../docs/visit-history/push-history-record.md";
import { Story } from "../../../interfaces";

export const story: Story = {
  storyId: "visit-history.push-history-record",
  category: "interact-basic",
  type: "brick",
  author: "lynette",
  text: {
    en: "push history record",
    zh: "新增一个访问记录构件",
  },
  description: {
    en: "To be used in detail page.It will add a history record when enter the page.",
    zh: "常用于详情页面，设置bg:true。进入页面的时候就会新增一个访问历史记录。",
  },
  icon: {
    lib: "fa",
    icon: "eye",
  },
  conf: [
    {
      bricks: [
        {
          brick: "visit-history.push-history-record",
          bg: true,
          properties: {
            namespace: "recent-visit-demo",
            property: "id",
            data: { id: "1", name: "history" },
          },
        },
      ],
      snippetId: "visit-history.push-history-record[basic]",
      title: {
        en: "Basic Push History Record",
        zh: "基础新增访问记录构件",
      },
    },
  ],
  doc,
};
