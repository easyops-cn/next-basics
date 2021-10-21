import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { FunctionDebuggerStatusbar } from "./FunctionDebuggerStatusbar";
import {
  DebuggerStateFunctionCoverageWhichMaybeFailed,
  TestStats,
} from "../function-debugger-store/reducers/interfaces";

/**
 * @id next-builder.function-debugger-statusbar
 * @author Steve
 * @history
 * 1.x.0: 新增构件 `next-builder.function-debugger-statusbar`
 * @docKind brick
 * @noInheritDoc
 */
export class FunctionDebuggerStatusbarElement extends UpdatingElement {
  @property({ attribute: false })
  coverage: DebuggerStateFunctionCoverageWhichMaybeFailed;

  @property({ attribute: false })
  testStats: TestStats;

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
          <FunctionDebuggerStatusbar
            coverage={this.coverage}
            testStats={this.testStats}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.function-debugger-statusbar",
  FunctionDebuggerStatusbarElement
);
