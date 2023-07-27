import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { ListContainerEditor } from "./list-container.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("ListContainerEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "list-container",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<ListContainerEditor nodeUid={1} />);
    expect(wrapper.find(".content").length).toBe(3);
  });
});
