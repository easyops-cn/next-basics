import { Story } from "@next-core/brick-types";
import { menuBarSvg } from "../images";

export const menuBarStory: Story = {
  storyId: "basic-bricks.menu-bar",
  category: "navigation",
  type: "brick",
  author: "steve",
  text: {
    en: "menu-bar",
    zh: "一级左侧菜单",
  },
  description: {
    en: "menu",
    zh: "点击后注意左侧菜单即为效果图，点击浏览器返回",
  },
  icon: {
    imgSrc: menuBarSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.menu-bar",
          properties: {
            collapsed: false,
            dataset: {
              testid: "basic-usage-demo-menu",
            },
            menu: {
              menuItems: [
                {
                  exact: true,
                  text: "基本信息",
                  to: "/developers/brick-book/menu-bar",
                  type: "default",
                },
                {
                  items: [
                    {
                      text: "所在机柜",
                      to: "/developers/brick-book/menu-bar/1",
                    },
                    {
                      text: "运维人员",
                      to: "/developers/brick-book/menu-bar/2",
                    },
                  ],
                  title: "资源关系",
                  type: "group",
                },
              ],
              title: "IP网段管理",
            },
          },
        },
      ],
      snippetId: "basic-bricks.menu-bar[basic]",
      title: {
        en: "Basic Menu Bar",
        zh: "基础一级左侧菜单",
      },
    },
  ],
};
