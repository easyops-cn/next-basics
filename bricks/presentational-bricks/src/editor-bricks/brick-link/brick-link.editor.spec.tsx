import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { BrickLinkEditor } from "./brick-link.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("BrickLinkEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-link",
      alias: "my-brick",
      $$parsedProperties: {
        label: "my link",
      },
    });
    const wrapper = shallow(<BrickLinkEditor nodeUid={1} />);
    expect(wrapper.find(".linkContainer").text()).toEqual("my link");
  });
});
