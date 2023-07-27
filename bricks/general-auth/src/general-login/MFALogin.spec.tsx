import React from "react";
import { shallow, mount } from "enzyme";
import { MFALogin } from "./MFALogin";
import { Modal, Input, Form, Tooltip } from "antd";
import * as mfaSdk from "@next-sdk/api-gateway-sdk";
import * as kit from "@next-core/brick-kit";

const onCancel = jest.fn();
const redirect = jest.fn();
const spyOnVerifyTotpCode = jest.spyOn(mfaSdk, "MfaApi_verifyTotpCode");
const spyOnUpdateUserTotpSecret = jest.spyOn(
  mfaSdk,
  "MfaApi_updateUserTotpSecret"
);
const spyOnKit = jest.spyOn(kit, "getRuntime");
const spyOnReloadMicroApps = jest.fn();
const brandFn = jest.fn().mockReturnValue({});
const getMiscSettings = jest.fn().mockReturnValue({});
spyOnKit.mockReturnValue({
  reloadMicroApps: spyOnReloadMicroApps,
  getBrandSettings: brandFn,
  getFeatureFlags: () => ({
    "forgot-password-enabled": true,
    "sign-up-for-free-enabled": true,
  }),
  getMiscSettings,
} as any);

describe("MFALogin", () => {
  afterEach(() => {
    onCancel.mockReset();
    redirect.mockReset();
    spyOnVerifyTotpCode.mockReset();
    spyOnUpdateUserTotpSecret.mockReset();
  });

  it("should work when first handleSubmit success", async () => {
    const wrapper = shallow(
      <MFALogin
        onCancel={onCancel}
        dataSource={{
          username: "xxx",
          secret: "xxx",
          totpSecret: "xxx",
          userInstanceId: "xxx",
          org: 1111,
        }}
        redirect={redirect}
      />
    );
    spyOnUpdateUserTotpSecret.mockImplementationOnce(() =>
      Promise.resolve({} as any)
    );
    spyOnVerifyTotpCode.mockImplementationOnce(() =>
      Promise.resolve({
        loggedIn: true,
        username: "xxx",
        org: 1111,
        location: "",
        userInstanceId: "xxx",
        loginFrom: "xxx",
      })
    );
    wrapper.find(Form).props().form.setFieldsValue({ dynamic_code: "xxxxxx" });
    wrapper
      .find(Modal)
      .props()
      .onOk({} as any);
  });

  it("should work when not first handleSubmit success", async () => {
    const wrapper = shallow(
      <MFALogin
        onCancel={onCancel}
        dataSource={{
          username: "xxx",
          secret: "",
          totpSecret: "",
          userInstanceId: "xxx",
          org: 1111,
        }}
        redirect={redirect}
      />
    );
    spyOnVerifyTotpCode.mockImplementationOnce(() =>
      Promise.resolve({
        loggedIn: true,
        username: "xxx",
        org: 1111,
        location: "",
        userInstanceId: "xxx",
        loginFrom: "xxx",
      })
    );
    wrapper.find(Form).props().form.setFieldsValue({ dynamic_code: "xxxxxx" });
    wrapper
      .find(Modal)
      .props()
      .onOk({} as any);
  });

  it("should work when set redirect", async () => {
    getMiscSettings.mockReturnValue({
      mfa_redirect: "http://example.com",
    });
    const wrapper = shallow(
      <MFALogin
        onCancel={onCancel}
        dataSource={{
          username: "xxx",
          secret: "",
          totpSecret: "",
          userInstanceId: "xxx",
          org: 1111,
        }}
        redirect={redirect}
      />
    );
    spyOnVerifyTotpCode.mockImplementationOnce(() =>
      Promise.resolve({
        loggedIn: true,
        username: "xxx",
        org: 1111,
        location: "",
        userInstanceId: "xxx",
        loginFrom: "xxx",
      })
    );
    wrapper.find(Form).props().form.setFieldsValue({ dynamic_code: "xxxxxx" });
    wrapper
      .find(Modal)
      .props()
      .onOk({} as any);
  });

  it("should work when MfaApi_updateUserTotpSecret error", async () => {
    const wrapper = shallow(
      <MFALogin
        onCancel={onCancel}
        dataSource={{
          username: "xxx",
          secret: "xxx",
          totpSecret: "xxx",
          userInstanceId: "xxx",
          org: 1111,
        }}
        redirect={redirect}
      />
    );
    spyOnUpdateUserTotpSecret.mockImplementationOnce(() =>
      Promise.reject({} as any)
    );
    wrapper.find(Form).props().form.setFieldsValue({ dynamic_code: "xxxxxx" });
    wrapper
      .find(Modal)
      .props()
      .onOk({} as any);
  });

  it("should work when handleSubmit error", async () => {
    const wrapper = shallow(
      <MFALogin
        onCancel={onCancel}
        dataSource={{
          username: "xxx",
          secret: "",
          totpSecret: "",
          userInstanceId: "xxx",
          org: 1111,
        }}
        redirect={redirect}
      />
    );
    spyOnVerifyTotpCode.mockImplementationOnce(() => Promise.reject({}));
    wrapper.find(Form).props().form.setFieldsValue({ dynamic_code: "xxxxxx" });
    wrapper
      .find(Modal)
      .props()
      .onOk({} as any);
  });

  it("should work when handleCancel", () => {
    const wrapper = mount(
      <MFALogin
        onCancel={onCancel}
        dataSource={{
          username: "xxx",
          secret: "xxx",
          totpSecret: "xxx",
          userInstanceId: "xxx",
          org: 1111,
        }}
        redirect={redirect}
      />
    );
    wrapper
      .find(Modal)
      .props()
      .onCancel({} as any);
    expect(wrapper.find(Input).props().value).toBeFalsy();
  });

  it("should work when onValuesChange", () => {
    const wrapper = mount(
      <MFALogin
        onCancel={onCancel}
        dataSource={{
          username: "xxx",
          secret: "xxx",
          totpSecret: "xxx",
          userInstanceId: "xxx",
          org: 1111,
        }}
        redirect={redirect}
      />
    );
    wrapper.find(Form).props().form.setFieldsValue({ dynamic_code: "x" });
    wrapper.find(Form).props().onValuesChange("x", "xx");
    expect(wrapper.find(Tooltip).props().title).toBe("");
  });
});
