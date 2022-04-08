import React from "react";
import { shallow } from "enzyme";
import { Switch } from "antd";
import { GeneralSwitch } from "./GeneralSwitch";
import { MenuIcon } from "@next-core/brick-types";

describe("GeneralSwitch", () => {
  it("GeneralSwitch should work", () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <GeneralSwitch value={true} onChange={handleChange} />
    );
    const s = wrapper.find(Switch);
    expect(s.props().checked).toBe(true);

    const checked = false;
    const event = { target: { checked } } as unknown as MouseEvent;
    s.invoke("onChange")(checked, event);
    expect(handleChange).toBeCalledWith(checked, event);
  });

  it("should update value", () => {
    const wrapper = shallow(<GeneralSwitch value={true} />);
    expect(wrapper.find(Switch).prop("checked")).toBe(true);

    wrapper.setProps({
      value: false,
    });
    wrapper.update();
    expect(wrapper.find(Switch).prop("checked")).toBe(false);
  });

  it("should work and disabled", () => {
    const wrapper = shallow(<GeneralSwitch value={true} disabled={true} />);
    expect(wrapper.find(Switch).prop("disabled")).toBe(true);
  });

  it("should support checkedText, unCheckedText, checkedIcon and unCheckedIcon properties", () => {
    const checkedText = "checked";
    const unCheckedText = "unchecked";
    const checkedIcon: MenuIcon = { lib: "antd", icon: "check" };
    const unCheckedIcon: MenuIcon = { lib: "antd", icon: "close" };
    const wrapper = shallow(
      <GeneralSwitch
        value={true}
        checkedText={checkedText}
        unCheckedText={unCheckedText}
        checkedIcon={checkedIcon}
        unCheckedIcon={unCheckedIcon}
      />
    );
    const switchNodeProps = wrapper.find(Switch).props();
    const checkedChildren =
      switchNodeProps.checkedChildren as React.ReactElement;
    const unCheckedChildren =
      switchNodeProps.unCheckedChildren as React.ReactElement;
    expect(checkedChildren.props.children[0].props.icon).toBe(checkedIcon);
    expect(checkedChildren.props.children[1]).toBe(checkedText);
    expect(unCheckedChildren.props.children[0].props.icon).toBe(unCheckedIcon);
    expect(unCheckedChildren.props.children[1]).toBe(unCheckedText);
  });
});
