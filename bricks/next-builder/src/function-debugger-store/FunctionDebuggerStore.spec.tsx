import React, { createRef } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { DebuggerStore, FunctionDebuggerStore } from "./FunctionDebuggerStore";

describe("FunctionDebuggerStore", () => {
  it("should work", () => {
    const storeRef = createRef<DebuggerStore>();
    const handlers = {
      onActiveTabChange: jest.fn(),
      onOriginalFunctionChange: jest.fn(),
      onFunctionModified: jest.fn(),
      onDebugInputChange: jest.fn(),
      onDebugOutputChange: jest.fn(),
      onTestsChange: jest.fn(),
      onTestInputChange: jest.fn(),
      onTestExpectChange: jest.fn(),
      onTestReceivedChange: jest.fn(),
      onTestMatchedChange: jest.fn(),
      onTestUpdatableChange: jest.fn(),
      onSomethingModified: jest.fn(),
      onTestStatsChange: jest.fn(),
      onCoverageChange: jest.fn(),
    };
    const wrapper = mount(
      <FunctionDebuggerStore
        ref={storeRef}
        {...handlers}
        runTestsAutomaticallyTimeout={1000}
      />
    );
    const expectRestHandlersNotBeCalled = (
      restHandlers: Partial<typeof handlers>,
      desc?: string
    ): void => {
      let index = 0;
      for (const [name, handler] of Object.entries(restHandlers)) {
        const calls = (handler as jest.Mock).mock.calls;
        if (calls.length > 0) {
          // eslint-disable-next-line no-console
          console.error(desc, name, index, calls[0]);
        }
        expect(handler).toBeCalledTimes(0);
        index += 1;
      }
    };

    // `initFunction`
    {
      act(() => {
        storeRef.current.initFunction({
          functionName: "myFunc",
          functions: [
            {
              name: "hisFunc",
              source: "function hisFunc() { throw 'oops' }",
            },
            {
              name: "myFunc",
              source: "function myFunc() { return 'my' }",
              typescript: false,
              tests: [
                {
                  input: "[]",
                  output: '"my"',
                },
              ],
            },
          ],
          initialFunction: null,
        });
      });

      const {
        onActiveTabChange,
        onOriginalFunctionChange,
        onDebugInputChange,
        onDebugOutputChange,
        onTestsChange,
        ...restHandlers
      } = handlers;

      expect(onActiveTabChange).toBeCalledTimes(1);
      expect(onActiveTabChange).toBeCalledWith({
        group: "function",
        value: "function",
      });

      expect(onOriginalFunctionChange).toBeCalledTimes(1);
      expect(onOriginalFunctionChange).toBeCalledWith({
        name: "myFunc",
        source: "function myFunc() { return 'my' }",
        typescript: false,
        tests: [
          {
            input: "[]",
            output: '"my"',
          },
        ],
      });

      expect(onDebugInputChange).toBeCalledTimes(1);
      expect(onDebugInputChange).toBeCalledWith({
        functionName: "myFunc",
        raw: "[\n  \n]",
        ok: true,
      });

      expect(onDebugOutputChange).toBeCalledTimes(1);
      expect(onDebugOutputChange).toBeCalledWith(null);

      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        {
          input: "[]",
          output: '"my"',
          testInput: {
            ok: true,
            raw: "[]",
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: null,
          testModified: false,
          testReceived: null,
          testUpdatable: false,
        },
      ]);

      expectRestHandlersNotBeCalled(restHandlers, "initFunction");
    }

    {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(handlers.onCoverageChange).toBeCalledTimes(1);
      expect(handlers.onCoverageChange).toBeCalledWith({
        branches: {
          covered: 0,
          total: 0,
          uncovered: [],
        },
        functions: {
          covered: 1,
          total: 1,
          uncovered: [],
        },
        lines: {
          counts: new Map([
            [
              1,
              {
                count: 1,
                startColumn: 21,
                endColumn: 32,
                isWholeLine: false,
              },
            ],
          ]),
          covered: 1,
          total: 1,
        },
        statements: {
          covered: 1,
          total: 1,
          uncovered: [],
        },
      });
    }

    // "switchTab"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.dispatch({
          type: "switchTab",
          tab: "debug",
        });
      });
      const { onActiveTabChange, onTestsChange, ...restHandlers } = handlers;
      expect(onActiveTabChange).toBeCalledTimes(1);
      expect(onActiveTabChange).toBeCalledWith({
        value: "debug",
        group: "debug",
        index: undefined,
      });
      expect(onTestsChange).toBeCalledWith([
        {
          input: "[]",
          output: '"my"',
          testInput: {
            ok: true,
            raw: "[]",
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: true,
          testModified: false,
          testReceived: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testUpdatable: false,
        },
      ]);
      expectRestHandlersNotBeCalled(restHandlers, "switchTab");
    }

    // "updateDebugInput"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.dispatch({
          type: "updateDebugInput",
          input: '["treasure"]',
        });
      });
      const { onDebugInputChange, ...restHandlers } = handlers;
      expect(onDebugInputChange).toBeCalledTimes(1);
      expect(onDebugInputChange).toBeCalledWith({
        functionName: "myFunc",
        ok: true,
        raw: '["treasure"]',
        error: undefined,
        userInput: true,
      });
      expectRestHandlersNotBeCalled(restHandlers, "updateDebugInput");
    }

    // "run"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.run();
      });
      const { onDebugOutputChange, ...restHandlers } = handlers;
      expect(onDebugOutputChange).toBeCalledTimes(1);
      expect(onDebugOutputChange).toBeCalledWith({
        ok: true,
        raw: '"my"',
        error: undefined,
      });
      expectRestHandlersNotBeCalled(restHandlers, "run");
    }

    // "saveDebugAsTest"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.saveDebugAsTest();
      });
      const {
        onActiveTabChange,
        onTestsChange,
        onTestInputChange,
        onTestExpectChange,
        onTestReceivedChange,
        onTestMatchedChange,
        onSomethingModified,
        onTestStatsChange,
        ...restHandlers
      } = handlers;
      expect(onActiveTabChange).toBeCalledTimes(1);
      expect(onActiveTabChange).toBeCalledWith({
        value: "test:1",
        group: "test",
        index: 1,
      });
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestInputChange).toBeCalledTimes(1);
      expect(onTestInputChange).toBeCalledWith({
        raw: '[\n  "treasure"\n]',
        ok: true,
        error: undefined,
      });
      expect(onTestExpectChange).toBeCalledTimes(1);
      expect(onTestExpectChange).toBeCalledWith({
        ok: true,
        raw: '"my"',
        error: undefined,
      });
      expect(onTestReceivedChange).toBeCalledTimes(1);
      expect(onTestReceivedChange).toBeCalledWith({
        ok: true,
        raw: '"my"',
        error: undefined,
      });
      expect(onTestMatchedChange).toBeCalledTimes(1);
      expect(onTestMatchedChange).toBeCalledWith(true);
      expect(onSomethingModified).toBeCalledTimes(1);
      expect(onSomethingModified).toBeCalledWith(true);
      expect(onTestStatsChange).toBeCalledTimes(1);
      expect(onTestStatsChange).toBeCalledWith({
        total: 2,
        failed: 0,
      });
      expectRestHandlersNotBeCalled(restHandlers, "saveDebugAsTest");
    }

    // "updateTypescript"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.dispatch({
          type: "updateTypescript",
          typescript: true,
        });
      });
      const {
        onFunctionModified,
        onTestsChange,
        onDebugOutputChange,
        onTestReceivedChange,
        onTestMatchedChange,
        onTestStatsChange,
        onCoverageChange,
        ...restHandlers
      } = handlers;
      expect(onFunctionModified).toBeCalledTimes(1);
      expect(onFunctionModified).toBeCalledWith(true);
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        {
          input: "[]",
          output: '"my"',
          testInput: {
            ok: true,
            raw: "[]",
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: null,
          testModified: false,
          testReceived: null,
          testUpdatable: false,
        },
        {
          input: '[\n  "treasure"\n]',
          output: '"my"',
          testInput: {
            ok: true,
            raw: '[\n  "treasure"\n]',
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: null,
          testModified: true,
          testReceived: null,
          testUpdatable: false,
        },
      ]);
      expect(onDebugOutputChange).toBeCalledTimes(1);
      expect(onDebugOutputChange).toBeCalledWith(null);
      expect(onTestReceivedChange).toBeCalledTimes(1);
      expect(onTestReceivedChange).toBeCalledWith(null);
      expect(onTestMatchedChange).toBeCalledTimes(1);
      expect(onTestMatchedChange).toBeCalledWith(null);
      expect(onTestStatsChange).toBeCalledTimes(1);
      expect(onTestStatsChange).toBeCalledWith(undefined);
      expect(onCoverageChange).toBeCalledTimes(1);
      expect(onCoverageChange).toBeCalledWith(undefined);
      expectRestHandlersNotBeCalled(restHandlers, "updateTypescript");
    }

    // "updateSource"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.dispatch({
          type: "updateSource",
          source:
            "function myFunc(thing: string): string { return `my ${thing}` }",
        });
      });
      const { onTestsChange, ...restHandlers } = handlers;
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        {
          input: "[]",
          output: '"my"',
          testInput: {
            ok: true,
            raw: "[]",
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: null,
          testModified: false,
          testReceived: null,
          testUpdatable: false,
        },
        {
          input: '[\n  "treasure"\n]',
          output: '"my"',
          testInput: {
            ok: true,
            raw: '[\n  "treasure"\n]',
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: null,
          testModified: true,
          testReceived: null,
          testUpdatable: false,
        },
      ]);
      expectRestHandlersNotBeCalled(restHandlers, "updateSource");
    }

    // "run"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.run();
      });
      const {
        onTestsChange,
        onTestReceivedChange,
        onTestMatchedChange,
        onTestUpdatableChange,
        ...restHandlers
      } = handlers;
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        {
          input: "[]",
          output: '"my"',
          testInput: {
            ok: true,
            raw: "[]",
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: null,
          testModified: false,
          testReceived: null,
          testUpdatable: false,
        },
        {
          input: '[\n  "treasure"\n]',
          output: '"my"',
          testInput: {
            ok: true,
            raw: '[\n  "treasure"\n]',
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: false,
          testModified: true,
          testReceived: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testUpdatable: true,
        },
      ]);
      expect(onTestReceivedChange).toBeCalledTimes(1);
      expect(onTestReceivedChange).toBeCalledWith({
        ok: true,
        raw: '"my treasure"',
        error: undefined,
      });
      expect(onTestMatchedChange).toBeCalledTimes(1);
      expect(onTestMatchedChange).toBeCalledWith(false);
      expect(onTestUpdatableChange).toBeCalledTimes(1);
      expect(onTestUpdatableChange).toBeCalledWith(true);
      expectRestHandlersNotBeCalled(restHandlers, "run");
    }

    // "saveTest"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.saveTest();
      });
      const {
        onTestsChange,
        onTestInputChange,
        onTestExpectChange,
        onTestMatchedChange,
        onTestUpdatableChange,
        ...restHandlers
      } = handlers;
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        {
          input: "[]",
          output: '"my"',
          testInput: {
            ok: true,
            raw: "[]",
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: null,
          testModified: false,
          testReceived: null,
          testUpdatable: false,
        },
        {
          input: '[\n  "treasure"\n]',
          output: '"my treasure"',
          testInput: {
            ok: true,
            raw: '[\n  "treasure"\n]',
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testMatched: true,
          testModified: true,
          testReceived: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testUpdatable: false,
        },
      ]);
      expect(onTestInputChange).toBeCalledTimes(1);
      expect(onTestInputChange).toBeCalledWith({
        ok: true,
        raw: '[\n  "treasure"\n]',
        error: undefined,
      });
      expect(onTestExpectChange).toBeCalledTimes(1);
      expect(onTestExpectChange).toBeCalledWith({
        ok: true,
        raw: '"my treasure"',
        error: undefined,
      });
      expect(onTestMatchedChange).toBeCalledTimes(1);
      expect(onTestMatchedChange).toBeCalledWith(true);
      expect(onTestUpdatableChange).toBeCalledTimes(1);
      expect(onTestUpdatableChange).toBeCalledWith(false);
      expectRestHandlersNotBeCalled(restHandlers, "saveTest");
    }

    // Switch tab to the first test case.
    act(() => {
      storeRef.current.dispatch({
        type: "switchTab",
        tab: "test:0",
      });
    });

    // "updateTestInput" (in invalid JSON)
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.updateTestInput("[,]");
      });
      const { onTestsChange, onTestInputChange, ...restHandlers } = handlers;
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        {
          input: "[,]",
          output: '"my"',
          testInput: {
            ok: false,
            raw: "[,]",
            error: "SyntaxError: Unexpected token , in JSON at position 1",
            userInput: true,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: null,
          testModified: true,
          testReceived: null,
          testUpdatable: false,
        },
        {
          input: '[\n  "treasure"\n]',
          output: '"my treasure"',
          testInput: {
            ok: true,
            raw: '[\n  "treasure"\n]',
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testMatched: true,
          testModified: true,
          testReceived: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testUpdatable: false,
        },
      ]);
      expect(onTestInputChange).toBeCalledTimes(1);
      expect(onTestInputChange).toBeCalledWith({
        ok: false,
        raw: "[,]",
        error: "SyntaxError: Unexpected token , in JSON at position 1",
        userInput: true,
      });
      expectRestHandlersNotBeCalled(
        restHandlers,
        "updateTestInput in invalid JSON"
      );
    }

    // "run" against invalid input
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.run();
      });
      const {
        onTestsChange,
        onTestReceivedChange,
        onTestMatchedChange,
        ...restHandlers
      } = handlers;
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        {
          input: "[,]",
          output: '"my"',
          testInput: {
            ok: false,
            raw: "[,]",
            error: "SyntaxError: Unexpected token , in JSON at position 1",
            userInput: true,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: false,
          testModified: true,
          testReceived: {
            ok: false,
            raw: undefined,
            error: "SyntaxError: Unexpected token , in JSON at position 1",
          },
          testUpdatable: false,
        },
        {
          input: '[\n  "treasure"\n]',
          output: '"my treasure"',
          testInput: {
            ok: true,
            raw: '[\n  "treasure"\n]',
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testMatched: true,
          testModified: true,
          testReceived: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testUpdatable: false,
        },
      ]);
      expect(onTestReceivedChange).toBeCalledTimes(1);
      expect(onTestReceivedChange).toBeCalledWith({
        ok: false,
        raw: undefined,
        error: "SyntaxError: Unexpected token , in JSON at position 1",
      });
      expect(onTestMatchedChange).toBeCalledTimes(1);
      expect(onTestMatchedChange).toBeCalledWith(false);
      expectRestHandlersNotBeCalled(restHandlers, "run against invalid");
    }

    // "updateTestInput"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.updateTestInput('["pleasure"]');
      });
      const {
        onTestsChange,
        onTestInputChange,
        onTestReceivedChange,
        onTestMatchedChange,
        ...restHandlers
      } = handlers;
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        {
          input: '["pleasure"]',
          output: '"my"',
          testInput: {
            ok: true,
            raw: '["pleasure"]',
            error: undefined,
            userInput: true,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: null,
          testModified: true,
          testReceived: null,
          testUpdatable: false,
        },
        {
          input: '[\n  "treasure"\n]',
          output: '"my treasure"',
          testInput: {
            ok: true,
            raw: '[\n  "treasure"\n]',
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testMatched: true,
          testModified: true,
          testReceived: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testUpdatable: false,
        },
      ]);
      expect(onTestInputChange).toBeCalledTimes(1);
      expect(onTestInputChange).toBeCalledWith({
        ok: true,
        raw: '["pleasure"]',
        error: undefined,
        userInput: true,
      });
      expect(onTestReceivedChange).toBeCalledTimes(1);
      expect(onTestReceivedChange).toBeCalledWith(null);
      expect(onTestMatchedChange).toBeCalledTimes(1);
      expect(onTestMatchedChange).toBeCalledWith(null);
      expectRestHandlersNotBeCalled(restHandlers, "updateTestInput");
    }

    // "runAllTests"
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.runAllTests();
      });
      const {
        onTestsChange,
        onTestReceivedChange,
        onTestMatchedChange,
        onTestUpdatableChange,
        onTestStatsChange,
        onCoverageChange,
        ...restHandlers
      } = handlers;
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        {
          input: '["pleasure"]',
          output: '"my"',
          testInput: {
            ok: true,
            raw: '["pleasure"]',
            error: undefined,
            userInput: true,
          },
          testExpect: {
            ok: true,
            raw: '"my"',
            error: undefined,
          },
          testMatched: false,
          testModified: true,
          testReceived: {
            ok: true,
            raw: '"my pleasure"',
            error: undefined,
          },
          testUpdatable: true,
        },
        {
          input: '[\n  "treasure"\n]',
          output: '"my treasure"',
          testInput: {
            ok: true,
            raw: '[\n  "treasure"\n]',
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testMatched: true,
          testModified: true,
          testReceived: {
            ok: true,
            raw: '"my treasure"',
            error: undefined,
          },
          testUpdatable: false,
        },
      ]);
      expect(onTestReceivedChange).toBeCalledTimes(1);
      expect(onTestReceivedChange).toBeCalledWith({
        ok: true,
        raw: '"my pleasure"',
        error: undefined,
      });
      expect(onTestMatchedChange).toBeCalledTimes(1);
      expect(onTestMatchedChange).toBeCalledWith(false);
      expect(onTestUpdatableChange).toBeCalledTimes(1);
      expect(onTestUpdatableChange).toBeCalledWith(true);
      expect(onTestStatsChange).toBeCalledTimes(1);
      expect(onTestStatsChange).toBeCalledWith({
        total: 2,
        failed: 1,
      });
      expect(onCoverageChange).toBeCalledTimes(1);
      expect(onCoverageChange).toBeCalledWith({
        branches: {
          covered: 0,
          total: 0,
          uncovered: [],
        },
        functions: {
          covered: 1,
          total: 1,
          uncovered: [],
        },
        lines: {
          counts: new Map([
            [
              1,
              {
                count: 2,
                startColumn: 42,
                endColumn: 62,
                isWholeLine: false,
              },
            ],
          ]),
          covered: 1,
          total: 1,
        },
        statements: {
          covered: 1,
          total: 1,
          uncovered: [],
        },
      });
      expectRestHandlersNotBeCalled(restHandlers, "runAllTests");
    }

    expect(storeRef.current.getFunctionDataToSave()).toEqual({
      error: "There is a test failed!",
    });

    act(() => {
      storeRef.current.saveTest();
    });

    expect(storeRef.current.getFunctionDataToSave()).toEqual({
      data: {
        name: "myFunc",
        source:
          "function myFunc(thing: string): string { return `my ${thing}` }",
        typescript: true,
        tests: [
          {
            input: '[\n  "pleasure"\n]',
            output: '"my pleasure"',
          },
          {
            input: '[\n  "treasure"\n]',
            output: '"my treasure"',
          },
        ],
      },
    });

    // `initFunction` ("hisFunc")
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.initFunction({
          functionName: "hisFunc",
          functions: [
            {
              name: "myFunc",
              source: "function myFunc() {  }",
            },
          ],
          initialFunction: {
            name: "hisFunc",
            source: "function hisFunc() { throw 'oops' }",
            typescript: false,
          },
        });
      });

      const {
        onActiveTabChange,
        onOriginalFunctionChange,
        onFunctionModified,
        onDebugInputChange,
        onTestsChange,
        onTestInputChange,
        onTestExpectChange,
        onTestReceivedChange,
        onTestMatchedChange,
        onSomethingModified,
        onTestStatsChange,
        onCoverageChange,
        ...restHandlers
      } = handlers;

      expect(onActiveTabChange).toBeCalledTimes(1);
      expect(onActiveTabChange).toBeCalledWith({
        group: "function",
        value: "function",
      });
      expect(onOriginalFunctionChange).toBeCalledTimes(1);
      expect(onOriginalFunctionChange).toBeCalledWith({
        name: "hisFunc",
        source: "function hisFunc() { throw 'oops' }",
        typescript: false,
      });
      expect(onDebugInputChange).toBeCalledTimes(1);
      expect(onDebugInputChange).toBeCalledWith({
        functionName: "hisFunc",
        raw: "[\n  \n]",
        ok: true,
      });
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([]);
      expect(onFunctionModified).toBeCalledTimes(1);
      expect(onFunctionModified).toBeCalledWith(false);
      expect(onSomethingModified).toBeCalledTimes(1);
      expect(onSomethingModified).toBeCalledWith(false);
      expect(onTestStatsChange).toBeCalledTimes(1);
      expect(onTestStatsChange).toBeCalledWith(undefined);
      expect(onCoverageChange).toBeCalledTimes(1);
      expect(onCoverageChange).toBeCalledWith(undefined);

      expectRestHandlersNotBeCalled(restHandlers, "initFunction 2nd");

      for (const handler of [
        onTestInputChange,
        onTestExpectChange,
        onTestReceivedChange,
        onTestMatchedChange,
      ]) {
        expect(handler).toBeCalledTimes(1);
        expect(handler).toBeCalledWith(null);
      }
    }

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // `initFunction` (repeat "hisFunc" with new source)
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.initFunction({
          functionName: "hisFunc",
          functions: [
            {
              name: "hisFunc",
              source: "function hisFunc(fail) { if (fail) throw 'oops' }",
              typescript: false,
            },
          ],
          initialFunction: null,
        });
      });

      const {
        onActiveTabChange,
        onOriginalFunctionChange,
        onDebugInputChange,
        onTestsChange,
        onTestStatsChange,
        onCoverageChange,
        ...restHandlers
      } = handlers;

      expect(onActiveTabChange).toBeCalledTimes(1);
      expect(onActiveTabChange).toBeCalledWith({
        group: "function",
        value: "function",
      });
      expect(onOriginalFunctionChange).toBeCalledTimes(1);
      expect(onOriginalFunctionChange).toBeCalledWith({
        name: "hisFunc",
        source: "function hisFunc(fail) { if (fail) throw 'oops' }",
        typescript: false,
      });
      expect(onDebugInputChange).toBeCalledTimes(1);
      expect(onDebugInputChange).toBeCalledWith({
        functionName: "hisFunc",
        raw: "[\n  \n]",
        ok: true,
        userInput: false,
      });
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([]);
      expect(onTestStatsChange).toBeCalledTimes(1);
      expect(onTestStatsChange).toBeCalledWith(undefined);
      expect(onCoverageChange).toBeCalledTimes(1);
      expect(onCoverageChange).toBeCalledWith(undefined);

      expectRestHandlersNotBeCalled(restHandlers, "initFunction 3rd");
    }

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Switch to debug first.
    act(() => {
      storeRef.current.dispatch({
        type: "switchTab",
        tab: "debug",
      });
    });

    // Set input to `[true]`.
    act(() => {
      storeRef.current.dispatch({
        type: "updateDebugInput",
        input: "[true]",
      });
    });

    // "run" which will throw an error
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.run();
      });
      act(() => {
        // Saving will be ignored for failed tests.
        storeRef.current.saveDebugAsTest();
      });
      const { onDebugOutputChange, ...restHandlers } = handlers;
      expect(onDebugOutputChange).toBeCalledTimes(1);
      expect(onDebugOutputChange).toBeCalledWith({
        ok: false,
        raw: undefined,
        error: "oops",
      });
      expectRestHandlersNotBeCalled(restHandlers, "run which throws");
    }

    // Set input to `[]`.
    act(() => {
      storeRef.current.dispatch({
        type: "updateDebugInput",
        input: "[]",
      });
    });

    // "run" which will return undefined
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.run();
      });
      const { onDebugOutputChange, ...restHandlers } = handlers;
      expect(onDebugOutputChange).toBeCalledTimes(1);
      expect(onDebugOutputChange).toBeCalledWith({
        ok: true,
        raw: "undefined",
        error: undefined,
      });
      expectRestHandlersNotBeCalled(restHandlers, "run which returns");
    }

    // `initFunction` (repeat "hisFunc" with tests)
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.initFunction({
          functionName: "hisFunc",
          functions: [
            {
              name: "hisFunc",
              source: "function hisFunc(fail) { if (fail) throw 'oops' }",
              typescript: false,
              tests: [
                {
                  input: '["0"]',
                  output: "undefined",
                },
                {
                  input: "[-1]",
                  output: "undefined",
                },
              ],
            },
          ],
          initialFunction: null,
        });
      });
      expect(handlers.onTestsChange).toBeCalledTimes(1);
      expect(handlers.onTestsChange).toBeCalledWith([
        {
          input: '["0"]',
          output: "undefined",
          testExpect: {
            ok: true,
            raw: "undefined",
            error: undefined,
          },
          testInput: {
            ok: true,
            raw: '["0"]',
            error: undefined,
          },
          testMatched: null,
          testModified: false,
          testReceived: null,
          testUpdatable: false,
        },
        {
          input: "[-1]",
          output: "undefined",
          testExpect: {
            ok: true,
            raw: "undefined",
            error: undefined,
          },
          testInput: {
            ok: true,
            raw: "[-1]",
            error: undefined,
          },
          testMatched: null,
          testModified: false,
          testReceived: null,
          testUpdatable: false,
        },
      ]);
    }

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(storeRef.current.getFunctionDataToSave()).toEqual({
      error: "There are 2 tests failed!",
    });

    // Switch to first test first.
    act(() => {
      storeRef.current.dispatch({
        type: "switchTab",
        tab: "test:0",
      });
    });

    // `deleteTest`
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.deleteTest();
      });
      const {
        onActiveTabChange,
        onTestsChange,
        onTestInputChange,
        onTestExpectChange,
        onTestReceivedChange,
        onTestMatchedChange,
        onSomethingModified,
        onTestStatsChange,
        onCoverageChange,
        ...restHandlers
      } = handlers;
      expect(onActiveTabChange).toBeCalledTimes(1);
      expect(onActiveTabChange).toBeCalledWith({
        value: "function",
        group: "function",
      });
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        expect.objectContaining({ input: "[-1]" }),
      ]);
      expect(onTestInputChange).toBeCalledTimes(1);
      expect(onTestInputChange).toBeCalledWith(null);
      expect(onTestExpectChange).toBeCalledTimes(1);
      expect(onTestExpectChange).toBeCalledWith(null);
      expect(onTestReceivedChange).toBeCalledTimes(1);
      expect(onTestReceivedChange).toBeCalledWith(null);
      expect(onTestMatchedChange).toBeCalledTimes(1);
      expect(onTestMatchedChange).toBeCalledWith(null);
      expect(onSomethingModified).toBeCalledTimes(1);
      expect(onSomethingModified).toBeCalledWith(true);
      expect(onTestStatsChange).toBeCalledTimes(1);
      expect(onTestStatsChange).toBeCalledWith(undefined);
      expect(onCoverageChange).toBeCalledTimes(1);
      expect(onCoverageChange).toBeCalledWith(undefined);
      expectRestHandlersNotBeCalled(restHandlers, "delete test");
    }

    // `addTest`
    {
      jest.clearAllMocks();
      act(() => {
        storeRef.current.addTest();
      });
      const {
        onActiveTabChange,
        onTestsChange,
        onTestInputChange,
        onTestExpectChange,
        ...restHandlers
      } = handlers;
      expect(onActiveTabChange).toBeCalledTimes(1);
      expect(onActiveTabChange).toBeCalledWith({
        value: "test:1",
        group: "test",
        index: 1,
      });
      expect(onTestsChange).toBeCalledTimes(1);
      expect(onTestsChange).toBeCalledWith([
        expect.anything(),
        {
          input: "[\n  \n]",
          output: "undefined",
          testInput: {
            ok: true,
            raw: "[\n  \n]",
            error: undefined,
          },
          testExpect: {
            ok: true,
            raw: "undefined",
            error: undefined,
          },
          testReceived: null,
          testMatched: null,
          testModified: true,
          testUpdatable: false,
        },
      ]);
      expect(onTestInputChange).toBeCalledTimes(1);
      expect(onTestInputChange).toBeCalledWith({
        ok: true,
        raw: "[\n  \n]",
        error: undefined,
      });
      expect(onTestExpectChange).toBeCalledTimes(1);
      expect(onTestExpectChange).toBeCalledWith({
        ok: true,
        raw: "undefined",
        error: undefined,
      });
      expectRestHandlersNotBeCalled(restHandlers, "add test");
    }

    wrapper.unmount();
  });

  it("should collect failed coverage", () => {
    const storeRef = createRef<DebuggerStore>();
    const onCoverageChange = jest.fn();
    const wrapper = mount(
      <FunctionDebuggerStore
        ref={storeRef}
        onCoverageChange={onCoverageChange}
      />
    );
    act(() => {
      storeRef.current.initFunction({
        functionName: "myFunc",
        functions: [
          {
            name: "myFunc",
            source: `
              function myFunc() {
                =>
              }
            `,
            tests: [
              {
                input: "[]",
                output: "undefined",
              },
            ],
          },
        ],
        initialFunction: null,
      });
    });
    act(() => {
      storeRef.current.runAllTests();
    });
    expect(onCoverageChange).toBeCalledTimes(1);
    expect(onCoverageChange).toBeCalledWith({
      status: "failed",
      error: "SyntaxError: Unexpected token (3:16)",
    });
    wrapper.unmount();
  });

  it("should collect coverage", () => {
    const storeRef = createRef<DebuggerStore>();
    const onCoverageChange = jest.fn();
    const wrapper = mount(
      <FunctionDebuggerStore
        ref={storeRef}
        onCoverageChange={onCoverageChange}
      />
    );
    act(() => {
      storeRef.current.initFunction({
        functionName: "myFunc",
        functions: [
          {
            name: "myFunc",
            source: `
              function myFunc(type) {
                let a, b;
                const z = 'Z';
                switch (type) {
                  case "ArrowFunctionExpression":
                    a = () => 1;
                    b = () => 2;
                    a();
                    break;
                  case "AssignmentPattern":
                    [a = 2, b = 3] = [4];
                    break;
                  case "ConditionalExpression":
                    a = true ? 1 : 0;
                    b = false ? 0 : 1;
                    break;
                  case "IfStatement":
                    if (true) {
                      a = 1;
                    }
                    if (false) {
                      b = 1;
                    }
                    break;
                  case "LogicalExpression":
                    a = true && 1;
                    b = true || 2;
                    break;
                  case "TryStatement":
                    try {
                      ;
                    } catch (e) {
                      a = 2;
                    }
                    try {
                      throw 'oops';
                    } catch (e) {
                      b = 3;
                    }
                    break;
                  case "NotExisted":
                    return;
                }
              }
            `,
            typescript: false,
            tests: [
              {
                input: '["ArrowFunctionExpression"]',
                output: "undefined",
              },
              {
                input: '["AssignmentPattern"]',
                output: "undefined",
              },
              {
                input: '["ConditionalExpression"]',
                output: "undefined",
              },
              {
                input: '["IfStatement"]',
                output: "undefined",
              },
              {
                input: '["LogicalExpression"]',
                output: "undefined",
              },
              {
                input: '["TryStatement"]',
                output: "undefined",
              },
            ],
          },
        ],
        initialFunction: null,
      });
    });
    act(() => {
      storeRef.current.runAllTests();
    });
    expect(onCoverageChange).toBeCalledTimes(1);
    expect(onCoverageChange).toHaveBeenNthCalledWith(1, {
      statements: expect.objectContaining({
        covered: 24,
        total: 28,
      }),
      branches: expect.objectContaining({
        covered: 13,
        total: 21,
      }),
      functions: expect.objectContaining({
        covered: 2,
        total: 3,
      }),
      lines: expect.objectContaining({
        covered: 23,
        total: 26,
      }),
    });

    act(() => {
      storeRef.current.dispatch({
        type: "switchTab",
        tab: "test:2",
      });
    });
    act(() => {
      storeRef.current.updateTestInput('["NotExisted"]');
    });
    act(() => {
      storeRef.current.run();
    });
    act(() => {
      storeRef.current.saveTest();
    });
    act(() => {
      storeRef.current.runAllTests();
    });
    expect(onCoverageChange).toBeCalledTimes(2);
    expect(onCoverageChange).toHaveBeenNthCalledWith(2, {
      statements: expect.objectContaining({
        covered: 22,
        total: 28,
      }),
      branches: expect.objectContaining({
        covered: 11,
        total: 21,
      }),
      functions: expect.objectContaining({
        covered: 2,
        total: 3,
      }),
      lines: expect.objectContaining({
        covered: 21,
        total: 26,
      }),
    });

    wrapper.unmount();
  });
});
