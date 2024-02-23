import { Story } from "@next-core/brick-types";
import { generalPaginationNormalSvg, generalPaginationSvg } from "../images";
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
    en: "This brick is primarily designed for implementing data pagination to allow users to navigate between different pages",
    zh: "主要用于实现数据分页显示功能，让用户能够在不同的页面间进行导航",
  },
  icon: {
    imgSrc: generalPaginationSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.general-pagination[normal]",
      thumbnail: generalPaginationNormalSvg,
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
