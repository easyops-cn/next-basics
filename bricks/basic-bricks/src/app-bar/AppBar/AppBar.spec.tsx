import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import * as brickKit from "@next-core/brick-kit";
import { UserAdminApi_getUserInfoV2 } from "@next-sdk/user-service-sdk";
import { CustomerApi_getExpiration } from "@next-sdk/air-admin-service-sdk";
import { AppBar } from "./AppBar";
import { LaunchpadButton } from "../LaunchpadButton/LaunchpadButton";

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
  getMiscSettings: () => ({}),
  getFeatureFlags,
  getMicroApps,
} as any);

jest.spyOn(brickKit, "useCurrentApp").mockReturnValue(null);

delete window.location;
window.location = {
  reload: jest.fn(),
} as unknown as Location;

describe("AppBar", () => {
  afterEach(() => {
    document.title = "";
    window.NO_AUTH_GUARD = true;
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
    mount(<AppBar pageTitle="" breadcrumb={null} />);
    await act(async () => {
      await (global as any).flushPromises();
    });
    expect(CustomerApi_getExpiration).toHaveBeenCalled();
  });
});
