import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  type EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { BuilderProvider } from "@next-core/editor-bricks-helper";
import { WorkbenchBrickTree } from "./WorkbenchBrickTree";
import type {
  ActionClickDetail,
  WorkbenchTreeAction,
} from "../shared/workbench/interfaces";
import { WorkbenchActionsContext } from "../shared/workbench/WorkbenchActionsContext";
import { WorkbenchBackendActionForInsertDetail } from "@next-types/preview";

/**
 * @id next-builder.workbench-brick-tree
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-brick-tree`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchStoryboardTreeElement extends UpdatingElement {
  @property({ attribute: false })
  actions: WorkbenchTreeAction[];

  @property()
  placeholder: string;

  @property()
  searchPlaceholder: string;

  @property({ type: String })
  activeInstanceId: string;

  @property({ attribute: false })
  collapsedNodes: string[];

  @event({ type: "action.click" })
  private _actionClickEvent: EventEmitter<ActionClickDetail>;

  private _handleActionClick = (detail: ActionClickDetail): void => {
    this._actionClickEvent.emit(detail);
  };

  @event({ type: "add.brick" })
  private _addBrickEvent: EventEmitter<WorkbenchBackendActionForInsertDetail>;

  private _handleAddBrickDrop = (
    detail: WorkbenchBackendActionForInsertDetail
  ): void => {
    this._addBrickEvent.emit(detail);
  };

  @property({ type: Boolean })
  isDrag: boolean;

  @event({ type: "node.toggle" })
  private _nodeToggleEvent: EventEmitter<{
    nodeId: string;
    collapsed: boolean;
  }>;

  private _handleNodeToggle = (nodeId: string, collapsed: boolean): void => {
    this._nodeToggleEvent.emit({ nodeId, collapsed });
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
                onActionClick: this._handleActionClick,
              }}
            >
              <WorkbenchBrickTree
                placeholder={this.placeholder}
                searchPlaceholder={this.searchPlaceholder}
                activeInstanceId={this.activeInstanceId}
                collapsedNodes={this.collapsedNodes}
                isDrag={this.isDrag}
                onNodeToggle={this._handleNodeToggle}
                onAddBrickDrop={this._handleAddBrickDrop}
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
  "next-builder.workbench-brick-tree",
  WorkbenchStoryboardTreeElement
);
