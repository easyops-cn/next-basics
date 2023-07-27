import React from "react";
import { mount, shallow } from "enzyme";
import { BrickDoc, BrickDocProps } from "./BrickDoc";
import { Button, Empty } from "antd";
import { SmileTwoTone } from "@ant-design/icons";

describe("BrickDoc", () => {
  const doc = `
This block of Markdown contains <a href="https://en.wikipedia.org/wiki/HTML">HTML</a>, and will require the <code>html-parser</code> AST plugin to be loaded, in addition to setting the <code class="prop">escapeHtml</code> property to false.
`;

  it("should work when shallow rending", () => {
    const props: BrickDocProps = {
      doc,
    };
    const wrapper = shallow(<BrickDoc doc={props.doc} />);
    const reactMarkdownWrapper = wrapper.find(".brickDocContainer");

    expect(wrapper.find(Empty).exists()).toBeFalsy();
    expect(reactMarkdownWrapper.exists()).toBeTruthy();
    expect(reactMarkdownWrapper.prop("escapeHtml")).toBeFalsy();

    expect(wrapper).toBeTruthy();
  });

  it("should work when doc is null", () => {
    const props: BrickDocProps = {
      doc: null,
    };
    const wrapper = shallow(<BrickDoc doc={props.doc} />);
    const reactMarkdownWrapper = wrapper.find(".brickDocContainer");

    expect(wrapper.find(Empty).exists()).toBeTruthy();
    expect(reactMarkdownWrapper.exists()).toBeFalsy();
    expect(wrapper).toBeTruthy();
  });

  it("icon rotate should be 360deg when click create button", () => {
    const props: BrickDocProps = {
      doc: null,
    };
    const wrapper = mount(<BrickDoc doc={props.doc} />);
    const createButton = wrapper.find(Button);
    const icon = () => wrapper.find(SmileTwoTone);

    expect(icon().prop("rotate")).toBe(180);

    createButton.simulate("click");
    wrapper.update();

    expect(icon().prop("rotate")).toBe(360);
  });
});
