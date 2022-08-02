import React, { createRef } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  type EventEmitter,
  method,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import {
  BuilderProvider,
  type EventDetailOfNodeAdd,
  type EventDetailOfSnippetApplyStored,
  type SnippetNodeDetail,
  type SnippetNodeInstance,
  type BuilderRuntimeNode,
  type EventDetailOfNodeReorder,
  type EventDetailOfWorkbenchTreeNodeMove,
  type EventDetailOfNodeAddStored,
  type WorkbenchNodeAdd,
} from "@next-core/editor-bricks-helper";
import type {
  BuilderCustomTemplateNode,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";
import { WorkbenchStore, type WorkbenchStoreRef } from "./WorkbenchStore";
import {
  EventDetailOfSnippetApply,
  NodeInstance,
} from "@next-core/editor-bricks-helper";

type WithAppId<T> = T & {
  appId: string;
};
interface FulfilledEventDetailOfBrickAdd extends EventDetailOfNodeAdd {
  nodeData: WithAppId<NodeInstance>;
}

interface FulfilledSnippetNodeDetail extends SnippetNodeDetail {
  nodeData: WithAppId<SnippetNodeInstance>;
}

/**
 * @id next-builder.workbench-store
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-store`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchStoreElement extends UpdatingElement {
  /**
   * @default
   * @required
   * @description
   */
  @property({ type: String })
  appId: string;

  // This is the main data of the storyboard tree.
  @property({ attribute: false })
  dataSource: BuilderRouteOrBrickNode[];

  // This a list which contains all custom templates with their brick tree.
  // It is used for expanding templates in canvas.
  @property({ attribute: false })
  templateSources: BuilderCustomTemplateNode[];

  @property({ type: String })
  activeInstanceId: string;

  @event({ type: "node.click" })
  private _nodeClickEvent: EventEmitter<BuilderRuntimeNode>;

  private _handleNodeClick = (event: CustomEvent<BuilderRuntimeNode>): void => {
    this._nodeClickEvent.emit(event.detail);
  };

  @event({
    type: "node.add",
  })
  private _nodeAddEmitter: EventEmitter<FulfilledEventDetailOfBrickAdd>;
  private _handleNodeAdd = (event: CustomEvent<EventDetailOfNodeAdd>): void => {
    this._nodeAddEmitter.emit({
      ...event.detail,
      nodeData: {
        appId: this.appId,
        ...event.detail.nodeData,
      },
    });
  };
  @event({
    type: "snippet.apply",
  })
  private _snippetApplyEmitter: EventEmitter<EventDetailOfSnippetApply>;
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
    this._snippetApplyEmitter.emit({
      ...event.detail,
      nodeDetails: event.detail.nodeDetails.map(fillAppId),
    });
  };

  @event({
    type: "node.reorder",
  })
  private _nodeReorderEmitter: EventEmitter<EventDetailOfNodeReorder>;

  private _handleNodeReorder = (
    event: CustomEvent<EventDetailOfNodeReorder>
  ): void => {
    this._nodeReorderEmitter.emit(event.detail);
  };

  @event({
    type: "node.move",
  })
  private _nodeMoveEmitter: EventEmitter<EventDetailOfWorkbenchTreeNodeMove>;
  private _handleNodeMove = (
    event: CustomEvent<EventDetailOfWorkbenchTreeNodeMove>
  ): void => {
    this._nodeMoveEmitter.emit(event.detail);
  };

  @event({
    type: "node.delete",
  })
  private _nodeDeleteEmitter: EventEmitter<BuilderRuntimeNode>;

  // istanbul ignore next
  @method()
  nodeAddStored(detail: EventDetailOfNodeAddStored): void {
    this._storeRef.current.manager.nodeAddStored(detail);
  }

  // istanbul ignore next
  @method()
  previewNodeAdd(detail: WorkbenchNodeAdd): void {
    this._storeRef.current.manager.workbenchNodeAdd(detail);
  }

  // istanbul ignore next
  @method()
  snippetApplyStored(detail: EventDetailOfSnippetApplyStored): void {
    this._storeRef.current.manager.snippetApplyStored(detail);
  }

  // istanbul ignore next
  @method()
  deleteNode(node: BuilderRuntimeNode): void {
    this._storeRef.current.manager.nodeDelete(node);
    this._nodeDeleteEmitter.emit({
      ...node,
    });
  }

  // istanbul ignore next
  @method()
  moveNode(node: BuilderRuntimeNode, direction: "up" | "down"): void {
    this._storeRef.current.manager.moveNode(node, direction);
  }

  // istanbul ignore next
  @method()
  moveMountPoint(
    node: BuilderRuntimeNode,
    mountPoint: string,
    direction: "up" | "down"
  ): void {
    this._storeRef.current.manager.moveMountPoint(node, mountPoint, direction);
  }

  @method()
  previewStart(): void {
    this._storeRef.current.previewStart();
  }

  private _storeRef = createRef<WorkbenchStoreRef>();

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
            <WorkbenchStore
              ref={this._storeRef}
              dataSource={this.dataSource}
              templateSources={this.templateSources}
              activeInstanceId={this.activeInstanceId}
              onNodeClick={this._handleNodeClick}
              onNodeReorder={this._handleNodeReorder}
              onWorkbenchTreeNodeMove={this._handleNodeMove}
              onNodeAdd={this._handleNodeAdd}
              onSnippetApply={this._handleSnippetApply}
            />
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.workbench-store", WorkbenchStoreElement);
