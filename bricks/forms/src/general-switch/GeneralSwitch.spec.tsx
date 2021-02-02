import React from "react";
import { mount } from "enzyme";
import { Switch } from "antd";
import { GeneralSwitch, RefSwitch } from "./GeneralSwitch";

describe("GeneralSwitch", () => {
  it("GeneralSwitch should work", () => {
    const wrapper = mount(<GeneralSwitch value={true} />);
    const s = wrapper.find(Switch).last();
    expect(s.props().checked).toBe(true);
    s.simulate("click", { target: { checked: false } });
  });

  it("RefSwitch should work with true", () => {
    const changeFn = jest.fn();
    const wrapper = mount(<RefSwitch value={true} onChange={changeFn} />);
    expect(wrapper.find(Switch).first().prop("checked")).toBe(true);
    expect(changeFn).not.toBeCalled();
  });

  it("should update value", () => {
    const wrapper = mount(<GeneralSwitch value={true} />);
    expect(wrapper.find(GeneralSwitch).prop("value")).toBe(true);

    wrapper.setProps({
      value: false,
    });
    wrapper.update();
    expect(wrapper.find(GeneralSwitch).prop("value")).toBe(false);
  });
  it("should work and disabled", () => {
    const wrapper = mount(<GeneralSwitch value={true} disabled={true} />);
    expect(wrapper.find(".ant-switch-disabled").length).toBe(1);
  });
});
