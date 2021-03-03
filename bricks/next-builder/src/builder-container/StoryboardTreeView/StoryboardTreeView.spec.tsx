import React from "react";
import { shallow } from "enzyme";
import { useBuilderGroupedChildNodes } from "@next-core/editor-bricks-helper";
import { StoryboardTreeView } from "./StoryboardTreeView";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderGroupedChildNodes: jest.fn(),
}));

jest.mock("../ToolboxPane/ToolboxPane");
jest.mock("../StoryboardTreeNodeList/StoryboardTreeNodeList");

const mockUseBuilderGroupedChildNodes = useBuilderGroupedChildNodes as jest.Mock;

describe("StoryboardTreeView", () => {
  it("should work", () => {
    mockUseBuilderGroupedChildNodes.mockReturnValueOnce([
      {
        mountPoint: "bricks",
        childNodes: [
          {
            $$uid: 1,
          },
        ],
      },
    ]);
    const wrapper = shallow(<StoryboardTreeView />);
    expect(wrapper.find("StoryboardTreeNodeList").prop("childNodes")).toEqual([
      {
        $$uid: 1,
      },
    ]);
  });
});
