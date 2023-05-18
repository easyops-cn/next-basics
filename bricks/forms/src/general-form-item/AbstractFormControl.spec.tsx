import React from "react";
import { mount } from "enzyme";
import * as kit from "@next-core/brick-kit";

import {
  AbstractFormControl,
  AbstractFormControlProps,
} from "./AbstractFormControl";
import { ControlBrickConfig } from "../interfaces";

const spyOnBrickAsComponent = jest
  .spyOn(kit, "BrickAsComponent")
  .mockImplementation(function AbstractFormControl(props) {
    return <div>mocked BrickAsComponent</div>;
  });
const controlBrick: ControlBrickConfig = { useBrick: { brick: "div" } };

describe("AbstractFormControl", () => {
  it("should work", () => {
    const mockedOnControlValueChange = jest.fn();
    const mockedOnChange = jest.fn();
    const ref: {
      current: HTMLDivElement;
    } = { current: undefined };
    const wrapper = mount<AbstractFormControlProps>(
      <AbstractFormControl
        controlBrick={controlBrick}
        onChange={mockedOnChange}
        onControlValueChange={mockedOnControlValueChange}
        ref={ref}
      />
    );

    expect(spyOnBrickAsComponent).toBeCalledWith(
      { useBrick: controlBrick.useBrick },
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
