import type {
  BrickConf,
  BuilderBrickNode,
  Storyboard,
} from "@next-core/brick-types";
import {
  BuilderRuntimeNode,
  NodeInstance,
  WorkbenchNodeData,
} from "@next-core/editor-bricks-helper";
import type {
  formSchemaProperties,
  fieldProperties,
} from "@next-core/brick-kit/dist/types/core/CustomForms/ExpandCustomForm.d.ts";
import { pipes } from "@next-core/pipes";

export interface PreviewHelperBrick {
  start(previewFromOrigin: string, options: unknown): void;
}

export interface Position {
  x: number;
  y: number;
}
export interface PreviewBaseMessage {
  sender: "builder" | "preview-container" | "previewer";
  type: string;
  forwardedFor?: "builder" | "previewer";
}

export interface PreviewMessageBuilderHoverOnIframe
  extends PreviewBaseMessage,
    HighlightBaseInfo {
  sender: "builder";
  type: "hover-on-iframe";
}

export interface PreviewMessageBuilderHoverOnMain
  extends PreviewBaseMessage,
    HighlightBaseInfo {
  sender: "builder";
  type: "hover-on-main";
}

export interface HighLightNode {
  iid: numner;
  alias: string;
}

export interface PreviewMessageBuilderHoverOnContext
  extends PreviewBaseMessage,
    HighlightBaseInfo {
  sender: "builder";
  type: "hover-on-context";
  highlightNodes: HighLightNode[];
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

export interface PreviewMessageBuilderDrop extends PreviewBaseMessage {
  sender: "previewer";
  type: "previewer-drop";
  nodeData: Record<string, any>;
}

export interface HighlightBaseInfo {
  iid: string;
  alias: string;
}

export interface ExcuteProxyMethodResult {
  method: string;
  res: any;
}

export type PreviewMessageFromPreviewer =
  | PreviewMessagePreviewerHoverOnMain
  | PreviewMessagePreviewerHoverOnBrick
  | PreviewMessagePreviewerSelectBrick
  | PreviewMessagePreviewerHighlightBrick
  | PreviewMessagePreviewerHighlightContext
  | PreviewMessagePreviewerContextMenuOnBrick
  | PreviewMessagePreviewerPreviewStarted
  | PreviewMessagePreviewerUrlChange
  | PreviewMessagePreviewerRouteMatchChange
  | PreviewMessagePreviewerScroll
  | PreviewMessagePreviewerCaptureOk
  | PreviewMessagePreviewerCaptureFailed;

export type PreviewMessageToPreviewer =
  | PreviewMessageContainerBuilderHoverOnIframe
  | PreviewMessageContainerBuilderHoverOnMain
  | PreviewMessageContainerBuilderHoverOnBrick
  | PreviewMessageContainerBuilderHoverOnContext
  | PreviewMessageContainerBuilderSelectBrick
  | PreviewMessageContainerToggleInspecting
  | PreviewMessageContainerRefresh
  | PreviewMessageContainerReload
  | PreviewMessageContainerCapture
  | PreviewMessageContainerProxyMethod;

export type PreviewMessageFromContainer =
  | PreviewMessageContainerBuilderHoverOnIframe
  | PreviewMessageContainerBuilderHoverOnMain
  | PreviewMessageContainerBuilderHoverOnBrick
  | PreviewMessageContainerBuilderHoverOnContext
  | PreviewMessageContainerPreviewerHoverOnBrick
  | PreviewMessageContainerPreviewerSelectBrick
  | PreviewMessageContainerPreviewerContextMenuOnBrick
  | PreviewMessageContainerRefresh
  | PreviewMessageContainerReload
  | PreviewMessageContainerResize
  | PreviewMessageContainerCapture;

export type PreviewMessageToContainer =
  | PreviewMessageBuilderHoverOnIframe
  | PreviewMessageBuilderHoverOnBrick
  | PreviewMessageBuilderSelectBrick
  | PreviewMessageBuilderDrop
  | PreviewMessageBuilderHoverOnMain
  | PreviewMessageBuilderHoverOnContext
  | PreviewMessagePreviewerHoverOnMain
  | PreviewMessagePreviewerHoverOnBrick
  | PreviewMessagePreviewerSelectBrick
  | PreviewMessagePreviewerHighlightBrick
  | PreviewMessagePreviewerHighlightContext
  | PreviewMessagePreviewerContextMenuOnBrick
  | PreviewMessagePreviewerPreviewStarted
  | PreviewMessagePreviewerUrlChange
  | PreviewMessagePreviewerRouteMatchChange
  | PreviewMessagePreviewerScroll
  | PreviewMessagePreviewerCaptureOk
  | PreviewMessagePreviewerCaptureFailed
  | PreviewMessageContainerProxyMethodSuccess
  | PreviewMessageContainerProxyMethodError;

export type PreviewerMessageToBuilder =
  | PreviewMessageContainerPreviewerHoverOnMain
  | PreviewMessageContainerPreviewerHoverOnBrick
  | PreviewMessageContainerPreviewerSelectBrick
  | PreviewMessageContainerPreviewerContextMenuOnBrick
  | PreviewMessageContainerResize;

export interface PreviewMessagePreviewerPreviewStarted
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "preview-started";
}

export interface PreviewMessagePreviewerHoverOnMain extends PreviewBaseMessage {
  sender: "previewer";
  type: "hover-on-main";
  isDirection?: boolean;
  position?: Position;
}
export interface PreviewMessagePreviewerHoverOnBrick
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "hover-on-brick";
  iidList: string[];
  isDirection?: boolean;
  position?: Position;
}

export interface PreviewMessagePreviewerSelectBrick extends PreviewBaseMessage {
  sender: "previewer";
  type: "select-brick";
  iidList: string[];
  isDirection: boolean;
  position: Position;
}

export interface PreviewMessagePreviewerHighlightBrick
  extends PreviewBaseMessage,
    HighlightBaseInfo {
  sender: "previewer";
  type: "highlight-brick";
  highlightType: "active" | "hover";
  outlines: BrickOutline[];
}

export interface PreviewMessagePreviewerHighlightContext
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "highlight-context";
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
  screenshot: Blob;
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

export interface PreviewMessageContainerBuilderHoverOnIframe
  extends Omit<PreviewMessageBuilderHoverOnIframe, "sender"> {
  sender: "preview-container";
  forwardedFor: "builder";
  position: Position;
}

export interface PreviewMessageContainerProxyMethod extends PreviewBaseMessage {
  sender: "preview-container";
  type: "excute-proxy-method";
  proxyMethodArgs: [ref: any, method: string, args?: any[]];
}

export interface PreviewMessageContainerProxyMethodSuccess
  extends PreviewBaseMessage {
  sender: "preview";
  type: "excute-proxy-method-success";
  result: ExcuteProxyMethodResult;
}

export interface PreviewMessageContainerProxyMethodError
  extends PreviewBaseMessage {
  sender: "preview";
  type: "excute-proxy-method-error";
  result: ExcuteProxyMethodResult;
}

export interface PreviewMessageContainerBuilderHoverOnMain
  extends Omit<PreviewMessageBuilderHoverOnMain, "sender"> {
  sender: "preview-container";
  forwardedFor: "builder";
}

export interface PreviewMessageContainerBuilderHoverOnBrick
  extends Omit<PreviewMessageBuilderHoverOnBrick, "sender"> {
  sender: "preview-container";
  forwardedFor: "builder";
}

export interface PreviewMessageContainerBuilderHoverOnContext
  extends Omit<PreviewMessageBuilderHoverOnContext, "sender"> {
  sender: "preview-container";
  forwardedFor: "builder";
}

export interface PreviewMessageContainerBuilderSelectBrick
  extends Omit<PreviewMessageBuilderSelectBrick, "sender"> {
  sender: "preview-container";
  forwardedFor: "builder";
}

export interface PreviewMessageContainerPreviewerHoverOnMain
  extends Omit<PreviewMessagePreviewerHoverOnMain, "sender"> {
  sender: "preview-container";
  forwardedFor: "previewer";
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
  alias?: string;
}

export type UpdateStoryboardType = "route" | "template" | "snippet";

export interface PreviewStartOptions {
  appId?: string;
  templateId?: string;
  formId?: string;
  formData?: FormData;
  snippetData?: any;
  routePath?: string;
  routeExact?: boolean;
  settings?: PreviewSettings;
  updateStoryboardType?: UpdateStoryboardType;
}

export interface PreviewSettings {
  properties?: Record<string, unknown>;
}

export interface FormData {
  schema?: formSchemaProperties;
  fields?: fieldProperties[];
}

export type WorkbenchBackendCacheAction =
  | WorkbenchBackendActionForInit
  | WorkbenchBackendActionForGet
  | WorkbenchBackendActionForInsert
  | WorkbenchBackendActionForUpdate
  | WorkbenchBackendActionForMove
  | WorkbenchBackendActionForDelete;

interface WorkbencdBackendCacheActionCommon {
  uid?: string;
  state?: "pending" | "resolve" | "reject";
}

export interface WorkbenchBackendActionForInitDetail {
  appId: string;
  projectId: string;
  objectId: string;
  rootNode: BuilderRuntimeNode;
}

export interface WorkbenchBackendActionForInit
  extends WorkbencdBackendCacheActionCommon {
  action: "init";
  data: WorkbenchBackendActionForInitDetail;
}

export interface WorkbenchBackendActionForGet
  extends WorkbencdBackendCacheActionCommon {
  action: "get";
  data: {
    instanceId: string;
  };
}

export type WorkbenchBackendActionForInsertDetail = {
  parentInstanceId?: string;
  parent: string;
  mountPoint: string;
  brick: string;
  sort?: number;
  portal?: boolean;
  bg?: boolean;
  nodeData: BuilderRuntimeNode;
  dragOverInstanceId?: string;
  dragStatus?: dragStatus;
  type: "brick" | "provider";
};
export interface WorkbenchBackendActionForInsert
  extends WorkbencdBackendCacheActionCommon {
  action: "insert";
  data: WorkbenchBackendActionForInsertDetail;
}

export interface WorkbenchBackendActionForUpdateDetail {
  objectId: string;
  instanceId: string;
  property: Record<string, any>;
}

export interface WorkbenchBackendActionForUpdate
  extends WorkbencdBackendCacheActionCommon {
  action: "update";
  data: WorkbenchBackendActionForUpdateDetail;
}

export interface WorkbenchBackendActionForMoveDetail {
  nodeInstanceId: string;
  nodeUid: number;
  nodeIds: string[];
  nodeData: NodeInstance;
}

export interface WorkbenchBackendActionForMove
  extends WorkbencdBackendCacheActionCommon {
  action: "move";
  data: WorkbenchBackendActionForMoveDetail;
}

export interface WorkbenchBackendActionForDeleteDetail {
  objectId: string;
  instanceId: string;
}

export interface WorkbenchBackendActionForDelete
  extends WorkbencdBackendCacheActionCommon {
  action: "delete";
  data: WorkbenchBackendActionForDeleteDetail;
}

export type BackendMessage =
  | BackendMessageForInsert
  | BackendMessageForInstanceResponse
  | BackendMessageForUpdateGraphData
  | BackMessageForBuildFail
  | BackendMessageForError;

export interface BackendMessageForInsert {
  action: "insert";
  data: WorkbenchBackendActionForInsertDetail;
  newData: BuilderBrickNode;
}

export interface BackendMessageForInstanceResponse {
  action: "instance-success" | "instance-fail";
  data: WorkbenchBackendCacheAction;
}

export interface BackendMessageForUpdateGraphData {
  action: "update-graph-data";
  data: {
    graphData: pipes.GraphData;
  };
}

export interface BackMessageForBuildFail {
  action: "build-fail";
  data?: unknown;
}

export interface BackendMessageForError {
  action: "error";
  data: {
    error: string;
  };
}
