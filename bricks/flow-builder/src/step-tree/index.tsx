import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  EventEmitter,
  event,
} from "@next-core/brick-kit";
import { deepMatch } from "@next-libs/visual-builder";
import { pick } from "lodash";
import { StepTreeNodeData } from "../interfaces";
import { StepTreeAction, ActionClickDetail } from "./interfaces";
import { StepTree } from "./StepTree";
import { WorkbenchTreeContext } from "./constants";

/**
 * @id flow-builder.step-tree
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `flow-builder.step-tree`
 * @docKind brick
 * @noInheritDoc
 */

export class StepTreeElement extends UpdatingElement {
  @property({ attribute: false })
  actions: StepTreeAction[];

  @property()
  placeholder: string;

  @property({ type: Boolean })
  actionsHidden: boolean;

  @property({ attribute: false })
  matchNodeDataFields: string | string[];

  @property()
  searchPlaceholder: string;

  @property({
    attribute: false,
  })
  nodes: StepTreeNodeData[];

  @property({
    type: Boolean,
  })
  noSearch: boolean;

  @property({ attribute: false })
  activeKey: string;

  @event({ type: "action.click" })
  private _actionClickEvent: EventEmitter<ActionClickDetail>;

  private _handleActionClick = (detail: ActionClickDetail): void => {
    this._actionClickEvent.emit(detail);
  };

  @event({ type: "node.click" })
  private _nodeClickEvent: EventEmitter<StepTreeNodeData["data"]>;

  private _nodeClickFactory =
    (node: StepTreeNodeData) => (event: React.MouseEvent) => {
      event.stopPropagation();
      this._nodeClickEvent.emit(node.data);
    };

  @event({ type: "node.enter" })
  private _nodeEnterEvent: EventEmitter<StepTreeNodeData["data"]>;

  private _nodeEnterFactory = (node: StepTreeNodeData) => () => {
    this._nodeEnterEvent.emit(node.data);
  };

  @event({ type: "node.leave" })
  private _nodeLeaveEvent: EventEmitter<void>;

  private _nodeLeaveFactory = () => () => {
    this._nodeLeaveEvent.emit();
  };

  private _matchNode = (
    node: StepTreeNodeData,
    lowerTrimmedQuery: string
  ): boolean =>
    deepMatch(node.name, lowerTrimmedQuery) ||
    (!!this.matchNodeDataFields?.length &&
      deepMatch(
        this.matchNodeDataFields === "*"
          ? node.data
          : pick(node.data, this.matchNodeDataFields),
        lowerTrimmedQuery
      ));

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
          <WorkbenchTreeContext.Provider
            value={{
              activeKey: this.activeKey,
              actions: this.actions,
              actionsHidden: this.actionsHidden,
              onActionClick: this._handleActionClick,
              nodeClickFactory: this._nodeClickFactory,
              mouseEnterFactory: this._nodeEnterFactory,
              mouseLeaveFactory: this._nodeLeaveFactory,
              matchNode: this._matchNode,
            }}
          >
            <StepTree
              nodes={this.nodes}
              placeholder={this.placeholder}
              searchPlaceholder={this.searchPlaceholder}
              noSearch={this.noSearch}
            />
          </WorkbenchTreeContext.Provider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("flow-builder.step-tree", StepTreeElement);
