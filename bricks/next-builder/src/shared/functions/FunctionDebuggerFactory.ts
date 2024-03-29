import {
  StoryboardFunctionRegistryFactory,
  StoryboardFunctionRegistry,
} from "@next-core/brick-kit";
import MockDate from "mockdate";
import { RawCoverage, SerializableValue, TestRunResult } from "./interfaces";
import { CoverageFactory } from "./CoverageFactory";
import { generalizedJsonParse } from "./processSerializableValue";

export type FunctionDebugger = Omit<
  StoryboardFunctionRegistry,
  "storyboardFunctions"
> & {
  run(fn: string, input: SerializableValue): TestRunResult;
  getCoverage(fn: string): RawCoverage;
  resetCoverage(fn: string): void;
};

export function FunctionDebuggerFactory(): FunctionDebugger {
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
  function run(fn: string, input: SerializableValue): TestRunResult {
    let error: string;
    let ok = false;
    let raw: string;
    let duration: number | null = null;
    if (input.ok) {
      MockDate.set("2015-07-20T09:15:00+08:00");
      try {
        const start = performance.now();
        const value = storyboardFunctions[fn](
          // Re-parse input to avoid mutating after tests run.
          ...generalizedJsonParse<unknown[]>(input.raw)
        );
        raw =
          value === undefined ? "undefined" : JSON.stringify(value, null, 2);
        ok = true;
        duration = Math.round(performance.now() - start);
      } catch (e) {
        error = String(e);
      }
      MockDate.reset();
    } else {
      error = input.error;
    }
    return { ok, raw, error, duration };
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
