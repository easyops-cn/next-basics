import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrInt } from "./ObjectAttrInt";
import { Select, Input, InputNumber } from "antd";

const defaultValue = {
  regex: "",
  default: "",
};

describe("ObjectAttrInt", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrInt {...props} />);
    expect(wrapper.find("InputNumber").at(0).props().value).toBe("");
  });

  it("should change regex", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrInt {...props} />);
    wrapper.find("Row").at(0).children(0).invoke("onChange")({
      target: { value: "dd" },
    });
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      regex: "dd",
    });
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrInt {...props} />);
    wrapper.find("Row").at(1).children(0).invoke("onChange")(5);
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default: 5,
    });
  });
});
