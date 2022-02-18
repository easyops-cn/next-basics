import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { PreviewHelper } from "./PreviewHelper";

/**
 * @id next-previewer.preview-helper
 * @author weareoutman
 * @history
 * 1.x.0: 新增构件 `next-previewer.preview-helper`
 * @docKind brick
 * @noInheritDoc
 */
export class PreviewHelperElement extends UpdatingElement {
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
          <PreviewHelper />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-previewer.preview-helper", PreviewHelperElement);
