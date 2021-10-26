import { ProcessedCoverageOk, CoverageStatistics } from "./interfaces";

export type CoverageStatType =
  | "statements"
  | "branches"
  | "functions"
  | "lines";
export type CoverageStats = Record<CoverageStatType, CoverageStatistics>;

export function getCoverageStats(coverage: ProcessedCoverageOk): CoverageStats {
  return Object.fromEntries(
    (["statements", "branches", "functions", "lines"] as const).map<
      [CoverageStatType, CoverageStatistics]
    >((type) => {
      const { covered, total } = coverage[type];
      return [
        type,
        { covered, total, percentage: getPercentage(covered, total) },
      ];
    })
  ) as CoverageStats;
}

export function getTotalCoverage(coverage: ProcessedCoverageOk): number {
  const relevant = [coverage.statements, coverage.branches, coverage.functions];
  const covered = relevant.reduce((acc, item) => acc + item.covered, 0);
  const total = relevant.reduce((acc, item) => acc + item.total, 0);
  return getPercentage(covered, total);
}

function getPercentage(covered: number, total: number): number {
  return total === 0 ? 100 : +((covered * 100) / total).toFixed(2);
}
