import { Story } from "@next-core/brick-types";

export const homeRedirectStory: Story = {
  storyId: "basic-bricks.home-redirect",
  category: "interact-basic",
  type: "brick",
  author: "steve",
  deprecated: true,
  text: {
    en: "redirection to app home",
    zh: "重定向到指定应用的首页",
  },
  description: {
    en: "Tool brick for redirect to app home",
    zh: "重定向到指定应用的首页",
  },
  icon: {
    lib: "fa",
    icon: "external-link-square-alt",
  },
  conf: {},
};
