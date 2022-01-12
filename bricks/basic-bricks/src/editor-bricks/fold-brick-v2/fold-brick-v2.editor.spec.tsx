import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { FoldBrickV2Editor } from "./fold-brick-v2.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("FoldBrickV2Editor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "fold-brick-v2",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<FoldBrickV2Editor nodeUid={1} />);
    expect(wrapper.find("div").text()).toBe("my-brick");
  });
});
