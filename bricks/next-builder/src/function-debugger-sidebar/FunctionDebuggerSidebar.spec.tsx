import React from "react";
import { mount, shallow } from "enzyme";
import { FunctionDebuggerSidebar } from "./FunctionDebuggerSidebar";
import { DebuggerStateTestCase } from "../function-debugger-store/reducers/interfaces";

describe("FunctionDebuggerSidebar", () => {
  it("should work with empty tests", () => {
    const wrapper = mount(<FunctionDebuggerSidebar functionName="myFunc" />);
    expect(wrapper.find(".active .text").text()).toBe("myFunc");
    expect(wrapper.find(".sidebarItems li").length).toBe(2);
    wrapper.find(".sidebarItems li").at(1).simulate("click");
    expect(wrapper.find(".active .text").text()).toBe("Debug");
    expect(wrapper.find(".sidebarGroupIcon").length).toBe(1);
    // Click on the active item.
    wrapper.find(".sidebarItems .active").simulate("click");
    expect(wrapper.find(".active .text").text()).toBe("Debug");
  });

  it("should work with tests", () => {
    const wrapper = shallow(
      <FunctionDebuggerSidebar
        functionName="myFunc"
        activeTab="debug"
        tests={
          [
            {
              testModified: true,
              testMatched: false,
            },
            {
              testModified: true,
              testMatched: null,
            },
            {
              testModified: false,
              testMatched: true,
            },
          ] as Partial<DebuggerStateTestCase>[] as DebuggerStateTestCase[]
        }
      />
    );
    expect(wrapper.find(".active .text").text()).toBe("Debug");
    expect(wrapper.find(".sidebarItems li").length).toBe(5);
    wrapper.find(".sidebarItems li").at(2).simulate("click");
    expect(wrapper.find(".active .text").text()).toBe("Case 1");

    expect(wrapper.find(".icon").at(2).hasClass("notMatched")).toBe(true);
    expect(wrapper.find(".icon").at(3).hasClass("matched")).toBe(false);
    expect(wrapper.find(".icon").at(3).hasClass("notMatched")).toBe(false);
    expect(wrapper.find(".icon").at(4).hasClass("matched")).toBe(true);

    expect(
      wrapper.find(".sidebarItems li").at(2).find(".modified").length
    ).toBe(1);
    expect(
      wrapper.find(".sidebarItems li").at(3).find(".modified").length
    ).toBe(1);
    expect(
      wrapper.find(".sidebarItems li").at(4).find(".modified").length
    ).toBe(0);
  });
});
