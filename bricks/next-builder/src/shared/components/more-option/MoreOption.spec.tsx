import React from "react";
import { shallow, mount } from "enzyme";
import { MoreOption } from "./MoreOption";
import { EditOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";

describe("MoreOption", () => {
  it("should work", () => {
    const wrapper = shallow(<MoreOption />);
    expect(wrapper.find("span").text()).toEqual("20 ");
  });

  it("should work with props", () => {
    const mockClickFn = jest.fn();
    const wrapper = mount(<MoreOption itemsCount={10} onBlur={mockClickFn} />);

    wrapper.find(EditOutlined).simulate("click");

    wrapper.find(InputNumber).invoke("onChange")(100);

    wrapper.find(InputNumber).invoke("onBlur")(null);

    expect(mockClickFn).toBeCalledWith(100);
  });
});
