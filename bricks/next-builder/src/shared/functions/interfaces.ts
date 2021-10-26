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

export interface CoverageCounter {
  total: number;
  covered: number;
}

export interface CoverageStatistics extends CoverageCounter {
  percentage: number;
}

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
