import React from "react";
import { shallow } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { SidebarMenu } from "@next-core/brick-types";
import { AppMenu, getRelatedAppsByPath } from "./AppMenu";

jest.spyOn(kit, "useCurrentApp").mockReturnValue({
  id: "hello"
} as any);

jest.spyOn(kit, "useLocation").mockReturnValue({
  pathname: "/hello"
} as any);

jest.spyOn(kit, "getRuntime").mockReturnValue({
  getRelatedAppsAsync: jest.fn().mockResolvedValue([])
} as any);

describe("AppMenu", () => {
  const menu: SidebarMenu = {
    title: "Great",
    menuItems: [
      {
        text: "for-good",
        to: "/for/good"
      },
      {
        type: "default",
        text: "for-better",
        to: {
          pathname: "/for-better",
          search: "?even-more"
        }
      },
      {
        type: "group",
        title: "grouped",
        items: [
          {
            text: "for-perfect",
            to: "/for/perfect",
            icon: {
              lib: "antd",
              type: "up"
            }
          }
        ]
      }
    ],
    showRelatedApps: true
  };

  it("should work", () => {
    const wrapper = shallow(<AppMenu menu={{ ...menu, link: "/mock-link" }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when collapsed", () => {
    const wrapper = shallow(<AppMenu menu={menu} collapsed={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render nothing if menu is falsy", () => {
    const wrapper = shallow(<AppMenu menu={undefined} />);
    expect(wrapper.html()).toBe(null);
  });

  it("getRelatedAppsByPath should be ok", () => {
    const relatedApps = [
      {
        default: "true",
        homepage: "/mysql-service/resource",
        microAppId: "mysql-resource",
        microAppName: "MySQL资源管理",
        name: "MySQL资源管理",
        objectId: "MYSQL_SERVICE",
        order: 1,
        status: "enabled",
        subPath: "/mysql-service/resource/${instanceId}",
        tags: ["mysql"]
      },
      {
        default: "false",
        homepage: "/mysql-service/monitor",
        microAppId: "mysql-monitor",
        microAppName: "MySQL监控管理",
        name: "MySQL监控管理",
        objectId: "MYSQL_SERVICE",
        order: 2,
        status: "enabled",
        subPath: "/mysql-service/monitor/${instanceId}",
        tags: ["mysql"]
      }
    ] as any[];
    const tmp = getRelatedAppsByPath(
      relatedApps,
      "/mysql-service/resource/592e7593172f7/detail"
    );
    expect(tmp.matchResult).not.toBeNull();
    expect(tmp.prependApps).toEqual([]);
    expect(tmp.appendApps[0].microAppId).toBe("mysql-monitor");
    const tmp2 = getRelatedAppsByPath(
      relatedApps,
      "/mysql-service/monitor/592e7593172f7/cluster-monitor"
    );
    expect(tmp2.matchResult).not.toBeNull();
    expect(tmp2.prependApps[0].microAppId).toBe("mysql-resource");
    expect(tmp2.appendApps).toEqual([]);
    const tmp3 = getRelatedAppsByPath(relatedApps, "/mysql-service");
    expect(tmp3.matchResult).toBeNull();
  });
});
