import React from "react";
import ReactDOM from "react-dom";
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
import { BuilderRouteOrBrickNode } from "@next-core/brick-types";
import {
  EventDetailOfNodeAdd,
  NodeInstance,
  EventDetailOfNodeMove,
  EventDetailOfNodeAddStored,
  EventDetailOfNodeReorder,
  BuilderRuntimeNode,
  BuilderProvider,
  AbstractBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { BrickOptionItem } from "./interfaces";
import { BuilderContainer } from "./BuilderContainer";
import { BuilderUIContext } from "./BuilderUIContext";

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

  @property({ type: Boolean })
  processing: boolean;

  @property({ type: Boolean })
  fullscreen: boolean;

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
    type: "node.delete.ask",
  })
  private _nodeDeleteAskEmitter: EventEmitter<BuilderRuntimeNode>;

  @event({
    type: "node.delete.confirmed",
  })
  private _nodeDeleteConfirmedEmitter: EventEmitter<BuilderRuntimeNode>;

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
  };

  private _handleAskForDeletingNode = (node: BuilderRuntimeNode): void => {
    this._nodeDeleteAskEmitter.emit({
      ...node,
    });
  };

  @method()
  nodeAddStored(detail: EventDetailOfNodeAddStored): void {
    this._managerRef.current.nodeAddStored(detail);
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

  private _managerRef = React.createRef<AbstractBuilderDataManager>();

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BuilderProvider>
            <DndProvider backend={HTML5Backend}>
              <BuilderContainer
                ref={this._managerRef}
                dataSource={this.dataSource}
                brickList={this.brickList}
                processing={this.processing}
                initialFullscreen={this.fullscreen}
                onNodeAdd={this._handleNodeAdd}
                onNodeReorder={this._handleNodeReorder}
                onNodeMove={this._handleNodeMove}
                onNodeClick={this._handleNodeClick}
                onAskForDeletingNode={this._handleAskForDeletingNode}
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
