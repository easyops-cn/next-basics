import React, { createRef } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  method,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { GeneralClipboard } from "./GeneralClipboard";

/**
 * @id utils.general-clipboard
 * @author Steve
 * @history
 * 1.0.0: 新增构件 `utils.general-clipboard`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralClipboardElement extends UpdatingElement {
  /**
   * @description 设置使用本地存储记录剪贴板数据的 key。未设置时将不启用本地存储。
   */
  @property()
  storageKey: string;

  /**
   * @description 设置剪贴板数据。
   */
  @method()
  setClipboardImmediately(clipboard: unknown): void {
    this._clipboardRef.current.setClipboardImmediately(clipboard);
  }

  /**
   * @detail `{ clipboard: unknown; }`
   * @description 当剪贴板数据变化时（使用 `_.isEqual` 判断）触发。
   */
  @event({ type: "clipboard.change" })
  private _clipboardChangeEmitter: EventEmitter<{ clipboard: unknown }>;

  private _handleClipboardChange = (clipboard: unknown): void => {
    this._clipboardChangeEmitter.emit({
      clipboard,
    });
  };

  private _clipboardRef =
    createRef<{ setClipboardImmediately(clipboard: unknown): void }>();

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
          <GeneralClipboard
            ref={this._clipboardRef}
            storageKey={this.storageKey}
            onClipboardChange={this._handleClipboardChange}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("utils.general-clipboard", GeneralClipboardElement);
