import { developHelper, getHistory } from "@next-core/brick-kit";
import type { PluginLocation } from "@next-core/brick-types";
import { matchPath } from "@next-core/brick-utils";
import type {
  BrickOutline,
  PreviewMessageFromPreviewer,
  PreviewMessagePreviewerHighlightBrick,
  PreviewMessagePreviewerRouteMatchChange,
  PreviewMessagePreviewerScroll,
  PreviewMessagePreviewerUrlChange,
  PreviewMessageToPreviewer,
  PreviewSettings,
  PreviewStartOptions,
} from "@next-types/preview";
import { throttle } from "lodash";
import {
  setPreviewFromOrigin,
  startInspecting,
  stopInspecting,
} from "./inspector";

let started = false;

export function previewStart(
  previewFromOrigin: string,
  options: PreviewStartOptions
): void {
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

  let hoverIid: string;
  let hoverAlias: string;
  let activeIid: string;
  let activeAlias: string;

  const sendHighlightBrickOutlines = (
    type: "hover" | "active",
    iid: string,
    alias: string
  ): void => {
    const outlines = getBrickOutlines(iid);
    sendMessage<PreviewMessagePreviewerHighlightBrick>({
      type: "highlight-brick",
      highlightType: type,
      outlines,
      iid: iid,
      alias: alias,
    });
  };

  let lastTemplatePreviewSettings: PreviewSettings;
  if (options.templateId) {
    lastTemplatePreviewSettings = options.settings;
  }

  const updateTemplatePreviewSettings = (): void => {
    developHelper.updateTemplatePreviewSettings(
      options.appId,
      options.templateId,
      lastTemplatePreviewSettings
    );
    getHistory().reload();
  };

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
      if (data.forwardedFor === "builder") {
        switch (data.type) {
          case "hover-on-brick":
            hoverIid = data.iid;
            hoverAlias = data.alias;
            sendHighlightBrickOutlines("hover", data.iid, data.alias);
            break;
          case "select-brick":
            activeIid = data.iid;
            activeAlias = data.alias;
            sendHighlightBrickOutlines("active", data.iid, data.alias);
            break;
        }
      } else
        switch (data.type) {
          case "toggle-inspecting":
            data.enabled ? startInspecting() : stopInspecting();
            break;
          case "refresh":
            developHelper.updateStoryboard(options.appId, data.storyboardPatch);
            if (options.templateId) {
              lastTemplatePreviewSettings = data.settings;
              updateTemplatePreviewSettings();
            } else {
              getHistory().reload();
            }
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

  const history = getHistory();

  let previewPageMatch = true;
  const sendLocationChange = (loc: PluginLocation): void => {
    sendMessage<PreviewMessagePreviewerUrlChange>({
      type: "url-change",
      url: location.origin + history.createHref(loc),
    });
    if (options.routePath) {
      const match = !!matchPath(loc.pathname, {
        path: options.routePath,
        exact: options.routeExact,
      });
      sendMessage<PreviewMessagePreviewerRouteMatchChange>({
        type: "route-match-change",
        match,
      });

      // Re-update template preview settings once match route again (typically after login).
      if (options.templateId && !previewPageMatch && match) {
        const mainMountPoint = document.querySelector("#main-mount-point");
        const placeholderLoadObserver = new MutationObserver(() => {
          // We observe when the placeholder is appeared.
          if (
            mainMountPoint.childNodes.length === 1 &&
            (mainMountPoint.firstChild as HTMLElement).tagName === "SPAN" &&
            mainMountPoint.firstChild.childNodes.length === 0
          ) {
            updateTemplatePreviewSettings();
            placeholderLoadObserver.disconnect();
          }
        });
        placeholderLoadObserver.observe(mainMountPoint, { childList: true });
      }
      previewPageMatch = match;
    }
  };

  sendLocationChange(history.location);

  history.listen(sendLocationChange);

  if (options.templateId) {
    updateTemplatePreviewSettings();
  }

  const mutationCallback = (): void => {
    if (hoverIid) {
      sendHighlightBrickOutlines("hover", hoverIid, hoverAlias);
    }
    if (activeIid) {
      sendHighlightBrickOutlines("active", activeIid, activeAlias);
    }
  };
  const mutationObserver = new MutationObserver(
    throttle(mutationCallback, 100, { leading: false })
  );
  mutationObserver.observe(document.body, { subtree: true, childList: true });
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
