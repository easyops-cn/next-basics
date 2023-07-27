import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { FunctionDebuggerToolbar } from "./FunctionDebuggerToolbar";

/**
 * @id next-builder.function-debugger-toolbar
 * @author Steve
 * @history
 * 1.x.0: 新增构件 `next-builder.function-debugger-toolbar`
 * @docKind brick
 * @noInheritDoc
 */
export class FunctionDebuggerToolbarElement extends UpdatingElement {
  @property()
  type: "input" | "output" | "test-input" | "test-output";

  @property()
  status: "ok" | "failed" | null;

  @property({ type: Boolean })
  saveDisabled: boolean;

  @event({ type: "button.click" })
  private _buttonClickEmitter: EventEmitter<{ action: string }>;

  private _handleButtonClick = (detail: { action: string }): void => {
    this._buttonClickEmitter.emit(detail);
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
          <FunctionDebuggerToolbar
            type={this.type}
            status={this.status}
            saveDisabled={this.saveDisabled}
            onButtonClick={this._handleButtonClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.function-debugger-toolbar",
  FunctionDebuggerToolbarElement
);
