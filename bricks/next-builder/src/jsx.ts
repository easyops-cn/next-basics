/**
 * JSX 类型定义
 * @generated 自动生成,请勿手动修改
 */

import type { DetailedHTMLProps, HTMLAttributes } from "react";

// 使用 any 类型快速绕过类型检查
type ApiProxyRequestElementProps = any;
type ApiRequestFormItemElementProps = any;
type BuilderContainerElementProps = any;
type ContractAutoCompleteElementProps = any;
type EventConfigFormElementProps = any;
type EventsEditorElementProps = any;
type FunctionsSidebarElementProps = any;
type FunctionDebuggerStatusbarElementProps = any;
type FunctionDebuggerStoreElementProps = any;
type FunctionDebuggerToolbarElementProps = any;
type FunctionDebuggerToolbarV2ElementProps = any;
type PreviewContainerElementProps = any;
type SearchTreeElementProps = any;
type StoryboardLintResultElementProps = any;
type WorkbenchActionItemElementProps = any;
type WorkbenchActionListElementProps = any;
type WorkbenchBrickContextMenuElementProps = any;
type WorkbenchStoryboardTreeElementProps = any;
type WorkbenchCacheActionElementProps = any;
type WorkbenchComponentSelectElementProps = any;
type WorkbenchContextMenuElementProps = any;
type WorkbenchDataTreeElementProps = any;
type WorkbenchMiniActionBarElementProps = any;
type WorkbenchPaneElementProps = any;
type WorkbenchQuickEntryElementProps = any;
type WorkbenchSidebarElementProps = any;
type WorkbenchStoreElementProps = any;
type WorkbenchTabsElementProps = any;
type WorkbenchTreeElementProps = any;
type WorkflowConditionItemElementProps = any;
type WorkflowCreateDataItemElementProps = any;
type WorkflowEditDataItemElementProps = any;
type WorkflowNodeElementProps = any;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "next-builder--api-proxy-request": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<ApiProxyRequestElementProps>,
        HTMLElement
      > & {
        onApiChange?: (event: CustomEvent<any>) => void;
      };
      "next-builder--api-request-form-item": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<ApiRequestFormItemElementProps>,
        HTMLElement
      > & {
        onApiChange?: (event: CustomEvent<any>) => void;
        onTypeChange?: (event: CustomEvent<string>) => void;
      };
      "next-builder--builder-container": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<BuilderContainerElementProps>,
        HTMLElement
      > & {
        onNodeAdd?: (event: CustomEvent<any>) => void;
        onSnippetApply?: (event: CustomEvent<any>) => void;
        onNodeReorder?: (event: CustomEvent<any>) => void;
        onNodeMove?: (event: CustomEvent<any>) => void;
        onNodeClick?: (event: CustomEvent<any>) => void;
        onBrickClick?: (event: CustomEvent<any>) => void;
        onRouteClick?: (event: CustomEvent<any>) => void;
        onNodeDeleteAsk?: (event: CustomEvent<any>) => void;
        onNodeDeleteConfirmed?: (event: CustomEvent<any>) => void;
        onContextUpdate?: (event: CustomEvent<any>) => void;
        onRouteSelect?: (event: CustomEvent<any>) => void;
        onTemplateSelect?: (event: CustomEvent<any>) => void;
        onSnippetSelect?: (event: CustomEvent<any>) => void;
        onCurrentRouteClick?: (event: CustomEvent<any>) => void;
        onCurrentTemplateClick?: (event: CustomEvent<any>) => void;
        onCurrentSnippetClick?: (event: CustomEvent<any>) => void;
        onProjectBuildAndPush?: (event: CustomEvent<{ fullscreen: boolean; }>) => void;
        onProjectPreview?: (event: CustomEvent<{ fullscreen: boolean; }>) => void;
        onFullscreenToggle?: (event: CustomEvent<{ fullscreen: boolean; }>) => void;
        onWorkbenchClose?: (event: CustomEvent<any>) => void;
        onToolboxTabSwitch?: (event: CustomEvent<any>) => void;
        onWrapperHiddenSwitch?: (event: CustomEvent<boolean>) => void;
        onEventStreamNodeSelect?: (event: CustomEvent<{ id: string; }>) => void;
        onEventNodeClick?: (event: CustomEvent<any>) => void;
        onNodeConvertToTemplate?: (event: CustomEvent<any>) => void;
        onClipboardChange?: (event: CustomEvent<any>) => void;
        onNodeCopy?: (event: CustomEvent<any>) => void;
        onNodeCut?: (event: CustomEvent<any>) => void;
        onNodeCopyPaste?: (event: CustomEvent<any>) => void;
        onNodeCutPaste?: (event: CustomEvent<any>) => void;
        onClipboardClear?: (event: CustomEvent<any>) => void;
        onNodeAppendBrickAsk?: (event: CustomEvent<any>) => void;
        onNodeAppendRouteAsk?: (event: CustomEvent<any>) => void;
        onCanvasIndexSwitch?: (event: CustomEvent<{ canvasIndex: number; }>) => void;
        onStoryboardQueryUpdate?: (event: CustomEvent<{ storyboardQuery: string; }>) => void;
        onHighlightTokenClick?: (event: CustomEvent<{ type: string; value: string; }>) => void;
      };
      "next-builder--contract-auto-complete": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<ContractAutoCompleteElementProps>,
        HTMLElement
      > & {
        onContractChange?: (event: CustomEvent<string>) => void;
      };
      "next-builder--event-config-form": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<EventConfigFormElementProps>,
        HTMLElement
      > & {
        onValidateSuccess?: (event: CustomEvent<Record<string, unknown>>) => void;
        onValidateError?: (event: CustomEvent<Record<string, unknown>>) => void;
        onValuesChange?: (event: CustomEvent<Record<string, unknown>>) => void;
        onHighlightTokenClick?: (event: CustomEvent<{ type: string; value: string; }>) => void;
      };
      "next-builder--events-editor": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<EventsEditorElementProps>,
        HTMLElement
      > & {
        onEventCreate?: (event: CustomEvent<{ key: string; name: string; }>) => void;
        onEventEdit?: (event: CustomEvent<any>) => void;
        onEventChange?: (event: CustomEvent<any>) => void;
      };
      "next-builder--function-debugger-sidebar": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<FunctionsSidebarElementProps>,
        HTMLElement
      > & {
        onTabSwitch?: (event: CustomEvent<string>) => void;
        onTestsRun?: (event: CustomEvent<any>) => void;
        onTestsAdd?: (event: CustomEvent<any>) => void;
      };
      "next-builder--function-debugger-statusbar": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<FunctionDebuggerStatusbarElementProps>,
        HTMLElement
      >;
      "next-builder--function-debugger-store": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<FunctionDebuggerStoreElementProps>,
        HTMLElement
      > & {
        onActiveTabChange?: (event: CustomEvent<any>) => void;
        onOriginalFunctionChange?: (event: CustomEvent<any>) => void;
        onFunctionModified?: (event: CustomEvent<boolean>) => void;
        onDebugInputChange?: (event: CustomEvent<any>) => void;
        onDebugOutputChange?: (event: CustomEvent<any>) => void;
        onTestsChange?: (event: CustomEvent<any>) => void;
        onTestInputChange?: (event: CustomEvent<any>) => void;
        onTestExpectChange?: (event: CustomEvent<any>) => void;
        onTestReceivedChange?: (event: CustomEvent<any>) => void;
        onTestMatchedChange?: (event: CustomEvent<boolean | null>) => void;
        onTestUpdatableChange?: (event: CustomEvent<boolean>) => void;
        onSomethingModified?: (event: CustomEvent<boolean>) => void;
        onTestStatsChange?: (event: CustomEvent<any>) => void;
        onCoverageChange?: (event: CustomEvent<any>) => void;
        onDebuggerInfoChange?: (event: CustomEvent<unknown>) => void;
      };
      "next-builder--function-debugger-toolbar": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<FunctionDebuggerToolbarElementProps>,
        HTMLElement
      > & {
        onButtonClick?: (event: CustomEvent<{ action: string }>) => void;
      };
      "next-builder--function-debugger-toolbar-v2": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<FunctionDebuggerToolbarV2ElementProps>,
        HTMLElement
      > & {
        onButtonClick?: (event: CustomEvent<{ action: string }>) => void;
        onWantErrorCheck?: (event: CustomEvent<boolean>) => void;
      };
      "next-builder--preview-container": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<PreviewContainerElementProps>,
        HTMLElement
      > & {
        onPreviewStart?: (event: CustomEvent<any>) => void;
        onExcuteProxyMethodSuccess?: (event: CustomEvent<any>) => void;
        onExcuteProxyMethodError?: (event: CustomEvent<any>) => void;
        onPreviewDebug?: (event: CustomEvent<any[]>) => void;
        onMatchApiCache?: (event: CustomEvent<number>) => void;
        onUrlChange?: (event: CustomEvent<string>) => void;
        onScaleChange?: (event: CustomEvent<number>) => void;
        onRouteMatch?: (event: CustomEvent<boolean>) => void;
        onCaptureStatusChange?: (event: CustomEvent<any>) => void;
        onScreenshotCapture?: (event: CustomEvent<Blob>) => void;
        onPreviewDrop?: (event: CustomEvent<Record<string, any>>) => void;
        onDataModelDrop?: (event: CustomEvent<Record<string, any>>) => void;
        onPreviewResize?: (event: CustomEvent<any>) => void;
        onInspectSingleDataValueSuccess?: (event: CustomEvent<unknown>) => void;
        onInspectAllDataValuesSuccess?: (event: CustomEvent<any>) => void;
        onInspectDataValueError?: (event: CustomEvent<unknown>) => void;
        onDebugDataValueSuccess?: (event: CustomEvent<unknown>) => void;
        onDebugDataValueError?: (event: CustomEvent<unknown>) => void;
        onInspectRuntimeValue?: (event: CustomEvent<unknown>) => void;
        onContractUpdate?: (event: CustomEvent<any>) => void;
      };
      "next-builder--search-tree": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<SearchTreeElementProps>,
        HTMLElement
      > & {
        onNodeClick?: (event: CustomEvent<any>) => void;
        onNodeFocus?: (event: CustomEvent<any>) => void;
        onNodeBlur?: (event: CustomEvent<any>) => void;
      };
      "next-builder--storyboard-lint-result": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<StoryboardLintResultElementProps>,
        HTMLElement
      >;
      "next-builder--workbench-action": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchActionItemElementProps>,
        HTMLElement
      >;
      "next-builder--workbench-action-list": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchActionListElementProps>,
        HTMLElement
      >;
      "next-builder--workbench-brick-context-menu": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchBrickContextMenuElementProps>,
        HTMLElement
      > & {
        onActionClick?: (event: CustomEvent<any>) => void;
      };
      "next-builder--workbench-brick-tree": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchStoryboardTreeElementProps>,
        HTMLElement
      > & {
        onActionClick?: (event: CustomEvent<any>) => void;
        onAddBrick?: (event: CustomEvent<any>) => void;
        onDataModelDrop?: (event: CustomEvent<Record<string, any>>) => void;
        onNodeToggle?: (event: CustomEvent<{ nodeId: string; collapsed: boolean; }>) => void;
      };
      "next-builder--workbench-cache-action": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchCacheActionElementProps>,
        HTMLElement
      > & {
        onCacheAction?: (event: CustomEvent<any>) => void;
        onStoryboardUpdate?: (event: CustomEvent<any>) => void;
        onRootNodeUpdate?: (event: CustomEvent<any>) => void;
        onGraphDataUpdate?: (event: CustomEvent<any>) => void;
        onExecuteSuccess?: (event: CustomEvent<{ res: unknown; op: string; }>) => void;
        onSnippetSuccess?: (event: CustomEvent<any>) => void;
        onBuildAndPush?: (event: CustomEvent<any>) => void;
      };
      "next-builder--workbench-component-select": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchComponentSelectElementProps>,
        HTMLElement
      > & {
        onActionClick?: (event: CustomEvent<{ type: string; data: any }>) => void;
        onOnDrag?: (event: CustomEvent<{ isDrag: boolean }>) => void;
        onFeedbackClick?: (event: CustomEvent<{ type: string }>) => void;
        onInstructionsClick?: (event: CustomEvent<{ type: string }>) => void;
      };
      "next-builder--workbench-context-menu": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchContextMenuElementProps>,
        HTMLElement
      > & {
        onActionClick?: (event: CustomEvent<any>) => void;
      };
      "next-builder--workbench-data-tree": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchDataTreeElementProps>,
        HTMLElement
      > & {
        onActionClick?: (event: CustomEvent<any>) => void;
        onNodeClick?: (event: CustomEvent<unknown>) => void;
        onNodeDrop?: (event: CustomEvent<any>) => void;
        onContextMenu?: (event: CustomEvent<unknown>) => void;
        onNodeNameSuffixClick?: (event: CustomEvent<unknown>) => void;
      };
      "next-builder--workbench-mini-action-bar": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchMiniActionBarElementProps>,
        HTMLElement
      > & {
        onActionClick?: (event: CustomEvent<any>) => void;
      };
      "next-builder--workbench-pane": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchPaneElementProps>,
        HTMLElement
      > & {
        onActiveChange?: (event: CustomEvent<boolean>) => void;
        onActiveFirstActivated?: (event: CustomEvent<any>) => void;
      };
      "next-builder--workbench-quick-entry": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchQuickEntryElementProps>,
        HTMLElement
      > & {
        onMoreButtonClick?: (event: CustomEvent<any>) => void;
      };
      "next-builder--workbench-sidebar": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchSidebarElementProps>,
        HTMLElement
      >;
      "next-builder--workbench-store": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchStoreElementProps>,
        HTMLElement
      > & {
        onNodeClick?: (event: CustomEvent<any>) => void;
        onNodeAdd?: (event: CustomEvent<any>) => void;
        onSnippetApply?: (event: CustomEvent<any>) => void;
        onNodeReorder?: (event: CustomEvent<any>) => void;
        onNodeMove?: (event: CustomEvent<any>) => void;
        onNodeDelete?: (event: CustomEvent<any>) => void;
        onNodesCount?: (event: CustomEvent<number>) => void;
      };
      "next-builder--workbench-tabs": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchTabsElementProps>,
        HTMLElement
      > & {
        onTabClose?: (event: CustomEvent<any>) => void;
        onTabClick?: (event: CustomEvent<any>) => void;
      };
      "next-builder--workbench-tree": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkbenchTreeElementProps>,
        HTMLElement
      > & {
        onActionClick?: (event: CustomEvent<any>) => void;
        onNodeClick?: (event: CustomEvent<unknown>) => void;
        onNodeDrop?: (event: CustomEvent<any>) => void;
        onContextMenu?: (event: CustomEvent<unknown>) => void;
        onNodeToggle?: (event: CustomEvent<{ nodeId: string; collapsed: boolean; }>) => void;
      };
      "next-builder--workflow-condition-item": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkflowConditionItemElementProps>,
        HTMLElement
      >;
      "next-builder--workflow-create-data-item": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkflowCreateDataItemElementProps>,
        HTMLElement
      >;
      "next-builder--workflow-edit-data-item": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkflowEditDataItemElementProps>,
        HTMLElement
      >;
      "next-builder--workflow-node": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & Partial<WorkflowNodeElementProps>,
        HTMLElement
      > & {
        onNodeClick?: (event: CustomEvent<any>) => void;
      };
    }
  }
}
