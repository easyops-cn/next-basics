import React from "react";
import ReactDOM from "react-dom";
import { isEqual } from "lodash";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrickWrapper,
  event,
  EventEmitter,
  method,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import {
  BuilderRouteOrBrickNode,
  ContextConf,
  BuilderRouteNode,
  BuilderCustomTemplateNode,
  BuilderSnippetNode,
  Story,
} from "@next-core/brick-types";
import {
  EventDetailOfNodeAdd,
  NodeInstance,
  EventDetailOfNodeMove,
  EventDetailOfNodeAddStored,
  EventDetailOfNodeReorder,
  EventDetailOfContextUpdated,
  BuilderRuntimeNode,
  BuilderProvider,
  AbstractBuilderDataManager,
  isRouteNode,
  isBrickNode,
  EventDetailOfSnippetApply,
  SnippetNodeDetail,
  SnippetNodeInstance,
  EventDetailOfSnippetApplyStored,
  SharedEditorConf,
} from "@next-core/editor-bricks-helper";
import { HighlightTokenSettings } from "@next-libs/code-editor-components";
import {
  BrickOptionItem,
  BuilderAppendBrickOrRouteDetail,
  BuilderClipboard,
  BuilderClipboardOfCopy,
  BuilderClipboardOfCut,
  BuilderClipboardType,
  BuilderPasteDetailOfCopy,
  BuilderPasteDetailOfCut,
  ToolboxTab,
} from "./interfaces";
import { BuilderContainer } from "./BuilderContainer";
import { defaultToolboxTab } from "./constants";
import { getBuilderClipboard } from "./getBuilderClipboard";
import { EventStreamNode } from "./EventStreamCanvas/interfaces";

type WithAppId<T> = T & {
  appId: string;
};

interface FulfilledEventDetailOfBrickAdd extends EventDetailOfNodeAdd {
  nodeData: WithAppId<NodeInstance>;
}

interface FulfilledEventDetailOfSnippetApply extends EventDetailOfSnippetApply {
  nodeDetails: FulfilledSnippetNodeDetail[];
}

interface FulfilledSnippetNodeDetail extends SnippetNodeDetail {
  nodeData: WithAppId<SnippetNodeInstance>;
}

/**
 * @id next-builder.builder-container
 * @author stevewang
 * @history
 * 1.x.0: 新增构件 `next-builder.builder-container`
 * @docKind brick
 * @noInheritDoc
 */
export class BuilderContainerElement extends UpdatingElement {
  @property()
  appId: string;

  // This is the main data of the storyboard tree.
  @property({ attribute: false })
  dataSource: BuilderRouteOrBrickNode[];

  // This is the library which contains all bricks, templates and snippets.
  @property({ attribute: false })
  brickList: BrickOptionItem[];

  // This is a list which contains all shared editors.
  @property({ attribute: false })
  editorList: SharedEditorConf[];

  // This is a list which contains all provider bricks.
  @property({ attribute: false })
  providerList: string[];

  // This will be deprecated soon.
  @property({ attribute: false })
  storyList: Story[];

  // This list is only for dropdown menu of routes in route view.
  // And it maybe lazy-loaded.
  @property({ attribute: false })
  routeList: BuilderRouteNode[];

  // This list is only for dropdown menu of templates in template view.
  // And it maybe lazy-loaded.
  @property({ attribute: false })
  templateList: BuilderCustomTemplateNode[];

  // This list is only for dropdown menu of snippets in snippet view.
  // And it maybe lazy-loaded.
  @property({ attribute: false })
  snippetList: BuilderSnippetNode[];

  // This a list which contains all custom templates with their brick tree.
  // It is used for expanding templates in canvas.
  @property({ attribute: false })
  templateSources: BuilderCustomTemplateNode[];

  // When a process of data-storing is taking, turn on this flag to
  // disable interactions such as dropping new nodes on canvas.
  @property({ type: Boolean })
  processing: boolean;

  @property({ type: Boolean })
  fullscreen: boolean;

  @property()
  toolboxTab: ToolboxTab;

  @property()
  eventStreamNodeId: string;

  @property({ type: Boolean })
  migrateClipboard: boolean;

  @property({ attribute: false })
  clipboardData: BuilderClipboard;

  /** @deprecated */
  @property()
  clipboardType: BuilderClipboardType;

  /** @deprecated */
  @property()
  clipboardSource: string;

  /** @deprecated */
  @property()
  clipboardNodeType: string;

  @property({
    type: Number,
  })
  canvasIndex: number;

  @property()
  storyboardQuery: string;

  /**
   * @description 高亮标记设置。
   */
  @property({
    attribute: false,
  })
  highlightTokens: HighlightTokenSettings[];

  /**
   * @description 用于容纳 Context 模态框的容器的 CSS Selector。
   */
  @property()
  containerForContextModal: string;

  @event({
    type: "node.add",
  })
  private _nodeAddEmitter: EventEmitter<FulfilledEventDetailOfBrickAdd>;

  @event({
    type: "snippet.apply",
  })
  private _snippetApply: EventEmitter<FulfilledEventDetailOfSnippetApply>;

  @event({
    type: "node.reorder",
  })
  private _nodeReorderEmitter: EventEmitter<EventDetailOfNodeReorder>;

  @event({
    type: "node.move",
  })
  private _nodeMoveEmitter: EventEmitter<EventDetailOfNodeMove>;

  @event({
    type: "node.click",
  })
  private _nodeClickEmitter: EventEmitter<BuilderRuntimeNode>;

  @event({
    type: "brick.click",
  })
  private _brickClickEmitter: EventEmitter<BuilderRuntimeNode>;

  @event({
    type: "route.click",
  })
  private _routeClickEmitter: EventEmitter<BuilderRuntimeNode>;

  @event({
    type: "node.delete.ask",
  })
  private _nodeDeleteAskEmitter: EventEmitter<BuilderRuntimeNode>;

  @event({
    type: "node.delete.confirmed",
  })
  private _nodeDeleteConfirmedEmitter: EventEmitter<BuilderRuntimeNode>;

  @event({
    type: "context.update",
  })
  private _contextUpdateEmitter: EventEmitter<ContextConf[]>;

  @event({
    type: "route.select",
  })
  private _routeSelectEmitter: EventEmitter<BuilderRouteNode>;

  @event({
    type: "template.select",
  })
  private _templateSelectEmitter: EventEmitter<BuilderCustomTemplateNode>;

  @event({
    type: "snippet.select",
  })
  private _snippetSelectEmitter: EventEmitter<BuilderSnippetNode>;

  @event({
    type: "current.route.click",
  })
  private _currentRouteClickEmitter: EventEmitter<BuilderRouteNode>;

  @event({
    type: "current.template.click",
  })
  private _currentTemplateClickEmitter: EventEmitter<BuilderCustomTemplateNode>;

  @event({
    type: "current.snippet.click",
  })
  private _currentSnippetClickEmitter: EventEmitter<BuilderSnippetNode>;

  @event({
    type: "project.buildAndPush",
  })
  private _buildAndPushEmitter: EventEmitter;

  @event({
    type: "project.preview",
  })
  private _previewEmitter: EventEmitter;

  @event({
    type: "fullscreen.toggle",
  })
  private _fullscreenToggleEmitter: EventEmitter<{
    fullscreen: boolean;
  }>;

  @event({
    type: "workbench.close",
  })
  private _workbenchCloseEmitter: EventEmitter;

  @event({
    type: "toolbox.tab.switch",
  })
  private _toolboxTabSwitchEmitter: EventEmitter<{
    toolboxTab: ToolboxTab;
  }>;

  @event({
    type: "eventStream.node.select",
  })
  private _eventStreamNodeSelectEmitter: EventEmitter<{
    id: string;
  }>;

  @event({
    type: "event.node.click",
  })
  private _eventNodeClickEmitter: EventEmitter<EventStreamNode>;

  @event({
    type: "node.convertToTemplate",
  })
  private _convertToTemplateEmitter: EventEmitter<BuilderRuntimeNode>;

  /** @deprecated */
  @event({
    type: "clipboard.change",
  })
  private _eventClipboardChangeEmitter: EventEmitter<{
    clipboard: BuilderClipboard;
  }>;

  @event({
    type: "node.copy",
  })
  private _eventNodeCopyEmitter: EventEmitter<BuilderClipboardOfCopy>;

  @event({
    type: "node.cut",
  })
  private _eventNodeCutEmitter: EventEmitter<BuilderClipboardOfCut>;

  @event({
    type: "node.copy.paste",
  })
  private _eventNodeCopyPasteEmitter: EventEmitter<BuilderPasteDetailOfCopy>;

  @event({
    type: "node.cut.paste",
  })
  private _eventNodeCutPasteEmitter: EventEmitter<BuilderPasteDetailOfCut>;

  @event({
    type: "clipboard.clear",
  })
  private _eventClipboardClearEmitter: EventEmitter<void>;

  @event({
    type: "node.appendBrick.ask",
  })
  private _eventNodeAppendBrickAskEmitter: EventEmitter<BuilderAppendBrickOrRouteDetail>;

  @event({
    type: "node.appendRoute.ask",
  })
  private _eventNodeAppendRouteAskEmitter: EventEmitter<BuilderAppendBrickOrRouteDetail>;

  @event({
    type: "canvas.index.switch",
  })
  private _canvasIndexSwitchEmitter: EventEmitter<{
    canvasIndex: number;
  }>;

  @event({
    type: "storyboard.query.update",
  })
  private _storyboardQueryUpdateEmitter: EventEmitter<{
    storyboardQuery: string;
  }>;

  /**
   * @description 当高亮标记被点击时触发。该事件会冒泡。
   * @detail `{ type: string; value: string; }`
   */
  @event({ type: "highlightToken.click", bubbles: true })
  private _highlightTokenClickEvent: EventEmitter<{
    type: string;
    value: string;
  }>;

  private _handleNodeAdd = (event: CustomEvent<EventDetailOfNodeAdd>): void => {
    this._nodeAddEmitter.emit({
      ...event.detail,
      nodeData: {
        appId: this.appId,
        ...event.detail.nodeData,
      },
    });
  };

  private _handleSnippetApply = (
    event: CustomEvent<EventDetailOfSnippetApply>
  ): void => {
    const fillAppId = (
      nodeDetail: SnippetNodeDetail
    ): FulfilledSnippetNodeDetail => ({
      ...nodeDetail,
      nodeData: {
        ...nodeDetail.nodeData,
        appId: this.appId,
      },
      children: nodeDetail.children.map(fillAppId),
    });
    this._snippetApply.emit({
      ...event.detail,
      nodeDetails: event.detail.nodeDetails.map(fillAppId),
    });
  };

  private _handleNodeReorder = (
    event: CustomEvent<EventDetailOfNodeReorder>
  ): void => {
    this._nodeReorderEmitter.emit({
      ...event.detail,
    });
  };

  private _handleNodeMove = (
    event: CustomEvent<EventDetailOfNodeMove>
  ): void => {
    this._nodeMoveEmitter.emit({
      ...event.detail,
    });
  };

  private _handleNodeClick = (event: CustomEvent<BuilderRuntimeNode>): void => {
    this._nodeClickEmitter.emit({
      ...event.detail,
    });
    if (isRouteNode(event.detail)) {
      this._routeClickEmitter.emit({
        ...event.detail,
      });
    } else if (isBrickNode(event.detail)) {
      this._brickClickEmitter.emit({
        ...event.detail,
      });
    }
  };

  private _handleAskForDeletingNode = (node: BuilderRuntimeNode): void => {
    this._nodeDeleteAskEmitter.emit({
      ...node,
    });
  };

  private _handleToggleFullscreen = (fullscreen: boolean): void => {
    if (fullscreen !== this.fullscreen) {
      this.fullscreen = fullscreen;
      this._fullscreenToggleEmitter.emit({
        fullscreen,
      });
    }
  };

  private _handleSwitchToolboxTab = (toolboxTab: ToolboxTab): void => {
    if (toolboxTab !== (this.toolboxTab ?? defaultToolboxTab)) {
      this.toolboxTab = toolboxTab;
      this._toolboxTabSwitchEmitter.emit({
        toolboxTab,
      });
    }
  };

  private _handleSelectEventsViewNode = (id: string): void => {
    if (id !== this.eventStreamNodeId) {
      this.eventStreamNodeId = id;
      this._eventStreamNodeSelectEmitter.emit({
        id,
      });
    }
  };

  private _handleEventNodeClick = (eventNode: EventStreamNode): void => {
    this._eventNodeClickEmitter.emit(eventNode);
  };

  private _handleConvertToTemplate = (node: BuilderRuntimeNode): void => {
    this._convertToTemplateEmitter.emit(node);
  };

  private _handleWorkbenchClose = (): void => {
    this._workbenchCloseEmitter.emit();
  };

  /** @deprecated */
  private _handleClipboardChange = (clipboard: BuilderClipboard): void => {
    if (
      !isEqual(
        clipboard,
        getBuilderClipboard(
          this.clipboardType,
          this.clipboardSource,
          this.clipboardNodeType
        )
      )
    ) {
      this.clipboardType = clipboard?.type;
      this.clipboardSource =
        clipboard &&
        (clipboard.type === BuilderClipboardType.CUT
          ? clipboard.sourceInstanceId
          : clipboard.sourceId);
      this.clipboardNodeType = clipboard?.nodeType;
      this._eventClipboardChangeEmitter.emit({ clipboard });
    }
  };

  private _handleClipboardClear = (): void => {
    this._eventClipboardClearEmitter.emit();
  };

  private _handleNodeCopy = (detail: BuilderClipboardOfCopy): void => {
    this._eventNodeCopyEmitter.emit(detail);
  };

  private _handleNodeCut = (detail: BuilderClipboardOfCut): void => {
    this._eventNodeCutEmitter.emit(detail);
  };

  private _handleNodeCopyPaste = (detail: BuilderPasteDetailOfCopy): void => {
    this._eventNodeCopyPasteEmitter.emit(detail);
  };

  private _handleNodeCutPaste = (detail: BuilderPasteDetailOfCut): void => {
    this._eventNodeCutPasteEmitter.emit(detail);
  };

  private _managerRef = React.createRef<AbstractBuilderDataManager>();

  private _handleContextUpdate = (context: ContextConf[]): void => {
    this._contextUpdateEmitter.emit(context);
  };

  private _handleRouteSelect = (route: BuilderRouteNode): void => {
    this._routeSelectEmitter.emit(route);
  };

  private _handleTemplateSelect = (
    template: BuilderCustomTemplateNode
  ): void => {
    this._templateSelectEmitter.emit(template);
  };

  private _handleSnippetSelect = (snippet: BuilderSnippetNode): void => {
    this._snippetSelectEmitter.emit(snippet);
  };

  private _handleCurrentRouteClick = (route: BuilderRouteNode): void => {
    this._currentRouteClickEmitter.emit(route);
  };

  private _handleCurrentTemplateClick = (
    template: BuilderCustomTemplateNode
  ): void => {
    this._currentTemplateClickEmitter.emit(template);
  };

  private _handleCurrentSnippetClick = (template: BuilderSnippetNode): void => {
    this._currentSnippetClickEmitter.emit(template);
  };

  private _handleBuildAndPush = (): void => {
    this._buildAndPushEmitter.emit();
  };

  private _handlePreview = (): void => {
    this._previewEmitter.emit();
  };

  private _handleAskForAppendingBrick = (
    detail: BuilderAppendBrickOrRouteDetail
  ): void => {
    this._eventNodeAppendBrickAskEmitter.emit(detail);
  };

  private _handleAskForAppendingRoute = (
    detail: BuilderAppendBrickOrRouteDetail
  ): void => {
    this._eventNodeAppendRouteAskEmitter.emit(detail);
  };

  private _handleSwitchCanvasIndex = (canvasIndex: number): void => {
    if (canvasIndex !== this.canvasIndex) {
      this.canvasIndex = canvasIndex;
      this._canvasIndexSwitchEmitter.emit({
        canvasIndex,
      });
    }
  };

  private _handleStoryboardQueryUpdate = (storyboardQuery: string): void => {
    if (storyboardQuery !== this.storyboardQuery) {
      this.storyboardQuery = storyboardQuery;
      this._storyboardQueryUpdateEmitter.emit({
        storyboardQuery,
      });
    }
  };

  private _handleHighlightTokenClick = (token: {
    type: string;
    value: string;
  }): void => {
    this._highlightTokenClickEvent.emit(token);
  };

  // istanbul ignore next
  @method()
  nodeAddStored(detail: EventDetailOfNodeAddStored): void {
    this._managerRef.current.nodeAddStored(detail);
  }

  // istanbul ignore next
  @method()
  snippetApplyStored(detail: EventDetailOfSnippetApplyStored): void {
    this._managerRef.current.snippetApplyStored(detail);
  }

  // istanbul ignore next
  @method()
  contextUpdated(detail: EventDetailOfContextUpdated): void {
    this._managerRef.current.contextUpdated(detail);
  }

  // istanbul ignore next
  @method()
  nodeDeleteConfirmed(node: BuilderRuntimeNode): void {
    this._managerRef.current.nodeDelete(node);
    this._nodeDeleteConfirmedEmitter.emit({
      ...node,
    });
  }

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BuilderProvider>
            <DndProvider backend={HTML5Backend}>
              <BuilderContainer
                ref={this._managerRef}
                appId={this.appId}
                dataSource={this.dataSource}
                brickList={this.brickList}
                editorList={this.editorList}
                providerList={this.providerList}
                routeList={this.routeList}
                templateList={this.templateList}
                snippetList={this.snippetList}
                templateSources={this.templateSources}
                storyList={this.storyList}
                processing={this.processing}
                highlightTokens={this.highlightTokens}
                containerForContextModal={this.containerForContextModal}
                migrateClipboard={this.migrateClipboard}
                clipboardData={this.clipboardData}
                initialFullscreen={this.fullscreen}
                initialToolboxTab={this.toolboxTab}
                initialEventStreamNodeId={this.eventStreamNodeId}
                initialClipboardType={this.clipboardType}
                initialClipboardSource={this.clipboardSource}
                initialClipboardNodeType={this.clipboardNodeType}
                initialCanvasIndex={this.canvasIndex}
                initialStoryboardQuery={this.storyboardQuery}
                onNodeAdd={this._handleNodeAdd}
                onSnippetApply={this._handleSnippetApply}
                onNodeReorder={this._handleNodeReorder}
                onNodeMove={this._handleNodeMove}
                onNodeClick={this._handleNodeClick}
                onAskForDeletingNode={this._handleAskForDeletingNode}
                onToggleFullscreen={this._handleToggleFullscreen}
                onSwitchToolboxTab={this._handleSwitchToolboxTab}
                onSelectEventStreamNode={this._handleSelectEventsViewNode}
                onClipboardChange={this._handleClipboardChange}
                onNodeCopy={this._handleNodeCopy}
                onNodeCut={this._handleNodeCut}
                onNodeCopyPaste={this._handleNodeCopyPaste}
                onNodeCutPaste={this._handleNodeCutPaste}
                onClipboardClear={this._handleClipboardClear}
                onContextUpdate={this._handleContextUpdate}
                onRouteSelect={this._handleRouteSelect}
                onTemplateSelect={this._handleTemplateSelect}
                onSnippetSelect={this._handleSnippetSelect}
                onCurrentRouteClick={this._handleCurrentRouteClick}
                onCurrentTemplateClick={this._handleCurrentTemplateClick}
                onCurrentSnippetClick={this._handleCurrentSnippetClick}
                onBuildAndPush={this._handleBuildAndPush}
                onPreview={this._handlePreview}
                onAskForAppendingBrick={this._handleAskForAppendingBrick}
                onAskForAppendingRoute={this._handleAskForAppendingRoute}
                onEventNodeClick={this._handleEventNodeClick}
                onConvertToTemplate={this._handleConvertToTemplate}
                onWorkbenchClose={this._handleWorkbenchClose}
                onSwitchCanvasIndex={this._handleSwitchCanvasIndex}
                onStoryboardQueryUpdate={this._handleStoryboardQueryUpdate}
                onClickHighlightToken={this._handleHighlightTokenClick}
              />
            </DndProvider>
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.builder-container",
  BuilderContainerElement
);
