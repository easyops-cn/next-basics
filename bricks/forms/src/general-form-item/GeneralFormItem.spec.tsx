import React from "react";
import { mount } from "enzyme";

import { GeneralFormItem, GeneralFormItemProps } from "./GeneralFormItem";
import { AbstractFormControl } from "./AbstractFormControl";
import { ControlBrickConfig } from "../interfaces";

jest.mock("./AbstractFormControl", () => ({
  AbstractFormControl: jest.fn(function AbstractFormControl(props) {
    return "mocked AbstractFormControl";
  }),
}));

const mockedAbstractFormControl = AbstractFormControl as unknown as jest.Mock<
  typeof AbstractFormControl
>;
const controlBrick: ControlBrickConfig = { useBrick: { brick: "div" } };

describe("GeneralFormItem", () => {
  it("should work", () => {
    const mockedOnChange = jest.fn();
    const wrapper = mount<GeneralFormItemProps>(
      <GeneralFormItem controlBrick={controlBrick} onChange={mockedOnChange} />
    );

    expect(mockedAbstractFormControl).toBeCalledWith(
      expect.objectContaining({
        controlBrick,
        controlValue: undefined,
      }),
      {}
    );

    const value = "some value";
    wrapper.setProps({ value });
    expect(mockedAbstractFormControl).toBeCalledWith(
      expect.objectContaining({ controlBrick, controlValue: value }),
      {}
    );

    const newValue = "new value";
    mockedAbstractFormControl.mock.calls[
      mockedAbstractFormControl.mock.calls.length - 1
    ][0].onControlValueChange(newValue);
    expect(mockedOnChange).toBeCalledWith(newValue);
  });
});
