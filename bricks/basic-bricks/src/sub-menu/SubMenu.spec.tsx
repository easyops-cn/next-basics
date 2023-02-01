import React from "react";
import { mount, shallow } from "enzyme";
import { SubMenu } from "./SubMenu";
import * as brickKit from "@next-core/brick-kit";

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {},
  listen: () => {
    // do somthing
  },
  createHref: () => {
    // do somthing
  },
} as any);

describe("SubMenu", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", () => {
    const dataSource = {
      title: "IP网段管理",
      menuItems: [
        {
          type: "default",
          text: "基本信息",
          to: "/contract/subMenu",
          exact: true,
        },
        {
          type: "group",
          title: "资源关系",
          items: [
            {
              text: "所在机柜",
              to: "/contract/subMenu/host",
            },
            {
              text: "运维人员",
              to: "/contract/subMenu/person",
            },
          ],
        },
      ],
    };
    const wrapper = shallow(
      <SubMenu
        dataSource={dataSource}
        topOperationConf={{ useBrick: { brick: "span" } }}
      />
    );
    expect(wrapper.find(".header").children().length).toBe(2);
  });
  it("should work isThirdLevel and isShowTooltip", async () => {
    const dataSource = {
      title: "easyops.api.event_center",
      menuItems: [
        {
          _object_id: "EASYOPS_STORYBOARD_MENU_ITEM",
          _object_version: 27,
          _ts: 1675161017,
          _version: 1,
          activeMatchSearch: false,
          creator: "easyops",
          ctime: "2023-01-31 18:30:17",
          defaultExpanded: false,
          exact: false,
          icon: {
            category: "patch-manager",
            icon: "patch-list",
            lib: "easyops",
          },
          instanceId: "5f38cd1641b9f",
          org: 8888,
          sort: 100,
          text: "基本信息",
          to: "/network-drm/service-name/instance/5f1933e6e75fd/basic",
          type: "default",
          key: "0",
        },
      ],
      defaultCollapsedBreakpoint: 0,
    };
    const wrapper = mount(
      <SubMenu
        dataSource={dataSource}
        topOperationConf={{ useBrick: { brick: "span" } }}
        isThirdLevel={true}
      />
    );
    await (global as any).flushPromises();
    expect(wrapper.find(".header").children().length).toBe(2);
    expect(wrapper.find(".isThirdLevelHeaderTitle").length).toBe(1);
    expect(wrapper.find(".headerTitle").length).toBe(0);
    expect(wrapper.find("Tooltip").at(0).prop("title")).toBe("");
    expect(wrapper.find(".isThirdLevelHeaderTitle").text()).toBe(
      dataSource.title
    );
  });
});
