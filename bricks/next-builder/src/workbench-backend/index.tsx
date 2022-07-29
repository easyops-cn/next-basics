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
  WorkbenchBackend,
  WorkbenchBackendRef,
  StoryboardUpdateParams,
} from "./WorkbenchBackend";
import {
  BuilderProvider,
  BuilderRuntimeNode,
} from "@next-core/editor-bricks-helper";
import { pipes } from "@next-core/pipes";
import { WorkbenchBackendCacheAction } from "@next-types/preview";

/**
 * @id next-builder.workbench-backend
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-backend`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchBackendElement extends UpdatingElement {
  @property({ type: String })
  appId: string;

  @property({ type: String })
  projectId: string;

  @property({ attribute: false })
  originDataSource: pipes.GraphData;

  private _backendRef = createRef<WorkbenchBackendRef>();

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
            <WorkbenchBackend
              ref={this._backendRef}
              appId={this.appId}
              projectId={this.projectId}
              onStoryboardUpdate={this.handleStoryboardUpdate}
              onRootNodeUpdate={this.handleRootNodeUpdate}
            />
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-backend",
  WorkbenchBackendElement
);
