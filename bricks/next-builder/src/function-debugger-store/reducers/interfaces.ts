import { StoryboardFunctionRegistry } from "@next-core/brick-kit";

export type FunctionDebugger = Omit<
  StoryboardFunctionRegistry,
  "storyboardFunctions"
> & {
  run(
    fn: string,
    input: SerializableValue<unknown[]>
  ): DebuggerStateDebugOutput;
};

export interface SerializableValue<T = unknown> {
  raw: string;
  ok: boolean;
  value?: T;
  error?: string;
}

export interface FunctionTestCase {
  name?: string;
  input: string;
  output: string;
}

// Actions:

export type DebuggerAction =
  | DebuggerActionInitFunction
  | DebuggerActionUpdateSource
  | DebuggerActionUpdateTypescript
  | DebuggerActionSwitchTab
  | DebuggerActionDebugUserInput
  | DebuggerActionDebugReturn
  | DebuggerActionAddTest
  | DebuggerActionUpdateTestInput
  | DebuggerActionTestReturn
  | DebuggerActionUpdateTestOutput
  | DebuggerActionAllTestsReturn;

export interface DebuggerActionInitFunction {
  type: "initFunction";
  functionName: string;
  functions: DebuggerStateOriginalFunction[];
  initialFunction: DebuggerStateOriginalFunction;
  originalFunction?: DebuggerStateOriginalFunction;
}

export interface DebuggerActionUpdateSource {
  type: "updateSource";
  source: string;
}

export interface DebuggerActionUpdateTypescript {
  type: "updateTypescript";
  typescript: boolean;
}

export interface DebuggerActionSwitchTab {
  type: "switchTab";
  tab: string;
}

export interface DebuggerActionDebugUserInput {
  type: "updateDebugInput";
  input: string;
}

export interface DebuggerActionDebugReturn {
  type: "debugReturn";
  output: DebuggerStateDebugOutput;
}

export interface DebuggerActionAddTest {
  type: "addTest";
  debugInput: DebuggerStateDebugInput;
  debugOutput: DebuggerStateDebugOutput;
}

export interface DebuggerActionUpdateTestInput {
  type: "updateTestInput";
  activeTestIndex: number;
  input: string;
}

export interface DebuggerActionTestReturn {
  type: "testReturn";
  activeTestIndex: number;
  output: DebuggerStateDebugOutput;
}

export interface DebuggerActionUpdateTestOutput {
  type: "updateTestOutput";
  activeTestIndex: number;
}

export interface DebuggerActionAllTestsReturn {
  type: "allTestsReturn";
  outputs: DebuggerStateDebugOutput[];
}

// States:

export interface DebuggerStateOriginalFunction {
  instanceId?: string;
  name: string;
  source: string;
  typescript?: boolean;
  tests?: FunctionTestCase[];
}

export interface DebuggerStateModifiedFunction {
  source: string;
  typescript?: boolean;
  modified?: boolean;
}

export interface DebuggerStateActiveTab {
  value: string;
  group: string;
  index?: number;
}

export interface DebuggerStateDebugInput extends SerializableValue<unknown[]> {
  functionName: string;
  userInput?: boolean;
}

export interface DebuggerStateDebugOutput extends SerializableValue {}

export interface DebuggerStateTestCase extends FunctionTestCase {
  testInput: DebuggerStateTestInput;
  testExpect: DebuggerStateTestExpect;
  testReceived: DebuggerStateDebugOutput;
  testMatched: boolean;
  testModified: boolean;
  testUpdatable: boolean;
}

export interface DebuggerStateTestInput extends SerializableValue<unknown[]> {
  userInput?: boolean;
}

export interface DebuggerStateTestExpect extends SerializableValue {}

export interface DebuggerState {
  activeTab?: DebuggerStateActiveTab;
  originalFunction?: DebuggerStateOriginalFunction;
  modifiedFunction?: DebuggerStateModifiedFunction;
  functions?: DebuggerStateOriginalFunction[];
  debugInput?: DebuggerStateDebugInput;
  debugOutput?: DebuggerStateDebugOutput;
  tests?: DebuggerStateTestCase[];
}
