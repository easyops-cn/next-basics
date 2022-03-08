import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { PreviewContainer } from "./PreviewContainer";

/**
 * @id next-builder.preview-container
 * @author bot
 * @history
 * 1.x.0: 新增构件 `next-builder.preview-container`
 * @docKind brick
 * @noInheritDoc
 */
export class PreviewContainerElement extends UpdatingElement {
  @property()
  previewUrl: string;

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
          <PreviewContainer previewUrl={this.previewUrl} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.preview-container",
  PreviewContainerElement
);
