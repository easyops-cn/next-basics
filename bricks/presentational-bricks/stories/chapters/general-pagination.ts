import { Story } from "@next-core/brick-types";

export const GeneralPaginationStory: Story = {
  storyId: "presentational-bricks.general-pagination",
  category: "navigation",
  type: "brick",
  author: "lynette",
  text: {
    en: "General pagination",
    zh: "分页",
  },
  description: {
    en: "General pagination brick",
    zh: "通用分页构件",
  },
  icon: {
    lib: "fa",
    icon: "clock",
  },
  conf: [
    {
      brick: "presentational-bricks.general-pagination",
      properties: {
        page: "${query.page=1|number}",
        pageSize: "${query.pageSize=10|number}",
        total: 100,
      },
    },
  ],
};
