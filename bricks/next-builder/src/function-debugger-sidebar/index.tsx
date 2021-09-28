import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { FunctionDebuggerSidebar } from "./FunctionDebuggerSidebar";
import { DebuggerStateTestCase } from "../function-debugger-store/reducers/interfaces";

/**
 * @id next-builder.function-debugger-sidebar
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.function-debugger-sidebar`
 * @docKind brick
 * @noInheritDoc
 */
export class FunctionsSidebarElement extends UpdatingElement {
  @property()
  functionName: string;

  @property({ type: Boolean })
  functionModified: boolean;

  @property()
  activeTab: string;

  @property({ attribute: false })
  tests: DebuggerStateTestCase[];

  @event({ type: "tab.switch" })
  private _activeTabSwitchEmitter: EventEmitter<string>;

  @event({ type: "tests.run" })
  private _runAllTestsEmitter: EventEmitter<void>;

  private _handleActiveTabSwitch = (tab: string): void => {
    this._activeTabSwitchEmitter.emit(tab);
  };

  private _handleRunAllTests = (): void => {
    this._runAllTestsEmitter.emit();
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
          <FunctionDebuggerSidebar
            functionName={this.functionName}
            functionModified={this.functionModified}
            activeTab={this.activeTab}
            tests={this.tests}
            onActiveTabSwitch={this._handleActiveTabSwitch}
            onRunAllTests={this._handleRunAllTests}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.function-debugger-sidebar",
  FunctionsSidebarElement
);
