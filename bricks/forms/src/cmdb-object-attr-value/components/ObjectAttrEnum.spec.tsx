import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrEnum } from "./ObjectAttrEnum";
import { Select } from "antd";

const defaultValue = {
  regex: ["test1", "test2"],
  default: "",
};

describe("ObjectAttrEnum", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrEnum {...props} />);
    expect(wrapper.find(Select).at(0).prop("value").length).toBe(2);
  });

  it("should change regex", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrEnum {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")(["test1,test2,test3"], null);
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      regex: ["test1,test2,test3"],
    });
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrEnum {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")(["test1,test2,test3"], null);
    wrapper.find(Select).at(1).invoke("onChange")("test3", null);

    expect(props.onChange).toBeCalledWith({
      regex: ["test1,test2,test3"],
      default: "test3",
    });
  });

  it("should change default", () => {
    const props = {
      value: {
        regex: ["test1", "test2"],
        default: [],
      },
      onChange: jest.fn(),
      isMulti: true,
    };
    const wrapper = shallow(<ObjectAttrEnum {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")(["test1,test2,test3"], null);
    wrapper.find(Select).at(1).invoke("onChange")(["test3", "test1"], null);

    expect(props.onChange).toBeCalledWith({
      regex: ["test1,test2,test3"],
      default: ["test3", "test1"],
    });
  });
});
