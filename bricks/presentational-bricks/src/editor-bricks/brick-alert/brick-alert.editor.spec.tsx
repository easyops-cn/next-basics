import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { BrickAlertEditor } from "./brick-alert.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("BrickAlertEditor", () => {
  it("should work with message", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-alert",
      alias: "my-brick",
      $$parsedProperties: {
        showIcon: true,
        message: "info",
      },
    });
    const wrapper = shallow(<BrickAlertEditor nodeUid={1} />);
    expect(wrapper.find(".icon").length).toBe(1);
    expect(wrapper.find(".message").length).toBe(1);
    expect(wrapper.find(".description").length).toBe(0);
  });

  it("should work with description", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-alert",
      alias: "my-brick",
      $$parsedProperties: {
        description: "this is description",
      },
    });
    const wrapper = shallow(<BrickAlertEditor nodeUid={1} />);
    expect(wrapper.find(".description").length).toBe(1);
  });

  it("should work with slot", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-alert",
      alias: "my-brick",
      $$parsedProperties: {
        enableActionSlot: true,
        enableMessageSlot: true,
        enableDescSlot: true,
      },
    });
    const wrapper = shallow(<BrickAlertEditor nodeUid={1} />);
    expect(wrapper.find(helper.SlotContainer).length).toBe(3);
  });
});
