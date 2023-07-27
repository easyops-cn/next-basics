import React from "react";
import { shallow } from "enzyme";
import { TextCollapse } from "./TextCollapse";

describe("TextCollapse", () => {
  it("should work", () => {
    const wrapper = shallow(<TextCollapse text="test" line={1} />);
    expect(
      wrapper.find("Paragraph[data-testid='main-text']").childAt(0).text()
    ).toBe("test");
    expect(
      wrapper.find("Paragraph[data-testid='main-text']").at(0).prop("ellipsis")
    ).toStrictEqual({ expandable: false, rows: 1 });
  });

  it("should work handleClick", () => {
    const wrapper = shallow(<TextCollapse text="test" />);
    wrapper.find("div[data-testid='icons']").at(0).simulate("Click");
    wrapper.update();
    expect(wrapper.find("div[data-testid='icons']").childAt(0).name()).toBe(
      "ForwardRef(UpOutlined)"
    );
    expect(
      wrapper.find("Paragraph[data-testid='main-text']").at(0).prop("ellipsis")
    ).toBe(false);
  });
});
