import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import { Dropdown, Avatar, Menu } from "antd";
import * as brickKit from "@next-core/brick-kit";
import { UserAdminApi_getUserInfoV2 } from "@next-sdk/user-service-sdk";
import { CustomerApi_getExpiration } from "@next-sdk/air-admin-service-sdk";
import { Link } from "@next-libs/basic-components";
import { AppBar } from "./AppBar";
import { LaunchpadButton } from "../LaunchpadButton/LaunchpadButton";
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
});

const getFeatureFlags = jest.fn().mockReturnValue({});
const getMicroApps = jest
  .fn()
  .mockReturnValueOnce([])
  .mockReturnValue([
    {
      id: "cmdb-account-setting",
    },
  ]);

jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  getBrandSettings: () => ({
    base_title: "DevOps 管理专家",
  }),

  getFeatureFlags,
  getMicroApps,
} as any);

delete window.location;
window.location = {
  reload: jest.fn(),
} as unknown as Location;

describe("AppBar", () => {
  afterEach(() => {
    document.title = "";
  });

  it("should render default avatar", () => {
    const wrapper = shallow(<AppBar pageTitle="" breadcrumb={null} />);
    expect(wrapper.find(Avatar).prop("size")).toBe("small");
    function Icon(): React.ReactElement {
      return wrapper.find(Avatar).prop("icon") as React.ReactElement;
    }
    const icon = shallow(<Icon />);
    expect(icon.find(UserOutlined).length).toBe(1);
  });

  it("should render user avatar", async () => {
    const wrapper = mount(<AppBar pageTitle="" breadcrumb={null} />);
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
    const wrapper = shallow(<AppBar pageTitle="Hello" breadcrumb={null} />);
    (
      wrapper.find(Dropdown).prop("overlay") as React.ReactElement
    ).props.children[1].props.onClick();
    expect(spyOnHistoryReplace).toBeCalledWith("/auth/logout");
  });

  it("should handle sso logout", () => {
    getFeatureFlags.mockReturnValue({ "sso-enabled": true });
    const wrapper = shallow(<AppBar pageTitle="Hello" breadcrumb={null} />);
    (
      wrapper.find(Dropdown).prop("overlay") as React.ReactElement
    ).props.children[1].props.onClick();
    expect(spyOnHistoryReplace).toBeCalledWith("/sso-auth/logout");
  });

  it("should handle redirectToMe", async () => {
    const wrapper = mount(<AppBar pageTitle="Hello" breadcrumb={null} />);
    await act(async () => {
      await (global as any).flushPromises();
    });
    (
      wrapper.find(Dropdown).prop("overlay") as React.ReactElement
    ).props.children[0].props.onClick();
    expect(spyOnHistoryPush).toBeCalledWith("/account-setting");
  });

  it("should render when user is not logged in.", () => {
    jest.spyOn(brickKit, "getAuth").mockReturnValueOnce({
      username: undefined,
    });

    const wrapper = shallow(<AppBar pageTitle="" breadcrumb={null} />);
    expect(wrapper.find(Avatar).length).toBe(0);
    expect(wrapper.find(".appBar").childAt(1).find(Link).prop("to")).toBe(
      "/auth/login"
    );
  });

  it("should set page title", async () => {
    mount(
      <AppBar
        pageTitle="Hello"
        breadcrumb={[
          {
            text: "First",
            to: "/first",
          },

          {
            text: "Second",
          },
        ]}
      />
    );

    await act(async () => {
      await (global as any).flushPromises();
    });
    expect(document.title === "Hello - DevOps 管理专家");
  });

  it("should set page title when it's empty", async () => {
    mount(<AppBar pageTitle="" breadcrumb={null} />);
    await act(async () => {
      await (global as any).flushPromises();
    });
    expect(document.title === "DevOps 管理专家");
  });

  it("should hide-launchpad-button", () => {
    getFeatureFlags.mockReturnValueOnce({ "hide-launchpad-button": true });
    const wrapper = shallow(<AppBar pageTitle="" breadcrumb={null} />);
    expect(wrapper.find(LaunchpadButton).length).toBe(0);
  });

  it("should detect license expires", async () => {
    getFeatureFlags.mockImplementation(() => ({
      "license-expires-detection": true,
    }));
    const wrapper = mount(<AppBar pageTitle="" breadcrumb={null} />);
    await act(async () => {
      await (global as any).flushPromises();
    });
    expect(CustomerApi_getExpiration).toHaveBeenCalled();
  });

  it("should handle language change", async () => {
    getFeatureFlags.mockImplementation(() => ({
      "switch-language": true,
    }));
    const wrapper = mount(<AppBar pageTitle="" breadcrumb={null} />);
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
    const wrapper = mount(<AppBar pageTitle="" breadcrumb={null} />);
    const dropdown = wrapper.find(Dropdown);
    const submenu = shallow(<div>{dropdown.prop("overlay")}</div>);
    expect(submenu.find('[data-testid="menu-item-logout"]').length).toBe(0);
  });

  it("should not hide logout", async () => {
    getFeatureFlags.mockImplementation(() => ({
      "next-hide-logout": false,
    }));
    const wrapper = mount(<AppBar pageTitle="" breadcrumb={null} />);
    const dropdown = wrapper.find(Dropdown);
    const submenu = shallow(<div>{dropdown.prop("overlay")}</div>);
    expect(submenu.find('[data-testid="menu-item-logout"]').length).toBe(1);
  });
});
