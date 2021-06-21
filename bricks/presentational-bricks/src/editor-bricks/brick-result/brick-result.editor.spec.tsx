import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { BrickResultEditor } from "./brick-result.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("BrickResultEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-result",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<BrickResultEditor nodeUid={1} />);
    expect(wrapper.find(".content").length).toBe(1);
  });
});
