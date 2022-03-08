import React from "react";
import ReactDOM from "react-dom";
import type { MenuIcon } from "@next-core/brick-types";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { WorkbenchAction } from "./WorkbenchAction";

/**
 * @id next-builder.workbench-action
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-action`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchActionItemElement extends UpdatingElement {
  @property({ attribute: false })
  icon: MenuIcon;

  @property()
  to: string;

  @property({ type: Boolean })
  active: boolean;

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
          <WorkbenchAction icon={this.icon} to={this.to} active={this.active} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-action",
  WorkbenchActionItemElement
);
