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
import {
  DebuggerStore,
  FunctionDataToSave,
  FunctionDebuggerStore,
} from "./FunctionDebuggerStore";
import {
  DebuggerActionInitFunction,
  DebuggerStateActiveTab,
  DebuggerStateDebugInput,
  DebuggerStateDebugOutput,
  DebuggerStateFunctionCoverageWhichMaybeFailed,
  DebuggerStateOriginalFunction,
  DebuggerStateTestCase,
  DebuggerStateTestExpect,
  DebuggerStateTestInput,
} from "./reducers/interfaces";

/**
 * @id next-builder.function-debugger-store
 * @author Steve
 * @history
 * 1.x.0: 新增构件 `next-builder.function-debugger-store`
 * @docKind brick
 * @noInheritDoc
 */
export class FunctionDebuggerStoreElement extends UpdatingElement {
  /**
   * @kind number
   * @description Run tests automatically in milliseconds.
   */
  @property({ type: Number })
  runTestsAutomaticallyTimeout: number;

  @method()
  updateSource(source: string): void {
    this._storeRef.current.dispatch({
      type: "updateSource",
      source,
    });
  }

  @method()
  updateTypescript(typescript: boolean): void {
    this._storeRef.current.dispatch({
      type: "updateTypescript",
      typescript,
    });
  }

  @method()
  initFunction(data: Omit<DebuggerActionInitFunction, "type">): void {
    this._storeRef.current.initFunction(data);
  }

  @method()
  switchTab(tab: string): void {
    this._storeRef.current.dispatch({
      type: "switchTab",
      tab,
    });
  }

  @method()
  updateDebugInput(input: string): void {
    this._storeRef.current.dispatch({
      type: "updateDebugInput",
      input,
    });
  }

  @method()
  run(): void {
    this._storeRef.current.run();
  }

  @method()
  saveDebugAsTest(): void {
    this._storeRef.current.saveDebugAsTest();
  }

  @method()
  saveTest(): void {
    this._storeRef.current.saveTest();
  }

  @method()
  updateTestInput(input: string): void {
    this._storeRef.current.updateTestInput(input);
  }

  @method()
  runAllTests(): void {
    this._storeRef.current.runAllTests();
  }

  @method()
  getFunctionDataToSave(): Promise<FunctionDataToSave> {
    const store = this._storeRef.current;
    store.runAllTests();
    return Promise.resolve().then(() =>
      this._storeRef.current.getFunctionDataToSave()
    );
  }

  @event({ type: "activeTab.change" })
  private _activeTabChangeEmitter: EventEmitter<DebuggerStateActiveTab>;

  @event({ type: "originalFunction.change" })
  private _originalFunctionChangeEmitter: EventEmitter<DebuggerStateOriginalFunction>;

  @event({ type: "function.modified" })
  private _functionModifiedEmitter: EventEmitter<boolean>;

  @event({ type: "debugInput.change" })
  private _debugInputChangeEmitter: EventEmitter<DebuggerStateDebugInput>;

  @event({ type: "debugOutput.change" })
  private _debugOutputChangeEmitter: EventEmitter<DebuggerStateDebugOutput>;

  @event({ type: "tests.change" })
  private _testsChangeEmitter: EventEmitter<DebuggerStateTestCase[]>;

  @event({ type: "testInput.change" })
  private _testInputChangeEmitter: EventEmitter<DebuggerStateTestInput>;

  @event({ type: "testExpect.change" })
  private _testExpectChangeEmitter: EventEmitter<DebuggerStateTestExpect>;

  @event({ type: "testReceived.change" })
  private _testReceivedChangeEmitter: EventEmitter<DebuggerStateDebugOutput>;

  @event({ type: "testMatched.change" })
  private _testMatchedChangeEmitter: EventEmitter<boolean | null>;

  @event({ type: "testUpdatable.change" })
  private _testUpdatableChangeEmitter: EventEmitter<boolean>;

  @event({ type: "something.modified" })
  private _somethingModifiedEmitter: EventEmitter<boolean>;

  @event({ type: "coverage.change" })
  private _coverageChangeEmitter: EventEmitter<DebuggerStateFunctionCoverageWhichMaybeFailed>;

  private _handleActiveTabChange = (
    activeTab: DebuggerStateActiveTab
  ): void => {
    this._activeTabChangeEmitter.emit(activeTab);
  };

  private _handleOriginalFunctionChangeEmitterbChange = (
    originalFunction: DebuggerStateOriginalFunction
  ): void => {
    this._originalFunctionChangeEmitter.emit(originalFunction);
  };

  private _handleFunctionModified = (modified: boolean): void => {
    this._functionModifiedEmitter.emit(modified);
  };

  private _handleDebugInputChange = (input: DebuggerStateDebugInput): void => {
    this._debugInputChangeEmitter.emit(input);
  };

  private _handleDebugOutputChange = (
    output: DebuggerStateDebugOutput
  ): void => {
    this._debugOutputChangeEmitter.emit(output);
  };

  private _handleTestsChange = (tests: DebuggerStateTestCase[]): void => {
    this._testsChangeEmitter.emit(tests);
  };

  private _handleTestInputChange = (
    testInput: DebuggerStateTestInput
  ): void => {
    this._testInputChangeEmitter.emit(testInput);
  };

  private _handleTestExpectChange = (
    testExpect: DebuggerStateTestExpect
  ): void => {
    this._testExpectChangeEmitter.emit(testExpect);
  };

  private _handleTestReceivedChange = (
    output: DebuggerStateDebugOutput
  ): void => {
    this._testReceivedChangeEmitter.emit(output);
  };

  private _handleTestMatchedChange = (matched: boolean | null): void => {
    this._testMatchedChangeEmitter.emit(matched);
  };

  private _handleTestUpdatableChange = (updatable: boolean): void => {
    this._testUpdatableChangeEmitter.emit(updatable);
  };

  private _handleSomethingModified = (modified: boolean): void => {
    this._somethingModifiedEmitter.emit(modified);
  };

  private _handleCoverageChange = (coverage: any): void => {
    this._coverageChangeEmitter.emit(coverage);
  };

  private _storeRef = createRef<DebuggerStore>();

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
          <FunctionDebuggerStore
            ref={this._storeRef}
            runTestsAutomaticallyTimeout={this.runTestsAutomaticallyTimeout}
            onActiveTabChange={this._handleActiveTabChange}
            onOriginalFunctionChange={
              this._handleOriginalFunctionChangeEmitterbChange
            }
            onFunctionModified={this._handleFunctionModified}
            onDebugInputChange={this._handleDebugInputChange}
            onDebugOutputChange={this._handleDebugOutputChange}
            onTestsChange={this._handleTestsChange}
            onTestInputChange={this._handleTestInputChange}
            onTestExpectChange={this._handleTestExpectChange}
            onTestReceivedChange={this._handleTestReceivedChange}
            onTestMatchedChange={this._handleTestMatchedChange}
            onTestUpdatableChange={this._handleTestUpdatableChange}
            onSomethingModified={this._handleSomethingModified}
            onCoverageChange={this._handleCoverageChange}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.function-debugger-store",
  FunctionDebuggerStoreElement
);
