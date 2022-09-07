import { Story } from "@next-core/brick-types";

export const subMenuStory: Story = {
  storyId: "basic-bricks.sub-menu",
  category: "navigation",
  type: "brick",
  author: "lynette",
  deprecated: true,
  text: {
    en: "sub-menu",
    zh: "二级子菜单",
  },
  description: {
    en: "sub menu",
    zh: "二级菜单",
  },
  icon: {
    lib: "fa",
    icon: "indent",
  },
  conf: [
    {
      brick: "basic-bricks.micro-app",
      slots: {
        subMenu: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.sub-menu",
              properties: {
                dataSource: {
                  menuItems: [
                    {
                      type: "default",
                      text: "工具库",
                      icon: { lib: "fa", icon: "cube" },
                      to: "/developers/brick-book/atom/sub-menu",
                      exact: true,
                    },
                    {
                      type: "group",
                      title: "平台资源",
                      items: [
                        {
                          text: "主机",
                          icon: {
                            lib: "easyops",
                            category: "model",
                            icon: "host",
                          },
                          to: "/developers/brick-book/atom/sub-menu/1",
                        },
                        {
                          text: "Docker",
                          icon: {
                            lib: "easyops",
                            category: "model",
                            icon: "docker-image",
                          },
                          to: "/developers/brick-book/atom/sub-menu/2",
                        },
                      ],
                    },
                    {
                      type: "group",
                      title: "负责人",
                      items: [
                        {
                          text: "开发负责人",
                          icon: {
                            lib: "easyops",
                            category: "model",
                            icon: "admin",
                          },
                          to: "/developers/brick-book/atom/sub-menu/3",
                        },
                        {
                          text: "运维负责人",
                          icon: {
                            lib: "easyops",
                            category: "model",
                            icon: "admin",
                          },
                          to: "/developers/brick-book/atom/sub-menu/4",
                        },
                        {
                          text: "测试负责人",
                          icon: {
                            lib: "easyops",
                            category: "model",
                            icon: "admin",
                          },
                          to: "/developers/brick-book/atom/sub-menu/5",
                        },
                      ],
                    },
                    {
                      type: "group",
                      title: "调用关系",
                      items: [
                        {
                          type: "subMenu",
                          title: "被调方",
                          icon: {
                            lib: "easyops",
                            category: "model",
                            icon: "app",
                          },
                          items: [
                            {
                              type: "subMenu",
                              title: "被调方",
                              items: [
                                {
                                  text: "被调方",
                                  to: "/developers/brick-book/atom/sub-menu/6",
                                },
                              ],
                            },
                            {
                              text: "被调方",
                              to: "/developers/brick-book/atom/sub-menu/7",
                            },
                          ],
                        },
                        {
                          type: "subMenu",
                          title: "被调方",
                          icon: {
                            lib: "easyops",
                            category: "model",
                            icon: "app",
                          },
                          items: [
                            {
                              text: "被调方",
                              to: "/developers/brick-book/atom/sub-menu/8",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "basic-bricks.micro-app",
      slots: {
        subMenu: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.sub-menu",
              properties: {
                dataSource: {
                  title: "IP网段管理",
                  menuItems: [
                    {
                      type: "default",
                      text: "基本信息",
                      to: "/developers/brick-book/atom/sub-menu",
                      exact: true,
                    },
                    {
                      type: "subMenu",
                      title: "资源关系",
                      items: [
                        {
                          text: "所在机柜",
                          to: "/developers/brick-book/atom/sub-menu/1",
                        },
                        {
                          text: "运维人员",
                          to: "/developers/brick-book/atom/sub-menu/2",
                        },
                        {
                          type: "group",
                          title: "其他",
                          items: [
                            {
                              text: "xx",
                              to: "/developers/brick-book/atom/sub-menu/1",
                            },
                            {
                              text: "yy",
                              to: "/developers/brick-book/atom/sub-menu/2",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  ],
  previewColumns: 2,
};
