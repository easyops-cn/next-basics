import { developHelper, getHistory, getRuntime } from "@next-core/brick-kit";
import { FormDataProperties } from "@next-core/brick-kit/dist/types/core/CustomForms/ExpandCustomForm";
import type {
  BrickConf,
  CustomTemplate,
  PluginLocation,
  RouteConf,
  StoryboardContextItemFreeVariable,
} from "@next-core/brick-types";
import { matchPath } from "@next-core/brick-utils";
import type {
  BrickOutline,
  HighLightNode,
  Position,
  PreviewDataOption,
  PreviewMessageFromPreviewer,
  PreviewMessagePreviewerCaptureFailed,
  PreviewMessagePreviewerCaptureOk,
  PreviewMessagePreviewerHighlightBrick,
  PreviewMessagePreviewerHighlightContext,
  PreviewMessagePreviewerHoverOnMain,
  PreviewMessagePreviewerRouteMatchChange,
  PreviewMessagePreviewerScroll,
  PreviewMessagePreviewerUrlChange,
  PreviewMessagePreviewDataValueSuccess,
  PreviewMessagePreviewDataValueError,
  PreviewMessageToPreviewer,
  PreviewSettings,
  PreviewStartOptions,
  PreviewMessagePreviewContractUpdate,
} from "@next-types/preview";
import { isEmpty, throttle } from "lodash";
import { capture } from "./capture";
import {
  previewProxyOrigin,
  getPossibleBrickIidList,
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

  const handleHoverOnIframe = (pos: Position): void => {
    const element = document.elementFromPoint(pos.x, pos.y);
    if (element?.tagName === "BODY") {
      window.parent.postMessage(
        {
          sender: "previewer",
          type: "hover-on-main",
          isDirection: true,
          position: {
            x: pos.x,
            y: pos.y,
          },
        } as PreviewMessagePreviewerHoverOnMain,
        previewProxyOrigin
      );
    } else {
      const iidList = getPossibleBrickIidList(element as HTMLElement);
      window.parent.postMessage(
        {
          sender: "previewer",
          type: "hover-on-brick",
          iidList,
          isDirection: true,
          position: {
            x: pos.x,
            y: pos.y,
          },
        },
        previewProxyOrigin
      );
    }
  };

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

  const sendHighlightBricksOutlines = (nodes: HighLightNode[]): void => {
    const outlines = nodes
      .map((node) => getBrickOutlines(node.iid, node.alias))
      .flat();
    sendMessage<PreviewMessagePreviewerHighlightContext>({
      type: "highlight-context",
      outlines,
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

  const updateSnippetPreviewSettings = (): void => {
    developHelper.updateSnippetPreviewSettings(
      options.appId,
      JSON.parse(options.snippetData),
      options.settings
    );
    getHistory().reload();
  };

  const updateFormPreviewSettings = (): void => {
    developHelper.updateFormPreviewSettings(
      options.appId,
      options.formId,
      options.formData
    );
    getHistory().reload();
  };

  const handlePreviewData = (name: string, option: PreviewDataOption): void => {
    try {
      const { dataType } = option;
      let tplContextId;

      if (dataType === "state") {
        const mainMountPoint = document.querySelector("#main-mount-point");

        tplContextId = (mainMountPoint.firstChild as HTMLElement).dataset
          .tplContextId;

        if (!tplContextId) {
          sendMessage<PreviewMessagePreviewDataValueError>({
            type: "inspect-data-value-error",
            data: {
              error: {
                message:
                  "tplContextId not found, unable to preview STATE value",
              },
            },
          });

          return;
        }
      }

      let value, type: PreviewMessagePreviewDataValueSuccess["type"];
      if (name) {
        type = "inspect-single-data-value-success";
        value = developHelper.getContextValue(name, {
          tplContextId,
        });
      } else {
        value = [];
        type = "inspect-all-data-values-success";

        const data = developHelper.getAllContextValues({ tplContextId });

        for (const [k, v] of data) {
          value.push({
            name: k,
            value: (v as StoryboardContextItemFreeVariable).value,
          });
        }
      }

      sendMessage<PreviewMessagePreviewDataValueSuccess>({
        type,
        data: {
          name,
          value,
        },
      });

      // istanbul ignore next
    } catch (error) {
      sendMessage<PreviewMessagePreviewDataValueError>({
        type: "inspect-data-value-error",
        data: {
          message: error.message,
        },
      });
    }
  };

  const history = getHistory();

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
          case "hover-on-main":
            sendHighlightBrickOutlines("hover", "#main-mount-point", "root");
            break;
          case "hover-on-context":
            sendHighlightBricksOutlines(data.highlightNodes);
            break;
          case "select-brick":
            activeIid = data.iid;
            activeAlias = data.alias;
            sendHighlightBrickOutlines("active", data.iid, data.alias);
            break;
          case "hover-on-iframe":
            handleHoverOnIframe(data.position);
            break;
        }
      } else
        switch (data.type) {
          case "toggle-inspecting":
            data.enabled ? startInspecting() : stopInspecting();
            break;
          case "refresh":
            if (data.options?.updateStoryboardType) {
              if (data.options.updateStoryboardType === "route") {
                developHelper.updateStoryboardByRoute(
                  options.appId,
                  data.storyboardPatch as RouteConf
                );
              } else if (data.options.updateStoryboardType === "template") {
                developHelper.updateStoryboardByTemplate(
                  options.appId,
                  data.storyboardPatch as CustomTemplate,
                  data.options.settings
                );
              } else if (data.options.updateStoryboardType === "snippet") {
                developHelper.updateStoryboardBySnippet(
                  options.appId,
                  data.storyboardPatch as {
                    snippetId: string;
                    bricks: BrickConf[];
                  },
                  data.options.settings
                );
              } else if (data.options.updateStoryboardType === "form") {
                developHelper.updateFormPreviewSettings(
                  options.appId,
                  options.formId,
                  data.storyboardPatch as FormDataProperties
                );
              }

              const newContracts = developHelper.getAddedContracts?.(
                data.storyboardPatch,
                {
                  appId: options.appId,
                  updateStoryboardType: data.options.updateStoryboardType,
                  formId: options.formId,
                }
              );

              if (!isEmpty(newContracts)) {
                sendMessage<PreviewMessagePreviewContractUpdate>({
                  type: "contract-update",
                  data: {
                    add: newContracts,
                  },
                });
              } else {
                getHistory().reload();
              }

              break;
            }
            developHelper.updateStoryboard(options.appId, data.storyboardPatch);
            if (options.templateId) {
              lastTemplatePreviewSettings = data.settings;
              updateTemplatePreviewSettings();
            } else if (options.formId || options.formData) {
              updateFormPreviewSettings();
            } else if (data.options.snippetData) {
              options.snippetData = data.options.snippetData;
              updateSnippetPreviewSettings();
            } else {
              getHistory().reload();
            }
            break;
          case "reload":
            location.reload();
            break;
          case "back":
            history.goBack();
            break;
          case "forward":
            history.goForward();
            break;
          case "capture":
            capture(data.maxWidth, data.maxHeight).then(
              (screenshot) => {
                sendMessage<PreviewMessagePreviewerCaptureOk>({
                  type: "capture-ok",
                  screenshot,
                });
              },
              () => {
                sendMessage<PreviewMessagePreviewerCaptureFailed>({
                  type: "capture-failed",
                });
              }
            );
            break;
          case "inspect-data-value":
            handlePreviewData(data.name, data.option);
            break;
          case "update-preview-url": {
            // Remove origin first.
            const url = data.previewUrl.startsWith(window.origin)
              ? data.previewUrl.substring(window.origin.length)
              : data.previewUrl;
            // Then remove base path.
            const basePath = getRuntime().getBasePath();
            const to = url.startsWith(basePath)
              ? url.substring(basePath.length - 1)
              : url;
            getHistory().push(to);
            break;
          }
          case "update-preview-route": {
            options.routePath = data.routePath;
            options.routeExact = data.routeExact;
            break;
          }
          case "excute-proxy-method": {
            const [ref, method, args = []] = data.proxyMethodArgs;
            try {
              const result = document.body.querySelector(ref)[method](...args);
              window.parent.postMessage({
                sender: "previewer",
                type: "excute-proxy-method-success",
                data: { method: method, res: result },
              });
            } catch (err) {
              window.parent.postMessage({
                sender: "previewer",
                type: "excute-proxy-method-error",
                data: { method: method, res: err.message },
              });
            }
            break;
          }
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
      if (options.formId && !previewPageMatch && match) {
        const mainMountPoint = document.querySelector("#main-mount-point");
        const placeholderLoadObserver = new MutationObserver(() => {
          // We observe when the placeholder is appeared.
          if (
            mainMountPoint.childNodes.length === 1 &&
            (mainMountPoint.firstChild as HTMLElement).tagName === "SPAN" &&
            mainMountPoint.firstChild.childNodes.length === 0
          ) {
            updateFormPreviewSettings();
            placeholderLoadObserver.disconnect();
          }
        });
        placeholderLoadObserver.observe(mainMountPoint, { childList: true });
      }
      if (options.snippetData && !previewPageMatch && match) {
        const mainMountPoint = document.querySelector("#main-mount-point");
        const placeholderLoadObserver = new MutationObserver(() => {
          // We observe when the placeholder is appeared.
          if (
            mainMountPoint.childNodes.length === 1 &&
            (mainMountPoint.firstChild as HTMLElement).tagName === "SPAN" &&
            mainMountPoint.firstChild.childNodes.length === 0
          ) {
            updateSnippetPreviewSettings();
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

  if (options.formId || options.formData) {
    updateFormPreviewSettings();
  }

  if (options.snippetData) {
    updateSnippetPreviewSettings();
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

function getBrickOutlines(iid: string, alias?: string): BrickOutline[] {
  if (!iid) {
    return [];
  }
  const isRoot = iid.includes("#");
  const elements = document.querySelectorAll<HTMLElement>(
    isRoot ? iid : `[data-iid="${iid}"]`
  );
  const outlines = getOutlines(elements, alias);
  return isRoot
    ? outlines.map((item) => ({
        ...item,
        height: window.innerHeight - item.top,
      }))
    : outlines;
}

function getOutlines(
  elements: NodeListOf<HTMLElement>,
  alias?: string
): BrickOutline[] {
  return [...elements].map((element) => {
    const { width, height, left, top } = element.getBoundingClientRect();
    return {
      width,
      height,
      left: left + window.scrollX,
      top: top + window.scrollY,
      alias,
    };
  });
}
