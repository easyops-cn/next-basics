import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { BuilderCanvasTabs } from "./BuilderCanvasTabs";
import { useBuilderUIContext, ContextOfBuilderUI } from "../BuilderUIContext";

jest.mock("../BuilderUIContext");

// Let's make a canvas list like this:
// · Main canvas:
//   - 1
//     - 5
//       - 6
//   - 3
//     - 7
// · Portal canvas:
//   - 2
//     - 8
// · Portal canvas:
//   - 4
//     - 9
// · Portal canvas (empty)

jest.spyOn(helper, "useBuilderData").mockReturnValue({
  rootId: 0,
  nodes: [],
  edges: [
    {
      parent: 1,
      child: 5,
    },
    {
      parent: 5,
      child: 6,
    },
    {
      parent: 3,
      child: 7,
    },
    {
      parent: 2,
      child: 8,
    },
    {
      parent: 4,
      child: 9,
    },
  ] as Partial<helper.BuilderRuntimeEdge>[] as helper.BuilderRuntimeEdge[],
});

jest.spyOn(helper, "useBuilderGroupedChildNodes").mockReturnValue([
  {
    childNodes: [
      {
        $$uid: 1,
        alias: "B-001",
      },
      {
        $$uid: 2,
        portal: true,
        alias: "B-002",
      },
      {
        $$uid: 3,
        alias: "B-003",
      },
      {
        $$uid: 4,
        portal: true,
        alias: "B-004",
      },
    ] as Partial<helper.BuilderRuntimeNode>[] as helper.BuilderRuntimeNode[],
    mountPoint: "bricks",
  },
]);

const mockUseHoverNodeUid = jest
  .spyOn(helper, "useHoverNodeUid")
  .mockReturnValue(undefined);

const mockUseBuilderUIContext = useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>;

const highlightedNodes = new Set<number>();
jest.spyOn(helper, "useHighlightNodes").mockReturnValue(highlightedNodes);

describe("BuilderCanvasTabs", () => {
  beforeEach(() => {
    highlightedNodes.clear();
  });

  it("should work when canvas index is null", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      canvasIndex: null,
    });
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find("li").length).toBe(4);
    expect(wrapper.find(".active").length).toBe(0);
    expect(wrapper.find(".hover").length).toBe(0);
  });

  it("should work when canvas index is 0", () => {
    const ctx: ContextOfBuilderUI = {
      canvasIndex: 0,
      setCanvasIndex: jest.fn(),
    };
    mockUseBuilderUIContext.mockReturnValueOnce(ctx);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find(".active").text()).toBe("CANVAS_TYPE_MAIN");
    wrapper.find("li").at(1).invoke("onClick")(null);
    expect(ctx.setCanvasIndex).toBeCalledWith(1);
    expect(wrapper.find(".hover").length).toBe(0);
  });

  it("should work when canvas index is 1", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      canvasIndex: 1,
    });
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find(".active").hasClass("isPortalCanvas")).toBe(true);
    expect(wrapper.find(".active").text()).toBe("B-002");
    expect(wrapper.find(".hover").length).toBe(0);
    expect(wrapper.find(".highlighted").length).toBe(0);
  });

  it("should show hover canvas by root child node", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      canvasIndex: 1,
    });
    mockUseHoverNodeUid.mockReturnValueOnce(1);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find("li").at(0).hasClass("hover")).toBe(true);
  });

  it("should show hover canvas by root descendant node", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      canvasIndex: 1,
    });
    mockUseHoverNodeUid.mockReturnValueOnce(5);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find("li").at(0).hasClass("hover")).toBe(true);
  });

  it("should not show hover canvas of active canvas", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      canvasIndex: 0,
    });
    mockUseHoverNodeUid.mockReturnValueOnce(5);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find(".hover").length).toBe(0);
  });

  it("should show hover portal canvas by root child node", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      canvasIndex: 0,
    });
    mockUseHoverNodeUid.mockReturnValueOnce(4);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find("li").at(2).hasClass("hover")).toBe(true);
  });

  it("should show hover portal canvas by root descendant node", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      canvasIndex: 0,
    });
    mockUseHoverNodeUid.mockReturnValueOnce(8);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find("li").at(1).hasClass("hover")).toBe(true);
  });

  it("should show highlighted canvas by root child node", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      canvasIndex: 1,
    });
    highlightedNodes.add(1);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find("li").at(0).hasClass("highlighted")).toBe(true);
  });
});
