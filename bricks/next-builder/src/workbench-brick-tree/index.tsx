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
  BuilderProvider,
  type BuilderRuntimeNode,
} from "@next-core/editor-bricks-helper";
import { WorkbenchBrickTree } from "./WorkbenchBrickTree";
import type {
  ActionClickDetail,
  WorkbenchTreeAction,
} from "../shared/workbench/interfaces";
import { WorkbenchActionsContext } from "../shared/workbench/WorkbenchActionsContext";

/**
 * @id next-builder.workbench-brick-tree
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-brick-tree`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchStoryboardTreeElement extends UpdatingElement {
  @property()
  type: BuilderRuntimeNode["type"];

  @property({ attribute: false })
  actions: WorkbenchTreeAction[];

  @property()
  placeholder: string;

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
            <WorkbenchActionsContext.Provider
              value={{
                actions: this.actions,
                onActionClick: this._handleActionClick,
              }}
            >
              <WorkbenchBrickTree
                type={this.type}
                placeholder={this.placeholder}
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
