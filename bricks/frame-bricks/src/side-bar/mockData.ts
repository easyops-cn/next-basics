import { SidebarSubMenu } from "@next-core/brick-types";

export const menuData1 = {
  title: "二级菜单标题",
  link: "/nlicro-test/aaaa",
  menuItems: [
    {
      text: "item1",
      type: "default",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
    },
    {
      text: "item2",
      type: "default",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
    },
    {
      text: "item3",
      type: "default",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
    },
    {
      type: "group",
      title: "group",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
      items: [
        {
          text: "group-item1",
          type: "default",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
        },
        {
          text: "group-item2",
          type: "default",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
        },
      ],
    },
    {
      type: "subMenu",
      title: "subMenu",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
      items: [
        {
          text: "subMenu-item1",
          type: "default",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
        },
        {
          text: "subMenu-item2",
          type: "default",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
        },
      ],
    },
  ],
  defaultCollapsedBreakpoint: 0,
} as SidebarSubMenu;

export const menuData2 = {
  title: "二级菜单标题",
  link: "/nlicro-test/aaaa",
  menuItems: [
    {
      type: "subMenu",
      title: "subMenu",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
      items: [
        {
          type: "group",
          title: "group1",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
          items: [
            {
              text: "subMenu-group-item11",
              type: "default",
              icon: {
                color: "geekblue",
                icon: "anchor",
                lib: "fa",
                prefix: "fas",
              },
            },
            {
              text: "subMenu-group-item12",
              type: "default",
              icon: {
                color: "geekblue",
                icon: "anchor",
                lib: "fa",
                prefix: "fas",
              },
            },
          ],
        },
        {
          type: "group",
          title: "group2",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
          items: [
            {
              text: "subMenu-group-item21",
              type: "default",
              icon: {
                color: "geekblue",
                icon: "anchor",
                lib: "fa",
                prefix: "fas",
              },
            },
            {
              text: "subMenu-group-item22",
              type: "default",
              icon: {
                color: "geekblue",
                icon: "anchor",
                lib: "fa",
                prefix: "fas",
              },
            },
          ],
        },
      ],
    },
    {
      type: "group",
      title: "group",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
      items: [
        {
          type: "subMenu",
          title: "subMenu1",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
          items: [
            {
              text: "group-subMenu-item11",
              type: "default",
              icon: {
                color: "geekblue",
                icon: "anchor",
                lib: "fa",
                prefix: "fas",
              },
            },
            {
              text: "group-subMenu-item12",
              type: "default",
              icon: {
                color: "geekblue",
                icon: "anchor",
                lib: "fa",
                prefix: "fas",
              },
            },
          ],
        },
        {
          type: "subMenu",
          title: "subMenu2",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
          items: [
            {
              text: "group-subMenu-item21",
              type: "default",
              icon: {
                color: "geekblue",
                icon: "anchor",
                lib: "fa",
                prefix: "fas",
              },
            },
            {
              text: "group-subMenu-item22",
              type: "default",
              icon: {
                color: "geekblue",
                icon: "anchor",
                lib: "fa",
                prefix: "fas",
              },
            },
          ],
        },
      ],
    },
  ],
  defaultCollapsedBreakpoint: 0,
} as SidebarSubMenu;
