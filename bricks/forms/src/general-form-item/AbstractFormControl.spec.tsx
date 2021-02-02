import React from "react";
import { mount } from "enzyme";
import * as kit from "@next-core/brick-kit";

import {
  AbstractFormControl,
  AbstractFormControlProps
} from "./AbstractFormControl";
import { ControlConfig } from ".";

const spyOnBrickAsComponent = jest
  .spyOn(kit, "BrickAsComponent")
  .mockImplementation(function AbstractFormControl(props) {
    return <div>mocked BrickAsComponent</div>;
  });
const control: ControlConfig = { useBrick: { brick: "div" } };

describe("AbstractFormControl", () => {
  it("should work", () => {
    const mockedOnControlValueChange = jest.fn();
    const mockedOnChange = jest.fn();
    const ref: {
      current: HTMLElement;
    } = { current: undefined };
    const wrapper = mount<AbstractFormControlProps>(
      <AbstractFormControl
        control={control}
        onChange={mockedOnChange}
        onControlValueChange={mockedOnControlValueChange}
        ref={ref}
      />
    );

    expect(spyOnBrickAsComponent).toBeCalledWith(
      { useBrick: control.useBrick },
      {}
    );

    const controlSlot = wrapper.find("slot#controlSlot");
    expect(controlSlot.prop("name")).toBe("control");

    expect(ref.current).toBeInstanceOf(HTMLElement);

    const value = "some value";
    wrapper.setProps({ controlValue: value });
    expect(mockedOnChange).toBeCalledWith(value);

    wrapper.setProps({ value });
    expect(mockedOnControlValueChange).not.toBeCalled();

    const newValue = "new value";
    wrapper.setProps({ value: newValue });
    expect(mockedOnControlValueChange).toBeCalledWith(newValue);
  });
});
