import React from "react";
import { shallow } from "enzyme";
import { BrickDisplayStructs } from "./BrickDisplayStructs";
import { FieldToDisplay } from "./index";

describe("BrickDisplayStructs", () => {
  it("should work, stringify", () => {
    const value = { text: "hello, world" };
    const displayType = "stringify";
    const wrapper = shallow(
      <BrickDisplayStructs value={value} displayType={displayType} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work, field to display", () => {
    let value: any = [
      { name: "irelia", email: "irelia@ionia.island" },
      { name: "akali", email: "akali@ionia.island" },
    ];
    const displayType: FieldToDisplay = {
      field: "name",
      separator: "; ",
    };
    let wrapper = shallow(
      <BrickDisplayStructs value={value} displayType={displayType} />
    );
    const span = wrapper.find("span");
    expect(span.childAt(0).contains("irelia; akali")).toBe(true);
    wrapper.setProps({
      displayType: { separator: "; " },
      value: [1, 2, { name: "akali" }],
    });
    wrapper.update();
    expect(wrapper.childAt(0).text()).toBe('1; 2; {"name":"akali"}');

    value = { text: "hello, world" };
    wrapper = shallow(
      <BrickDisplayStructs value={value} displayType={displayType} />
    );
    expect(wrapper.contains("UNKNOWN_ERROR")).toBe(true);
  });
});
