import { StoryboardFunction } from "@next-core/brick-types";
import { EstreeNode } from "@next-core/brick-utils";

export interface SerializableValue {
  raw: string;
  ok: boolean;
  error?: string;
}

export interface RawCoverageOk {
  status?: "ok";
  statements: Map<EstreeNode, number>;
  branches: Map<EstreeNode, Map<CoverageBranchName, number> | number>;
  functions: Map<EstreeNode, number>;
}

export type CoverageBranchName = "if" | "else";

export type RawCoverage = RawCoverageOk | RawCoverageFailed;

export interface RawCoverageFailed {
  status: "failed";
  error: string;
}

export type ProcessedCoverage = ProcessedCoverageOk | RawCoverageFailed;

export interface ProcessedCoverageOk {
  status?: "ok";
  statements: CoverageCounter & {
    uncovered: CoverageLocation[];
  };
  branches: CoverageCounter & {
    uncovered: CoverageLocationWithBranch[];
  };
  functions: CoverageCounter & {
    uncovered: CoverageLocation[];
  };
  lines: CoverageCounter & {
    counts: Map<number, { startColumn: number; count: number }>;
  };
}

export type CoverageStatType =
  | "statements"
  | "branches"
  | "functions"
  | "lines";

export interface CoverageCounter {
  total: number;
  covered: number;
}

export type CoverageCounts = Record<CoverageStatType, CoverageCounter>;

export interface CoverageStatistics extends CoverageCounter {
  percentage: number;
}

export type CoverageStats = Record<CoverageStatType, CoverageStatistics>;

export interface CoverageLocation {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

export interface CoverageLocationWithBranch extends CoverageLocation {
  branch?: CoverageBranchName;
}

export interface TestStats {
  total: number;
  failed: number;
}

export interface StoryboardFunctionWithTests extends StoryboardFunction {
  tests?: FunctionTestCase[];
}

export interface FunctionTestCase {
  name?: string;
  input: string;
  output: string;
}
