import React, { useMemo } from "react";
import { upperFirst } from "lodash";
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  ProcessedCoverage,
  RawCoverageFailed,
  TestStats,
} from "../shared/functions/interfaces";
import {
  getTotalCoverage,
  getCoverageStats,
} from "../shared/functions/getCoverageStats";

import styles from "./FunctionDebuggerStatusbar.module.css";

export interface FunctionDebuggerStatusbarProps {
  coverage?: ProcessedCoverage;
  testStats?: TestStats;
}

export function FunctionDebuggerStatusbar({
  coverage,
  testStats,
}: FunctionDebuggerStatusbarProps): React.ReactElement {
  const coverageIsOk = coverage && coverage.status !== "failed";
  const totalCoverage = useMemo(
    () => (coverageIsOk ? getTotalCoverage(coverage) : null),
    [coverageIsOk, coverage]
  );
  const coverageStats = useMemo(
    () => (coverageIsOk ? getCoverageStats(coverage) : null),
    [coverageIsOk, coverage]
  );

  return (
    <div className={styles.debuggerStatusbar} data-override-theme="dark">
      <div className={styles.coverage}>
        {coverage == null ? (
          <span>
            <span className={styles.coverageIcon}>
              <QuestionOutlined />
            </span>
            <span>Coverage: expired</span>
          </span>
        ) : testStats?.failed > 0 ? (
          <span className={styles.hasFailedTests}>
            <span className={styles.coverageIcon}>
              <WarningOutlined />
            </span>
            <span>
              {testStats.failed}/{testStats.total} tests failed!
            </span>
          </span>
        ) : coverageIsOk ? (
          <>
            <span
              className={
                totalCoverage < 60
                  ? styles.coverageLow
                  : totalCoverage < 90
                  ? styles.coverageMedium
                  : totalCoverage < 100
                  ? styles.coverageHigh
                  : styles.coverageFull
              }
            >
              <span className={styles.coverageIcon}>
                {totalCoverage < 100 ? <WarningOutlined /> : <CheckOutlined />}
              </span>
              <span>Coverage: {totalCoverage}%</span>
            </span>
            {Object.entries(coverageStats).map(
              ([type, { covered, total, percentage }]) => (
                <span key={type} className={styles.subCoverage}>
                  <span>{upperFirst(type)}: </span>
                  <span>
                    {percentage}% ({covered}/{total})
                  </span>
                </span>
              )
            )}
          </>
        ) : (
          <span className={styles.coverageFailed}>
            <span className={styles.coverageIcon}>
              <CloseOutlined />
            </span>
            <span>{(coverage as RawCoverageFailed).error}</span>
          </span>
        )}
      </div>
    </div>
  );
}
