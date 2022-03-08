import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { BuilderProvider } from "@next-core/editor-bricks-helper";
import type {
  BuilderCustomTemplateNode,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";
import { WorkbenchStore } from "./WorkbenchStore";

/**
 * @id next-builder.workbench-store
 * @author weareoutman
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-store`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchStoreElement extends UpdatingElement {
  // This is the main data of the storyboard tree.
  @property({ attribute: false })
  dataSource: BuilderRouteOrBrickNode[];

  // This a list which contains all custom templates with their brick tree.
  // It is used for expanding templates in canvas.
  @property({ attribute: false })
  templateSources: BuilderCustomTemplateNode[];

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
            <WorkbenchStore
              dataSource={this.dataSource}
              templateSources={this.templateSources}
            />
          </BuilderProvider>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.workbench-store", WorkbenchStoreElement);
