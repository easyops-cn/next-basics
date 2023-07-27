import React from "react";
import { Input } from "antd";
import { shallow, mount } from "enzyme";
import { FieldValidatorItem } from "./FieldValidatorItem";
import { NumberValidatorInput } from "./NumberValidatorInput";

describe("FieldValidatorItem", () => {
  it("should work with stirng type", () => {
    const props = {
      onChange: jest.fn(),
    };
    const wrapper = mount(<FieldValidatorItem {...props} />);

    wrapper.setProps({
      value: {
        type: "string",
        pattern: "\\w+",
      },
    });
    wrapper.update();

    wrapper.find(Input).invoke("onChange")({ target: { value: "\\s+" } });

    expect(props.onChange).toHaveBeenCalledWith({
      type: "string",
      pattern: "\\s+",
      compare: [],
    });
  });

  it("should work with number type", () => {
    const props = {
      value: {
        type: "int",
        compare: [{ method: "lt", value: 30 }],
      },
      onChange: jest.fn(),
    };
    const wrapper = shallow(<FieldValidatorItem {...props} />);

    wrapper.find(NumberValidatorInput).invoke("onAdd")();
    expect(props.onChange).toHaveBeenCalledWith({
      type: "int",
      compare: [
        { method: "lt", value: 30 },
        { method: undefined, value: undefined },
      ],
    });

    wrapper.find(NumberValidatorInput).invoke("onChange")([
      { method: "lt", value: 30 },
      { method: "gt", value: 10 },
    ]);
    expect(props.onChange).toHaveBeenCalledWith({
      type: "int",
      compare: [
        { method: "lt", value: 30 },
        { method: "gt", value: 10 },
      ],
    });

    wrapper.find(NumberValidatorInput).invoke("onRemove")(1);
    expect(props.onChange).toHaveBeenCalledWith({
      type: "int",
      compare: [{ method: "lt", value: 30 }],
    });
  });
});
