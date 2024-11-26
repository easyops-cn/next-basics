import {
  StoryboardFunctionRegistryFactory,
  StoryboardFunctionPatch,
} from "@next-core/brick-kit";
import {
  cook,
  EstreeNode,
  isObject,
  precookFunction,
} from "@next-core/brick-utils";
import type { StoryboardFunction } from "@next-core/brick-types";
import MockDate from "mockdate";
import _ from "lodash";
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
import lodashSource from "./lodash.txt";
import arraySource from "./array.txt";
import objectSource from "./object.txt";
import { TransformedFunction, transformFunction } from "./transformFunction";

export type DebuggerMethod = "start" | "continue" | "step" | "disconnect";

class DebuggerArrayConstructor extends Array {}

export interface FunctionDebugger {
  registerStoryboardFunctions(
    functions: StoryboardFunction[],
    ignored?: () => boolean
  ): Promise<void>;
  updateStoryboardFunction(
    fn: string,
    data: StoryboardFunctionPatch,
    ignored: () => boolean
  ): Promise<void>;
  run(fn: string, input: SerializableValue): TestRunResult;
  debug(
    method: DebuggerMethod,
    fn: string,
    input: SerializableValue,
    breakpoints?: number[]
  ): DebugResult | undefined;
  getCoverage(fn: string): RawCoverage;
  resetCoverage(fn: string): void;
}

export function FunctionDebuggerFactory(): FunctionDebugger {
  const { createCollector, resetCoverageByFunction, coverageByFunction } =
    CoverageFactory();
  const {
    storyboardFunctions,
    registerStoryboardFunctions,
    updateStoryboardFunction,
    clearGlobalExecutionContextStack,
    getGlobalExecutionContextStack,
  } = StoryboardFunctionRegistryFactory({
    collectCoverage: {
      createCollector,
    },
    debuggerOverrides,
  } as any) as ReturnType<typeof StoryboardFunctionRegistryFactory> & {
    clearGlobalExecutionContextStack?: () => void;
    getGlobalExecutionContextStack?: () => ExecutionContext[];
  };

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
    isInCurrentFunction: () => boolean;
  };

  function debug(
    method: DebuggerMethod,
    fn: string,
    input: SerializableValue,
    breakpoints?: number[]
  ): DebugResult {
    if (method === "start" || !debugContext) {
      const start = performance.now();
      clearGlobalExecutionContextStack?.();

      const func = storyboardFunctions[fn];
      const debuggerCall = (func as any)[Symbol.for("$DebuggerCall$")];
      const debuggerScope = (func as any)[Symbol.for("$DebuggerScope$")];
      const debuggerNode = (func as any)[Symbol.for("$DebuggerNode$")];

      const iterator = debuggerCall(
        // Re-parse input to avoid mutating after tests run.
        ...asDebuggerArray(generalizedJsonParse<unknown[]>(input.raw))
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
        isInCurrentFunction: () => {
          const stack = getGlobalExecutionContextStack?.();
          if (!stack || stack.length < 2) {
            return true;
          }
          const bottom = stack[0];
          const top = stack[stack.length - 1];
          return (
            getOuterMostEnv(bottom.LexicalEnvironment) ===
            getOuterMostEnv(top.LexicalEnvironment)
          );
        },
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
        !breakpoints?.includes(debugContext.node().loc?.start.line)) ||
      !debugContext.isInCurrentFunction()
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
    async registerStoryboardFunctions(functions, ignored) {
      coverageByFunction.clear();
      const functionsWithTransformed = await Promise.all(
        functions.map(async (fn) => {
          const transformed = await transformFunction(fn);
          (fn as { transformed?: TransformedFunction }).transformed =
            transformed;
          return fn;
        })
      );
      if (ignored?.()) {
        return;
      }
      return registerStoryboardFunctions(functionsWithTransformed);
    },
    async updateStoryboardFunction(fn, data, ignored) {
      coverageByFunction.delete(fn);
      const transformed = await transformFunction({
        name: fn,
        source: data.source,
        typescript: data.typescript,
      });
      if (ignored()) {
        return;
      }
      const patch = {
        ...data,
        transformed,
      };
      return updateStoryboardFunction(fn, patch);
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

function debuggerOverrides(ctx: {
  precookFunction: typeof precookFunction;
  cook: typeof cook;
  supply: (
    attemptToVisitGlobals: Set<string>,
    providedGlobalVariables?: Record<string, unknown>,
    mock?: boolean
  ) => Record<string, unknown>;
}): {
  LodashWithStaticFields?: Partial<typeof _>;
  ArrayConstructor?: {
    new (): Array<unknown>;
  };
  ObjectWithStaticFields?: Partial<typeof Object>;
} {
  const precookedArray = ctx.precookFunction(arraySource, {
    externalSourceForDebug: true,
  } as any);
  const debugArray = ctx.cook(precookedArray.function, arraySource, {
    externalSourceForDebug: true,
    globalVariables: ctx.supply(precookedArray.attemptToVisitGlobals, {
      TypeError,
      Object,
      Array: DebuggerArrayConstructor,
      Number,
      isNaN,
      isFinite,
      Math,
      console,
    }),
    ArrayConstructor: DebuggerArrayConstructor,
  } as any) as () => object;
  Object.assign(DebuggerArrayConstructor.prototype, debugArray());

  // Lodash uses `Array()` instead of `new Array()`
  const ArrayFunction = function (
    ...args: unknown[]
  ): DebuggerArrayConstructor {
    return new DebuggerArrayConstructor(...(args as [number]));
  };
  ArrayFunction.prototype = DebuggerArrayConstructor.prototype;
  ArrayFunction.isArray = Array.isArray;

  const precookedLodash = ctx.precookFunction(lodashSource, {
    externalSourceForDebug: true,
  } as any);
  const debugLodash = ctx.cook(precookedLodash.function, lodashSource, {
    externalSourceForDebug: true,
    globalVariables: ctx.supply(precookedLodash.attemptToVisitGlobals, {
      global: window,
      Function,
      Object,
      ArrayBuffer,
      Array: ArrayFunction,
    }),
    ArrayConstructor: DebuggerArrayConstructor,
  } as any) as () => Partial<typeof _>;

  const precookedObject = ctx.precookFunction(objectSource, {
    externalSourceForDebug: true,
  } as any);
  const debugObject = ctx.cook(precookedObject.function, objectSource, {
    externalSourceForDebug: true,
    globalVariables: ctx.supply(precookedObject.attemptToVisitGlobals, {
      Object,
    }),
    ArrayConstructor: DebuggerArrayConstructor,
  } as any) as () => typeof Object;

  return {
    LodashWithStaticFields: debugLodash(),
    ArrayConstructor: DebuggerArrayConstructor,
    ObjectWithStaticFields: debugObject(),
  };
}

function asDebuggerValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return asDebuggerArray(value);
  }
  if (isObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, asDebuggerValue(v)])
    );
  }
  return value;
}

function asDebuggerArray(list: unknown[]): unknown[] {
  // `new Array(n)` means an array with `n` empty slots.
  // `new Array(a, b, ...)` means an array with `a`, `b`, ...
  if (list.length === 1) {
    const result = new DebuggerArrayConstructor(1);
    result[0] = asDebuggerValue(list[0]);
    return result;
  }
  return new (DebuggerArrayConstructor as any)(...list.map(asDebuggerValue));
}

interface ExecutionContext {
  LexicalEnvironment: EnvironmentRecord;
}

interface EnvironmentRecord {
  OuterEnv?: EnvironmentRecord;
}

function getOuterMostEnv(env: EnvironmentRecord): EnvironmentRecord {
  let outer = env;
  while (outer.OuterEnv) {
    outer = outer.OuterEnv;
  }
  return outer;
}
