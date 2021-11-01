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
 * 1.0.0: 新增构件 `utils.broadcast-channel`
 * @docKind brick
 * @noInheritDoc
 */
export class BroadcastChannelElement extends UpdatingElement {
  /**
   * @description 广播频道名称，详见 [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)。
   * @required true
   */
  @property()
  channelName: string;

  /**
   * @detail `unknown`
   * @description 广播频道消息事件。
   */
  @event({ type: "channel.message" })
  private _messageEmitter: EventEmitter<unknown>;

  /**
   * @description 发送一条消息。
   */
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
