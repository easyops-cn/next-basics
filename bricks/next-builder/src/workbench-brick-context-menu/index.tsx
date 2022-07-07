import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { WorkbenchBrickContextMenu } from "./WorkbenchBrickContextMenu";
import { ContextMenuItem } from "../workbench-context-menu/WorkbenchContextMenu";
import { BuilderClipboard } from "../builder-container/interfaces";
import { ActionClickDetail } from "../shared/workbench/interfaces";
import { BuilderProvider } from "@next-core/editor-bricks-helper";

/**
 * @id next-builder.workbench-brick-context-menu
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-brick-context-menu`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchBrickContextMenuElement extends UpdatingElement {
  @property({ attribute: false })
  menu: ContextMenuItem[];

  @property({ attribute: false })
  clipboard: BuilderClipboard;

  @event({ type: "action.click" })
  private _actionClickEvent: EventEmitter<ActionClickDetail>;

  private _handleActionClick = (detail: ActionClickDetail): void => {
    this._actionClickEvent.emit(detail);
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
            <WorkbenchBrickContextMenu
              menu={this.menu}
              clipboard={this.clipboard}
              onActionClick={this._handleActionClick}
            />
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-brick-context-menu",
  WorkbenchBrickContextMenuElement
);
