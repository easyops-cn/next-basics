import { Story } from "@next-core/brick-types";
import { generalPaginationSvg } from "../images";
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
    imgSrc: generalPaginationSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.general-pagination[normal]",
      title: {
        en: "",
        zh: "基础分页",
      },
      bricks: [
        {
          brick: "presentational-bricks.general-pagination",
          properties: {
            page: "${query.page=1|number}",
            pageSize: "${query.pageSize=10|number}",
            total: 100,
            dataset: { testid: "basic-usage-pagination-demo" },
          },
        },
      ],
    },
  ],
};
