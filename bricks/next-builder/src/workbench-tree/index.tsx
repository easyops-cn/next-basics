import React from "react";
import ReactDOM from "react-dom";
import { pick } from "lodash";
import {
  BrickWrapper,
  event,
  type EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import type {
  ActionClickDetail,
  WorkbenchNodeData,
  WorkbenchTreeAction,
} from "../shared/workbench/interfaces";
import { WorkbenchActionsContext } from "../shared/workbench/WorkbenchActionsContext";
import { WorkbenchTree } from "../shared/workbench/WorkbenchTree";
import { WorkbenchTreeContext } from "../shared/workbench/WorkbenchTreeContext";
import { deepMatch } from "../builder-container/utils";

/**
 * @id next-builder.workbench-tree
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-tree`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchTreeElement extends UpdatingElement {
  @property({ attribute: false })
  nodes: WorkbenchNodeData[];

  @property({ attribute: false })
  actions: WorkbenchTreeAction[];

  @property()
  placeholder: string;

  @property({ type: Boolean })
  isTransformName: boolean;

  @property()
  searchPlaceholder: string;

  @property({ attribute: false })
  activeKey: string | number;

  @property({ type: Boolean })
  showMatchedNodeOnly: boolean;

  @property({ attribute: false })
  matchNodeDataFields: string | string[];

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
          <WorkbenchActionsContext.Provider
            value={{
              actions: this.actions,
              onActionClick: this._handleActionClick,
            }}
          >
            <WorkbenchTreeContext.Provider
              value={{
                activeKey: this.activeKey,
                basePaddingLeft: 5,
                showMatchedNodeOnly: this.showMatchedNodeOnly,
                isTransformName: this.isTransformName,
                clickFactory: this._nodeClickFactory,
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
              <WorkbenchTree
                nodes={this.nodes}
                placeholder={this.placeholder}
                searchPlaceholder={this.searchPlaceholder}
              />
            </WorkbenchTreeContext.Provider>
          </WorkbenchActionsContext.Provider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.workbench-tree", WorkbenchTreeElement);
