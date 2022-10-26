import { Story } from "@next-core/brick-types";

export const NavMenuStory: Story = {
  storyId: "frame-bricks.nav-menu",
  category: "navigation",
  type: "brick",
  author: "sailorshe",
  text: {
    en: "nav-menu",
    zh: "导航栏",
  },
  conf: [
    {
      snippetId: "frame-bricks.nav-menu[normal]",
      title: {
        en: "",
        zh: "基础导航栏",
      },
      bricks: [
        {
          brick: "frame-bricks.nav-menu",
          properties: {
            menu: {
              title: "abc",
              link: "abc",
              menuItems: [
                {
                  type: "subMenu",
                  title: "menu-1",
                  key: "1",
                  items: [
                    {
                      text: "subMenu-item1",
                      type: "default",
                      key: "1-1",
                      link: "/page-1",
                    },
                    {
                      text: "subMenu-item2",
                      type: "default",
                      key: "1-2",
                      to: "/page-2",
                    },
                    {
                      title: "subMenu-item3",
                      type: "subMenu",
                      key: "1-3",
                      items: [
                        {
                          text: "subMenu-item3-subMenu",
                          type: "default",
                          key: "1-3-1",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "default",
                  text: "menu-2",
                  key: "2",
                },
                {
                  type: "default",
                  text: "menu-3",
                  key: 3,
                },
                {
                  type: "subMenu",
                  title: "menu-4",
                  key: 4,
                  items: [
                    {
                      type: "group",
                      title: "menu-4-1",
                      items: [
                        {
                          type: "subMenu",
                          title: "menu-4-1-subMenu-1",
                          key: "4-1",
                          items: [
                            {
                              type: "default",
                              text: "menu-4-1-subMenu-1",
                              key: "4-1-1",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "group",
                      title: "menu-4-2",
                      items: [
                        {
                          type: "subMenu",
                          title: "menu-4-2-subMenu-1",
                          key: "4-2-1",
                          items: [
                            {
                              type: "default",
                              text: "menu-4-2-subMenu-1",
                              key: "4-2-1-1",
                            },
                            {
                              type: "default",
                              text: "menu-4-2-subMenu-2",
                              key: "4-2-1-2",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "default",
                  text: "menu-5",
                  key: 5,
                },
              ],
            },
          },
        },
      ],
    },
  ],
};
