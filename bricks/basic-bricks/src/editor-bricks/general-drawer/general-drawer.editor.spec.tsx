import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralDrawerEditor } from "./general-drawer.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralDrawerEditor", () => {
  it("should work with headerLeft slot", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-drawer",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<GeneralDrawerEditor nodeUid={1} />);
    expect(wrapper.find(helper.SlotContainer).at(0).prop("slotName")).toBe(
      "headerLeft"
    );
  });

  it("should work with title", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-drawer",
      alias: "my-brick",
      $$parsedProperties: {
        customTitle: "drawer title",
      },
    });
    const wrapper = shallow(<GeneralDrawerEditor nodeUid={1} />);
    expect(wrapper.find(".title").text()).toEqual("drawer title");
  });
});
