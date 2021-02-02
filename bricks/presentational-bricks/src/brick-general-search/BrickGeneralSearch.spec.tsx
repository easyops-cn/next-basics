import React from "react";
import { shallow } from "enzyme";
import { BrickGeneralSearch } from "./BrickGeneralSearch";
import { Input, Button } from "antd";

const onUpdate = jest.fn();
const onChange = jest.fn();

describe("BrickGeneralSearch", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickGeneralSearch
        onUpdate={onUpdate}
        onChange={onChange}
        query="1"
        size="extraLarge"
        shape="round"
        placeholder="搜索"
      />
    );
    expect(wrapper).toBeTruthy();
    wrapper.setProps({ size: "small" });
    expect(wrapper).toBeTruthy();
    wrapper.find(Input).simulate("change", {
      target: {
        value: "123",
      },
    });
    wrapper.find(Button).simulate("click");
    expect(onUpdate).toHaveBeenCalled();
  });
  it("should work when shape is default and size is large", () => {
    const wrapper = shallow(
      <BrickGeneralSearch
        onUpdate={onUpdate}
        onChange={onChange}
        query="1"
        size="large"
        shape="default"
        placeholder="搜索"
      />
    );
    expect(wrapper).toBeTruthy();
  });
});
