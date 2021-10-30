import React from "react";
import { shallow,mount } from "enzyme";
import { createLocation } from "history";
import { GeneralSignup } from "./GeneralSignup";
import {Button,Input} from "antd";
import * as kit from "@next-core/brick-kit";
import * as userServiceSdk from "@next-sdk/user-service-sdk";
import * as airAdminServiceSdk from "@next-sdk/air-admin-service-sdk";

const brandFn = jest.fn().mockReturnValue({});
const spyOnKit = jest.spyOn(kit, "getRuntime");
const spyOnHistoryPush = jest.fn();
jest.spyOn(kit, "getHistory").mockReturnValue({
  location: {
    state: {
      from: createLocation("/mock-from"),
    },
  },
  push: spyOnHistoryPush,
  createHref: jest.fn()
} as any);
spyOnKit.mockReturnValue({
  getBrandSettings: brandFn,
  getFeatureFlags: () => ({
    "enable-backend-password-config": true,
  }),
} as any);
const spyOnGetPasswordConfig=jest.spyOn(userServiceSdk,"UserAdminApi_getPasswordConfig");
const spyOnGetVerifyCode=jest.spyOn(airAdminServiceSdk,"CustomerApi_sendApplicationVerificationCode");

describe("GeneralSignup", () => {

  it("should get verification code when phone is correct",()=>{
    const wrapper = mount(
      <GeneralSignup/>
    );
    expect(wrapper.find(Button).at(0).prop("disabled")).toBe(true);
    wrapper.find(Input).at(4).simulate('change', { target: { value: '18127949242' } });
    wrapper.update();

    expect(wrapper.find(Button).at(0).prop("disabled")).toBe(false);
  })
  it("should get password config when the feature is turned on",()=>{
    spyOnGetPasswordConfig.mockResolvedValue({
      description:"test",
      regex: "/^abc$/"
    });
    const wrapper = shallow(
      <GeneralSignup/>
    );
  });
  it("brand setting should work", () => {
    brandFn.mockReturnValue({ auth_logo_url: "/x/y/z" });

    const wrapper = shallow(
      <GeneralSignup/>
    );
    expect(wrapper.find("img").first().prop("src")).toBe("/x/y/z");
  });

  it("should sign up commonly with an invitation code",()=>{
    jest.spyOn(kit,"getHistory").mockReturnValue({
      location:{
        search: "code=123456789",
      },
    } as any);
    const wrapper = shallow(
      <GeneralSignup/>
    );
    expect(wrapper.find("a")).toHaveLength(2);
    expect(wrapper.find(".title").first().text()).toBe("REGISTER_AND_JOIN");
  });

  it("should sign up commonly without an invitation code",()=>{
    jest.spyOn(kit,"getHistory").mockReturnValue({
      location:{
      },
    } as any);
    const wrapper = shallow(
      <GeneralSignup/>
    );
    expect(wrapper.find("a")).toHaveLength(3);
    wrapper.find("a").first().simulate("click");
    wrapper.update();
    expect(wrapper.find(".title").first().text()).toBe("REGISTER_AND_JOIN");
  });
});
