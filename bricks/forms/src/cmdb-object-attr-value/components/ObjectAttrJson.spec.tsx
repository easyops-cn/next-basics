import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrJson } from "./ObjectAttrJson";
import { Select, Input, InputNumber } from "antd";
const TextArea = Input.TextArea;
const defaultValue = {
  default: "{test:'aa'}",
};

describe("ObjectAttrJson", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrJson {...props} />);
    expect(wrapper.find("TextArea").at(0).props().value).toBe("{test:'aa'}");
  });

  it("should change regex", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrJson {...props} />);
    wrapper.find("Input").at(0).invoke("onChange")({
      target: { value: "{test:'bb'}" },
    });
    expect(props.onChange).toBeCalledWith({
      regex: "{test:'bb'}",
      default: "",
    });
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrJson {...props} />);
    wrapper.find("Input").at(0).invoke("onChange")({
      target: { value: "default" },
    });
    expect(props.onChange).toBeCalledWith({
      default: "",
      regex: "default",
    });
  });
});
