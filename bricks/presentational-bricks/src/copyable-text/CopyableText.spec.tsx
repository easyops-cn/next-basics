import React from "react";
import { mount } from "enzyme";
import { CopyableText } from "./CopyableText";

describe("CopyableText", () => {
  it("should work", () => {
    const wrapper = mount(
      <CopyableText text={"text to be copied"} textClick={jest.fn()} />
    );
    expect(wrapper.find(".text").text()).toBe("text to be copied");
    wrapper.setProps({ hiddenText: true });
    expect(wrapper.find(".text").text()).toBe("");
    wrapper.find(".text").simulate("click");
  });
  it("should work", () => {
    const wrapper = mount(
      <CopyableText text={"this is a text"} type="input" />
    );
    expect(wrapper.find("button")).toHaveLength(1);
  });
});
