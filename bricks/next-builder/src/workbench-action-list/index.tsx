import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { WorkbenchActionList } from "./WorkbenchActionList";
import { SidebarSubMenu } from "@next-core/brick-types";

/**
 * @id next-builder.workbench-action-list
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-action-list`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchActionListElement extends UpdatingElement {
  @property({ attribute: false })
  menu: SidebarSubMenu;

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
          <WorkbenchActionList menu={this.menu} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-action-list",
  WorkbenchActionListElement
);
