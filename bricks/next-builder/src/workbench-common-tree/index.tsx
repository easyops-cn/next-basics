import React from "react";
import ReactDOM from "react-dom";
import { pick } from "lodash";
import {
  BrickWrapper,
  UpdatingElement,
  event,
  property,
  EventEmitter,
} from "@next-core/brick-kit";
import { WorkbenchCommonTree } from "./WorkbenchCommonTree";
import { BuilderProvider } from "@next-core/editor-bricks-helper";
import type {
  ActionClickDetail,
  WorkbenchTreeAction,
} from "../shared/workbench/interfaces";
import { WorkbenchActionsContext } from "../shared/workbench/WorkbenchActionsContext";
import { WorkbenchNodeData } from "../shared/workbench/interfaces";
import { WorkbenchTreeContext } from "../shared/workbench/WorkbenchTreeContext";
import { deepMatch } from "../builder-container/utils";

/**
 * @id next-builder.workbench-common-tree
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-common-tree`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchCommonTreeElement extends UpdatingElement {
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
  allowDrag: boolean;

  @event({ type: "action.click" })
  private _actionClickEvent: EventEmitter<ActionClickDetail>;

  private _handleActionClick = (detail: ActionClickDetail): void => {
    this._actionClickEvent.emit(detail);
  };

  @event({ type: "node.click" })
  private _nodeClickEvent: EventEmitter<unknown>;

  private _nodeClickFactory = (node: WorkbenchNodeData) => () => {
    this._nodeClickEvent.emit(node.data);
  };

  @event({ type: "context.menu" })
  private _nodeContextMenuEvent: EventEmitter<unknown>;

  @event({ type: "node.drop" })
  private _nodeDropEvent: EventEmitter<any>;

  private _handleNodeDrop = (detail: unknown): void => {
    this._nodeDropEvent.emit(detail);
  };

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
              <WorkbenchTreeContext.Provider
                value={{
                  activeKey: this.activeKey,
                  basePaddingLeft: 5,
                  collapsible: true,
                  showMatchedNodeOnly: this.showMatchedNodeOnly,
                  isTransformName: this.isTransformName,
                  fixedActionsFor: this.fixedActionsFor,
                  nodeKey: "$key",
                  clickFactory: this._nodeClickFactory,
                  contextMenuFactory: this._contextMenuFactory,
                  matchNode: (node, lowerTrimmedQuery) =>
                    deepMatch(node.name, lowerTrimmedQuery) ||
                    (!!this.matchNodeDataFields?.length &&
                      deepMatch(
                        this.matchNodeDataFields === "*"
                          ? node.data
                          : pick(node.data, this.matchNodeDataFields),
                        lowerTrimmedQuery
                      )),
                }}
              >
                <WorkbenchCommonTree
                  nodes={this.nodes}
                  placeholder={this.placeholder}
                  searchPlaceholder={this.searchPlaceholder}
                  noSearch={this.noSearch}
                  allowDrag={this.allowDrag}
                  nodeKey="$key"
                  handleNodeDrop={this._handleNodeDrop}
                />
              </WorkbenchTreeContext.Provider>
            </WorkbenchActionsContext.Provider>
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-common-tree",
  WorkbenchCommonTreeElement
);
