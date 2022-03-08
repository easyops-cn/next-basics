import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { SideBarEditor } from "./side-bar.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("SideBarEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "side-bar",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<SideBarEditor nodeUid={1} />);
    expect(wrapper.find(".appName").text()).toBe("my-brick");
    expect(wrapper.find(".sibarItem").length).toBe(5);
  });
});
