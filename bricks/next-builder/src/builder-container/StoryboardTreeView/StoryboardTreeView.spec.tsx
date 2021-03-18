import React from "react";
import { shallow, mount } from "enzyme";
import { useBuilderGroupedChildNodes } from "@next-core/editor-bricks-helper";
import { StoryboardTreeView } from "./StoryboardTreeView";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType } from "../interfaces";
import { SearchComponent } from "../SearchComponent/SearchComponent";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderGroupedChildNodes: jest.fn(),
  useBuilderData: () => ({
    nodes: [
      {
        $$uid: 1,
        type: "brick",
        brick: "my-brick",
        id: "B-001",
        instanceId: "instance-a",
      },
    ],
  }),
}));
jest.mock("../BuilderUIContext");
jest.mock("../StoryboardTreeNodeList/StoryboardTreeNodeList", () => ({
  StoryboardTreeNodeList() {
    return <div>StoryboardTreeNodeList</div>;
  },
}));

const mockUseBuilderGroupedChildNodes = useBuilderGroupedChildNodes as jest.Mock;
const mockUseBuilderUIContext = useBuilderUIContext as jest.Mock;

describe("StoryboardTreeView", () => {
  it("should work for route of bricks", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      dataType: BuilderDataType.ROUTE_OF_BRICKS,
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
    expect(wrapper.find("StoryboardTreeNodeList").prop("childNodes")).toEqual([
      {
        $$uid: 1,
      },
    ]);
  });

  it("should setHighlightNodes", () => {
    const mockSetHighlightNodes = jest.fn();
    mockUseBuilderUIContext.mockReturnValue({
      dataType: BuilderDataType.CUSTOM_TEMPLATE,
      setHighlightNodes: mockSetHighlightNodes,
    });
    mockUseBuilderGroupedChildNodes.mockReturnValue([
      {
        mountPoint: "bricks",
        childNodes: [
          {
            $$uid: 1,
          },
        ],
      },
    ]);
    const wrapper = mount(<StoryboardTreeView />);
    wrapper.find(SearchComponent).invoke("onSearch")("my");
    expect(mockSetHighlightNodes).toBeCalled();
  });

  it("should work for custom template", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      dataType: BuilderDataType.CUSTOM_TEMPLATE,
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
    expect(wrapper.find("StoryboardTreeNodeList").prop("childNodes")).toEqual([
      {
        $$uid: 1,
      },
    ]);
  });

  it("should show no tree for route of routes", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      dataType: BuilderDataType.ROUTE_OF_ROUTES,
    });
    mockUseBuilderGroupedChildNodes.mockReturnValueOnce([
      {
        mountPoint: "routes",
        childNodes: [
          {
            $$uid: 1,
          },
        ],
      },
    ]);
    const wrapper = shallow(<StoryboardTreeView />);
    expect(wrapper.find("StoryboardTreeNodeList").length).toBe(0);
  });
});
