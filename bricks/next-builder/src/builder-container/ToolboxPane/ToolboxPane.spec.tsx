import React from "react";
import { shallow } from "enzyme";
import { Popover } from "antd";
import { ToolboxPane } from "./ToolboxPane";

describe("ToolboxPane", () => {
  it("should work", () => {
    const wrapper = shallow(
      <ToolboxPane title="Storyboard">Content</ToolboxPane>
    );
    expect(wrapper.find(".toolboxPaneTitle").text()).toBe("Storyboard");
    expect(wrapper.find(".toolboxPaneTooltips").length).toBe(0);
  });

  it("should show tooltips", () => {
    const wrapper = shallow(
      <ToolboxPane title="Storyboard" tooltips="For good">
        Content
      </ToolboxPane>
    );
    expect(wrapper.find(Popover).prop("content")).toBe("For good");
    expect(
      wrapper.find(Popover).invoke("getPopupContainer")({
        parentElement: "fake",
      } as any)
    ).toBe("fake");
  });
});
