import React from "react";
import { mount } from "enzyme";
import { useHighlightBrick } from "./useHighlightBrick";
import {
  useHoverNodeUid,
  useActiveNodeUid,
} from "@next-core/editor-bricks-helper";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useHoverNodeUid: jest.fn(),
  useActiveNodeUid: jest.fn(),
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
            type: "custom-template",
            instanceId: "i-2",
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
    (useHoverNodeUid as jest.Mock).mockReturnValue(3);
    mount(<TestComponent type="hover" />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "hover-on-brick",
      iid: undefined,
    });
  });

  it("should work for active", () => {
    (useActiveNodeUid as jest.Mock).mockReturnValue(1);
    mount(<TestComponent type="active" />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "select-brick",
      iid: "i-1",
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
});
