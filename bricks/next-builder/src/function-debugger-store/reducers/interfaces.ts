import { StoryboardFunctionRegistry } from "@next-core/brick-kit";
import { EstreeNode } from "@next-core/brick-utils";

export type FunctionDebugger = Omit<
  StoryboardFunctionRegistry,
  "storyboardFunctions"
> & {
  run(fn: string, input: SerializableValue): DebuggerStateDebugOutput;
};

export interface SerializableValue {
  raw: string;
  ok: boolean;
  error?: string;
}

export interface FunctionTestCase {
  name?: string;
  input: string;
  output: string;
}

export interface FunctionCoverage {
  status?: "ok";
  statements: Map<EstreeNode, number>;
  branches: Map<EstreeNode, Map<FunctionCoverageBranchName, number> | number>;
  functions: Map<EstreeNode, number>;
}

export type FunctionCoverageBranchName = "if" | "else";

export type FunctionCoverageWhichMaybeFailed =
  | FunctionCoverage
  | FunctionCoverageFailed;

export interface FunctionCoverageFailed {
  status: "failed";
  error: string;
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
  | DebuggerActionAllTestsReturn
  | DebuggerActionUpdateCoverage;

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

export interface DebuggerActionUpdateCoverage {
  type: "updateCoverage";
  coverage: FunctionCoverageWhichMaybeFailed;
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

export interface DebuggerStateDebugInput extends SerializableValue {
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

export interface DebuggerStateTestInput extends SerializableValue {
  userInput?: boolean;
}

export interface DebuggerStateTestExpect extends SerializableValue {}

export type DebuggerStateFunctionCoverageWhichMaybeFailed =
  | DebuggerStateFunctionCoverage
  | FunctionCoverageFailed;

export interface DebuggerStateFunctionCoverage {
  status?: "ok";
  statements: CoverageStatistics & {
    uncovered: CoverageLocation[];
  };
  branches: CoverageStatistics & {
    uncovered: CoverageLocationWithBranch[];
  };
  functions: CoverageStatistics & {
    uncovered: CoverageLocation[];
  };
  lines: CoverageStatistics & {
    counts: Map<number, { startColumn: number; count: number }>;
  };
}

export interface CoverageStatistics {
  total: number;
  covered: number;
}

export interface CoverageLocation {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

export interface CoverageLocationWithBranch extends CoverageLocation {
  branch?: FunctionCoverageBranchName;
}

export interface DebuggerState {
  activeTab?: DebuggerStateActiveTab;
  originalFunction?: DebuggerStateOriginalFunction;
  modifiedFunction?: DebuggerStateModifiedFunction;
  functions?: DebuggerStateOriginalFunction[];
  debugInput?: DebuggerStateDebugInput;
  debugOutput?: DebuggerStateDebugOutput;
  tests?: DebuggerStateTestCase[];
  coverage?: DebuggerStateFunctionCoverageWhichMaybeFailed;
}
