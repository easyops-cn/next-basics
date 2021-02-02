import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { MyDesktop } from "./MyDesktop";
import { DesktopCell } from "../DesktopCell/DesktopCell";
import { FavoriteDesktopCell } from "../FavoriteDesktopCell/FavoriteDesktopCell";
import { launchpadService } from "../LaunchpadService";

const favoriteList = [
  {
    launchpadCollection: {
      instanceId: "5b8ee4e5c352c",
      type: "microApp",
      name: "开发者中心",
      icon: {
        type: "",
        theme: "",
        icon: "developers",
        lib: "easyops",
        category: "app",
        prefix: "",
      },
      link: "/developers",
    },
    microAppId: "developers",
    customItemId: "",
  },
];

jest.mock("@next-libs/basic-components", () => {
  return {
    Link: function Link() {
      return <div>Link</div>;
    },
    GeneralIcon: function GeneralIcon() {
      return <div>GeneralIcon</div>;
    },
  };
});
jest.mock("../LaunchpadService", () => {
  return {
    launchpadService: {
      fetchFavoriteList: () => {
        return [
          {
            launchpadCollection: {
              instanceId: "5b8ee4e5c352c",
              type: "microApp",
              name: "开发者中心",
              icon: {
                type: "",
                theme: "",
                icon: "developers",
                lib: "easyops",
                category: "app",
                prefix: "",
              },
              link: "/developers",
            },
            microAppId: "developers",
            customItemId: "",
          },
        ];
      },
      isFavorite: () => true,
      deleteFavorite: jest.fn(),
      getAllVisitors: () => {
        return [
          {
            id: "search",
            app: {
              name: "搜索中心",
              icons: { large: "icons/large.png" },
              localeName: "搜索中心",
              id: "search",
              homepage: "/search",
            },
            type: "app",
          },
          {
            id: "architecture",
            app: {
              name: "业务架构图",
              icons: null,
              localeName: "业务架构图",
              id: "architecture",
              homepage: "/architecture",
            },
            type: "app",
          },
          {
            id: "message-subscribe",
            app: {
              name: "消息订阅",
              icons: { large: "icons/large.png" },
              localeName: "消息订阅",
              id: "message-subscribe",
              homepage: "/message-subscribe",
            },
            type: "app",
          },
          {
            id: "developers",
            app: {
              name: "开发者中心",
              icons: { large: "icons/large.png" },
              localeName: "开发者中心",
              id: "developers",
              homepage: "/developers",
            },
            type: "app",
          },
          {
            type: "custom",
            id: "testnew",
            name: "新自定义项",
            position: 0,
            url: "https://www.yuque.com/uwintech",
            items: [],
          },
        ];
      },
    },
  };
});
describe("MyDesktop", () => {
  it("should work", async () => {
    const wrapper = mount(<MyDesktop desktopCount={2} arrowWidthPercent={9} />);
    await act(async() => {
      await (global as any).flushPromises();
    })
    wrapper.update();
    expect(wrapper.find(DesktopCell)).toHaveLength(5);
    expect(wrapper.find("DesktopCell").at(0).props()).toMatchObject({
      item: {
        id: "search",
        app: {
          name: "搜索中心",
          icons: { large: "icons/large.png" },
          localeName: "搜索中心",
          id: "search",
          homepage: "/search",
        },
        type: "app",
      },
      position: "left",
      showAddIcon: true,
    });

    await act(async() => {
      await (global as any).flushPromises();
    })
    wrapper.update();

    expect(wrapper.find(FavoriteDesktopCell)).toHaveLength(1);

    wrapper.find(FavoriteDesktopCell).at(0).invoke("onDelete")(favoriteList[0]);
    expect(launchpadService.deleteFavorite).toHaveBeenCalledWith(
      "5b8ee4e5c352c"
    );
    await act(async() => {
      await (global as any).flushPromises();
    })
  });
});
