import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { WorkbenchTree, type WorkbenchNodeData } from "./WorkbenchTree";

/**
 * @id next-builder.workbench-tree
 * @author weareoutman
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-tree`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchTreeElement extends UpdatingElement {
  @property({ attribute: false })
  nodes: WorkbenchNodeData[];

  @property()
  placeholder: string;

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
          <WorkbenchTree nodes={this.nodes} placeholder={this.placeholder} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.workbench-tree", WorkbenchTreeElement);
