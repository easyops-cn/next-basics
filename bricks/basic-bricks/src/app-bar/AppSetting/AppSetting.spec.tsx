import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import { Dropdown, Avatar, Menu } from "antd";
import * as brickKit from "@next-core/brick-kit";
import { UserAdminApi_getUserInfoV2 } from "@next-sdk/user-service-sdk";
import { Link } from "@next-libs/basic-components";
import { AppSetting } from "./AppSetting";
import { UserOutlined } from "@ant-design/icons";
import i18next from "i18next";

jest.mock("@next-sdk/user-service-sdk");
jest.mock("@next-sdk/air-admin-service-sdk");
jest.mock("../LaunchpadButton/LaunchpadButton");
jest.mock("../AppBarBreadcrumb/AppBarBreadcrumb");
jest.mock("../AppDocumentLink/AppDocumentLink");
jest.mock("i18next", () => ({
  language: "zh-CN",
  changeLanguage: jest.fn(),
}));

(UserAdminApi_getUserInfoV2 as jest.Mock).mockResolvedValue({
  user_icon: "avatar.png",
});

const spyOnHistoryReplace = jest.fn();
const spyOnHistoryPush = jest.fn();
jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {},
  replace: spyOnHistoryReplace,
  push: spyOnHistoryPush,
  createHref: () => "/oops",
} as any);

jest.spyOn(brickKit, "getAuth").mockReturnValue({
  username: "tester",
  userShowValue: ["easyops", "carrel"],
});

const getFeatureFlags = jest.fn().mockReturnValue({});
const getCurrentTheme = jest.fn().mockReturnValue("light");
// const getMicroApps = jest.fn().mockReturnValueOnce([]).mockReturnValue([{
//   id: "cmdb-account-setting",
// }])

const getMicroApps = jest.fn();

jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  getBrandSettings: () => ({
    base_title: "DevOps 管理专家",
  }),
  getMiscSettings: () => ({
    appsTheme: {
      supportedApps: ["apm", "events"],
    },
  }),
  getCurrentTheme,
  getFeatureFlags,
  getMicroApps,
} as any);

const useCurrentApp = jest
  .spyOn(brickKit, "useCurrentApp")
  .mockReturnValue(null);

delete window.location;
window.location = {
  reload: jest.fn(),
} as unknown as Location;

describe("AppBar", () => {
  beforeEach(() => {
    getMicroApps.mockImplementation(() => [
      {
        id: "cmdb-account-setting",
      },
    ]);
  });
  afterEach(() => {
    document.title = "";
    window.NO_AUTH_GUARD = false;
    window.STANDALONE_MICRO_APPS = false;
  });

  it("should render default avatar", () => {
    const wrapper = shallow(<AppSetting />);
    expect(wrapper.find(Avatar).prop("size")).toBe("small");
    function Icon(): React.ReactElement {
      return wrapper.find(Avatar).prop("icon") as React.ReactElement;
    }
    const icon = shallow(<Icon />);
    expect(icon.find(UserOutlined).length).toBe(1);
  });

  it("should render user avatar", async () => {
    const wrapper = mount(<AppSetting />);
    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.find(Avatar).props()).toMatchObject({
      size: "small",
      src: "avatar.png",
    });
  });

  it("should handle general logout", () => {
    getFeatureFlags.mockReturnValueOnce({ "sso-enabled": false });
    const wrapper = shallow(<AppSetting />);
    (
      wrapper.find(Dropdown).prop("overlay") as React.ReactElement
    ).props.children[1].props.onClick();
    expect(spyOnHistoryReplace).toBeCalledWith("/auth/logout");
  });

  it("should handle sso logout", () => {
    getFeatureFlags.mockReturnValue({ "sso-enabled": true });
    const wrapper = shallow(<AppSetting />);
    (
      wrapper.find(Dropdown).prop("overlay") as React.ReactElement
    ).props.children[1].props.onClick();
    expect(spyOnHistoryReplace).toBeCalledWith("/sso-auth/logout");
  });

  it("should handle redirectToMe", async () => {
    const wrapper = mount(<AppSetting />);
    await act(async () => {
      await (global as any).flushPromises();
    });
    (
      wrapper.find(Dropdown).prop("overlay") as React.ReactElement
    ).props.children[0].props.onClick();
    expect(spyOnHistoryPush).toBeCalledWith("/account-setting");
  });

  it("should render when userShowValue is exist", () => {
    const wrapper = shallow(<AppSetting />);
    expect(wrapper.find('[data-id="username-text"]').text()).toBe(
      "easyops(carrel)"
    );

    jest.spyOn(brickKit, "getAuth").mockReturnValue({
      username: "easyops",
      userShowValue: [],
    });
    const wrapper1 = shallow(<AppSetting />);
    expect(wrapper1.find('[data-id="username-text"]').text()).toBe("easyops");
  });
  it("should render when user is not logged in.", () => {
    jest.spyOn(brickKit, "getAuth").mockReturnValueOnce({
      username: undefined,
    });

    const wrapper = shallow(<AppSetting />);
    expect(wrapper.find(Avatar).length).toBe(0);
    expect(wrapper.find(Link).prop("to")).toBe("/auth/login");
  });

  it("should show customized logout when auth guard is ignored", async () => {
    window.NO_AUTH_GUARD = true;
    useCurrentApp.mockReturnValueOnce({
      config: {
        customizedLogOutPageInNoAuthGuardMode: "/my-logout",
      },
    } as any);
    const wrapper = shallow(<AppSetting />);
    expect(wrapper.find(Link).prop("to")).toBe("/my-logout");
  });

  it("should handle language change", async () => {
    getFeatureFlags.mockImplementation(() => ({
      "switch-language": true,
    }));
    const wrapper = mount(<AppSetting />);
    await act(async () => {
      await (global as any).flushPromises();
    });
    const switchLanguageBtn = (
      wrapper.find(Dropdown).prop("overlay") as React.ReactElement
    ).props.children[2].props.children[1];
    switchLanguageBtn.props.onClick();
    await (global as any).flushPromises();
    expect(i18next.language).toEqual("zh-CN");
    expect(i18next.changeLanguage).toHaveBeenCalledWith("en");
    expect(window.location.reload).toBeCalled();
    expect(switchLanguageBtn.props.children.props.placement).toBe("left");
    expect(switchLanguageBtn.props.children.props.title).toBe(
      "COVERT_TO_LANGUAGE"
    );
  });

  it("should hide logout", async () => {
    getFeatureFlags.mockImplementation(() => ({
      "next-hide-logout": true,
    }));
    const wrapper = mount(<AppSetting />);
    const dropdown = wrapper.find(Dropdown);
    const submenu = shallow(<div>{dropdown.prop("overlay")}</div>);
    expect(submenu.find('[data-testid="menu-item-logout"]').length).toBe(0);
  });

  it("should show account", async () => {
    const wrapper = mount(<AppSetting />);
    const dropdown = wrapper.find(Dropdown);
    const submenu = shallow(<div>{dropdown.prop("overlay")}</div>);
    expect(submenu.find('[data-testid="menu-account-entry"]').length).toBe(1);
  });

  it("should hide account if has no cmdb-account-setting", async () => {
    getMicroApps.mockImplementation(() => []);
    const wrapper = mount(<AppSetting />);
    const dropdown = wrapper.find(Dropdown);
    const submenu = shallow(<div>{dropdown.prop("overlay")}</div>);
    expect(submenu.find('[data-testid="menu-account-entry"]').length).toBe(0);
  });

  it("should show account even if has no cmdb-account-setting, standalone mode", async () => {
    window.STANDALONE_MICRO_APPS = true;
    getMicroApps.mockImplementation(() => []);
    const wrapper = mount(<AppSetting />);
    const dropdown = wrapper.find(Dropdown);
    const submenu = shallow(<div>{dropdown.prop("overlay")}</div>);
    expect(submenu.find('[data-testid="menu-account-entry"]').length).toBe(1);
  });

  it("should hide account if flag is set", async () => {
    getFeatureFlags.mockImplementation(() => ({
      "next-hide-my-account": true,
    }));
    const wrapper = mount(<AppSetting />);
    const dropdown = wrapper.find(Dropdown);
    const submenu = shallow(<div>{dropdown.prop("overlay")}</div>);
    expect(submenu.find('[data-testid="menu-account-entry"]').length).toBe(0);
  });

  it("should not hide logout", async () => {
    getFeatureFlags.mockImplementation(() => ({
      "next-hide-logout": false,
    }));
    const wrapper = mount(<AppSetting />);
    const dropdown = wrapper.find(Dropdown);
    const submenu = shallow(<div>{dropdown.prop("overlay")}</div>);
    expect(submenu.find('[data-testid="menu-item-logout"]').length).toBe(1);
  });

  it("should show no customized logout when auth guard is ignored", async () => {
    window.NO_AUTH_GUARD = true;
    const wrapper = shallow(<AppSetting />);
    expect(wrapper.find(".actionsContainer").find(Link).length).toBe(0);
  });

  it("should work with dark mode", () => {
    getFeatureFlags.mockReturnValue({
      "switch-theme": true,
    });
    const spyOnBatchSetAppsLocalTheme = jest.spyOn(
      brickKit,
      "batchSetAppsLocalTheme"
    );
    useCurrentApp.mockReturnValue({
      id: "apm",
      name: "apm",
      homepage: "/apm",
    });

    const wrapper = mount(<AppSetting />);
    const dropdown = wrapper.find(Dropdown);
    const submenu = shallow(<div>{dropdown.prop("overlay")}</div>);

    submenu.find(Menu.Item).last().invoke("onClick")(null);
    expect(spyOnBatchSetAppsLocalTheme.mock.calls[0][0]).toEqual({
      apm: "light",
      events: "light",
    });
  });
});
