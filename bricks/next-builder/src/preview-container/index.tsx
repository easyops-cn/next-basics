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
import type { BuilderSnippetNode, Storyboard } from "@next-core/brick-types";
import { ExcuteProxyMethodResult, PreviewSettings } from "@next-types/preview";
import {
  BuilderProvider,
  EventDetailOfNodeAddStored,
} from "@next-core/editor-bricks-helper";
import {
  CaptureStatus,
  PreviewContainer,
  PreviewerResize,
  type PreviewContainerRef,
} from "./PreviewContainer";

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

  @property()
  formId: string;

  @property({ attribute: false })
  formData: FormData;

  @property({
    attribute: false,
  })
  snippetGraphData: BuilderSnippetNode[];

  @property()
  routePath: string;

  @property({ type: Boolean })
  routeExact: boolean;

  @property({ attribute: false })
  previewSettings: PreviewSettings;

  @property({ type: Boolean })
  inspecting: boolean;

  @property({ type: Number })
  viewportWidth: number;

  @property({ type: Number })
  viewportHeight: number;

  @property({ type: Number })
  screenshotMaxWidth: number;

  @property({ type: Number })
  screenshotMaxHeight: number;

  @event({ type: "preview.start" })
  private _previewStartEvent: EventEmitter<void>;

  private _handlePreviewStart = (): void => {
    this._previewStartEvent.emit();
  };

  @event({ type: "excute.proxy.method.success" })
  private _excuteProxyMethodSuccess: EventEmitter<ExcuteProxyMethodResult>;

  private _handleExcuteProxyMethodSuccess = (
    result: ExcuteProxyMethodResult
  ): void => {
    this._excuteProxyMethodSuccess.emit(result);
  };

  @event({ type: "excute.proxy.method.error" })
  private _excuteProxyMethodError: EventEmitter<ExcuteProxyMethodResult>;

  private _handleExcuteProxyMethodError = (
    result: ExcuteProxyMethodResult
  ): void => {
    this._excuteProxyMethodError.emit(result);
  };

  @event({ type: "preview.debug" })
  private _onPreviewDebug: EventEmitter<any[]>;

  private _handlePreviwDebug = (result: any[]): void => {
    this._onPreviewDebug.emit(result);
  };

  @event({ type: "match.api.cache" })
  private _matchApiCacheEvent: EventEmitter<number>;

  private _handleMatchApiCache = (num: number): void => {
    this._matchApiCacheEvent.emit(num);
  };

  @event({ type: "url.change" })
  private _urlChangeEvent: EventEmitter<string>;

  private _handleUrlChange = (url: string): void => {
    this._urlChangeEvent.emit(url);
  };

  @event({ type: "scale.change" })
  private _scaleChangeEvent: EventEmitter<number>;

  private _handleScaleChange = (scale: number): void => {
    this._scaleChangeEvent.emit(scale);
  };

  @event({ type: "route.match" })
  private _routeMatchEvent: EventEmitter<boolean>;

  private _handleRouteMatch = (match: boolean): void => {
    this._routeMatchEvent.emit(match);
  };

  @event({ type: "captureStatus.change" })
  private _captureStatusChangeEvent: EventEmitter<CaptureStatus>;

  private _handleCaptureStatusChange = (status: CaptureStatus): void => {
    this._captureStatusChangeEvent.emit(status);
  };

  @event({ type: "screenshot.capture" })
  private _screenshotCaptureEvent: EventEmitter<Blob>;

  private _handleScreenshotCapture = (screenshot: Blob): void => {
    this._screenshotCaptureEvent.emit(screenshot);
  };

  @event({ type: "preview.drop" })
  private _handlePreviewerDropEvent: EventEmitter<Record<string, any>>;

  private _handlePreviewerDrop = (params: Record<string, any>): void => {
    this._handlePreviewerDropEvent.emit(params);
  };

  @event({ type: "preview.resize" })
  private _handlePreviewResizeEvent: EventEmitter<PreviewerResize>;

  private _handlePreivewResize = (resize: PreviewerResize): void => {
    this._handlePreviewResizeEvent.emit(resize);
  };

  private _previewContainerRef = createRef<PreviewContainerRef>();

  @method()
  resize(): void {
    this._previewContainerRef.current.resize();
  }

  @method()
  refresh(
    appId: string,
    storyboardPatch: Partial<Storyboard>,
    options: Record<string, unknown>
  ): void {
    this._previewContainerRef.current.refresh(appId, storyboardPatch, options);
  }

  @method()
  reload(): void {
    this._previewContainerRef.current.reload();
  }

  @method()
  capture(): void {
    this._previewContainerRef.current.capture();
  }

  // istanbul ignore next
  @method()
  nodeAddStored(detail: EventDetailOfNodeAddStored): void {
    this._previewContainerRef.current.manager.nodeAddStored(detail);
  }

  @method()
  excuteProxyMethod(ref: string, method: string, args?: any[]): void {
    this._previewContainerRef.current.excuteProxyMethod(ref, method, args);
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
          <BuilderProvider>
            <PreviewContainer
              ref={this._previewContainerRef}
              previewUrl={this.previewUrl}
              appId={this.appId}
              templateId={this.templateId}
              formId={this.formId}
              formData={this.formData}
              snippetGraphData={this.snippetGraphData}
              routePath={this.routePath}
              routeExact={this.routeExact}
              previewSettings={this.previewSettings}
              inspecting={this.inspecting}
              viewportWidth={this.viewportWidth}
              viewportHeight={this.viewportHeight}
              screenshotMaxWidth={this.screenshotMaxWidth}
              screenshotMaxHeight={this.screenshotMaxHeight}
              onPreviewStart={this._handlePreviewStart}
              onUrlChange={this._handleUrlChange}
              onScaleChange={this._handleScaleChange}
              onRouteMatch={this._handleRouteMatch}
              onCaptureStatusChange={this._handleCaptureStatusChange}
              onScreenshotCapture={this._handleScreenshotCapture}
              onPreviewerDrop={this._handlePreviewerDrop}
              onPreviewerResize={this._handlePreivewResize}
              onExcuteProxyMethodSuccess={this._handleExcuteProxyMethodSuccess}
              onExcuteProxyMethodError={this._handleExcuteProxyMethodError}
              onPreviewDebug={this._handlePreviwDebug}
              onMatchApiCache={this._handleMatchApiCache}
            />
          </BuilderProvider>
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
