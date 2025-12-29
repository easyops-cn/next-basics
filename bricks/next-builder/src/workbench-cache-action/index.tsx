import React, { createRef } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import {
  WorkbenchCacheAction,
  WorkbenchCacheActionRef,
  StoryboardUpdateParams,
  BuildAndPushState,
  BuildAndPushParams,
  MessageConf,
  StoryboardType,
} from "./WorkbenchCacheAction";
import {
  BuilderProvider,
  BuilderRuntimeNode,
  EventDetailOfSnippetApplyStored,
} from "@next-core/editor-bricks-helper";
import { WorkbenchBackendCacheAction } from "@next-types/preview";
import { pipes } from "@next-core/pipes";
import { Storyboard } from "@next-core/brick-types";

export interface WorkbenchCacheActionProps {
  appId?: string;
  projectId?: string;
  storyboardType?: StoryboardType;
  rootNode?: BuilderRuntimeNode;
  objectId?: string;
  onlyShowActionCount?: boolean;
  onCacheAction?: (event: CustomEvent) => void;
  onStoryboardUpdate?: (event: CustomEvent) => void;
  onRootNodeUpdate?: (event: CustomEvent) => void;
  onGraphdataUpdate?: (event: CustomEvent) => void;
  onExecuteSuccess?: (event: CustomEvent) => void;
  onSnippetSuccess?: (event: CustomEvent) => void;
  onBuildAndPush?: (event: CustomEvent) => void;
}

export interface WorkbenchCacheActionElementProps {
  appId?: string;
  projectId?: string;
  storyboardType?: StoryboardType;
  rootNode?: BuilderRuntimeNode;
  objectId?: string;
  onlyShowActionCount?: boolean;
  onCacheAction?: (event: CustomEvent<any>) => void;
  onStoryboardUpdate?: (event: CustomEvent<StoryboardUpdateParams>) => void;
  onRootNodeUpdate?: (event: CustomEvent<{
    node: BuilderRuntimeNode;
  }>) => void;
  onGraphdataUpdate?: (event: CustomEvent<{
    graphData: pipes.GraphData;
  }>) => void;
  onExecuteSuccess?: (event: CustomEvent<{
    res: unknown;
    op: string;
  }>) => void;
  onSnippetSuccess?: (event: CustomEvent<EventDetailOfSnippetApplyStored>) => void;
  onBuildAndPush?: (event: CustomEvent<BuildAndPushParams>) => void;
}

/**
 * @id next-builder.workbench-cache-action
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-cache-action`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchCacheActionElement extends UpdatingElement implements WorkbenchCacheActionProps {
  @property({ type: String })
  appId: string;

  @property({ type: String })
  projectId: string;

  @property({ type: String })
  storyboardType: StoryboardType;

  @property({ attribute: false })
  rootNode: BuilderRuntimeNode;

  @property({ type: String })
  objectId: string;

  @property({ type: Boolean })
  onlyShowActionCount: boolean;

  private _backendRef = createRef<WorkbenchCacheActionRef>();

  @event({ type: "cache.action" })
  _cacheActionEmitter: EventEmitter<any>;

  @method()
  cacheAction(detail: WorkbenchBackendCacheAction): void {
    const result = this._backendRef.current.cacheAction(detail);
    this._cacheActionEmitter.emit({
      ...result,
    });
  }

  @method()
  updateStoryboard(): void {
    this._backendRef.current.updateStoryboard();
  }

  @method()
  build(): void {
    this._backendRef.current.build();
  }

  @method()
  showMessage(value: MessageConf): void {
    this._backendRef.current.showMessage({
      ...value,
      show: true,
    });
  }

  @event({ type: "storyboard.update" })
  _storyboardUpdateEmitter: EventEmitter<StoryboardUpdateParams>;

  handleStoryboardUpdate = ({
    storyboard,
    updateStoryboardType,
    settings,
  }: StoryboardUpdateParams): void => {
    this._storyboardUpdateEmitter.emit({
      storyboard,
      updateStoryboardType,
      settings,
    });
  };

  @event({ type: "root.node.update" })
  _rootNodeUpdateEmitter: EventEmitter<{
    node: BuilderRuntimeNode;
  }>;

  handleRootNodeUpdate = (node: BuilderRuntimeNode): void => {
    this._rootNodeUpdateEmitter.emit({
      node,
    });
  };

  @event({ type: "graphData.update" })
  _graphDataUpdateEmitter: EventEmitter<{
    graphData: pipes.GraphData;
  }>;

  handleGraphDataUpdate = (graphData: pipes.GraphData): void => {
    this._graphDataUpdateEmitter.emit({
      graphData,
    });
  };

  @event({ type: "execute.success" })
  _handleExecuteSuccess: EventEmitter<{
    res: unknown;
    op: string;
  }>;

  handleExecuteSuccess = (res: { res: unknown; op: string }): void => {
    this._handleExecuteSuccess.emit(res);
  };

  @event({ type: "snippet.success" })
  _handleSnippetSuccessEmitter: EventEmitter<EventDetailOfSnippetApplyStored>;

  handleSnippetSuccess = (data: EventDetailOfSnippetApplyStored): void => {
    this._handleSnippetSuccessEmitter.emit(data);
  };

  @event({ type: "build.and.push" })
  _buildAndPushEmitter: EventEmitter<BuildAndPushParams>;

  handleBuildAndPush = (params: BuildAndPushParams): void => {
    this._buildAndPushEmitter.emit(params);
  };

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
            <WorkbenchCacheAction
              ref={this._backendRef}
              appId={this.appId}
              projectId={this.projectId}
              storyboardType={this.storyboardType}
              rootNode={this.rootNode}
              objectId={this.objectId}
              onlyShowActionCount={this.onlyShowActionCount}
              onStoryboardUpdate={this.handleStoryboardUpdate}
              onRootNodeUpdate={this.handleRootNodeUpdate}
              onGraphDataUpdate={this.handleGraphDataUpdate}
              onExecuteSuccess={this.handleExecuteSuccess}
              onSnippetSuccess={this.handleSnippetSuccess}
              onBuildAndPush={this.handleBuildAndPush}
            />
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-cache-action",
  WorkbenchCacheActionElement
);
