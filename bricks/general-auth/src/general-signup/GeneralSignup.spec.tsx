import React, { ChangeEvent } from "react";
import { shallow, mount } from "enzyme";
import { createLocation } from "history";
import { GeneralSignup } from "./GeneralSignup";
import { Button, Input, Modal, Form } from "antd";
import * as kit from "@next-core/brick-kit";
import * as userServiceSdk from "@next-sdk/user-service-sdk";
import * as airAdminServiceSdk from "@next-sdk/air-admin-service-sdk";
import * as apiGatewaySdk from "@next-sdk/api-gateway-sdk";

const brandFn = jest.fn().mockReturnValue({});
const spyOnKit = jest.spyOn(kit, "getRuntime");
const spyOnHistoryPush = jest.fn();

const spyOnAuthenticate = jest.spyOn(kit, "authenticate");
const spyOnHandleHttpError = jest.spyOn(kit, "handleHttpError");
const spyOnReloadMicroApps = jest.fn();
const spyOnReloadSharedData = jest.fn();
const spyOnError = jest.spyOn(Modal, "error");
const spyOnCommonRegister = jest.spyOn(apiGatewaySdk, "OrgApi_saaSOrgRegister");
const spyOnJoinRegister = jest.spyOn(apiGatewaySdk, "AuthApi_register");

jest.spyOn(kit, "getHistory").mockReturnValue({
  location: {
    state: {
      from: createLocation("/mock-from"),
    },
  },
  push: spyOnHistoryPush,
  createHref: jest.fn(),
} as any);
spyOnKit.mockReturnValue({
  reloadMicroApps: spyOnReloadMicroApps,
  reloadSharedData: spyOnReloadSharedData,
  getBrandSettings: brandFn,
  getFeatureFlags: () => ({
    "enable-backend-password-config": true,
  }),
} as any);
const spyOnGetPasswordConfig = jest.spyOn(
  userServiceSdk,
  "UserAdminApi_getPasswordConfig"
);
spyOnGetPasswordConfig.mockResolvedValue({
  description: "test",
  regex: "/^abc$/",
});
const spyOnGetVerifyCode = jest.spyOn(
  airAdminServiceSdk,
  "CustomerApi_sendApplicationVerificationCode"
);
spyOnGetVerifyCode.mockResolvedValue({
  message_id: "344556",
});
spyOnGetPasswordConfig.mockResolvedValue({
  description: "test",
  regex: "/^abc$/",
});
describe("GeneralSignup", () => {
  it("should login successfully when every input is validated successfully", async () => {
    spyOnCommonRegister.mockResolvedValue({
      loggedIn: true,
      accessRule: "",
      username: "test",
      org: 12345,
    });
    spyOnJoinRegister.mockResolvedValue({
      loggedIn: true,
      accessRule: "",
      username: "test",
      org: 12345,
    });
    const wrapper = mount(<GeneralSignup />);
    wrapper.find(Form).at(0).invoke("onFinish")({
      username: "test",
      email: "123@qq.com",
      password: "123456",
      password2: "123456",
      phone: "123456789",
      verification_code: "123456",
      terms: true,
    });
    await (global as any).flushPromises();
    wrapper.update();
    wrapper.find("#JumpToJoinFormLink").simulate("click");
    wrapper.find(Form).at(0).invoke("onFinish")({
      username: "test",
      email: "123@qq.com",
      password: "123456",
      password2: "123456",
      invite: "123456789",
      terms: true,
    });
    await (global as any).flushPromises();
    wrapper.update();
  });

  it("should sign up failed if sever error", async () => {
    const wrapper = mount(<GeneralSignup />);
    spyOnJoinRegister.mockRejectedValueOnce(new TypeError("oops"));
    wrapper.find(Form).at(0).simulate("submit", new Event("submit"));
    wrapper.find(Form).at(0).invoke("onFinish")({
      username: "test",
      email: "123@qq.com",
      password: "123456",
      password2: "123456",
      invitation_code: "123456789",
      terms: true,
    });
    await (global as any).flushPromises();
    wrapper.update();
  });
  it("should get verification code when phone is correct", async () => {
    const wrapper = mount(<GeneralSignup />);
    expect(wrapper.find("button#verifyBtn").prop("disabled")).toBe(true);
    wrapper.find(Input).at(4).invoke("onChange")({
      target: { value: "18127949242" },
    } as ChangeEvent<HTMLInputElement>);
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find("button#verifyBtn").prop("disabled")).toBe(false);
    wrapper.find(Button).at(0).simulate("click");
    expect(spyOnGetVerifyCode).toBeCalled();
    wrapper.find(Input).at(4).invoke("onChange")({
      target: { value: "134" },
    } as ChangeEvent<HTMLInputElement>);
    jest.runAllTimers();
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find("button#verifyBtn").prop("disabled")).toBe(true);
  });

  it("should be able to confirm password", async () => {
    const wrapper = mount(<GeneralSignup />);
    wrapper.find(Input).at(2).invoke("onChange")({
      target: { value: "123456" },
    } as ChangeEvent<HTMLInputElement>);
    wrapper.find(Input).at(3).invoke("onChange")({
      target: { value: "123" },
    } as ChangeEvent<HTMLInputElement>);
    await (global as any).flushPromises();
    wrapper.update();
    wrapper.find(Input).at(3).invoke("onChange")({
      target: { value: "123456" },
    } as ChangeEvent<HTMLInputElement>);
    await (global as any).flushPromises();
    wrapper.update();
  });

  it("should agree terms", async () => {
    const wrapper = mount(<GeneralSignup />);

    expect(wrapper.find(Modal).at(0).prop("visible")).toBe(false);
    wrapper.find("#TermsLink").simulate("click");
    wrapper.update();
    expect(wrapper.find(Modal).at(0).prop("visible")).toBe(true);
    wrapper.find(Modal).at(0).invoke("onOk")({} as any);
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(Modal).at(0).prop("visible")).toBe(false);

    wrapper.find("#TermsLink").simulate("click");
    wrapper.update();
    expect(wrapper.find(Modal).at(0).prop("visible")).toBe(true);
    wrapper.find(Modal).at(0).invoke("onCancel")({} as any);
    await (global as any).flushPromises();
    expect(wrapper.find(Modal).at(0).prop("visible")).toBe(false);
  });

  it("the jump link should work", () => {
    const wrapper = mount(<GeneralSignup />);
    expect(wrapper.find(Input)).toHaveLength(6);
    wrapper.find("#JumpToJoinFormLink").simulate("click");
    wrapper.update();
    expect(wrapper.find(Input)).toHaveLength(5);
  });
  it("brand setting should work", () => {
    brandFn.mockReturnValue({ auth_logo_url: "/x/y/z" });

    const wrapper = shallow(<GeneralSignup />);
    expect(wrapper.find("img").first().prop("src")).toBe("/x/y/z");
  });

  it("should sign up commonly with an invitation code", async () => {
    spyOnJoinRegister.mockResolvedValue({
      loggedIn: true,
      accessRule: "",
      username: "test",
      org: 12345,
    });
    jest.spyOn(kit, "getHistory").mockReturnValue({
      location: {
        search: "code=123456789",
      },
      createHref: jest.fn(),
      push: jest.fn(),
    } as any);
    const wrapper = mount(<GeneralSignup />);
    expect(wrapper.find(Input)).toHaveLength(4);
    wrapper.find(Form).at(0).invoke("onFinish")({
      username: "test",
      email: "123@qq.com",
      password: "123456",
      password2: "123456",
      invite: "123456789",
      terms: true,
    });
    await (global as any).flushPromises();
    wrapper.update();
  });

  it("should jump to the login form when the login link is clicked", () => {
    const wrapper = mount(<GeneralSignup />);
    const spyOnGetHistory = jest.spyOn(kit, "getHistory");
    wrapper.find("#LogInLink").simulate("click");
    expect(spyOnGetHistory).toBeCalled();
  });
});
