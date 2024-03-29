import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  type EventEmitter,
  property,
  method,
  UpdatingElement,
} from "@next-core/brick-kit";
import { BuilderContextMenuStatus } from "@next-core/editor-bricks-helper";
import { ContextMenuItem, WorkbenchContextMenu } from "./WorkbenchContextMenu";
import { ActionClickDetail } from "../shared/workbench/interfaces";
import type { BuilderClipboard } from "../builder-container/interfaces";

/**
 * @id next-builder.workbench-context-menu
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-context-menu`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchContextMenuElement extends UpdatingElement {
  @property({ attribute: false })
  menu: ContextMenuItem[];

  @property({ attribute: false })
  clipboard: BuilderClipboard;

  @property({ attribute: false })
  contextMenuStatus: BuilderContextMenuStatus = {} as BuilderContextMenuStatus;

  @event({ type: "action.click" })
  private _actionClickEvent: EventEmitter<ActionClickDetail>;

  private _handleActionClick = (detail: ActionClickDetail): void => {
    this._actionClickEvent.emit(detail);
  };

  private _handleContextMenuClose = (e: React.MouseEvent): void => {
    e.preventDefault();
    this.contextMenuStatus = {
      active: false,
    };
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
          <WorkbenchContextMenu
            contextMenuStatus={this.contextMenuStatus}
            menu={this.menu}
            clipboard={this.clipboard}
            canPaste={!!this.clipboard}
            onActionClick={this._handleActionClick}
            handleCloseMenu={this._handleContextMenuClose}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-context-menu",
  WorkbenchContextMenuElement
);
