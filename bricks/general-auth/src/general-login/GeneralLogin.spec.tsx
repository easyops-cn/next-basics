import React from "react";
import { shallow } from "enzyme";
import { createLocation } from "history";
import { Form } from "@ant-design/compatible";
import { Modal } from "antd";
import * as kit from "@next-core/brick-kit";
import * as authSdk from "@sdk/auth-sdk";
import { LegacyGeneralLogin } from "./GeneralLogin";
import { WithTranslation } from "react-i18next";

const spyOnHistoryPush = jest.fn();
jest.spyOn(kit, "getHistory").mockReturnValue({
  location: {
    state: {
      from: createLocation("/mock-from"),
    },
  },
  push: spyOnHistoryPush,
} as any);
const spyOnAuthenticate = jest.spyOn(kit, "authenticate");
const spyOnHandleHttpError = jest.spyOn(kit, "handleHttpError");
const spyOnReloadMicroApps = jest.fn();
const spyOnReloadSharedData = jest.fn();
const brandFn = jest.fn().mockReturnValue({});
jest.spyOn(kit, "getRuntime").mockReturnValue({
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
  }),
} as any);

const spyOnLogin = jest.spyOn(authSdk, "login");
const spyOnError = jest.spyOn(Modal, "error");

const i18nProps: WithTranslation = {
  t: ((key: string) => key) as any,
  i18n: {
    language: "zh-CN",
  } as any,
  tReady: null,
};

describe("GeneralLogin", () => {
  afterEach(() => {
    spyOnLogin.mockReset();
    spyOnHistoryPush.mockClear();
    spyOnAuthenticate.mockClear();
    spyOnReloadMicroApps.mockClear();
    spyOnReloadSharedData.mockClear();
    spyOnError.mockClear();
    spyOnHandleHttpError.mockClear();
  });

  it("should login successfully", async (done) => {
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
    spyOnLogin.mockResolvedValueOnce({
      loggedIn: true,
      username: "mock-user",
      userInstanceId: "abc",
      org: 1,
    });
    wrapper.find(Form).simulate("submit", new Event("submit"));
  });

  it("should login failed if give wrong password", async (done) => {
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
        done();
      }),
    };
    const wrapper = shallow(
      <LegacyGeneralLogin form={form as any} {...i18nProps} />
    );
    spyOnLogin.mockResolvedValueOnce({
      loggedIn: false,
    });
    wrapper.find(Form).simulate("submit", new Event("submit"));
    await jest.runAllTimers();
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(".loginFormError").text()).toBe("用户名或密码错误！");
  });

  it("should login failed if server error", (done) => {
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
    wrapper.find(Form).simulate("submit", new Event("submit"));
  });

  it("should not login if form is invalid", (done) => {
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
    wrapper.find(Form).simulate("submit", new Event("submit"));
  });

  it("brand setting should work", (done) => {
    brandFn.mockReturnValue({ menu_bar_logo_url: "/x/y/z" });
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
    wrapper.find(Form).simulate("submit", new Event("submit"));
  });
});
