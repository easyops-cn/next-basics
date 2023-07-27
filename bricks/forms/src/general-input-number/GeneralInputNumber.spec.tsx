import React from "react";
import { shallow, mount } from "enzyme";
import { InputNumber } from "antd";
import { GeneralInputNumber } from "./GeneralInputNumber";

describe("GeneralInputNumber", () => {
  it("should work", async () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    const wrapper = shallow(
      <GeneralInputNumber
        name="count"
        value={10}
        label="数量"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
    wrapper.find(InputNumber).simulate("change", 4);
    await (global as any).flushPromises();
    expect(handleChange).toBeCalledWith(4);

    wrapper.setProps({ value: 4 });
    wrapper.find(InputNumber).invoke("onBlur")(null);
    expect(handleBlur).toBeCalledTimes(1);
  });

  it("should update value", () => {
    const wrapper = mount(<GeneralInputNumber value={10} />);
    expect(wrapper.find(InputNumber).prop("value")).toBe(10);

    wrapper.setProps({
      value: 20,
    });
    wrapper.update();
    expect(wrapper.find(InputNumber).prop("value")).toBe(20);
  });
});
