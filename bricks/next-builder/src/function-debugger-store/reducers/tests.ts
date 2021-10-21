import { Reducer } from "react";
import {
  processSerializableValue,
  formatSerializableValue,
} from "../processors";
import {
  DebuggerAction,
  DebuggerStateTestCase,
  FunctionTestCase,
} from "./interfaces";

export const tests: Reducer<DebuggerStateTestCase[], DebuggerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "initFunction":
      return (action.originalFunction.tests ?? []).map(initTestCase);
    case "updateSource":
    case "updateTypescript":
      return state.map((item) => ({
        ...item,
        testReceived: null,
        testMatched: null,
        testUpdatable: false,
      }));
    case "saveDebugAsTest":
      return [
        ...state,
        {
          input: action.debugInput.raw,
          output: action.debugOutput.raw,
          testInput: {
            ...action.debugInput,
            functionName: undefined,
            userInput: undefined,
          },
          testExpect: action.debugOutput,
          testReceived: action.debugOutput,
          testMatched: true,
          testModified: true,
          testUpdatable: false,
        },
      ];
    case "addTest": {
      const input = "[\n  \n]";
      const output = "undefined";
      return [
        ...state,
        {
          input,
          output,
          testInput: processSerializableValue(input),
          testExpect: processSerializableValue(output),
          testReceived: null,
          testMatched: null,
          testModified: true,
          testUpdatable: false,
        },
      ];
    }
    case "switchTab":
      return state.map((item) => {
        return item.testInput.userInput
          ? {
              ...item,
              testInput: {
                ...item.testInput,
                userInput: undefined,
              },
            }
          : item;
      });
    case "updateTestInput":
      return state.map((item, index) =>
        index === action.activeTestIndex
          ? {
              ...item,
              input: action.input,
              testInput: {
                ...item.testInput,
                ...processSerializableValue(action.input),
                userInput: true,
              },
              testReceived: null,
              testMatched: null,
              testModified: true,
              testUpdatable: false,
            }
          : item
      );
    case "testReturn":
      return state.map((item, index) =>
        index === action.activeTestIndex
          ? {
              ...item,
              testReceived: action.output,
              testMatched:
                action.output.ok && action.output.raw === item.testExpect.raw,
              testUpdatable:
                action.output.ok && action.output.raw !== item.testExpect.raw,
            }
          : item
      );
    case "updateTestOutput":
      return state.map((item, index) => {
        if (index !== action.activeTestIndex) {
          return item;
        }
        // Format test input when saving test.
        const testInput = formatSerializableValue(item.testInput);
        return {
          ...item,
          input: testInput.raw,
          output: item.testReceived.raw,
          testInput,
          testExpect: item.testReceived,
          testMatched: true,
          testModified: true,
          testUpdatable: false,
        };
      });
    case "allTestsReturn":
      return state.map((item, index) => {
        const output = action.outputs[index];
        return {
          ...item,
          testReceived: output,
          testMatched: output.ok && output.raw === item.testExpect.raw,
          testUpdatable: output.ok && output.raw !== item.testExpect.raw,
        };
      });
    default:
      return state;
  }
};

function initTestCase(test: FunctionTestCase): DebuggerStateTestCase {
  return {
    ...test,
    testInput: processSerializableValue(test.input),
    testExpect: processSerializableValue(test.output),
    testReceived: null,
    testMatched: null,
    testModified: false,
    testUpdatable: false,
  };
}
