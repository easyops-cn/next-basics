import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrFloat } from "./ObjectAttrFloat";
import { Select, Input, InputNumber } from "antd";

const defaultValue = {
  default: "",
};

describe("ObjectAttrFloat", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrFloat {...props} />);
    expect(wrapper.find("InputNumber").at(0).props().value).toBe("");
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrFloat {...props} />);
    wrapper.find("Row").at(0).children(0).invoke("onChange")(5);
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default: 5,
    });
  });
});
