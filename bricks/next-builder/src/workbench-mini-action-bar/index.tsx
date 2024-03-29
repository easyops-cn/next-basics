import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  type EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { WorkbenchMiniActionBar } from "@next-libs/visual-builder";
import type {
  ActionClickDetail,
  WorkbenchTreeAction,
} from "../shared/workbench/interfaces";

/**
 * @id next-builder.workbench-mini-action-bar
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-mini-action-bar`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchMiniActionBarElement extends UpdatingElement {
  @property({ attribute: false })
  actions: WorkbenchTreeAction[];

  @event({ type: "action.click" })
  private _actionClickEvent: EventEmitter<ActionClickDetail>;

  private _handleActionClick = (detail: ActionClickDetail): void => {
    this._actionClickEvent.emit(detail);
  };

  connectedCallback(): void {
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
          <WorkbenchMiniActionBar
            gap={3}
            actions={this.actions}
            onActionClick={this._handleActionClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-mini-action-bar",
  WorkbenchMiniActionBarElement
);
