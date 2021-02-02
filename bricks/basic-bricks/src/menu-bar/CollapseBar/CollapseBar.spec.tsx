import React from "react";
import { shallow } from "enzyme";
import { CollapseBar } from "./CollapseBar";
import { getRuntime } from "@next-core/brick-kit";

let isCollapsed = false;
const spyOnCollapseMenuBar = jest.fn(value => {
  isCollapsed = value;
});
jest.mock("@next-core/brick-kit");
(getRuntime as jest.Mock).mockReturnValue({
  menuBar: {
    collapse: spyOnCollapseMenuBar,
    isCollapsed: () => isCollapsed
  }
});

describe("CollapseBar", () => {
  it("should work", () => {
    const wrapper = shallow(<CollapseBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when collapsed", () => {
    const wrapper = shallow(<CollapseBar collapsed={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should toggle collapse when click", async () => {
    const wrapper = shallow(<CollapseBar />);
    wrapper.find("a").simulate("click");
    expect(spyOnCollapseMenuBar).toBeCalledWith(true);

    spyOnCollapseMenuBar.mockClear();
    wrapper.find("a").simulate("click");
    expect(spyOnCollapseMenuBar).toBeCalledWith(false);
  });
});
