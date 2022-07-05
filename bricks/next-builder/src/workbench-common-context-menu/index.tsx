import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  type EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import {
  BuilderContextMenuStatus,
  BuilderProvider,
} from "@next-core/editor-bricks-helper";
import { ActionClickDetail } from "../shared/workbench/interfaces";
import type { BuilderClipboard } from "../builder-container/interfaces";
import {
  ContextMenuItem,
  WorkbenchCommonContextMenu,
} from "./WorkbenchCommonContextMenu";
import { method } from "@next-core/brick-kit";

/**
 * @id next-builder.workbench-common-context-menu
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-common-context-menu`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchCommonContextMenuElement extends UpdatingElement {
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

  private _handleContextMenuClose = (): void => {
    this.contextMenuStatus.active = false;
    this._render();
  };

  @method()
  show(): void {
    this.contextMenuStatus.active = true;
  }

  @method()
  close(): void {
    this._handleContextMenuClose();
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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BuilderProvider>
            <WorkbenchCommonContextMenu
              contextMenuStatus={this.contextMenuStatus}
              menu={this.menu}
              clipboard={this.clipboard}
              onActionClick={this._handleActionClick}
              onContextMenuClose={this._handleContextMenuClose}
            />
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-common-context-menu",
  WorkbenchCommonContextMenuElement
);
