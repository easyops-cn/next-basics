import { Story } from "@next-core/brick-types";

export const subMenuFilterStory: Story = {
  storyId: "basic-bricks.sub-menu-filter",
  category: "navigation",
  type: "brick",
  author: "Alex",
  text: {
    en: "Submenu Filter",
    zh: "有搜索能力的二级菜单",
  },
  description: {
    en: "submenu filter",
    zh: "搜索能力二级菜单",
  },
  icon: {
    lib: "fa",
    icon: "indent",
  },
  conf: [
    {
      brick: "basic-bricks.sub-menu-filter",
      events: {
        "menu.search": {
          action: "console.log",
        },
        "menu.select": {
          action: "console.log",
        },
      },
      properties: {
        defaultOpenKeys: ["diy"],
        selectable: true,
        multiple: false,
        defaultSelectedKeys: ["C++"],
        menuItems: [
          {
            type: "item",
            title: "全部",
            key: "All",
            count: 100,
            icon: {
              lib: "fa",
              icon: "cube",
            },
          },
          {
            type: "group",
            title: "内置模板",
            key: "built-in-template",
            items: [
              {
                title: "Java",
                key: "Java",
                count: 60,
                icon: {
                  lib: "fa",
                  icon: "cube",
                },
              },
              {
                title: "Go",
                key: "Go",
                count: 10,
                icon: {
                  lib: "fa",
                  icon: "cube",
                },
              },
              {
                title: "Cc",
                key: "cc",
                count: 10,
                icon: {
                  lib: "fa",
                  icon: "cube",
                },
              },
              {
                title: "Python",
                key: "Python",
                count: 10,
                icon: {
                  lib: "fa",
                  icon: "cube",
                },
              },
            ],
          },
          {
            type: "group",
            title: "自定义模板",
            key: "customTemplate",
            items: [
              {
                type: "subMenu",
                title: "标准模板",
                key: "standard",
                icon: {
                  lib: "easyops",
                  category: "model",
                  icon: "app",
                },
                items: [
                  {
                    title: "C++",
                    key: "C++",
                    count: 5,
                  },
                  {
                    title: "C",
                    key: "C",
                    count: 5,
                  },
                ],
              },
              {
                type: "subMenu",
                title: "个性化模板c",
                key: "diy",
                icon: {
                  lib: "fa",
                  icon: "cube",
                },
                items: [
                  {
                    title: "易语言",
                    key: "iyuyan",
                    count: 10,
                    icon: {
                      lib: "fa",
                      icon: "cube",
                    },
                  },
                ],
              },
            ],
          },
        ],
        suffixBrick: {
          useBrick: {
            brick: "presentational-bricks.brick-conditional-display",
            transform: {
              dataSource: "@{count}",
              rules: [
                {
                  condition: { $lte: 60 },
                  style: {
                    backgroundColor: "var(--theme-red-color)",
                    color: "rgba(255, 255, 255, 1)",
                  },
                  label: "@{value}",
                },
                {
                  condition: { $and: [{ $lte: 85, $gt: 60 }] },
                  style: {
                    backgroundColor: "var(--theme-orange-color)",
                    color: "rgba(255, 255, 255, 1)",
                  },
                  label: "@{value}",
                },
                {
                  condition: { $and: [{ $lte: 100, $gt: 85 }] },
                  style: {
                    backgroundColor: "var(--theme-green-color)",
                    color: "rgba(255, 255, 255, 1)",
                  },
                  label: "@{value}",
                },
              ],
            },
          },
        },
      },
    },
  ],
};
