import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { BrickTreeEditor } from "./brick-tree.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("BrickTreeEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-tree",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<BrickTreeEditor nodeUid={1} />);
    expect(wrapper.find(".item").length).toBe(4);
  });
});
