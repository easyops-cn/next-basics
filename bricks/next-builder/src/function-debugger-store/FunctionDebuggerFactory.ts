import { StoryboardFunctionRegistryFactory } from "@next-core/brick-kit";
import { CoverageFactory } from "./CoverageFactory";
import { generalizedJsonParse } from "./processors";
import {
  FunctionDebugger,
  DebuggerStateDebugOutput,
  DebuggerStateDebugInput,
  FunctionCoverageWhichMaybeFailed,
} from "./reducers/interfaces";

export interface FunctionDebuggerWithCoverage extends FunctionDebugger {
  getCoverage(fn: string): FunctionCoverageWhichMaybeFailed;
  resetCoverage(fn: string): void;
}

export function FunctionDebuggerFactory(): FunctionDebuggerWithCoverage {
  const { createCollector, resetCoverageByFunction, coverageByFunction } =
    CoverageFactory();
  const {
    storyboardFunctions,
    registerStoryboardFunctions,
    updateStoryboardFunction,
  } = StoryboardFunctionRegistryFactory({
    collectCoverage: {
      createCollector,
    },
  });
  function run(
    fn: string,
    input: DebuggerStateDebugInput
  ): DebuggerStateDebugOutput {
    let value: unknown;
    let error: string;
    let ok = false;
    let raw: string;
    if (input.ok) {
      try {
        value = storyboardFunctions[fn](
          // Re-parse input to avoid mutating after tests run.
          ...generalizedJsonParse<unknown[]>(input.raw)
        );
        raw =
          value === undefined ? "undefined" : JSON.stringify(value, null, 2);
        ok = true;
      } catch (e) {
        error = String(e);
      }
    } else {
      error = input.error;
    }
    return { ok, raw, error };
  }

  return {
    registerStoryboardFunctions(functions) {
      coverageByFunction.clear();
      return registerStoryboardFunctions(functions);
    },
    updateStoryboardFunction(fn, data) {
      coverageByFunction.delete(fn);
      return updateStoryboardFunction(fn, data);
    },
    run,
    resetCoverage(fn) {
      resetCoverageByFunction(fn);
    },
    getCoverage(fn) {
      try {
        // The function maybe untouched if there is no tests.
        storyboardFunctions[fn];
      } catch (e) {
        // The function maybe failed to parse.
        return {
          status: "failed",
          error: String(e),
        };
      }
      return coverageByFunction.get(fn);
    },
  };
}
