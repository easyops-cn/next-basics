import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrIP } from "./ObjectAttrIP";
import { Select, Input, InputNumber } from "antd";

const defaultValue = {
  default: "192.168.100.162",
};

describe("ObjectAttrIP", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrIP {...props} />);
    expect(wrapper.find("Input").at(0).props().value).toBe("192.168.100.162");
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrIP {...props} />);
    wrapper.find("Input").at(0).invoke("onChange")({
      target: { value: "192.168.100.163" },
    });
    expect(props.onChange).toBeCalledWith({
      default: "192.168.100.163",
    });
  });
});
