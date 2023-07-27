import React from "react";
import { mount } from "enzyme";
import { useHighlightBrick } from "./useHighlightBrick";
import {
  useHoverNodeUid,
  useActiveNodeUid,
  useHighlightNodes,
  useBuilderContextMenuStatus,
} from "@next-core/editor-bricks-helper";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useHoverNodeUid: jest.fn(),
  useActiveNodeUid: jest.fn(),
  useHighlightNodes: jest.fn(),
  useBuilderContextMenuStatus: jest.fn().mockReturnValue({ active: false }),
}));

const postMessage = jest.spyOn(window, "postMessage").mockImplementation();

function TestComponent({
  type,
}: {
  type: "active" | "hover";
}): React.ReactElement {
  const manager = {
    getData() {
      return {
        nodes: [
          {
            $$uid: 1,
            type: "brick",
            instanceId: "i-1",
          },
          {
            $$uid: 2,
            type: "template",
            instanceId: "i-2",
          },
          {
            $$uid: 3,
            type: "custom-template",
            instanceId: "i-3",
          },
          {
            $$uid: 4,
            type: "bricks",
            instanceId: "i-4",
          },
        ],
      };
    },
  } as any;
  useHighlightBrick(type, manager);
  return null;
}

describe("useHighlightBrick", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work for hover", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(1);
    mount(<TestComponent type="hover" />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "hover-on-brick",
      iid: "i-1",
    });
  });

  it("should work for hover", () => {
    (useHighlightNodes as jest.Mock).mockReturnValue(new Set([1]));
    mount(<TestComponent type="hover" />);
    expect(postMessage.mock.calls[1][0]).toEqual({
      highlightNodes: [{ alias: undefined, iid: "i-1" }],
      sender: "builder",
      type: "hover-on-context",
    });
  });

  it("should work when hover on node other than brick", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(2);
    mount(<TestComponent type="hover" />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "hover-on-brick",
      iid: undefined,
    });
  });

  it("should work when hover on non-existed node", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(4);
    mount(<TestComponent type="hover" />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "hover-on-main",
    });
  });

  it("should work when hover on non-existed node", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(NaN);
    mount(<TestComponent type="hover" />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "hover-on-brick",
      iid: undefined,
    });
  });

  it("should work for active", () => {
    (useActiveNodeUid as jest.Mock).mockReturnValue(3);
    mount(<TestComponent type="active" />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "select-brick",
      iid: "i-3",
    });
  });

  it("should work for active null", () => {
    (useActiveNodeUid as jest.Mock).mockReturnValue(null);
    mount(<TestComponent type="active" />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "select-brick",
      iid: undefined,
    });
  });

  it("should work for context menu node", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(1);
    (useBuilderContextMenuStatus as jest.Mock).mockReturnValue({
      active: true,
      node: { $$uid: 3 },
    });

    mount(<TestComponent type="hover" />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "hover-on-brick",
      iid: "i-3",
    });
  });
});
