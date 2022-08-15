import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { WorkbenchDataTree } from "./WorkbenchDataTree";
import { WorkbenchTreeContext } from "../shared/workbench/WorkbenchTreeContext";
import { WorkbenchActionsContext } from "../shared/workbench/WorkbenchActionsContext";
import {
  ActionClickDetail,
  WorkbenchNodeData,
  WorkbenchTreeAction,
} from "../shared/workbench/interfaces";
import { dropEmitProps } from "../shared/workbench/WorkbenchTree";
import { BuilderProvider } from "@next-core/editor-bricks-helper";

/**
 * @id next-builder.workbench-data-tree
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-data-tree`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchDataTreeElement extends UpdatingElement {
  @property({ attribute: false })
  nodes: WorkbenchNodeData[];

  @property({ attribute: false })
  actions: WorkbenchTreeAction[];

  @property({ type: Boolean })
  actionsHidden: boolean;

  @property()
  placeholder: string;

  @property({ type: Boolean })
  isTransformName: boolean;

  @property()
  searchPlaceholder: string;

  @property({ type: Boolean })
  noSearch: boolean;

  @property({ attribute: false })
  activeKey: string | number;

  @property({ type: Boolean })
  showMatchedNodeOnly: boolean;

  @property({ attribute: false })
  matchNodeDataFields: string | string[];

  @property({ attribute: false })
  fixedActionsFor: Record<string, unknown> | Record<string, unknown>[];

  @property({ type: Boolean })
  collapsible: boolean;

  @property({ type: Boolean })
  allowDrag: boolean;

  @property({ type: Boolean })
  allowDragToRoot: boolean;

  @property({ type: Boolean })
  allowDragToInside: boolean;

  @property({ type: String })
  nodeKey: string;

  @event({ type: "action.click" })
  private _actionClickEvent: EventEmitter<ActionClickDetail>;

  private _handleActionClick = (detail: ActionClickDetail): void => {
    this._actionClickEvent.emit(detail);
  };

  @event({ type: "node.click" })
  private _nodeClickEvent: EventEmitter<unknown>;

  private _nodeClickFactory =
    (node: WorkbenchNodeData) => (event: React.MouseEvent) => {
      // Q: It's weird that we MUST stop propagation here.
      // Or this listener will be called twice.
      // This may be a known issue of React 16 with shadow DOM,
      // which is hopefully fixed in react 17.
      // And a potential workaround for react 16:
      // https://github.com/facebook/react/issues/9242#issuecomment-534096832
      event.stopPropagation();
      this._nodeClickEvent.emit(node.data);
    };

  @event({ type: "node.drop" })
  private _nodeDropEvent: EventEmitter<any>;

  private _handleNodeDrop = (detail: dropEmitProps): void => {
    this._nodeDropEvent.emit(detail);
  };

  @event({ type: "context.menu" })
  private _nodeContextMenuEvent: EventEmitter<unknown>;

  private _contextMenuFactory =
    (node: WorkbenchNodeData) => (e: React.MouseEvent) => {
      e.preventDefault();
      this._nodeContextMenuEvent.emit({
        active: true,
        node: node.data,
        x: e.clientX,
        y: e.clientY,
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
            <WorkbenchActionsContext.Provider
              value={{
                actions: this.actions,
                actionsHidden: this.actionsHidden,
                onActionClick: this._handleActionClick,
              }}
            >
              <WorkbenchDataTree
                trees={this.nodes}
                placeholder={this.placeholder}
                searchPlaceholder={this.searchPlaceholder}
                noSearch={this.noSearch}
                dropEmit={this._handleNodeDrop}
                activeKey={this.activeKey}
                nodeKey={this.nodeKey}
                clickFactory={this._nodeClickFactory}
                contextMenuFactory={this._contextMenuFactory}
                matchNodeDataFields={this.matchNodeDataFields}
              />
            </WorkbenchActionsContext.Provider>
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-data-tree",
  WorkbenchDataTreeElement
);
