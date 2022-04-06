import React, { createRef } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  type EventEmitter,
  property,
  UpdatingElement,
  method,
} from "@next-core/brick-kit";
import type { Storyboard } from "@next-core/brick-types";
import { PreviewContainer, type PreviewContainerRef } from "./PreviewContainer";
import { PreviewSettings } from "@next-types/preview";

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

  @property()
  appId: string;

  @property()
  templateId: string;

  @property({ attribute: false })
  previewSettings: PreviewSettings;

  @property({ type: Boolean })
  inspecting: boolean;

  @property({ type: Number })
  viewportWidth: number;

  @event({ type: "preview.start" })
  private _previewStartEvent: EventEmitter<void>;

  private _handlePreviewStart = (): void => {
    this._previewStartEvent.emit();
  };

  @event({ type: "url.change" })
  private _urlChangeEvent: EventEmitter<string>;

  private _handleUrlChange = (url: string): void => {
    this._urlChangeEvent.emit(url);
  };

  private _previewContainerRef = createRef<PreviewContainerRef>();

  @method()
  refresh(appId: string, storyboardPatch: Partial<Storyboard>): void {
    this._previewContainerRef.current.refresh(appId, storyboardPatch);
  }

  @method()
  reload(): void {
    this._previewContainerRef.current.reload();
  }

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
            ref={this._previewContainerRef}
            previewUrl={this.previewUrl}
            appId={this.appId}
            templateId={this.templateId}
            previewSettings={this.previewSettings}
            inspecting={this.inspecting}
            viewportWidth={this.viewportWidth}
            onPreviewStart={this._handlePreviewStart}
            onUrlChange={this._handleUrlChange}
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
