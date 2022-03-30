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
  type BuilderRuntimeNode,
  type EventDetailOfNodeReorder,
} from "@next-core/editor-bricks-helper";
import type {
  BuilderCustomTemplateNode,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";
import { WorkbenchStore, type WorkbenchStoreRef } from "./WorkbenchStore";

/**
 * @id next-builder.workbench-store
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-store`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchStoreElement extends UpdatingElement {
  // This is the main data of the storyboard tree.
  @property({ attribute: false })
  dataSource: BuilderRouteOrBrickNode[];

  // This a list which contains all custom templates with their brick tree.
  // It is used for expanding templates in canvas.
  @property({ attribute: false })
  templateSources: BuilderCustomTemplateNode[];

  @event({ type: "node.click" })
  private _nodeClickEvent: EventEmitter<BuilderRuntimeNode>;

  private _handleNodeClick = (event: CustomEvent<BuilderRuntimeNode>): void => {
    this._nodeClickEvent.emit(event.detail);
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
    type: "node.delete",
  })
  private _nodeDeleteEmitter: EventEmitter<BuilderRuntimeNode>;

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
              onNodeClick={this._handleNodeClick}
              onNodeReorder={this._handleNodeReorder}
            />
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.workbench-store", WorkbenchStoreElement);
