import { developHelper, getHistory, getRuntime } from "@next-core/brick-kit";
import type { PluginLocation } from "@next-core/brick-types";
import type {
  BrickOutline,
  PreviewMessageFromPreviewer,
  PreviewMessagePreviewerHighlightBrick,
  PreviewMessagePreviewerHighlightRootTpl,
  PreviewMessagePreviewerResize,
  PreviewMessagePreviewerScroll,
  PreviewMessagePreviewerUrlChange,
  PreviewMessageToPreviewer,
} from "@next-types/preview";
import {
  setPreviewFromOrigin,
  startInspecting,
  stopInspecting,
} from "./inspector";

let started = false;

export function previewStart(previewFromOrigin: string): void {
  if (started) {
    return;
  }
  started = true;

  const sendMessage = <T extends PreviewMessageFromPreviewer>(
    message: Omit<T, "sender">
  ): void => {
    window.parent.postMessage(
      {
        sender: "previewer",
        ...message,
      },
      previewFromOrigin
    );
  };

  sendMessage({ type: "preview-started" });
  setPreviewFromOrigin(previewFromOrigin);

  window.addEventListener(
    "message",
    ({ data, origin }: MessageEvent<PreviewMessageToPreviewer>) => {
      if (
        origin !== previewFromOrigin ||
        !data ||
        data.sender !== "preview-container"
      ) {
        return;
      }
      switch (data.type) {
        case "hover-on-brick":
        case "select-brick":
          if (data.forwardedFor === "builder") {
            const outlines = getBrickOutlines(data.iid);
            sendMessage<PreviewMessagePreviewerHighlightBrick>({
              type: "highlight-brick",
              highlightType:
                data.type === "hover-on-brick" ? "hover" : "active",
              outlines,
              iid: data.iid,
              alias: data.alias,
            });
          }
          break;
        case "init-root-tpl":
          if (data.forwardedFor === "builder") {
            const outlines = getTplOutlines(data.rootTpl);
            sendMessage<PreviewMessagePreviewerHighlightRootTpl>({
              type: "highlight-root-tpl",
              outlines,
              rootTpl: data.rootTpl,
            });
          }
          break;
        case "toggle-inspecting":
          data.enabled ? startInspecting() : stopInspecting();
          break;
        case "refresh":
          developHelper.updateStoryboard(data.appId, data.storyboardPatch);
          getHistory().reload();
          break;
        case "reload":
          location.reload();
          break;
      }
    }
  );

  window.addEventListener("scroll", () => {
    sendMessage<PreviewMessagePreviewerScroll>({
      type: "scroll",
      scroll: {
        x: window.scrollX,
        y: window.scrollY,
      },
    });
  });

  window.addEventListener("resize", () => {
    sendMessage<PreviewMessagePreviewerResize>({
      type: "resize",
    });
  });

  const history = getHistory();

  const sendLocationChange = (loc: PluginLocation): void => {
    sendMessage<PreviewMessagePreviewerUrlChange>({
      type: "url-change",
      url: location.origin + history.createHref(loc),
    });
  };

  sendLocationChange(history.location);

  history.listen(sendLocationChange);
}

function getBrickOutlines(iid: string): BrickOutline[] {
  if (!iid) {
    return [];
  }
  const elements = document.querySelectorAll<HTMLElement>(
    `[data-iid="${iid}"]`
  );
  return getOutlines(elements);
}

function getTplOutlines(tpl: string): BrickOutline[] {
  const appId = getRuntime().getCurrentApp().id;
  const elements = document.querySelectorAll<HTMLElement>(`${appId}\\.${tpl}`);
  return getOutlines(elements);
}

function getOutlines(elements: NodeListOf<HTMLElement>): BrickOutline[] {
  return [...elements].map((element) => {
    const { width, height, left, top } = element.getBoundingClientRect();
    return {
      width,
      height,
      left: left + window.scrollX,
      top: top + window.scrollY,
    };
  });
}
