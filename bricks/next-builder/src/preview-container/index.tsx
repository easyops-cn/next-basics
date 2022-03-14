import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  type EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
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

  @property({ type: Boolean })
  inspecting: boolean;

  @event({ type: "inspecting.toggle" })
  private _inspectingToggleEvent: EventEmitter<boolean>;

  private _handleInspectingToggle = (enabled: boolean): void => {
    if (this.inspecting !== enabled) {
      this.inspecting = enabled;
      this._inspectingToggleEvent.emit(enabled);
    }
  };

  @event({ type: "preview.start" })
  private _previewStartEvent: EventEmitter<void>;

  private _handlePreviewStart = (): void => {
    this._previewStartEvent.emit();
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
          <PreviewContainer
            previewUrl={this.previewUrl}
            inspecting={this.inspecting}
            onInspectingToggle={this._handleInspectingToggle}
            onPreviewStart={this._handlePreviewStart}
          />
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
