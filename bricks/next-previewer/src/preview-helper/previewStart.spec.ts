import * as kit from "@next-core/brick-kit";
import {
  setPreviewFromOrigin,
  startInspecting,
  stopInspecting,
} from "./inspector";
import { showOverlay } from "./overlay";
import { previewStart } from "./previewStart";

jest.mock("./inspector");
jest.mock("./overlay");

const historyListeners = new Set<(loc: string) => void>();
const history = {
  location: "/a",
  createHref(loc) {
    return `/next${loc}`;
  },
  listen(fn) {
    historyListeners.add(fn);
  },
  push(path) {
    this.location = path;
    for (const fn of historyListeners) {
      fn(path);
    }
  },
  reload: jest.fn(),
} as any;
jest.spyOn(kit, "getHistory").mockReturnValue(history);
jest.spyOn(kit.developHelper, "updateStoryboard").mockImplementation();

delete window.location;
window.location = {
  origin: "http://localhost",
  reload: jest.fn(),
} as unknown as Location;

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
    expect(parentPostMessage).toBeCalledTimes(2);
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      1,
      {
        sender: "previewer",
        type: "preview-started",
      },
      "http://localhost:8081"
    );
    expect(setPreviewFromOrigin).toBeCalledWith("http://localhost:8081");
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      2,
      {
        sender: "previewer",
        type: "url-change",
        url: "http://localhost/next/a",
      },
      "http://localhost:8081"
    );

    history.push("/b");
    expect(parentPostMessage).toBeCalledTimes(3);
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      3,
      {
        sender: "previewer",
        type: "url-change",
        url: "http://localhost/next/b",
      },
      "http://localhost:8081"
    );

    // Ignore re-start.
    previewStart("http://localhost:8081");
    expect(parentPostMessage).toBeCalledTimes(3);

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

    listener({
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "reload",
      },
    } as any);
    expect(window.location.reload).toBeCalledTimes(1);

    listener({
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "refresh",
        appId: "my-app",
        storyboardPatch: { routes: [] },
      },
    } as any);
    expect(kit.developHelper.updateStoryboard).toBeCalledWith("my-app", {
      routes: [],
    });
    expect(history.reload).toBeCalledTimes(1);
  });
});
