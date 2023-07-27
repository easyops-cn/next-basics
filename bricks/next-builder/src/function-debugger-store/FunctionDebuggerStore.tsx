import React, {
  Dispatch,
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { rootReducer } from "./reducers";
import {
  DebuggerAction,
  DebuggerActionInitFunction,
  DebuggerStateActiveTab,
  DebuggerStateDebugInput,
  DebuggerStateDebugOutput,
  DebuggerStateOriginalFunction,
  DebuggerStateTestCase,
  DebuggerStateTestExpect,
  DebuggerStateTestInput,
} from "./reducers/interfaces";
import {
  FunctionTestCase,
  ProcessedCoverage,
  TestStats,
} from "../shared/functions/interfaces";
import { FunctionDebuggerFactory } from "../shared/functions/FunctionDebuggerFactory";
import { formatSerializableValue } from "../shared/functions/processSerializableValue";

export interface DebuggerStore {
  dispatch: Dispatch<DebuggerAction>;
  initFunction: (data: Omit<DebuggerActionInitFunction, "type">) => void;
  run: () => void;
  saveDebugAsTest: () => void;
  addTest: () => void;
  deleteTest: () => void;
  updateTestInput: (input: string) => void;
  saveTest: () => void;
  runAllTests: () => void;
  getFunctionDataToSave: () => FunctionDataToSave;
}

export interface FunctionDataToSave {
  error?: string;
  data?: {
    instanceId?: string;
    name: string;
    source: string;
    typescript?: boolean;
    tests: FunctionTestCase[];
  };
}

export interface FunctionDebuggerStoreProps {
  runTestsAutomaticallyTimeout?: number;
  onActiveTabChange?: (activeTab: DebuggerStateActiveTab) => void;
  onOriginalFunctionChange?: (
    originalFunction: DebuggerStateOriginalFunction
  ) => void;
  onFunctionModified?: (modified: boolean) => void;
  onDebugInputChange?: (input: DebuggerStateDebugInput) => void;
  onDebugOutputChange?: (output: DebuggerStateDebugOutput) => void;
  onTestsChange?: (tests: DebuggerStateTestCase[]) => void;
  onTestInputChange?: (testInput: DebuggerStateTestInput) => void;
  onTestExpectChange?: (testExpect: DebuggerStateTestExpect) => void;
  onTestReceivedChange?: (testExpect: DebuggerStateDebugOutput) => void;
  onTestMatchedChange?: (matched: boolean | null) => void;
  onTestUpdatableChange?: (updatable: boolean) => void;
  onSomethingModified?: (modified: boolean) => void;
  onTestStatsChange?: (stats: TestStats) => void;
  onCoverageChange?: (coverage: ProcessedCoverage) => void;
}

function LegacyFunctionDebuggerStore(
  {
    runTestsAutomaticallyTimeout,
    onActiveTabChange,
    onOriginalFunctionChange,
    onFunctionModified,
    onDebugInputChange,
    onDebugOutputChange,
    onTestsChange,
    onTestInputChange,
    onTestExpectChange,
    onTestReceivedChange,
    onTestMatchedChange,
    onTestUpdatableChange,
    onSomethingModified,
    onTestStatsChange,
    onCoverageChange,
  }: FunctionDebuggerStoreProps,
  ref: Ref<DebuggerStore>
): React.ReactElement {
  const functionDebugger = useMemo(() => FunctionDebuggerFactory(), []);

  const [
    {
      originalFunction,
      modifiedFunction,
      functions,
      activeTab,
      debugInput,
      debugOutput,
      tests,
      coverage,
    },
    dispatch,
  ] = useReducer(rootReducer, {});
  const initialized = useRef(false);

  const emptyTest = useMemo(
    () => ({
      input: "",
      output: "",
      testInput: null,
      testExpect: null,
      testMatched: null,
      testModified: false,
      testReceived: null,
      testUpdatable: false,
    }),
    []
  );

  const activeTest: DebuggerStateTestCase = useMemo(
    () => (activeTab?.group === "test" ? tests[activeTab.index] : emptyTest),
    [activeTab, emptyTest, tests]
  );

  const autoTestsTimeoutRef = useRef<number>();

  const initFunction = useCallback(
    (data: Omit<DebuggerActionInitFunction, "type">) => {
      if (autoTestsTimeoutRef.current) {
        clearTimeout(autoTestsTimeoutRef.current);
      }
      const originalFunction = data.functions.find(
        (fn) => fn.name === data.functionName
      );
      dispatch({
        ...data,
        type: "initFunction",
        functions: originalFunction
          ? data.functions
          : data.functions.concat(data.initialFunction),
        originalFunction: originalFunction || data.initialFunction,
      });
    },
    []
  );

  const run = useCallback(() => {
    const isTest = activeTab.group === "test";
    const output = functionDebugger.run(
      originalFunction.name,
      isTest ? activeTest.testInput : debugInput
    );
    dispatch(
      isTest
        ? {
            type: "testReturn",
            output,
            activeTestIndex: activeTab.index,
          }
        : {
            type: "debugReturn",
            output,
          }
    );
  }, [
    activeTab,
    debugInput,
    functionDebugger,
    originalFunction,
    activeTest.testInput,
  ]);

  const runAllTests = useCallback(() => {
    if (tests) {
      functionDebugger.resetCoverage(originalFunction.name);
      const outputs = tests.map((test) =>
        functionDebugger.run(originalFunction.name, test.testInput)
      );
      dispatch({
        type: "allTestsReturn",
        outputs,
      });
      dispatch({
        type: "updateCoverage",
        coverage: functionDebugger.getCoverage(originalFunction.name),
      });
    }
  }, [functionDebugger, originalFunction, tests]);

  const saveDebugAsTest = useCallback(() => {
    if (debugOutput.ok) {
      const nextTestIndex = tests.length;
      dispatch({
        type: "saveDebugAsTest",
        debugInput: formatSerializableValue(debugInput),
        debugOutput,
        nextTestIndex,
      });
    }
  }, [debugInput, debugOutput, tests?.length]);

  const addTest = useCallback(() => {
    const nextTestIndex = tests.length;
    dispatch({
      type: "addTest",
      nextTestIndex,
    });
  }, [tests?.length]);

  const [testsDeleted, setTestsDeleted] = useState(false);
  const deleteTest = useCallback(() => {
    dispatch({
      type: "deleteTest",
      activeTestIndex: activeTab.index,
    });
    setTestsDeleted(true);
  }, [activeTab?.index]);

  const updateTestInput = useCallback(
    (input: string) => {
      dispatch({
        type: "updateTestInput",
        input,
        activeTestIndex: activeTab.index,
      });
    },
    [activeTab?.index]
  );

  const saveTest = useCallback(() => {
    if (activeTest.testReceived.ok) {
      dispatch({
        type: "updateTestOutput",
        activeTestIndex: activeTab.index,
      });
    }
  }, [activeTab?.index, activeTest]);

  const testStats = useMemo(
    () =>
      tests &&
      coverage && {
        // When coverage is nil, it indicates that tests is expired.
        total: tests.length,
        failed: tests.filter((test) => !test.testMatched).length,
      },
    [coverage, tests]
  );

  const getFunctionDataToSave = useCallback(() => {
    // Should call runAllTest before.
    if (testStats.failed > 0) {
      return {
        error:
          testStats.failed > 1
            ? `There are ${testStats.failed} tests failed!`
            : "There is a test failed!",
      };
    }

    return {
      data: {
        instanceId: originalFunction.instanceId,
        name: originalFunction.name,
        source: modifiedFunction.source,
        typescript: modifiedFunction.typescript,
        tests: tests.map(({ input, output }) => ({ input, output })),
      },
    };
  }, [modifiedFunction, originalFunction, tests, testStats]);

  useImperativeHandle(
    ref,
    () => ({
      dispatch,
      initFunction,
      run,
      saveDebugAsTest,
      addTest,
      deleteTest,
      updateTestInput,
      saveTest,
      runAllTests,
      getFunctionDataToSave,
    }),
    [
      getFunctionDataToSave,
      initFunction,
      run,
      saveDebugAsTest,
      addTest,
      deleteTest,
      updateTestInput,
      saveTest,
      runAllTests,
    ]
  );

  useEffect(() => {
    if (functions) {
      functionDebugger.registerStoryboardFunctions(functions);
    }
  }, [functionDebugger, functions]);

  useEffect(() => {
    if (modifiedFunction?.modified) {
      functionDebugger.updateStoryboardFunction(
        originalFunction.name,
        modifiedFunction
      );
    }
  }, [functionDebugger, originalFunction, modifiedFunction]);

  useEffect(
    () => {
      if (initialized.current) {
        // Each time `initFunction` is dispatched, which changes
        // `originalFunction`, run all tests automatically.
        // (give a second of break)
        if (runTestsAutomaticallyTimeout > 0) {
          autoTestsTimeoutRef.current = setTimeout(() => {
            runAllTests();
          }, runTestsAutomaticallyTimeout) as unknown as number;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [originalFunction]
  );

  const functionModified = !!modifiedFunction?.modified;
  useEffect(() => {
    if (initialized.current) {
      onFunctionModified?.(functionModified);
    }
  }, [functionModified, onFunctionModified]);

  useEffect(() => {
    if (initialized.current) {
      onActiveTabChange?.(activeTab);
    }
  }, [activeTab, onActiveTabChange]);

  useEffect(() => {
    if (initialized.current) {
      onOriginalFunctionChange?.(originalFunction);
    }
  }, [originalFunction, onOriginalFunctionChange]);

  useEffect(() => {
    if (initialized.current) {
      onDebugInputChange?.(debugInput);
    }
  }, [debugInput, onDebugInputChange]);

  useEffect(() => {
    if (initialized.current) {
      onDebugOutputChange?.(debugOutput);
    }
  }, [debugOutput, onDebugOutputChange]);

  useEffect(() => {
    if (initialized.current) {
      onTestsChange?.(tests);
    }
  }, [tests, onTestsChange]);

  useEffect(() => {
    if (initialized.current) {
      onTestInputChange?.(activeTest.testInput);
    }
  }, [activeTest.testInput, onTestInputChange]);

  useEffect(() => {
    if (initialized.current) {
      onTestExpectChange?.(activeTest.testExpect);
    }
  }, [activeTest.testExpect, onTestExpectChange]);

  useEffect(() => {
    if (initialized.current) {
      onTestReceivedChange?.(activeTest.testReceived);
    }
  }, [activeTest.testReceived, onTestReceivedChange]);

  useEffect(() => {
    if (initialized.current) {
      onTestMatchedChange?.(activeTest.testMatched);
    }
  }, [activeTest.testMatched, onTestMatchedChange]);

  useEffect(() => {
    if (initialized.current) {
      onTestUpdatableChange?.(activeTest.testUpdatable);
    }
  }, [activeTest.testUpdatable, onTestUpdatableChange]);

  const somethingModified = useMemo(
    () =>
      functionModified ||
      testsDeleted ||
      !!tests?.some((test) => test.testModified),
    [functionModified, tests, testsDeleted]
  );
  useEffect(() => {
    if (initialized.current) {
      onSomethingModified?.(somethingModified);
    }
  }, [somethingModified, onSomethingModified]);

  useEffect(
    () => {
      if (initialized.current) {
        onTestStatsChange?.(testStats);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onTestStatsChange, testStats?.total, testStats?.failed]
  );

  useEffect(() => {
    if (initialized.current) {
      onCoverageChange?.(coverage);
    }
  }, [coverage, onCoverageChange]);

  useEffect(() => {
    initialized.current = true;
  }, []);

  useEffect(
    () => () => {
      // Clear functions after component unmounted.
      functionDebugger.registerStoryboardFunctions([]);
    },
    // This is a one-time effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
}

export const FunctionDebuggerStore = forwardRef(LegacyFunctionDebuggerStore);
