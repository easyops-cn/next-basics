import { Story } from "@next-core/brick-types";
import { templateBreadcrumbSvg } from "../images";
export const TemplateBreadcrumbStory: Story = {
  storyId: "presentational-bricks.template-breadcrumb",
  category: "navigation",
  type: "brick",
  author: "william",
  text: {
    en: "Custom Breadcrumb",
    zh: "自定义面包屑",
  },
  icon: {
    imgSrc: templateBreadcrumbSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.template-breadcrumb[normal]",
      title: {
        en: "",
        zh: "基础自定义面包屑",
      },
      bricks: [
        {
          brick: "presentational-bricks.template-breadcrumb",
          properties: {
            dataSource: {
              key1: "value1",
            },
          },
        },
      ],
    },
  ],
};
