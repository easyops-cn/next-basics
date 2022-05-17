import type { Storyboard } from "@next-core/brick-types";

export interface PreviewHelperBrick {
  start(previewFromOrigin: string, options: unknown): void;
}

export interface PreviewBaseMessage {
  sender: "builder" | "preview-container" | "previewer";
  type: string;
  forwardedFor?: "builder" | "previewer";
}

export interface PreviewMessageBuilderHoverOnBrick
  extends PreviewBaseMessage,
    HighlightBaseInfo {
  sender: "builder";
  type: "hover-on-brick";
}

export interface PreviewMessageBuilderSelectBrick
  extends PreviewBaseMessage,
    HighlightBaseInfo {
  sender: "builder";
  type: "select-brick";
}

export interface HighlightBaseInfo {
  iid: string;
  alias: string;
}

export type PreviewMessageFromPreviewer =
  | PreviewMessagePreviewerHoverOnBrick
  | PreviewMessagePreviewerSelectBrick
  | PreviewMessagePreviewerHighlightBrick
  | PreviewMessagePreviewerContextMenuOnBrick
  | PreviewMessagePreviewerPreviewStarted
  | PreviewMessagePreviewerUrlChange
  | PreviewMessagePreviewerRouteMatchChange
  | PreviewMessagePreviewerScroll
  | PreviewMessagePreviewerCaptureOk
  | PreviewMessagePreviewerCaptureFailed;

export type PreviewMessageToPreviewer =
  | PreviewMessageContainerBuilderHoverOnBrick
  | PreviewMessageContainerBuilderSelectBrick
  | PreviewMessageContainerToggleInspecting
  | PreviewMessageContainerRefresh
  | PreviewMessageContainerReload
  | PreviewMessageContainerCapture;

export type PreviewMessageFromContainer =
  | PreviewMessageContainerBuilderHoverOnBrick
  | PreviewMessageContainerPreviewerHoverOnBrick
  | PreviewMessageContainerPreviewerSelectBrick
  | PreviewMessageContainerPreviewerContextMenuOnBrick
  | PreviewMessageContainerRefresh
  | PreviewMessageContainerReload
  | PreviewMessageContainerResize
  | PreviewMessageContainerCapture;

export type PreviewMessageToContainer =
  | PreviewMessageBuilderHoverOnBrick
  | PreviewMessageBuilderSelectBrick
  | PreviewMessagePreviewerHoverOnBrick
  | PreviewMessagePreviewerSelectBrick
  | PreviewMessagePreviewerHighlightBrick
  | PreviewMessagePreviewerContextMenuOnBrick
  | PreviewMessagePreviewerPreviewStarted
  | PreviewMessagePreviewerUrlChange
  | PreviewMessagePreviewerRouteMatchChange
  | PreviewMessagePreviewerScroll
  | PreviewMessagePreviewerCaptureOk
  | PreviewMessagePreviewerCaptureFailed;

export type PreviewerMessageToBuilder =
  | PreviewMessageContainerPreviewerHoverOnBrick
  | PreviewMessageContainerPreviewerSelectBrick
  | PreviewMessageContainerPreviewerContextMenuOnBrick
  | PreviewMessageContainerResize;

export interface PreviewMessagePreviewerPreviewStarted
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "preview-started";
}

export interface PreviewMessagePreviewerHoverOnBrick
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "hover-on-brick";
  iidList: string[];
}

export interface PreviewMessagePreviewerSelectBrick extends PreviewBaseMessage {
  sender: "previewer";
  type: "select-brick";
  iidList: string[];
}

export interface PreviewMessagePreviewerHighlightBrick
  extends PreviewBaseMessage,
    HighlightBaseInfo {
  sender: "previewer";
  type: "highlight-brick";
  highlightType: "active" | "hover";
  outlines: BrickOutline[];
}

export interface PreviewMessagePreviewerContextMenuOnBrick
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "context-menu-on-brick";
  iidList: string[];
  position: {
    x: number;
    y: number;
  };
}

export interface PreviewMessagePreviewerUrlChange extends PreviewBaseMessage {
  sender: "previewer";
  type: "url-change";
  url: string;
}

export interface PreviewMessagePreviewerRouteMatchChange
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "route-match-change";
  match: boolean;
}

export interface PreviewMessagePreviewerScroll extends PreviewBaseMessage {
  sender: "previewer";
  type: "scroll";
  scroll: {
    x: number;
    y: number;
  };
}

export interface PreviewMessagePreviewerCaptureOk extends PreviewBaseMessage {
  sender: "previewer";
  type: "capture-ok";
  screenshot: string;
}

export interface PreviewMessagePreviewerCaptureFailed
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "capture-failed";
}

export interface PreviewMessageContainerStartPreview
  extends PreviewBaseMessage {
  sender: "preview-container";
  type: "start-preview";
  options: PreviewStartOptions;
}

export interface PreviewMessageContainerToggleInspecting
  extends PreviewBaseMessage {
  sender: "preview-container";
  type: "toggle-inspecting";
  enabled: boolean;
}

export interface PreviewMessageContainerRefresh extends PreviewBaseMessage {
  sender: "preview-container";
  type: "refresh";
  storyboardPatch: Partial<Storyboard>;
  settings?: PreviewSettings;
  options?: PreviewStartOptions;
}

export interface PreviewMessageContainerReload extends PreviewBaseMessage {
  sender: "preview-container";
  type: "reload";
}

export interface PreviewMessageContainerResize extends PreviewBaseMessage {
  sender: "preview-container";
  type: "resize";
}

export interface PreviewMessageContainerCapture extends PreviewBaseMessage {
  sender: "preview-container";
  type: "capture";
  maxWidth: number;
  maxHeight: number;
}

export interface PreviewMessageContainerBuilderHoverOnBrick
  extends Omit<PreviewMessageBuilderHoverOnBrick, "sender"> {
  sender: "preview-container";
  forwardedFor: "builder";
}

export interface PreviewMessageContainerBuilderSelectBrick
  extends Omit<PreviewMessageBuilderSelectBrick, "sender"> {
  sender: "preview-container";
  forwardedFor: "builder";
}

export interface PreviewMessageContainerPreviewerHoverOnBrick
  extends Omit<PreviewMessagePreviewerHoverOnBrick, "sender"> {
  sender: "preview-container";
  forwardedFor: "previewer";
}

export interface PreviewMessageContainerPreviewerSelectBrick
  extends Omit<PreviewMessagePreviewerSelectBrick, "sender"> {
  sender: "preview-container";
  forwardedFor: "previewer";
}

export interface PreviewMessageContainerPreviewerContextMenuOnBrick
  extends Omit<PreviewMessagePreviewerContextMenuOnBrick, "sender"> {
  sender: "preview-container";
  forwardedFor: "previewer";
}

export interface BrickOutline {
  width: number;
  height: number;
  left: number;
  top: number;
}

export interface PreviewStartOptions {
  appId?: string;
  templateId?: string;
  snippetData?: any;
  routePath?: string;
  routeExact?: boolean;
  settings?: PreviewSettings;
}

export interface PreviewSettings {
  properties?: Record<string, unknown>;
}
