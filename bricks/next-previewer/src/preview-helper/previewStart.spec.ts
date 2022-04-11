import * as kit from "@next-core/brick-kit";
import {
  setPreviewFromOrigin,
  startInspecting,
  stopInspecting,
} from "./inspector";
import { previewStart } from "./previewStart";

jest.mock("./inspector");

const historyListeners = new Set<(loc: string) => void>();
const history = {
  location: {
    pathname: "/a",
  },
  createHref(loc) {
    return `/next${loc.pathname}`;
  },
  listen(fn) {
    historyListeners.add(fn);
  },
  push(pathname) {
    this.location = {
      pathname,
    };
    for (const fn of historyListeners) {
      fn(this.location);
    }
  },
  reload: jest.fn(),
} as any;
jest.spyOn(kit, "getHistory").mockReturnValue(history);
jest.spyOn(kit.developHelper, "updateStoryboard").mockImplementation();
jest
  .spyOn(kit.developHelper, "updateTemplatePreviewSettings")
  .mockImplementation();

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
    previewStart("http://localhost:8081", {
      routePath: "/a",
      routeExact: true,
    });
    expect(setPreviewFromOrigin).toBeCalledWith("http://localhost:8081");
    expect(parentPostMessage).toBeCalledTimes(3);
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      1,
      {
        sender: "previewer",
        type: "preview-started",
      },
      "http://localhost:8081"
    );
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      2,
      {
        sender: "previewer",
        type: "url-change",
        url: "http://localhost/next/a",
      },
      "http://localhost:8081"
    );
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      3,
      {
        sender: "previewer",
        type: "route-match-change",
        match: true,
      },
      "http://localhost:8081"
    );

    history.push("/b");
    expect(parentPostMessage).toBeCalledTimes(5);
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      4,
      {
        sender: "previewer",
        type: "url-change",
        url: "http://localhost/next/b",
      },
      "http://localhost:8081"
    );
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      5,
      {
        sender: "previewer",
        type: "route-match-change",
        match: false,
      },
      "http://localhost:8081"
    );

    // Ignore re-start.
    previewStart("http://localhost:8081");
    expect(parentPostMessage).toBeCalledTimes(5);

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

    // Hover on brick.
    listener({
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "hover-on-brick",
        forwardedFor: "builder",
        iid: "i-01",
      },
    } as any);
    expect(parentPostMessage).toBeCalledTimes(6);
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      6,
      {
        sender: "previewer",
        type: "highlight-brick",
        highlightType: "hover",
        outlines: [{ width: 0, height: 0, left: 0, top: 0 }],
        iid: "i-01",
      },
      "http://localhost:8081"
    );

    // Select brick.
    listener({
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "select-brick",
        forwardedFor: "builder",
        iid: "i-01",
      },
    } as any);
    expect(parentPostMessage).toBeCalledTimes(7);
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      7,
      {
        sender: "previewer",
        type: "highlight-brick",
        highlightType: "active",
        outlines: [{ width: 0, height: 0, left: 0, top: 0 }],
        iid: "i-01",
      },
      "http://localhost:8081"
    );

    // Unselect brick.
    listener({
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "select-brick",
        forwardedFor: "builder",
        iid: null,
      },
    } as any);
    expect(parentPostMessage).toBeCalledTimes(8);
    expect(parentPostMessage).toHaveBeenNthCalledWith(
      8,
      {
        sender: "previewer",
        type: "highlight-brick",
        highlightType: "active",
        outlines: [],
        iid: null,
      },
      "http://localhost:8081"
    );

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

    listener({
      origin: "http://localhost:8081",
      data: {
        sender: "preview-container",
        type: "refresh",
        appId: "my-app",
        storyboardPatch: { routes: [] },
        templateId: "my-tpl",
        settings: {
          properties: { dataTest: "good" },
        },
      },
    } as any);
    expect(kit.developHelper.updateTemplatePreviewSettings).toBeCalledWith(
      "my-app",
      "my-tpl",
      {
        properties: { dataTest: "good" },
      }
    );
    expect(history.reload).toBeCalledTimes(2);
  });
});
