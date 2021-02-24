import React from "react";
import { shallow } from "enzyme";
import {
  useBuilderGroupedChildNodes,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { StoryboardTreeView } from "./StoryboardTreeView";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderNode: jest.fn(),
  useBuilderGroupedChildNodes: jest.fn(),
}));

jest.mock("../StoryboardTreeNodeList/StoryboardTreeNodeList");

const mockUseBuilderNode = useBuilderNode as jest.Mock;
const mockUseBuilderGroupedChildNodes = useBuilderGroupedChildNodes as jest.Mock;

describe("StoryboardTreeView", () => {
  it("should work for bricks", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      alias: "my-brick",
    });
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
    expect(wrapper.find(".treeName").find("span").text()).toBe("my-brick");
  });

  it("should work for custom templates", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "custom-template",
      templateId: "tpl-test",
    });
    mockUseBuilderGroupedChildNodes.mockReturnValueOnce([
      {
        mountPoint: "bricks",
      },
    ]);
    const wrapper = shallow(<StoryboardTreeView />);
    expect(wrapper.find(".treeName").find("span").text()).toBe("tpl-test");
  });

  it("should return null if no root node", () => {
    mockUseBuilderNode.mockReturnValueOnce(null);
    mockUseBuilderGroupedChildNodes.mockReturnValueOnce([]);
    const wrapper = shallow(<StoryboardTreeView />);
    expect(wrapper.html()).toBe(null);
  });
});
