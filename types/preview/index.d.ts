import type {
  BuilderBrickNode,
  ContextConf,
  Storyboard,
  UseProviderResolveConf,
} from "@next-core/brick-types";
import {
  BuilderRuntimeNode,
  EventDetailOfSnippetApply,
  NodeInstance,
  EventDetailOfSnippetApplyStored,
} from "@next-core/editor-bricks-helper";
import type {
  formSchemaProperties,
  fieldProperties,
} from "@next-core/brick-kit/dist/types/core/CustomForms/ExpandCustomForm.d.ts";
import { pipes } from "@next-core/pipes";
import { ModelInstanceRelationRequest } from "@next-sdk/cmdb-sdk/dist/types/model/cmdb";
import { StoryboardApi_CloneBricksRequestBody } from "@next-sdk/next-builder-sdk";
import type {
  FormProjectApi_UpdateFormItemRequestBody,
  FormProjectApi_UpdateFormTemplateRequestBody,
} from "@next-sdk/form-builder-service-sdk";
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
  _id?: string;
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
  iid: string;
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
  | PreviewMessagePreviewerContentScroll
  | PreviewMessagePreviewerRealTimeDataInspectChange
  | PreviewMessagePreviewerCaptureOk
  | PreviewMessagePreviewerCaptureFailed
  | PreviewMessagePreviewDataValueSuccess
  | PreviewMessagePreviewDataValueError
  | PreviewMessagePreviewDebugValueSuccess
  | PreviewMessagePreviewDebugValueError
  | PreviewMessagePreviewContractUpdate;

export type PreviewMessageToPreviewer =
  | PreviewMessageContainerBuilderHoverOnIframe
  | PreviewMessageContainerBuilderHoverOnMain
  | PreviewMessageContainerBuilderHoverOnBrick
  | PreviewMessageContainerBuilderHoverOnContext
  | PreviewMessageDataValue
  | PreviewMessageContainerBuilderSelectBrick
  | PreviewMessageContainerToggleInspecting
  | PreviewMessageContainerBack
  | PreviewMessageContainerForward
  | PreviewMessageContainerRefresh
  | PreviewMessageContainerReload
  | PreviewMessageContainerCapture
  | PreviewMessageContainerProxyMethod
  | PreviewMessageContainerUpdatePreviewUrl
  | PreviewMessageContainerUpdatePreviewRoute;

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
  | PreviewMessagePreviewerContentScroll
  | PreviewMessagePreviewerCaptureOk
  | PreviewMessagePreviewerCaptureFailed
  | PreviewMessageContainerProxyMethodSuccess
  | PreviewMessageContainerProxyMethodError
  | PreviewMessageContainerMatchApiCache
  | PreviewMessagePreviewDataValueSuccess
  | PreviewMessagePreviewDataValueError
  | PreviewMessagePreviewRuntimeData
  | PreviewMessagePreviewDebugValueSuccess
  | PreviewMessagePreviewDebugValueError
  | PreviewMessagePreviewContractUpdate;

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

export interface PreviewMessagePreviewerContentScroll
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "content-scroll";
  scroll: {
    x: number;
    y: number;
  };
}

export interface PreviewMessagePreviewerRealTimeDataInspectChange
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "real-time-data-inspect-change";
  changeType: string;
  tplStateStoreId?: string;
  detail: {
    data?: Record<string, RealTimeDataAnnotation>;
    name?: string;
    annotation?: RealTimeDataAnnotation;
  };
}

export interface RealTimeDataAnnotation {
  type: string;
  value?: unknown;
  length?: number;
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

export interface PreviewMessagePreviewDataValueSuccess {
  sender: "previewer";
  type: "inspect-single-data-value-success" | "inspect-all-data-values-success";
  data: unknown;
  _id?: string;
}

export interface PreviewMessagePreviewDebugValueSuccess {
  sender: "previewer";
  type: "debug-data-value-success";
  data: unknown;
  _id?: string;
}

export interface PreviewMessagePreviewDebugValueError {
  sender: "previewer";
  type: "debug-data-value-error";
  data: unknown;
  _id?: string;
}

export interface PreviewMessagePreviewDataValueError {
  sender: "previewer";
  type: "inspect-data-value-error";
  data: unknown;
  _id?: string;
}

export interface PreviewMessagePreviewRuntimeData {
  sender: "previewer";
  type: "inspect-runtime-data-value";
  data: unknown;
}

export interface PreviewMessagePreviewContractUpdateDetail {
  add?: string[];
}

export interface PreviewMessagePreviewContractUpdate {
  sender: "previewer";
  type: "contract-update";
  data: PreviewMessagePreviewContractUpdateDetail;
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

export interface PreviewMessageContainerBack extends PreviewBaseMessage {
  sender: "preview-container";
  type: "back";
}

export interface PreviewMessageContainerForward extends PreviewBaseMessage {
  sender: "preview-container";
  type: "forward";
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

export interface PreviewMessageDataValue extends PreviewBaseMessage {
  sender: "preview-container";
  type: "inspect-data-value";
  name: string;
  option: PreviewDataOption;
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

export interface PreviewMessageContainerUpdatePreviewUrl
  extends PreviewBaseMessage {
  sender: "preview-container";
  type: "update-preview-url";
  previewUrl: string;
}

export interface PreviewMessageContainerUpdatePreviewRoute
  extends PreviewBaseMessage {
  sender: "preview-container";
  type: "update-preview-route";
  routePath: string;
  routeExact: boolean;
}

export interface PreviewMessageContainerMatchApiCache
  extends PreviewBaseMessage {
  sender: "previewer";
  type: "match-api-cache";
  num: number;
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
  hasContentScroll?: boolean;
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
  | WorkbenchBackendActionForDelete
  | WorkbenchBackendActionForInsertSnippet
  | WorkbenchBackendActionForCopyData
  | WorkbenchBackendActionForCopyBrick
  | WorkbenchBackendActionForCutBrick
  | WorkbenchBackendActionForInsertFormItem
  | WorkbenchBackendActionForDeleteFormItem
  | WorkbenchBackendActionForUpdateFormItem
  | WorkbenchBackendActionForUpdateVisualForm
  | WorkbenchBackendActionForBatchOp;

interface WorkbencdBackendCacheActionCommon {
  uid?: string;
  state?: "pending" | "resolve" | "reject";
  isBuilding?: boolean;
}

export interface WorkbenchBackendActionForInitDetail {
  appId: string;
  projectId: string;
  storyboardType: "micro-app" | "theme-template" | "form";
  objectId: string;
  rootNode: BuilderRuntimeNode;
  delayBuildTime: number;
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

export interface WorkbenchSortData {
  nodeUids?: number[];
  nodeIds: string[];
  nodeInstanceIds: string[];
}

interface SnippetParams {
  type: string;
  defaultValue: string;
}
interface SnippetRuntimeNode {
  data?: ContextConf[];
  params?: Record<string, SnippetParams>;
}

export interface SnippetRuntimeContext {
  rootType: string;
  rootInstanceId: string;
  dataList?: ContextConf[];
  inputParams?: Record<string, unknown>;
}

export type WorkbenchBackendActionForInsertDetail = {
  parentInstanceId?: string;
  parent: string;
  mountPoint: string;
  brick: string;
  sort?: number;
  portal?: boolean;
  bg?: boolean;
  nodeData: BuilderRuntimeNode & SnippetRuntimeNode;
  dragOverInstanceId?: string;
  dragStatus?: dragStatus;
  sortData?: WorkbenchSortData;
  type: "brick" | "provider";
  snippetContext?: SnippetRuntimeContext;
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
  mtime: string;
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
  nodeInstanceIds: string[];
  nodeData: NodeInstance;
  objectId: string;
  mtime?: string;
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

type WorkbenchBackendActionForInsertSnippetDetail =
  WorkbenchBackendActionForInsertDetail & {
    snippetData?: EventDetailOfSnippetApply;
  };

export interface WorkbenchBackendActionForInsertSnippet
  extends WorkbencdBackendCacheActionCommon {
  action: "insert.snippet";
  data: WorkbenchBackendActionForInsertSnippetDetail;
}

export interface WorkbenchBackendActionForCopyData
  extends WorkbencdBackendCacheActionCommon {
  action: "copy.data";
  data: WorkbenchBackendActionForUpdateDetail;
  sourceName: string;
}

export interface WorkbenchBackendActionForCutBrick
  extends WorkbencdBackendCacheActionCommon {
  action: "cut.brick";
  data: Partial<ModelInstanceRelationRequest> & {
    sourceBrickId: string;
    objectId: string;
  };
}
export interface WorkbenchBackendActionForCopyBrick
  extends WorkbencdBackendCacheActionCommon {
  action: "copy.brick";
  data: StoryboardApi_CloneBricksRequestBody & {
    sourceBrickId: string;
  };
}

export type insertFormItemArgs = [
  FormProjectApi_CreateFormItemRequestBody,
  HttpOptions
];
export type updateFormItemArgs = [
  string,
  FormProjectApi_UpdateFormItemRequestBody,
  HttpOptions
];
export type deleteFormItemArgs = [string, HttpOptions];

export type updateFormTemplateArgs = [
  string,
  FormProjectApi_UpdateFormTemplateRequestBody,
  HttpOptions
];

export interface WorkbenchBackendActionForInsertFormItem
  extends WorkbencdBackendCacheActionCommon {
  action: "insert.formItem";
  args: insertByFieldArgs | insertWithFieldArgs;
  nodeData: any;
}

export interface WorkbenchBackendActionForDeleteFormItem
  extends WorkbencdBackendCacheActionCommon {
  action: "delete.formItem";
  args: deleteFormItemArgs;
}

export interface WorkbenchBackendActionForUpdateFormItem
  extends WorkbencdBackendCacheActionCommon {
  action: "update.formItem";
  args: updateFormItemArgs;
}

export interface WorkbenchBackendActionForUpdateFormTemplate
  extends WorkbencdBackendCacheActionCommon {
  action: "update.formTemplate";
  args: updateFormTemplateArgs;
}

export interface WorkbenchBackendActionForUpdateVisualForm
  extends WorkbencdBackendCacheActionCommon {
  action: "update.visualForm";
  data: WorkbenchBackendActionForUpdateDetail;
}

export interface WorkbenchBackendActionForBatchOpDetail {
  insert: WorkbenchBackendActionForInsertDetail[];
  update: WorkbenchBackendActionForUpdateDetail[];
  delete: WorkbenchBackendActionForDeleteDetail[];
}

export interface WorkbenchBackendActionForBatchOp
  extends WorkbencdBackendCacheActionCommon {
  action: "batch.op";
  data: WorkbenchBackendActionForBatchOpDetail;
}

export type BackendMessage =
  | BackendMessageForInsert
  | BackendMessageForInstanceResponse
  | BackendMessageForUpdateGraphData
  | BackMessageForBuildStart
  | BackMessageForBuildSuccess
  | BackMessageForSnippetSuccess
  | BackMessageForBuildFail
  | BackendMessageForError
  | BackendMessageForExecuteSuccess;

export interface BackendMessageForInsert {
  action: "insert";
  data: WorkbenchBackendActionForInsertDetail;
  newData: BuilderBrickNode;
}

export interface BackendMessageForInstanceResponse {
  action: "instance-success" | "instance-fail";
  data: WorkbenchBackendCacheAction;
}

export interface BackMessageForSnippetSuccess {
  action: "snippet-success";
  data: {
    snippetId: string;
    nodeData: BuilderRuntimeNode;
  } & EventDetailOfSnippetApplyStored;
}

export interface BackendMessageForUpdateGraphData {
  action: "update-graph-data";
  data: {
    graphData: pipes.GraphData;
  };
}

export interface BackMessageForBuildStart {
  action: "build-start";
  data?: unknown;
}

export interface BackMessageForBuildSuccess {
  action: "build-success";
  data: {
    storyboard: Partial<StoryboardToBuild>;
    isNeedRefresh?: boolean;
  };
}

export interface BackMessageForBuildFail {
  action: "build-fail";
  data?: {
    title: string;
    content?: string;
  };
}

export interface BackendMessageForError {
  action: "error";
  data: {
    error: string;
  };
}

export interface BackendMessageForExecuteSuccess {
  action: "execute-success";
  data: {
    res: any;
    op: string;
  };
}

export interface PreviewDataOption {
  dataType: "state" | "context";
}

export interface PreviewDebugData {
  resolve?: UseProviderResolveConf;
  value?: unknown;
}
