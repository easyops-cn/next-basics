import React from "react";
import "@testing-library/jest-dom";
import { GeneralInputNumberRange } from "./GeneralInputNumberRange";
import { InputNumber } from "antd";
import { mount } from "enzyme";

describe("GeneralInputNumberRange", () => {
  it("should work", async () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    const wrapper = mount(
      <GeneralInputNumberRange
        name="count"
        min={1}
        max={10}
        label="数量"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
    wrapper.setProps({ value: { min: 2, max: 12 } });
    wrapper.find(".min-input-number").at(0).invoke("onBlur")(null);
    wrapper.find(".max-input-number").at(0).invoke("onBlur")(null);
    await (global as any).flushPromises();
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it("should update value", () => {
    const wrapper = mount(
      <GeneralInputNumberRange value={{ min: -1, max: 9 }} max={10} />
    );
    expect(wrapper.find(InputNumber).at(0).prop("value")).toBe(-1);

    wrapper.setProps({
      value: { max: 20 },
    });
    wrapper.update();
    expect(wrapper.find(InputNumber).at(1).prop("value")).toBe(20);
  });
});
