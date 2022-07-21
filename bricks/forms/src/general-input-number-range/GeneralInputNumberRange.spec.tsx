import React from "react";
import "@testing-library/jest-dom";
import { GeneralInputNumberRange } from "./GeneralInputNumberRange";
import { InputNumber } from "antd";
import { mount, shallow } from "enzyme";

describe("GeneralInputNumberRange", () => {
  it("should work", async () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    const wrapper = shallow(
      <GeneralInputNumberRange
        name="count"
        min={1}
        max={10}
        label="数量"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
    wrapper.find(InputNumber).at(0).simulate("change", -1);
    wrapper.find(InputNumber).at(1).simulate("change", 12);
    await (global as any).flushPromises();
    expect(handleChange).toBeCalledWith({ min: -1 });
    expect(wrapper.find(InputNumber).at(0).prop("min")).toBe(1);
    expect(wrapper.find(InputNumber).at(1).prop("max")).toBe(10);

    wrapper.setProps({ value: { min: 2, max: 12 } });
    wrapper.find(InputNumber).at(0).invoke("onBlur")(null);
    expect(handleBlur).toBeCalledTimes(1);
  });

  it("should update value", () => {
    const wrapper = mount(
      <GeneralInputNumberRange value={{ min: -1, max: 10 }} />
    );
    expect(wrapper.find(InputNumber).at(0).prop("value")).toBe(-1);

    wrapper.setProps({
      value: { max: 20 },
    });
    wrapper.update();
    expect(wrapper.find(InputNumber).at(1).prop("value")).toBe(20);
  });
});
