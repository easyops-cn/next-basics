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
import { PreviewSettings } from "@next-types/preview";
import {
  BuilderProvider,
  EventDetailOfNodeAdd,
  EventDetailOfNodeAddStored,
  NodeInstance,
} from "@next-core/editor-bricks-helper";
import {
  CaptureStatus,
  PreviewContainer,
  type PreviewContainerRef,
} from "./PreviewContainer";

type WithAppId<T> = T & {
  appId: string;
};
interface FulfilledEventDetailOfBrickAdd extends EventDetailOfNodeAdd {
  nodeData: WithAppId<NodeInstance>;
}

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
  private _screenshotCaptureEvent: EventEmitter<string>;

  private _handleScreenshotCapture = (screenshot: string): void => {
    this._screenshotCaptureEvent.emit(screenshot);
  };

  private _previewContainerRef = createRef<PreviewContainerRef>();

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

  @event({
    type: "node.add",
  })
  private _nodeAddEmitter: EventEmitter<FulfilledEventDetailOfBrickAdd>;
  private _handleNodeAdd = (event: CustomEvent<EventDetailOfNodeAdd>): void => {
    this._nodeAddEmitter.emit({
      ...event.detail,
      nodeData: {
        appId: this.appId,
        ...event.detail.nodeData,
      },
    });
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
          <BuilderProvider>
            <PreviewContainer
              ref={this._previewContainerRef}
              previewUrl={this.previewUrl}
              appId={this.appId}
              templateId={this.templateId}
              snippetGraphData={this.snippetGraphData}
              routePath={this.routePath}
              routeExact={this.routeExact}
              previewSettings={this.previewSettings}
              inspecting={this.inspecting}
              viewportWidth={this.viewportWidth}
              viewportHeight={this.viewportHeight}
              screenshotMaxWidth={this.screenshotMaxWidth}
              screenshotMaxHeight={this.screenshotMaxHeight}
              onNodeAdd={this._handleNodeAdd}
              onPreviewStart={this._handlePreviewStart}
              onUrlChange={this._handleUrlChange}
              onScaleChange={this._handleScaleChange}
              onRouteMatch={this._handleRouteMatch}
              onCaptureStatusChange={this._handleCaptureStatusChange}
              onScreenshotCapture={this._handleScreenshotCapture}
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
