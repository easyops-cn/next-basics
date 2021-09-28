import React, { createRef } from "react";
import { mount } from "enzyme";
import { DebuggerStore, FunctionDebuggerStore } from "./FunctionDebuggerStore";
import { act } from "react-dom/test-utils";

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
    };
    const wrapper = mount(
      <FunctionDebuggerStore ref={storeRef} {...handlers} />
    );
    const expectRestHandlersNotBeCalled = (
      restHandlers: Partial<typeof handlers>,
      desc?: string
    ): void => {
      let index = 0;
      for (const handler of Object.values(restHandlers)) {
        // console.log(desc, index, (handler as jest.Mock).mock.calls[0]);
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
          testMatched: null,
          testModified: false,
          testReceived: null,
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
      expectRestHandlersNotBeCalled(restHandlers, "run");
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
      expectRestHandlersNotBeCalled(restHandlers, "run");
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
      expectRestHandlersNotBeCalled(restHandlers, "run");
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

      expectRestHandlersNotBeCalled(restHandlers, "initFunction 3rd");
    }

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
      storeRef.current.runAllTests();
    });
    expect(storeRef.current.getFunctionDataToSave()).toEqual({
      error: "There are 2 tests failed!",
    });

    wrapper.unmount();
  });
});
