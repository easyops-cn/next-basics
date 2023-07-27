import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrBool } from "./ObjectAttrBool";
import { Select } from "antd";

const defaultValue = {
  default: "true",
};

describe("ObjectAttrBool", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrBool {...props} />);
    expect(wrapper.find(Select).at(0).props().value).toBeTruthy();
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrBool {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")("false", null);
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default: false,
    });
  });
});
