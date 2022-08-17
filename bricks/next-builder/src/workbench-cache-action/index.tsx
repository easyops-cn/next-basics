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
} from "./WorkbenchCacheAction";
import {
  BuilderProvider,
  BuilderRuntimeNode,
} from "@next-core/editor-bricks-helper";
import { WorkbenchBackendCacheAction } from "@next-types/preview";
import { pipes } from "@next-core/pipes";
import { Storyboard } from "@next-core/brick-types";

/**
 * @id next-builder.workbench-cache-action
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-cache-action`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchCacheActionElement extends UpdatingElement {
  @property({ type: String })
  appId: string;

  @property({ type: String })
  projectId: string;

  @property({ attribute: false })
  rootNode: BuilderRuntimeNode;

  @property({ type: String })
  objectId: string;

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

  @event({ type: "build.and.push" })
  _buildAndPushEmitter: EventEmitter<{
    state: BuildAndPushState;
    storyboard: Storyboard;
  }>;

  handleBuildAndPush = (
    state: BuildAndPushState,
    storyboard: Storyboard
  ): void => {
    this._buildAndPushEmitter.emit({
      state,
      storyboard,
    });
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
              rootNode={this.rootNode}
              objectId={this.objectId}
              onStoryboardUpdate={this.handleStoryboardUpdate}
              onRootNodeUpdate={this.handleRootNodeUpdate}
              onGraphDataUpdate={this.handleGraphDataUpdate}
              onExecuteSuccess={this.handleExecuteSuccess}
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
