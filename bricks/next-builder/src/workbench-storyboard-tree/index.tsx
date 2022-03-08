import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { WorkbenchStoryboardTree } from "./WorkbenchStoryboardTree";
import { BuilderProvider } from "@next-core/editor-bricks-helper";

/**
 * @id next-builder.workbench-storyboard-tree
 * @author weareoutman
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-storyboard-tree`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchStoryboardTreeElement extends UpdatingElement {
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
          <BuilderProvider>
            <WorkbenchStoryboardTree placeholder={this.placeholder} />
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-storyboard-tree",
  WorkbenchStoryboardTreeElement
);
