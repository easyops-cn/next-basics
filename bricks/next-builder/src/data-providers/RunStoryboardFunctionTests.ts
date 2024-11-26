import { createProviderClass } from "@next-core/brick-utils";
import {
  getCoverageStats,
  getTotalCoverage,
} from "../shared/functions/getCoverageStats";
import {
  FunctionDebugger,
  FunctionDebuggerFactory,
} from "../shared/functions/FunctionDebuggerFactory";
import {
  CoverageCounts,
  CoverageStats,
  CoverageStatType,
  ProcessedCoverageOk,
  StoryboardFunctionWithTests,
  TestStats,
} from "../shared/functions/interfaces";
import { processSerializableValue } from "../shared/functions/processSerializableValue";
import { getProcessedCoverage } from "../shared/functions/getProcessedCoverage";

export interface RunStoryboardFunctionTestsParams {
  functions: StoryboardFunctionWithTests[];
  keepProcessedCoverage?: boolean;
}

export interface RunStoryboardFunctionTestsResult {
  coverage: CoverageReport;
  coverageByFunction: Record<string, CoverageReport>;
  maxDurationByFunction: Record<string, number>;
}

interface CoverageReport {
  percentage: number;
  stats: CoverageStats;
  tests: TestsCount;
  processedCoverage?: ProcessedCoverageOk;
}

interface TestsCount extends TestStats {
  passed: number;
  list?: boolean[];
}

let functionDebugger: FunctionDebugger;

function getFunctionDebugger(): FunctionDebugger {
  if (!functionDebugger) {
    functionDebugger = FunctionDebuggerFactory();
  }
  return functionDebugger;
}

export async function RunStoryboardFunctionTests({
  functions,
  keepProcessedCoverage,
}: RunStoryboardFunctionTestsParams): Promise<RunStoryboardFunctionTestsResult> {
  const { registerStoryboardFunctions, run, getCoverage } =
    getFunctionDebugger();
  await registerStoryboardFunctions(functions);
  let total = 0;
  let passed = 0;
  const coverageByFunction: Record<string, CoverageReport> = {};
  const maxDurationByFunction: Record<string, number> = {};
  const validCoverages: CoverageCounts[] = [];
  for (const fn of functions) {
    let fnTotal = 0;
    let fnPassed = 0;
    const list: boolean[] = [];
    let maxDuration = -Infinity;
    if (Array.isArray(fn.tests)) {
      for (const testCase of fn.tests) {
        fnTotal++;
        const input = processSerializableValue(testCase.input);
        const output = run(fn.name, input);
        if (output.ok && output.raw === testCase.output) {
          fnPassed++;
          list.push(true);
        } else {
          list.push(false);
        }
        if (output.duration !== null) {
          maxDuration = Math.max(maxDuration, output.duration);
        }
      }
    }
    total += fnTotal;
    passed += fnPassed;
    const rawCoverage = getCoverage(fn.name);
    const coverage = getProcessedCoverage(rawCoverage);
    if (coverage.status !== "failed") {
      validCoverages.push(coverage);
      coverageByFunction[fn.name] = getCoverageReport(
        coverage,
        {
          total: fnTotal,
          passed: fnPassed,
          failed: fnTotal - fnPassed,
          list,
        },
        keepProcessedCoverage
      );
    } else {
      coverageByFunction[fn.name] = null;
    }
    if (maxDuration >= 0) {
      maxDurationByFunction[fn.name] = maxDuration;
    }
  }
  return {
    coverage: accumulateCoverageReport(validCoverages, {
      total,
      passed,
      failed: total - passed,
    }),
    coverageByFunction,
    maxDurationByFunction,
  };
}

function accumulateCoverageReport(
  coverages: CoverageCounts[],
  tests: TestsCount
): CoverageReport {
  const types: CoverageStatType[] = [
    "statements",
    "branches",
    "functions",
    "lines",
  ];
  const totalCoverage = {} as unknown as CoverageCounts;
  for (const type of types) {
    totalCoverage[type] = {
      total: 0,
      covered: 0,
    };
  }
  for (const coverage of coverages) {
    for (const type of types) {
      totalCoverage[type].total += coverage[type].total;
      totalCoverage[type].covered += coverage[type].covered;
    }
  }
  return getCoverageReport(totalCoverage, tests);
}

function getCoverageReport(
  coverage: CoverageCounts,
  tests: TestsCount,
  keepProcessedCoverage?: boolean
): CoverageReport {
  return {
    percentage: getTotalCoverage(coverage),
    stats: getCoverageStats(coverage),
    tests,
    ...(keepProcessedCoverage
      ? {
          processedCoverage: coverage as ProcessedCoverageOk,
        }
      : null),
  };
}

customElements.define(
  "next-builder.provider-run-storyboard-function-tests",
  createProviderClass(RunStoryboardFunctionTests)
);
