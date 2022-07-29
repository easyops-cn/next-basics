import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { FunctionDebuggerToolbarV2 } from "./FunctionDebuggerToolbarV2";

/**
 * @id next-builder.function-debugger-toolbar-v2
 * @author Kehua
 * @history
 * 1.x.0: 新增构件 `next-builder.function-debugger-toolbar-v2`
 * @docKind brick
 * @noInheritDoc
 */
export class FunctionDebuggerToolbarV2Element extends UpdatingElement {
  @property()
  type: "input" | "output" | "test-input" | "test-output";

  @property()
  status: "ok" | "failed" | null;

  @property({ type: Boolean })
  saveDisabled: boolean;

  @property({ type: Boolean })
  wantErrCheckStatus: boolean;

  @event({ type: "button.click" })
  private _buttonClickEmitter: EventEmitter<{ action: string }>;

  @event({ type: "want.error.check" })
  wantErrorCheck: EventEmitter<boolean>;

  private _handleButtonClick = (detail: { action: string }): void => {
    this._buttonClickEmitter.emit(detail);
  };

  private _handleCheckboxCheck = (checked: boolean): void => {
    this.wantErrorCheck.emit(checked);
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
          <FunctionDebuggerToolbarV2
            type={this.type}
            status={this.status}
            wantErrCheckStatus={this.wantErrCheckStatus}
            saveDisabled={this.saveDisabled}
            onButtonClick={this._handleButtonClick}
            onCheckboxCheck={this._handleCheckboxCheck}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.function-debugger-toolbar-v2",
  FunctionDebuggerToolbarV2Element
);
