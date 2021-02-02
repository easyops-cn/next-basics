import React from "react";
import { shallow } from "enzyme";
import { GeneralButton } from "./GeneralButton";

describe("GeneralButton", () => {
  const props = {
    buttonName: "",
    onClick: jest.fn(),
    buttonProps: {},
    tooltip: "点击跳转详情",
  };
  it("should work", () => {
    const wrapper = shallow(<GeneralButton {...props} />);
    expect(wrapper).toBeTruthy();
    wrapper.setProps({
      disabled: true,
      disabledTooltip: "没有权限",
      buttonUrl: "/ci",
      buttonType: "primary",
    });
    expect(wrapper).toBeTruthy();
    wrapper.setProps({
      disabled: false,
      buttonUrl: "/ci",
      target: "_blank",
      buttonIcon: "setting",
    });
    expect(wrapper).toBeTruthy();
  });
});
