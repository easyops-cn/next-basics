import React from "react";
import { mount, shallow } from "enzyme";
import "@testing-library/jest-dom";
import {
  QuickVisitMenu,
  filterMenuTitle,
  flattenMenus,
  MenuContainer,
  searchMenu,
  menuIsSame,
  flagFavourite,
  removeItemFromList,
} from "./QuickVisitMenu";
import { Input, Drawer, Tooltip } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { arrayMoveImmutable, FavouriteMenu } from "./FavouriteMenu";
import { MenuTag } from "./MenuTag";
describe("QuickVisitMenu", () => {
  const menu = {
    menuItems: [
      {
        title: "资源",
        type: "group",
        items: [
          {
            title: "存储",
            items: [
              {
                text: "腾讯云·云硬盘cbs",
                to: "storage/cbs",
              },
              {
                text: "阿里云·云盘",
                to: "storage/ali-disk",
              },
            ],
          },
          {
            title: "网络",
            items: [
              {
                text: "服务名",
                to: "network/service-name",
              },
              {
                text: "阿里云·SSL证书",
                to: "network/ali-ssl",
              },
            ],
          },
        ],
      },
      {
        title: "服务",
        type: "group",
        items: [
          {
            title: "数据库",
            items: [
              {
                text: "MySQL",
                to: "database/mysql",
              },
              {
                text: "MsSQL",
                to: "database/mssql",
              },
            ],
          },
        ],
      },
    ],
  };
  const menu2 = {
    menuItems: [
      {
        title: "资源",
        type: "group",
        items: [
          {
            title: "存储",
            items: [
              {
                text: "腾讯云·云硬盘cbs",
                to: "storage/cbs",
              },
              {
                text: "阿里云·云盘",
                to: "storage/ali-disk",
              },
            ],
          },
          {
            title: "网络",
            items: [
              {
                text: "服务名",
                to: "network/service-name",
              },
              {
                text: "阿里云·SSL证书",
                to: "network/ali-ssl",
              },
            ],
          },
        ],
      },
      {
        title: "服务",
        type: "group",
        items: [
          {
            title: "数据库",
            items: [
              {
                text: "MySQL",
                to: "database/mysql",
              },
              {
                text: "MsSQL",
                to: "database/mssql",
              },
              {
                text: "金仓KingbaseES",
                to: "/database-service-drm/kingbasees",
              },
            ],
          },
        ],
      },
      {
        title: "数据中心",
        type: "subMenu",
        items: [
          {
            text: "地域",
            to: "/internet-data-center/region",
          },
          {
            text: "可用区",
            to: "/internet-data-center/zone",
          },
        ],
      },
    ],
  };
  const mockMenuAdd = jest.fn();
  const mockMenuRemove = jest.fn();
  const mockMenuDrag = jest.fn();
  const mockMenuClick = jest.fn();
  const favouriteMenus = [
    { text: "腾讯云·云硬盘cbs", to: "storage/cbs" },
    { text: "阿里云·SSL证书", to: "network/ali-ssl" },
  ];
  it("should work with filterMenuTitle", () => {
    expect(filterMenuTitle("MySQL", "sql")).toBeTruthy();
  });
  it("should work with flattenMenus", () => {
    expect(flattenMenus(menu)).toEqual([
      {
        text: "腾讯云·云硬盘cbs",
        to: "storage/cbs",
        categoryTitle: "资源",
        groupTitle: "存储",
        isFavourite: false,
      },
      {
        text: "阿里云·云盘",
        to: "storage/ali-disk",
        categoryTitle: "资源",
        groupTitle: "存储",
        isFavourite: false,
      },
      {
        text: "服务名",
        to: "network/service-name",
        categoryTitle: "资源",
        groupTitle: "网络",
        isFavourite: false,
      },
      {
        text: "阿里云·SSL证书",
        to: "network/ali-ssl",
        categoryTitle: "资源",
        groupTitle: "网络",
        isFavourite: false,
      },
      {
        text: "MySQL",
        to: "database/mysql",
        categoryTitle: "服务",
        groupTitle: "数据库",
        isFavourite: false,
      },
      {
        text: "MsSQL",
        to: "database/mssql",
        categoryTitle: "服务",
        groupTitle: "数据库",
        isFavourite: false,
      },
    ]);
    expect(
      flattenMenus({
        menuItems: [
          {
            title: "管理",
          },
        ],
      })
    ).toEqual([]);
    expect(flattenMenus(menu, favouriteMenus)).toEqual([
      {
        text: "腾讯云·云硬盘cbs",
        to: "storage/cbs",
        categoryTitle: "资源",
        groupTitle: "存储",
        isFavourite: true,
      },
      {
        text: "阿里云·云盘",
        to: "storage/ali-disk",
        categoryTitle: "资源",
        groupTitle: "存储",
        isFavourite: false,
      },
      {
        text: "服务名",
        to: "network/service-name",
        categoryTitle: "资源",
        groupTitle: "网络",
        isFavourite: false,
      },
      {
        text: "阿里云·SSL证书",
        to: "network/ali-ssl",
        categoryTitle: "资源",
        groupTitle: "网络",
        isFavourite: true,
      },
      {
        text: "MySQL",
        to: "database/mysql",
        categoryTitle: "服务",
        groupTitle: "数据库",
        isFavourite: false,
      },
      {
        text: "MsSQL",
        to: "database/mssql",
        categoryTitle: "服务",
        groupTitle: "数据库",
        isFavourite: false,
      },
    ]);
    expect(flattenMenus(menu2)).toEqual([
      {
        text: "腾讯云·云硬盘cbs",
        to: "storage/cbs",
        categoryTitle: "资源",
        groupTitle: "存储",
        isFavourite: false,
      },
      {
        text: "阿里云·云盘",
        to: "storage/ali-disk",
        categoryTitle: "资源",
        groupTitle: "存储",
        isFavourite: false,
      },
      {
        text: "服务名",
        to: "network/service-name",
        categoryTitle: "资源",
        groupTitle: "网络",
        isFavourite: false,
      },
      {
        text: "阿里云·SSL证书",
        to: "network/ali-ssl",
        categoryTitle: "资源",
        groupTitle: "网络",
        isFavourite: false,
      },
      {
        text: "MySQL",
        to: "database/mysql",
        categoryTitle: "服务",
        groupTitle: "数据库",
        isFavourite: false,
      },
      {
        text: "MsSQL",
        to: "database/mssql",
        categoryTitle: "服务",
        groupTitle: "数据库",
        isFavourite: false,
      },
      {
        text: "金仓KingbaseES",
        to: "/database-service-drm/kingbasees",
        categoryTitle: "服务",
        groupTitle: "数据库",
        isFavourite: false,
      },
      {
        text: "地域",
        to: "/internet-data-center/region",
        categoryTitle: "数据中心",
        isFavourite: false,
      },
      {
        text: "可用区",
        to: "/internet-data-center/zone",
        categoryTitle: "数据中心",
        isFavourite: false,
      },
    ]);
  });
  it("should work width arrayMoveImmutable", () => {
    expect(arrayMoveImmutable([1, 2, 3, 4], 1, 3)).toEqual([1, 3, 4, 2]);
    expect(arrayMoveImmutable([1, 2, 3, 4], 2, 2)).toEqual([1, 2, 3, 4]);
    expect(arrayMoveImmutable([1, 2, 3, 4], 4, 5)).toEqual([1, 2, 3, 4]);
    expect(arrayMoveImmutable([1, 2, 3, 4], -1, 2)).toEqual([1, 2, 4, 3]);
    expect(arrayMoveImmutable([1, 2, 3, 4], 1, -1)).toEqual([1, 3, 4, 2]);
  });
  it("should work with removeItemFromList", () => {
    expect(
      removeItemFromList(favouriteMenus, {
        text: "阿里云·SSL证书",
        to: "network/ali-ssl",
      })
    ).toEqual([{ text: "腾讯云·云硬盘cbs", to: "storage/cbs" }]);
  });
  it("should work with QuickVisitMenu", () => {
    const wrapper = shallow(
      <QuickVisitMenu
        menu={menu}
        buttonName="快捷访问"
        handleMenuAdd={mockMenuAdd}
        handleMenuDrag={mockMenuDrag}
        handleMenuRemove={mockMenuRemove}
        handleMenuClick={mockMenuClick}
      />
    );
    expect(wrapper.find(Drawer).prop("visible")).toEqual(false);
    const content = wrapper.find('[data-testid="wrapper"]');
    content.simulate("mouseenter");
    expect(wrapper.find(Drawer).prop("visible")).toEqual(true);
    const menuContainer = wrapper.find(MenuContainer);
    menuContainer.invoke("handleMenuRemove")([{ text: "a" }, { text: "b" }]);
    expect(mockMenuRemove).toHaveBeenLastCalledWith([
      { text: "a" },
      { text: "b" },
    ]);
    content.simulate("mouseleave");
    wrapper.find(Drawer).invoke("onClose")({});
    expect(wrapper.find(Drawer).prop("visible")).toEqual(false);
  });
  it("should work when the window is small", () => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 300,
    });
    window.dispatchEvent(new Event("resize"));
    const wrapper = shallow(
      <QuickVisitMenu
        menu={menu}
        buttonName="快捷访问"
        handleMenuAdd={mockMenuAdd}
        handleMenuDrag={mockMenuDrag}
        handleMenuRemove={mockMenuRemove}
        handleMenuClick={mockMenuClick}
      />
    );
    expect(wrapper.find(Drawer).prop("height")).toEqual(226);
  });
  it("should work when the window is middle", () => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 500,
    });
    window.dispatchEvent(new Event("resize"));
    const wrapper = shallow(
      <QuickVisitMenu
        menu={menu}
        buttonName="快捷访问"
        handleMenuAdd={mockMenuAdd}
        handleMenuDrag={mockMenuDrag}
        handleMenuRemove={mockMenuRemove}
        handleMenuClick={mockMenuClick}
      />
    );
    expect(wrapper.find(Drawer).prop("height")).toEqual(276);
  });
  it("should work when the window is big", () => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1200,
    });
    window.dispatchEvent(new Event("resize"));
    const wrapper = shallow(
      <QuickVisitMenu
        menu={menu}
        buttonName="快捷访问"
        handleMenuAdd={mockMenuAdd}
        handleMenuDrag={mockMenuDrag}
        handleMenuRemove={mockMenuRemove}
        handleMenuClick={mockMenuClick}
      />
    );
    expect(wrapper.find(Drawer).prop("height")).toEqual(640);
  });
  it("should work with FavouriteMenu", () => {
    const wrapper1 = mount(
      <FavouriteMenu
        menus={favouriteMenus}
        handleMenuDrag={mockMenuDrag}
        handleMenuRemove={mockMenuRemove}
        handleMenuClick={mockMenuClick}
      />
    );
    const tag = wrapper1.find(".textContainer");
    expect(tag).toHaveLength(2);
    tag.at(0).simulate("click");
    expect(mockMenuClick).toHaveBeenLastCalledWith({
      text: "腾讯云·云硬盘cbs",
      to: "storage/cbs",
    });
    const removeBtn = wrapper1.find(".anticon-close");
    expect(removeBtn).toHaveLength(2);
    removeBtn.at(1).simulate("click");
    expect(mockMenuRemove).toHaveBeenLastCalledWith([
      {
        text: "腾讯云·云硬盘cbs",
        to: "storage/cbs",
      },
    ]);
  });
  it("should work with MenuTag", () => {
    const menu = { text: "阿里云·云盘", to: "storage-drm/ali-dick" };
    const wrapper = mount(
      <MenuTag
        menu={menu}
        handleCollect={mockMenuAdd}
        handleMenuClick={mockMenuClick}
        handleMenuRemove={mockMenuRemove}
      />
    );
    expect(wrapper.find(Tooltip).at(0).prop("trigger")).toEqual([]);
    wrapper.find(StarOutlined).simulate("click");
    expect(mockMenuAdd).toBeCalledWith(menu);
    expect(wrapper.find(StarFilled)).toHaveLength(1);
    wrapper.find(StarFilled).simulate("click");
    expect(mockMenuRemove).toBeCalledWith(menu);
    const textContainer = wrapper.find(".textContainer");
    expect(textContainer).toHaveLength(1);
    textContainer.simulate("click");
    expect(mockMenuClick).toBeCalledWith(menu);
    wrapper.setProps({
      menu: { text: "阿里云·云盘abcdefgabcdefgabcdefg", to: menu.to },
    });
    wrapper.update();
    expect(wrapper.find(Tooltip).at(0).prop("trigger")).toBe("hover");
  });
  it("should work with MenuContainer", () => {
    const wrapper = mount(
      <MenuContainer
        allMenus={flattenMenus(menu)}
        favouriteMenus={[]}
        handleMenuAdd={mockMenuAdd}
        handleMenuRemove={mockMenuRemove}
        handleMenuClick={mockMenuClick}
        handleMenuDrag={mockMenuDrag}
      />
    );
    const searchInput = wrapper.find(Input);
    expect(wrapper.find(MenuTag)).toHaveLength(0);
    expect(wrapper.find(".favouriteEmpty")).toHaveLength(1);
    searchInput.invoke("onChange")({ target: { value: "s" } });
    expect(wrapper.find(".favouriteEmpty")).toHaveLength(0);
    const tags = wrapper.find(MenuTag);
    expect(tags).toHaveLength(4);
    const mssqlMenu = {
      categoryTitle: "服务",
      groupTitle: "数据库",
      isFavourite: false,
      text: "MsSQL",
      to: "database/mssql",
    };
    tags.at(3).invoke("handleCollect")(mssqlMenu);
    expect(mockMenuAdd).toHaveBeenLastCalledWith([mssqlMenu]);
    tags.at(3).invoke("handleMenuRemove")(mssqlMenu);
    expect(mockMenuRemove).toHaveBeenLastCalledWith([]);
    searchInput.invoke("onChange")({ target: { value: "" } });
    expect(wrapper.find(MenuTag)).toHaveLength(0);
    wrapper.setProps({ favouriteMenus });
    wrapper.update();
    const favourite = wrapper.find(FavouriteMenu);
    expect(favourite).toHaveLength(1);
    favourite.invoke("handleMenuClick")([
      { text: "阿里云·SSL证书", to: "network/ali-ssl" },
    ]);
    expect(mockMenuClick).toHaveBeenLastCalledWith([
      { text: "阿里云·SSL证书", to: "network/ali-ssl" },
    ]);
    favourite.invoke("handleMenuDrag")(
      [
        { text: "阿里云·SSL证书", to: "network/ali-ssl" },
        { text: "腾讯云·云硬盘cbs", to: "storage/cbs" },
      ],
      1,
      2
    );
    expect(mockMenuDrag).toBeCalledTimes(1);
    favourite.invoke("handleMenuDrag")(
      [
        { text: "腾讯云·云硬盘cbs", to: "storage/cbs" },
        { text: "阿里云·SSL证书", to: "network/ali-ssl" },
      ],
      1,
      1
    );
    expect(mockMenuDrag).toBeCalledTimes(1);

    // expect(mockMenuDrag).toBeCalledTimes(2);
    favourite.invoke("handleMenuRemove")([
      { text: "阿里云·SSL证书", to: "network/ali-ssl" },
    ]);
    expect(mockMenuRemove).toHaveBeenLastCalledWith([
      { text: "阿里云·SSL证书", to: "network/ali-ssl" },
    ]);
    expect(wrapper.find(".favouriteEmpty")).toHaveLength(0);
    searchInput.invoke("onChange")({ target: { value: "s" } });

    // expect(wrapper.find('[data-testid="quick-visit"]')).toHaveLength(0);
  });
  it("should work with searchMenu", () => {
    const allMenus = flattenMenus(menu2);
    expect(searchMenu(allMenus, "")).toEqual([]);
    expect(searchMenu(allMenus, "地")).toEqual([
      {
        text: "地域",
        to: "/internet-data-center/region",
        categoryTitle: "数据中心",
        isFavourite: false,
      },
    ]);
    expect(searchMenu(allMenus, "可用区")).toEqual([
      {
        text: "可用区",
        to: "/internet-data-center/zone",
        categoryTitle: "数据中心",
        isFavourite: false,
      },
    ]);
  });
  it("should work with menuIsSame", () => {
    expect(
      menuIsSame(
        { text: "cbs", href: "storage/cbs", to: "" },
        { text: "cbs", href: "storage/cbs", to: "" }
      )
    ).toBeTruthy();
    expect(
      menuIsSame(
        { text: "cbs", href: "", to: "storage/cbs" },
        { text: "cbs", href: "", to: "storage/cbs" }
      )
    ).toBeTruthy();
    expect(
      menuIsSame(
        { text: "cbs", href: "", to: "storage/cbs" },
        { text: "cbs", href: "storage/cbs", to: "" }
      )
    ).toBeFalsy();
    expect(
      menuIsSame(
        { text: "cb1", href: "", to: "storage/cbs" },
        { text: "cb2", href: "", to: "storage/cbs" }
      )
    ).toBeFalsy();
  });
  it("should work with flagFavourite", () => {
    // { text: "腾讯云·云硬盘cbs", to: "storage/cbs" },
    // { text: "阿里云·SSL证书", to: "network/ali-ssl" },
    expect(
      flagFavourite(favouriteMenus, {
        text: "腾讯云·云硬盘cbs",
        to: "storage/cbs",
      })
    ).toBeTruthy();
    expect(
      flagFavourite([], { text: "腾讯云·云硬盘cbs", to: "storage/cbs" })
    ).toBeFalsy();
  });
});
