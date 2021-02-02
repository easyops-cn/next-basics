import { Story } from "@next-core/brick-types";

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
    lib: "fa",
    icon: "bacon",
  },
  conf: {
    brick: "presentational-bricks.template-breadcrumb",
    properties: {
      dataSource: {
        key1: "value1",
      },
    },
  },
};
