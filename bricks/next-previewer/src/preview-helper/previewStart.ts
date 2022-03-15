import { getHistory } from "@next-core/brick-kit";
import type {
  PluginLocation,
  PreviewMessagePreviewerPreviewStarted,
  PreviewMessagePreviewerUrlChange,
  PreviewMessageToPreviewer,
} from "@next-core/brick-types";
import { showOverlay } from "./overlay";
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
  window.parent.postMessage(
    {
      sender: "previewer",
      type: "preview-started",
    } as PreviewMessagePreviewerPreviewStarted,
    previewFromOrigin
  );
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
          if (data.forwardedFor === "builder") {
            const elements = document.querySelectorAll<HTMLElement>(
              `[data-iid="${data.iid}"]`
            );
            showOverlay([...elements]);
          }
          break;
        case "toggle-inspecting":
          data.enabled ? startInspecting() : stopInspecting();
          break;
        case "refresh":
          location.reload();
          break;
      }
    }
  );

  const history = getHistory();

  const sendLocationChange = (loc: PluginLocation): void => {
    window.parent.postMessage(
      {
        sender: "previewer",
        type: "url-change",
        url: location.origin + history.createHref(loc),
      } as PreviewMessagePreviewerUrlChange,
      previewFromOrigin
    );
  };

  sendLocationChange(history.location);

  history.listen(sendLocationChange);
}
