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
        defaultSelectedKeys: ["C++"],
        menuItems: [
          {
            count: 100,
            icon: {
              icon: "cube",
              lib: "fa",
            },
            key: "All",
            title: "全部",
            type: "item",
          },
          {
            items: [
              {
                count: 60,
                icon: {
                  icon: "cube",
                  lib: "fa",
                },
                key: "Java",
                title: "Java",
              },
              {
                count: 10,
                icon: {
                  icon: "cube",
                  lib: "fa",
                },
                key: "Go",
                title: "Go",
              },
              {
                count: 10,
                icon: {
                  icon: "cube",
                  lib: "fa",
                },
                key: "cc",
                title: "Cc",
              },
              {
                count: 10,
                icon: {
                  icon: "cube",
                  lib: "fa",
                },
                key: "Python",
                title: "Python",
              },
            ],
            key: "built-in-template",
            title: "内置模板",
            type: "group",
          },
          {
            items: [
              {
                icon: {
                  category: "model",
                  icon: "app",
                  lib: "easyops",
                },
                items: [
                  {
                    count: 5,
                    key: "C++",
                    title: "C++",
                  },
                  {
                    count: 5,
                    key: "C",
                    title: "C",
                  },
                ],
                key: "standard",
                title: "标准模板",
                type: "subMenu",
              },
              {
                icon: {
                  icon: "cube",
                  lib: "fa",
                },
                items: [
                  {
                    count: 10,
                    icon: {
                      icon: "cube",
                      lib: "fa",
                    },
                    key: "iyuyan",
                    title: "易语言",
                  },
                ],
                key: "diy",
                title: "个性化模板c",
                type: "subMenu",
              },
            ],
            key: "customTemplate",
            title: "自定义模板",
            type: "group",
          },
        ],
        multiple: false,
        selectable: true,
        suffixBrick: {
          useBrick: {
            brick: "presentational-bricks.brick-conditional-display",
            properties: {
              dataSource: "<% DATA.count %>",
              rules: [
                {
                  condition: {
                    $lte: 60,
                  },
                  style: {
                    backgroundColor: "var(--theme-red-color)",
                    color: "rgba(255, 255, 255, 1)",
                  },
                },
                {
                  condition: {
                    $and: [
                      {
                        $gt: 60,
                        $lte: 85,
                      },
                    ],
                  },
                  style: {
                    backgroundColor: "var(--theme-orange-color)",
                    color: "rgba(255, 255, 255, 1)",
                  },
                },
                {
                  condition: {
                    $and: [
                      {
                        $gt: 85,
                        $lte: 100,
                      },
                    ],
                  },
                  style: {
                    backgroundColor: "var(--theme-green-color)",
                    color: "rgba(255, 255, 255, 1)",
                  },
                },
              ],
            },
          },
        },
      },
    },
  ],
};
