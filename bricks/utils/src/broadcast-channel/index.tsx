import React, { createRef } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { BroadcastChannelComponent } from "./BroadcastChannel";

/**
 * @id utils.broadcast-channel
 * @author Steve
 * @history
 * 1.x.0: 新增构件 `utils.broadcast-channel`
 * @docKind brick
 * @noInheritDoc
 */
export class BroadcastChannelElement extends UpdatingElement {
  @property()
  channelName: string;

  @event({ type: "channel.message" })
  private _messageEmitter: EventEmitter<unknown>;

  @method()
  postMessage(data: unknown): void {
    this._messagePortRef.current?.postMessage(data);
  }

  private _handleMessage = (data: unknown): void => {
    this._messageEmitter.emit(data);
  };

  private _messagePortRef = createRef<Pick<BroadcastChannel, "postMessage">>();

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
          <BroadcastChannelComponent
            ref={this._messagePortRef}
            channelName={this.channelName}
            onMessage={this._handleMessage}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("utils.broadcast-channel", BroadcastChannelElement);
