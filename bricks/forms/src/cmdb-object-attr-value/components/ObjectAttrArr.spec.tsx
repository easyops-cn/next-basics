import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrArr } from "./ObjectAttrArr";
import { Radio, Select } from "antd";

const defaultValue = {
  regex: "",
  default: [],
  mode: "default",
};

describe("ObjectAttrArr", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrArr {...props} />);
    expect(wrapper.find("Select").at(0).props().value.length).toBe(0);
  });

  it("should change regex", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrArr {...props} />);
    wrapper.find("Input").at(0).invoke("onChange")({ target: { value: "d" } });
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      regex: "d",
    });
  });

  it("should change mode", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrArr {...props} />);
    wrapper.find(Radio.Group).at(0).invoke("onChange")({
      target: { value: "tag" },
    });
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      mode: "tag",
    });
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrArr {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")([1, 2, 3], null);
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default: [1, 2, 3],
    });
  });
});
