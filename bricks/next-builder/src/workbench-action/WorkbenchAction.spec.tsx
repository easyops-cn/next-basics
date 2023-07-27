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
        to="/abc"
        target="_self"
        linkClick={mockClick}
      />
    );
    expect(wrapper.find(".action").hasClass("active")).toBe(false);

    wrapper.setProps({
      active: true,
    });
    expect(wrapper.find(".action").hasClass("active")).toBe(true);

    expect(wrapper.find("Link").prop("target")).toBe("_self");

    wrapper.find("Link").at(0).simulate("click");
    expect(mockClick).toBeCalledTimes(1);
  });
});
