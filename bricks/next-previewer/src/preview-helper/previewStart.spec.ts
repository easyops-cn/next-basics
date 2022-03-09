import {
  setPreviewFromOrigin,
  startInspecting,
  stopInspecting,
} from "./inspector";
import { showOverlay } from "./overlay";
import { previewStart } from "./previewStart";

jest.mock("./inspector");
jest.mock("./overlay");

const parentPostMessage = jest.fn();
// Must delete it first in Jest.
delete window.parent;
window.parent = {
  postMessage: parentPostMessage,
} as any;

const addEventListener = jest.spyOn(window, "addEventListener");

const brick = document.createElement("div");
brick.dataset.iid = "i-01";
document.body.appendChild(brick);

describe("previewStart", () => {
  it("should work", () => {
    previewStart("http://localhost:8081");
    expect(parentPostMessage).toBeCalledWith(
      {
        sender: "previewer",
        type: "preview-started",
      },
      "http://localhost:8081"
    );
    expect(setPreviewFromOrigin).toBeCalledWith("http://localhost:8081");

    // Ignore re-start.
    previewStart("http://localhost:8081");
    expect(parentPostMessage).toBeCalledTimes(1);

    const listener = addEventListener.mock.calls[0][1] as EventListener;
    listener({
      // From different origin.
      origin: "http://localhost:3000",
      data: {
        sender: "preview-container",
        type: "toggle-inspecting",
      },
    } as any);
    listener({
      // Data is null.
      origin: "http://localhost:8081",
      data: null,
    } as any);
    listener({
      // Unknown type.
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "unknown",
      },
    } as any);
    listener({
      // No `forwardedFor`.
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "hover-on-brick",
        iid: "i-01",
      },
    } as any);
    listener({
      // Unexpected sender.
      origin: "http://localhost:8081",
      data: {
        sender: "builder",
        type: "toggle-inspecting",
      },
    } as any);
    expect(startInspecting).not.toBeCalled();
    expect(stopInspecting).not.toBeCalled();
    expect(showOverlay).not.toBeCalled();

    listener({
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "hover-on-brick",
        forwardedFor: "builder",
        iid: "i-01",
      },
    } as any);
    expect(showOverlay).toBeCalledWith([brick]);

    listener({
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "toggle-inspecting",
        enabled: true,
      },
    } as any);
    expect(startInspecting).toBeCalledTimes(1);

    listener({
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "toggle-inspecting",
        enabled: false,
      },
    } as any);
    expect(stopInspecting).toBeCalledTimes(1);
  });
});
