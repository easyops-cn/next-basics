import React from "react";
import { shallow } from "enzyme";
import { WorkbenchAction } from "./WorkbenchAction";

describe("WorkbenchAction", () => {
  it("should work", () => {
    const wrapper = shallow(
      <WorkbenchAction
        icon={{
          lib: "antd",
          theme: "outlined",
          icon: "search",
        }}
      />
    );
    expect(wrapper.find(".action").hasClass("active")).toBe(false);

    wrapper.setProps({
      active: true,
    });
    expect(wrapper.find(".action").hasClass("active")).toBe(true);
  });
});
