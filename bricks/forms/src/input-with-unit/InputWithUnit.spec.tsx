import React from "react";
import { mount } from "enzyme";
import { InputNumber, Select } from "antd";
import { InputWithUnit } from "./InputWithUnit";
import { UnitType } from "./libs/constants";

describe("InputWithUnit", () => {
  it("should work", () => {
    const fn = jest.fn();
    const wrapper = mount(
      <InputWithUnit
        value={3600}
        unit="s"
        unitType={UnitType.Time}
        onChange={fn}
      />
    );
    let inputNumber = wrapper.find(InputNumber).first();
    const select = wrapper.find(Select).first();
    expect(inputNumber.prop("value")).toBe(1);
    expect(select.prop("value")).toBe("hour");

    select.invoke("onChange")("min", null);
    expect(fn).toBeCalledWith(60);
    fn.mockClear();

    inputNumber = wrapper.find(InputNumber).first();
    inputNumber.invoke("onChange")(3);
    expect(fn).toBeCalledWith(60 * 3);
  });

  it("wrong unit should throw", () => {
    jest.spyOn(console, "error");
    // @ts-ignore
    // eslint-disable-next-line no-console
    console.error.mockImplementation(() => null);

    const genFn = () =>
      mount(<InputWithUnit value={3600} unit="xx" unitType={null} />);

    expect(genFn).toThrowError();
    // @ts-ignore
    // eslint-disable-next-line no-console
    console.error.mockRestore();
  });

  it("input is not a number should work", () => {
    const fn = jest.fn();
    const wrapper = mount(
      <InputWithUnit
        value={"jkl" as any}
        unit="s"
        unitType={UnitType.Time}
        onChange={fn}
      />
    );
    const inputNumber = wrapper.find(InputNumber).first();
    expect(inputNumber.prop("value")).toBe("");
    fn.mockClear();
    const select = wrapper.find(Select).first();
    select.invoke("onChange")("min", null);
    expect(fn).not.toBeCalled();
  });

  it("precision should work", () => {
    const wrapper = mount(
      <InputWithUnit value={90} unit="s" unitType={UnitType.Time} />
    );
    const inputNumber = wrapper.find(InputNumber).first();
    expect(inputNumber.prop("value")).toBe(90);

    wrapper.setProps({ availableUnits: ["s", "min", "hour"] });
    wrapper.setProps({ availableUnits: ["x"] });
  });
});
