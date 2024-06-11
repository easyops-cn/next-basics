import {
  StoryboardFunctionRegistryFactory,
  StoryboardFunctionRegistry,
} from "@next-core/brick-kit";
import type { EstreeNode } from "@next-core/brick-utils";
import MockDate from "mockdate";
import {
  DebugResult,
  RawCoverage,
  SerializableValue,
  TestRunResult,
} from "./interfaces";
import { CoverageFactory } from "./CoverageFactory";
import { generalizedJsonParse } from "./processSerializableValue";
import {
  getDebuggerScopeValues,
  ScopeValue,
  YieldValue,
} from "./getDebuggerScopeValues";

export type DebuggerMethod = "start" | "continue" | "step" | "disconnect";

export type FunctionDebugger = Omit<
  StoryboardFunctionRegistry,
  "storyboardFunctions"
> & {
  run(fn: string, input: SerializableValue): TestRunResult;
  debug(
    method: DebuggerMethod,
    fn: string,
    input: SerializableValue,
    breakpoints?: number[]
  ): DebugResult | undefined;
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

  let debugContext: {
    start: number;
    failed?: boolean;
    failedReason?: unknown;
    next: () => IteratorResult<unknown>;
    node: () => EstreeNode;
    scope: (
      yieldValue?: YieldValue,
      failed?: boolean,
      failedReason?: unknown
    ) => ScopeValue[];
  };

  function debug(
    method: DebuggerMethod,
    fn: string,
    input: SerializableValue,
    breakpoints?: number[]
  ): DebugResult {
    if (method === "start" || !debugContext) {
      const start = performance.now();

      const func = storyboardFunctions[fn];
      const debuggerCall = (func as any)[Symbol.for("$DebuggerCall$")];
      const debuggerScope = (func as any)[Symbol.for("$DebuggerScope$")];
      const debuggerNode = (func as any)[Symbol.for("$DebuggerNode$")];

      const iterator = debuggerCall(
        // Re-parse input to avoid mutating after tests run.
        ...generalizedJsonParse<unknown[]>(input.raw)
      );

      debugContext = {
        start,
        next: () =>
          debugContext.failed
            ? {
                done: true,
                value: { type: "caught", value: debugContext.failedReason },
              }
            : iterator.next(),
        node: () => debuggerNode(),
        scope: (
          yieldValue?: YieldValue,
          failed?: boolean,
          failedReason?: unknown
        ) =>
          getDebuggerScopeValues(
            debuggerScope(),
            yieldValue,
            failed,
            failedReason
          ),
      };
    }

    let done = false;
    let value: YieldValue | undefined;
    let failed = false;
    let failedReason: string | undefined;

    // If have set any breakpoints, make `start` execute until the next breakpoint.
    // If no breakpoints, make `start` execute until the first step.
    do {
      try {
        ({ done, value } = debugContext.next());
      } catch (e) {
        debugContext.failed = true;
        debugContext.failedReason = String(e);
        break;
      }
      if (done) {
        if (value?.type === "caught") {
          failed = true;
          failedReason = value.value as string;
        }
        break;
      }
    } while (
      method === "disconnect" ||
      ((breakpoints?.length ? method !== "step" : method === "continue") &&
        !breakpoints?.includes(debugContext.node().loc?.start.line))
    );

    if (done || failed) {
      let error: string;
      let ok = false;
      let raw: string;
      let duration: number | null = null;
      if (failed) {
        error = failedReason;
      } else if (input.ok) {
        try {
          raw =
            value === undefined ? "undefined" : JSON.stringify(value, null, 2);
          ok = true;
          duration = Math.round(performance.now() - debugContext.start);
        } catch (e) {
          error = String(e);
        }
        MockDate.reset();
      } else {
        error = input.error;
      }
      debugContext = undefined;
      return {
        type: "done",
        output: { ok, raw, error, duration },
      };
    }

    return {
      type: "step",
      node: debugContext.node(),
      scope: debugContext.scope(
        value,
        debugContext.failed,
        debugContext.failedReason
      ),
    };
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
    debug,
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
