import React from "react";
import { mount, shallow } from "enzyme";
import { createLocation } from "history";
import { Form } from "@ant-design/compatible";
import { Card, Modal, Tabs } from "antd";
import * as kit from "@next-core/brick-kit";
import * as authSdk from "@next-sdk/auth-sdk";
import * as apiGatewaySdk from "@next-sdk/api-gateway-sdk";
import { LegacyGeneralLogin, lastLoginMethod } from "./GeneralLogin";
import { WithTranslation } from "react-i18next";
import { JsonStorage } from "@next-libs/storage";

const spyOnHistoryPush = jest.fn();
const spyOnGetHistory = jest.spyOn(kit, "getHistory");
jest.mock("@next-libs/storage");

const spyOnAuthenticate = jest.spyOn(kit, "authenticate");
const spyOnHandleHttpError = jest.spyOn(kit, "handleHttpError");
const spyOnReloadMicroApps = jest.fn();
const spyOnReloadSharedData = jest.fn();
const brandFn = jest.fn().mockReturnValue({});

const spyOnLogin = jest.spyOn(apiGatewaySdk, "AuthApi_loginV2");
const spyOnEsbLogin = jest.spyOn(authSdk, "esbLogin");
const spyOnMFALogin = jest.spyOn(
  apiGatewaySdk,
  "MfaApi_generateRandomTotpSecret"
);
const spyOnMFASetRule = jest.spyOn(apiGatewaySdk, "MfaApi_verifyUserIsSetRule");
const spyOnError = jest.spyOn(Modal, "error");
const spyOnKit = jest.spyOn(kit, "getRuntime");
spyOnKit.mockReturnValue({
  reloadMicroApps: spyOnReloadMicroApps,
  reloadSharedData: spyOnReloadSharedData,
  getBrandSettings: brandFn,
  getFeatureFlags: () => ({
    "forgot-password-enabled": true,
    "sign-up-for-free-enabled": true,
  }),
  getMiscSettings: () => ({
    wxAppid: "abc",
    wxAgentid: "abc",
    wxRedirect: "http://example.com",
    enabled_login_types: ["easyops", "ldap"],
  }),
  getBasePath: () => "/",
} as any);

const i18nProps: WithTranslation = {
  t: ((key: string) => key) as any,
  i18n: {
    language: "zh-CN",
  } as any,
  tReady: null,
};
const timeStamp = Date.now();
const storage = {
  LAST_LOGIN_METHOD: "ldap",
  LAST_LOGIN_TIME: timeStamp,
} as any;
(JsonStorage as jest.Mock).mockImplementation(() => {
  return {
    getItem: (key: string): string => {
      return storage[key];
    },
    setItem: (key: string, value: string): void => {
      storage[key] = value;
    },
  };
});
describe("GeneralLogin", () => {
  afterEach(() => {
    spyOnLogin.mockReset();
    spyOnGetHistory.mockReset();
    spyOnHistoryPush.mockClear();
    spyOnAuthenticate.mockClear();
    spyOnReloadMicroApps.mockClear();
    spyOnReloadSharedData.mockClear();
    spyOnError.mockClear();
    spyOnHandleHttpError.mockClear();
    spyOnKit.mockClear();
    spyOnEsbLogin.mockClear();
  });

  it("should login successfully", (done) => {
    spyOnGetHistory.mockReturnValue({
      location: {
        state: {
          from: createLocation("/mock-from"),
        },
      },
      push: spyOnHistoryPush,
    } as any);
    const form = {
      getFieldDecorator: () => (comp: React.Component) => comp,
      validateFields: jest.fn().mockImplementation(async (fn) => {
        await fn(null, {
          username: "mock-user",
          password: "mock-pswd",
        });
        expect(spyOnAuthenticate).toBeCalledWith({
          org: 1,
          username: "mock-user",
          userInstanceId: "abc",
          accessRule: "cmdb",
        });
        expect(spyOnReloadMicroApps).toBeCalled();
        expect(spyOnReloadSharedData).toBeCalled();
        expect(spyOnHistoryPush).toBeCalledWith(createLocation("/mock-from"));
        done();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.find(Card).find(Tabs).prop("activeKey")).toEqual("ldap");
    wrapper.find(Tabs).prop("onChange")("easyops");
    spyOnLogin.mockResolvedValueOnce({
      loggedIn: true,
      username: "mock-user",
      userInstanceId: "abc",
      org: 1,
      accessRule: "cmdb",
    });
    wrapper.find(Form).at(1).simulate("submit", new Event("submit"));
    expect(spyOnLogin).toHaveBeenCalled();
    expect(storage["LAST_LOGIN_METHOD"]).toEqual("easyops");
    expect(storage["LAST_LOGIN_TIME"]).toEqual(timeStamp);
  });
  it("should work when last login method doesn't exist in misc", (done) => {
    spyOnGetHistory.mockReturnValue({
      location: {
        state: {
          from: createLocation("/mock-from"),
        },
      },
      push: spyOnHistoryPush,
    } as any);
    const invalidStorage = {
      LAST_LOGIN_METHOD: "wx",
      LAST_LOGIN_TIME: timeStamp,
    } as any;
    (JsonStorage as jest.Mock).mockImplementation(() => {
      return {
        getItem: (key: string): string => {
          return invalidStorage[key];
        },
        setItem: (key: string, value: string): void => {
          invalidStorage[key] = value;
        },
      };
    });
    const form = {
      getFieldDecorator: () => (comp: React.Component) => comp,
      validateFields: jest.fn().mockImplementation(async (fn) => {
        await fn(null, {
          username: "mock-user",
          password: "mock-pswd",
        });
        expect(spyOnAuthenticate).toBeCalledWith({
          org: 1,
          username: "mock-user",
          userInstanceId: "abc",
          accessRule: "cmdb",
        });
        expect(spyOnReloadMicroApps).toBeCalled();
        expect(spyOnReloadSharedData).toBeCalled();
        expect(spyOnHistoryPush).toBeCalledWith(createLocation("/mock-from"));
        done();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.find(Card).find(Tabs).prop("activeKey")).toEqual("easyops");
    spyOnLogin.mockResolvedValueOnce({
      loggedIn: true,
      username: "mock-user",
      userInstanceId: "abc",
      org: 1,
      accessRule: "cmdb",
    });
    wrapper.find(Form).at(1).simulate("submit", new Event("submit"));
  });
  it("should esb login successfully", (done) => {
    spyOnGetHistory.mockReturnValue({
      location: {
        state: {
          from: createLocation("/mock-from"),
        },
      },
      push: spyOnHistoryPush,
    } as any);
    const form = {
      getFieldDecorator: () => (comp: React.Component) => comp,
      validateFields: jest.fn().mockImplementation(async (fn) => {
        await fn(null, {
          username: "mock-user",
          password: "mock-pswd",
        });
        expect(spyOnAuthenticate).toBeCalledWith({
          org: 1,
          username: "mock-user",
          userInstanceId: "abc",
        });
        expect(spyOnReloadMicroApps).toBeCalled();
        expect(spyOnReloadSharedData).toBeCalled();
        expect(spyOnHistoryPush).toBeCalledWith(createLocation("/mock-from"));
        done();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    expect(wrapper).toBeTruthy();
    spyOnEsbLogin.mockResolvedValueOnce({
      loggedIn: true,
      username: "mock-user",
      userInstanceId: "abc",
      org: 1,
    });
    spyOnKit.mockReturnValueOnce({
      getFeatureFlags: () => ({
        "esb-login": true,
      }),
    } as any);
    wrapper.find(Form).at(0).simulate("submit", new Event("submit"));
  });
  it("should work when open mfa ", (done) => {
    spyOnGetHistory.mockReturnValueOnce({
      location: {
        state: {
          from: createLocation("/mock-from"),
        },
      },
      push: spyOnHistoryPush,
    } as any);
    const form = {
      getFieldDecorator: () => (comp: React.Component) => comp,
      validateFields: jest.fn().mockImplementation(async (fn) => {
        await fn(null, {
          username: "mock-user",
          password: "mock-pswd",
        });
        done();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    expect(wrapper).toBeTruthy();
    spyOnLogin.mockResolvedValueOnce({
      loggedIn: false,
      username: "mock-user",
      userInstanceId: "abc",
      org: 1,
    });
    spyOnMFALogin.mockResolvedValueOnce({
      totpSecret: "xxx",
      secret: "xxx",
    });
    spyOnMFASetRule.mockResolvedValueOnce({
      isSet: true,
    });
    spyOnKit.mockReturnValueOnce({
      getFeatureFlags: () => ({
        factors: true,
      }),
    } as any);
    wrapper.find(Form).at(0).simulate("submit", new Event("submit"));
  });

  it("should login failed if give wrong password", async () => {
    spyOnGetHistory.mockReturnValueOnce({
      location: {
        state: {
          from: createLocation("/mock-from"),
        },
      },
      push: spyOnHistoryPush,
    } as any);
    expect.assertions(4);
    const form = {
      getFieldDecorator: () => (comp: React.Component) => comp,
      validateFields: jest.fn().mockImplementation(async (fn) => {
        await fn(null, {
          username: "mock-user",
          password: "wrong-pswd",
        });
        expect(spyOnAuthenticate).not.toBeCalled();
        expect(spyOnReloadMicroApps).not.toBeCalled();
        expect(spyOnReloadSharedData).not.toBeCalled();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    spyOnLogin.mockRejectedValue("用户名（邮箱）或密码错误");
    wrapper.find(Form).at(0).simulate("submit", new Event("submit"));
    await jest.runAllTimers();
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(".loginFormError").at(0).text()).toBe(
      "用户名（邮箱）或密码错误"
    );
  });

  it("should login failed if server error", (done) => {
    spyOnGetHistory.mockReturnValueOnce({
      location: {
        state: {
          from: createLocation("/mock-from"),
        },
      },
      push: spyOnHistoryPush,
    } as any);
    const form = {
      getFieldDecorator: () => (comp: React.Component) => comp,
      validateFields: jest.fn().mockImplementation(async (fn) => {
        await fn(null, {
          username: "mock-user",
          password: "mock-pswd",
        });
        expect(spyOnAuthenticate).not.toBeCalled();
        expect(spyOnReloadMicroApps).not.toBeCalled();
        expect(spyOnReloadSharedData).not.toBeCalled();
        done();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    spyOnLogin.mockRejectedValueOnce(new TypeError("oops"));
    wrapper.find(Form).at(0).simulate("submit", new Event("submit"));
  });

  it("should not login if form is invalid", (done) => {
    spyOnGetHistory.mockReturnValueOnce({
      location: {
        state: {
          from: createLocation("/mock-from"),
        },
      },
      push: spyOnHistoryPush,
    } as any);
    const form = {
      getFieldDecorator: () => (comp: React.Component) => comp,
      validateFields: jest.fn().mockImplementation(async (fn) => {
        await fn(new Error("mock error"));
        expect(spyOnLogin).not.toBeCalled();
        expect(spyOnAuthenticate).not.toBeCalled();
        expect(spyOnReloadMicroApps).not.toBeCalled();
        expect(spyOnReloadSharedData).not.toBeCalled();
        done();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    wrapper.find(Form).at(0).simulate("submit", new Event("submit"));
  });

  it("brand setting should work", (done) => {
    spyOnGetHistory.mockReturnValueOnce({
      location: {
        state: {
          from: createLocation("/mock-from"),
        },
      },
      push: spyOnHistoryPush,
    } as any);
    brandFn.mockReturnValue({ auth_logo_url: "/x/y/z" });
    const form = {
      getFieldDecorator: () => (comp: React.Component) => comp,
      validateFields: jest.fn().mockImplementation(async (fn) => {
        await fn(new Error("mock error"));
        expect(spyOnLogin).not.toBeCalled();
        expect(spyOnAuthenticate).not.toBeCalled();
        expect(spyOnReloadMicroApps).not.toBeCalled();
        expect(spyOnReloadSharedData).not.toBeCalled();
        done();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    expect(wrapper.find("img").first().prop("src")).toBe("/x/y/z");
    wrapper.find(Form).at(0).simulate("submit", new Event("submit"));
  });

  it("should login with cookie", (done) => {
    spyOnGetHistory.mockReturnValue({
      location: {
        state: undefined,
      },
      push: spyOnHistoryPush,
    } as any);
    const path = btoa("/mock-from-cookie");
    const query = btoa("a=b&c=d");
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: `SALOGINPATH=${path}; SALOGINQUERY=${query}`,
    });
    const form = {
      getFieldDecorator: () => (comp: React.Component) => comp,
      validateFields: jest.fn().mockImplementation(async (fn) => {
        await fn(null, {
          username: "mock-user",
          password: "mock-pswd",
        });
        expect(spyOnAuthenticate).toBeCalledWith({
          org: 1,
          username: "mock-user",
          userInstanceId: "abc",
          accessRule: "cmdb",
        });
        expect(spyOnReloadMicroApps).toBeCalled();
        expect(spyOnReloadSharedData).toBeCalled();
        expect(spyOnHistoryPush).toBeCalledWith(
          createLocation({
            pathname: "/mock-from-cookie",
            search: "a=b&c=d",
          })
        );
        done();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    expect(wrapper).toBeTruthy();
    spyOnLogin.mockResolvedValueOnce({
      loggedIn: true,
      username: "mock-user",
      userInstanceId: "abc",
      org: 1,
      accessRule: "cmdb",
    });
    wrapper.find(Form).at(1).simulate("submit", new Event("submit"));
    expect(spyOnLogin).toHaveBeenCalled();
    expect(storage["LAST_LOGIN_METHOD"]).toEqual("easyops");
    expect(storage["LAST_LOGIN_TIME"]).toEqual(timeStamp);
  });
});
