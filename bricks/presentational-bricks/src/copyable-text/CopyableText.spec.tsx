import React from "react";
import { mount } from "enzyme";
import { CopyableText } from "./CopyableText";

describe("CopyableText", () => {
  it("should work", () => {
    const wrapper = mount(<CopyableText text={"text to be copied"} />);
    expect(wrapper.find("div.ant-typography").text()).toBe("text to be copied");
    wrapper.setProps({ hiddenText: true });
    expect(wrapper.find("div.ant-typography").text()).toBe("");
  });
});
