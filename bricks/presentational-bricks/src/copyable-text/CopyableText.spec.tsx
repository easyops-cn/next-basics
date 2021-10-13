import React from "react";
import { mount } from "enzyme";
import { Typography } from "antd";
import { CopyableText } from "./CopyableText";
const { Text } = Typography;

describe("CopyableText", () => {
  it("should work", () => {
    const wrapper = mount(
      <CopyableText
        text={"text to be copied"}
        textClick={jest.fn()}
        type="custom"
      />
    );
    expect(wrapper.find(".text").text()).toBe("text to be copied");
    wrapper.setProps({ hiddenText: true });
    expect(wrapper.find(".text").text()).toBe("");
    wrapper.find(".text").simulate("click");
  });
  it("should type = input", () => {
    const wrapper = mount(
      <CopyableText text={"this is a text"} type="input" />
    );
    expect(wrapper.find("button")).toHaveLength(1);
  });
  it("should type = text", () => {
    const wrapper = mount(<CopyableText text={"this is a text"} type="text" />);
    expect(wrapper.find(Text)).toHaveLength(1);
  });
});
