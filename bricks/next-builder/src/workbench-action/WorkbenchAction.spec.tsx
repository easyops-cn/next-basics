import React from "react";
import { shallow } from "enzyme";
import { WorkbenchAction } from "./WorkbenchAction";

describe("WorkbenchAction", () => {
  it("should work", () => {
    const mockClick = jest.fn();
    const wrapper = shallow(
      <WorkbenchAction
        icon={{
          lib: "antd",
          theme: "outlined",
          icon: "search",
        }}
        linkClick={mockClick}
      />
    );
    expect(wrapper.find(".action").hasClass("active")).toBe(false);

    wrapper.setProps({
      active: true,
    });
    expect(wrapper.find(".action").hasClass("active")).toBe(true);

    wrapper.find("Link").at(0).simulate("click");
    expect(mockClick).toBeCalledTimes(1);
  });
});
