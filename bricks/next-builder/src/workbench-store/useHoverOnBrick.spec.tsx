import React from "react";
import { mount } from "enzyme";
import { useHoverOnBrick } from "./useHoverOnBrick";
import { useHoverNodeUid } from "@next-core/editor-bricks-helper";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useHoverNodeUid: jest.fn(),
}));

const postMessage = jest.spyOn(window, "postMessage").mockImplementation();

function TestComponent(): React.ReactElement {
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
  useHoverOnBrick(manager);
  return null;
}

describe("useHoverOnBrick", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(1);
    mount(<TestComponent />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "hover-on-brick",
      iid: "i-1",
    });
  });

  it("should work when hover on node other than brick", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(2);
    mount(<TestComponent />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "hover-on-brick",
      iid: undefined,
    });
  });

  it("should work when hover on non-existed node", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(3);
    mount(<TestComponent />);
    expect(postMessage).toBeCalledWith({
      sender: "builder",
      type: "hover-on-brick",
      iid: undefined,
    });
  });
});
