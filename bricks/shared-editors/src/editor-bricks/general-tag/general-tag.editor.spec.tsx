import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralTagEditor, BrickTag } from "./general-tag.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralTagEditorEditor", () => {
  it("should render single tag", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-general-search",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<GeneralTagEditor nodeUid={1} />);
    expect(wrapper.find(BrickTag).length).toEqual(1);
    const tagWrapper = wrapper.find(BrickTag).shallow();
    expect(tagWrapper.find(".tag").length).toBe(1);
  });

  it("should render mutiple tag", () => {
    mockUseBuilderNode.mockReturnValue({
      type: "brick",
      id: "B-001",
      brick: "brick-general-search",
      alias: "my-brick",
      $$parsedProperties: {
        tagList: ["a", "b", "c"],
      },
    });
    const wrapper = shallow(<GeneralTagEditor nodeUid={1} />);
    expect(wrapper.find(BrickTag).length).toEqual(3);
  });
});
