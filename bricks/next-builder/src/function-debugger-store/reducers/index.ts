import { Reducer } from "react";
import { DebuggerAction, DebuggerState } from "./interfaces";
import { originalFunction } from "./originalFunction";
import { modifiedFunction } from "./modifiedFunction";
import { functions } from "./functions";
import { activeTab } from "./activeTab";
import { debugInput } from "./debugInput";
import { debugOutput } from "./debugOutput";
import { tests } from "./tests";

type ReducersMapObject<S, A> = {
  [K in keyof S]: Reducer<S[K], A>;
};

function combineReducers<S, A>(
  reducers: ReducersMapObject<S, A>
): Reducer<S, A> {
  return ((state, action) =>
    Object.fromEntries(
      Object.entries<Reducer<any, A>>(reducers).map(([key, value]) => [
        key,
        value(state[key as keyof S], action),
      ])
    )) as Reducer<S, A>;
}

export const rootReducer = combineReducers<DebuggerState, DebuggerAction>({
  originalFunction,
  modifiedFunction,
  functions,
  activeTab,
  debugInput,
  debugOutput,
  tests,
});
