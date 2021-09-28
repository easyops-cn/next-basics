import { StoryboardFunctionRegistryFactory } from "@next-core/brick-kit";
import { generalizedJsonParse } from "./processors";
import {
  FunctionDebugger,
  DebuggerStateDebugOutput,
  DebuggerStateDebugInput,
} from "./reducers/interfaces";

export function FunctionDebuggerFactory(): FunctionDebugger {
  const {
    storyboardFunctions,
    registerStoryboardFunctions,
    updateStoryboardFunction,
  } = StoryboardFunctionRegistryFactory();
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
    registerStoryboardFunctions,
    updateStoryboardFunction,
    run,
  };
}
