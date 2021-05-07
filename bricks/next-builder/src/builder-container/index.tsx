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
} from "@next-core/editor-bricks-helper";
import {
  BrickOptionItem,
  BuilderAppendBrickDetail,
  BuilderClipboard,
  BuilderClipboardType,
  BuilderPasteDetailOfCopy,
  BuilderPasteDetailOfCut,
  ToolboxTab,
} from "./interfaces";
import { BuilderContainer } from "./BuilderContainer";
import { defaultToolboxTab } from "./constants";
import { getBuilderClipboard } from "./getBuilderClipboard";
import { EventStreamNode } from "./EventStreamCanvas/interfaces";

interface FulfilledEventDetailOfBrickAdd extends EventDetailOfNodeAdd {
  nodeData: NodeInstance & {
    appId: string;
  };
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

  @property({ attribute: false })
  dataSource: BuilderRouteOrBrickNode[];

  @property({ attribute: false })
  brickList: BrickOptionItem[];

  @property({ attribute: false })
  routeList: BuilderRouteNode[];

  @property({ type: Boolean })
  processing: boolean;

  @property({ type: Boolean })
  fullscreen: boolean;

  @property()
  toolboxTab: ToolboxTab;

  @property()
  eventStreamNodeId: string;

  @property()
  clipboardType: BuilderClipboardType;

  @property()
  clipboardSource: string;

  @property({
    type: Number,
  })
  canvasIndex: number;

  @property()
  storyboardQuery: string;

  @event({
    type: "node.add",
  })
  private _nodeAddEmitter: EventEmitter<FulfilledEventDetailOfBrickAdd>;

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
    type: "current.route.click",
  })
  private _currentRouteClickEmitter: EventEmitter<BuilderRouteNode>;

  @event({
    type: "current.template.click",
  })
  private _currentTemplateClickEmitter: EventEmitter<BuilderCustomTemplateNode>;

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

  @event({
    type: "clipboard.change",
  })
  private _eventClipboardChangeEmitter: EventEmitter<{
    clipboard: BuilderClipboard;
  }>;

  @event({
    type: "node.copy.paste",
  })
  private _eventNodeCopyPasteEmitter: EventEmitter<BuilderPasteDetailOfCopy>;

  @event({
    type: "node.cut.paste",
  })
  private _eventNodeCutPasteEmitter: EventEmitter<BuilderPasteDetailOfCut>;

  @event({
    type: "node.appendBrick.ask",
  })
  private _eventNodeAppendBrickAskEmitter: EventEmitter<BuilderAppendBrickDetail>;

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

  private _handleNodeAdd = (event: CustomEvent<EventDetailOfNodeAdd>): void => {
    this._nodeAddEmitter.emit({
      ...event.detail,
      nodeData: {
        appId: this.appId,
        ...event.detail.nodeData,
      },
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

  private _handleClipboardChange = (clipboard: BuilderClipboard): void => {
    if (
      !isEqual(
        clipboard,
        getBuilderClipboard(this.clipboardType, this.clipboardSource)
      )
    ) {
      this.clipboardType = clipboard?.type;
      this.clipboardSource =
        clipboard &&
        (clipboard.type === BuilderClipboardType.CUT
          ? clipboard.sourceInstanceId
          : clipboard.sourceId);
      this._eventClipboardChangeEmitter.emit({ clipboard });
    }
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

  private _handleCurrentRouteClick = (route: BuilderRouteNode): void => {
    this._currentRouteClickEmitter.emit(route);
  };

  private _handleCurrentTemplateClick = (
    template: BuilderCustomTemplateNode
  ): void => {
    this._currentTemplateClickEmitter.emit(template);
  };

  private _handleBuildAndPush = (): void => {
    this._buildAndPushEmitter.emit();
  };

  private _handlePreview = (): void => {
    this._previewEmitter.emit();
  };

  private _handleAskForAppendingBrick = (
    detail: BuilderAppendBrickDetail
  ): void => {
    this._eventNodeAppendBrickAskEmitter.emit(detail);
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

  @method()
  nodeAddStored(detail: EventDetailOfNodeAddStored): void {
    this._managerRef.current.nodeAddStored(detail);
  }

  @method()
  contextUpdated(detail: EventDetailOfContextUpdated): void {
    this._managerRef.current.contextUpdated(detail);
  }

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
                routeList={this.routeList}
                brickList={this.brickList}
                processing={this.processing}
                initialFullscreen={this.fullscreen}
                initialToolboxTab={this.toolboxTab}
                initialEventStreamNodeId={this.eventStreamNodeId}
                initialClipboardType={this.clipboardType}
                initialClipboardSource={this.clipboardSource}
                initialCanvasIndex={this.canvasIndex}
                initialStoryboardQuery={this.storyboardQuery}
                onNodeAdd={this._handleNodeAdd}
                onNodeReorder={this._handleNodeReorder}
                onNodeMove={this._handleNodeMove}
                onNodeClick={this._handleNodeClick}
                onAskForDeletingNode={this._handleAskForDeletingNode}
                onToggleFullscreen={this._handleToggleFullscreen}
                onSwitchToolboxTab={this._handleSwitchToolboxTab}
                onSelectEventStreamNode={this._handleSelectEventsViewNode}
                onClipboardChange={this._handleClipboardChange}
                onNodeCopyPaste={this._handleNodeCopyPaste}
                onNodeCutPaste={this._handleNodeCutPaste}
                onContextUpdate={this._handleContextUpdate}
                onRouteSelect={this._handleRouteSelect}
                onTemplateSelect={this._handleTemplateSelect}
                onCurrentRouteClick={this._handleCurrentRouteClick}
                onCurrentTemplateClick={this._handleCurrentTemplateClick}
                onBuildAndPush={this._handleBuildAndPush}
                onPreview={this._handlePreview}
                onAskForAppendingBrick={this._handleAskForAppendingBrick}
                onEventNodeClick={this._handleEventNodeClick}
                onConvertToTemplate={this._handleConvertToTemplate}
                onWorkbenchClose={this._handleWorkbenchClose}
                onSwitchCanvasIndex={this._handleSwitchCanvasIndex}
                onStoryboardQueryUpdate={this._handleStoryboardQueryUpdate}
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
