import React from "react";
import { mount } from "enzyme";
import { useListenOnPreviewMessage } from "./useListenOnPreviewMessage";
import { useHoverNodeUid } from "@next-core/editor-bricks-helper";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useHoverNodeUid: jest.fn(),
}));

const manager = {
  getData() {
    return {
      nodes: [
        {
          $$uid: 1,
          instanceId: "i-1",
        },
        {
          $$uid: 2,
          instanceId: "i-2",
          $$isTemplateInternalNode: true,
        },
      ],
    };
  },
  setHoverNodeUid: jest.fn(),
  nodeClick: jest.fn(),
} as any;

function TestComponent(): React.ReactElement {
  useListenOnPreviewMessage(manager);
  return null;
}

describe("useListenOnPreviewMessage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work for hover on brick", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(1);
    const wrapper = mount(<TestComponent />);
    window.dispatchEvent(
      new MessageEvent("message", {
        data: {
          sender: "preview-container",
          forwardedFor: "previewer",
          type: "hover-on-brick",
          iidList: ["i-3", "i-2", "i-1"],
        },
        origin: location.origin,
      })
    );
    expect(manager.setHoverNodeUid).toBeCalledWith(1);
    wrapper.unmount();
  });

  it("should work for select brick", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(1);
    const wrapper = mount(<TestComponent />);
    window.dispatchEvent(
      new MessageEvent("message", {
        data: {
          sender: "preview-container",
          forwardedFor: "previewer",
          type: "select-brick",
          iidList: ["i-3", "i-2", "i-1"],
        },
        origin: location.origin,
      })
    );
    expect(manager.nodeClick).toBeCalledWith(
      expect.objectContaining({
        instanceId: "i-1",
      })
    );
    wrapper.unmount();
  });

  it("should ignore for select non-found brick", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(1);
    const wrapper = mount(<TestComponent />);
    window.dispatchEvent(
      new MessageEvent("message", {
        data: {
          sender: "preview-container",
          forwardedFor: "previewer",
          type: "select-brick",
          iidList: ["i-3", "i-2"],
        },
        origin: location.origin,
      })
    );
    expect(manager.nodeClick).not.toBeCalled();
    wrapper.unmount();
  });

  it("should ignore for irrelevant message", () => {
    (useHoverNodeUid as jest.Mock).mockReturnValue(1);
    const wrapper = mount(<TestComponent />);
    window.dispatchEvent(
      new MessageEvent("message", {
        data: {
          sender: "preview-container",
          forwardedFor: "previewer",
          type: "oops",
          iidList: ["i-1"],
        },
        origin: location.origin,
      })
    );
    window.dispatchEvent(
      new MessageEvent("message", {
        data: {
          sender: "preview-container",
          forwardedFor: "previewer",
          // Unexpected message type.
          type: "oops",
          iidList: ["i-1"],
        },
        origin: location.origin,
      })
    );
    window.dispatchEvent(
      new MessageEvent("message", {
        data: {
          sender: "preview-container",
          // Unexpected forwardedFor.
          forwardedFor: "unknown",
          type: "select-brick",
          iidList: ["i-1"],
        },
        origin: location.origin,
      })
    );
    window.dispatchEvent(
      new MessageEvent("message", {
        data: {
          // Unexpected sender.
          sender: "unknown",
          forwardedFor: "previewer",
          type: "select-brick",
          iidList: ["i-1"],
        },
        origin: location.origin,
      })
    );
    window.dispatchEvent(
      new MessageEvent("message", {
        data: {
          // Unexpected sender.
          sender: "preview-container",
          forwardedFor: "previewer",
          type: "select-brick",
          iidList: ["i-1"],
        },
        origin: "http://localhost:3000",
      })
    );
    expect(manager.setHoverNodeUid).not.toBeCalled();
    expect(manager.nodeClick).not.toBeCalled();
    wrapper.unmount();
  });
});
