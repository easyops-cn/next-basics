import React, { useMemo } from "react";
import { upperFirst } from "lodash";
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  DebuggerStateFunctionCoverageWhichMaybeFailed,
  FunctionCoverageFailed,
} from "../function-debugger-store/reducers/interfaces";

import styles from "./FunctionDebuggerStatusbar.module.css";

export interface FunctionDebuggerStatusbarProps {
  coverage?: DebuggerStateFunctionCoverageWhichMaybeFailed;
}

export function FunctionDebuggerStatusbar({
  coverage,
}: FunctionDebuggerStatusbarProps): React.ReactElement {
  const coverageIsOk = coverage && coverage.status !== "failed";
  const coverageRate = useMemo(() => {
    if (!coverageIsOk) {
      return null;
    }
    const relevant = [
      coverage.statements,
      coverage.branches,
      coverage.functions,
    ];
    const covered = relevant.reduce((acc, item) => acc + item.covered, 0);
    const total = relevant.reduce((acc, item) => acc + item.total, 0);
    return getPercentage(covered, total);
  }, [coverageIsOk, coverage]);

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
        ) : coverageIsOk ? (
          <>
            <span
              className={
                coverageRate < 60
                  ? styles.coverageLow
                  : coverageRate < 90
                  ? styles.coverageMedium
                  : coverageRate < 100
                  ? styles.coverageHigh
                  : styles.coverageFull
              }
            >
              <span className={styles.coverageIcon}>
                {coverageRate < 100 ? <WarningOutlined /> : <CheckOutlined />}
              </span>
              <span>Coverage: {coverageRate}%</span>
            </span>
            {(["statements", "branches", "functions", "lines"] as const).map(
              (type) => {
                const { covered, total } = coverage[type];
                return (
                  <span key={type} className={styles.subCoverage}>
                    <span>{upperFirst(type)}: </span>
                    <span>
                      {getPercentage(covered, total)}% ({covered}/{total})
                    </span>
                  </span>
                );
              }
            )}
          </>
        ) : (
          <span className={styles.coverageFailed}>
            <span className={styles.coverageIcon}>
              <CloseOutlined />
            </span>
            <span>{(coverage as FunctionCoverageFailed).error}</span>
          </span>
        )}
      </div>
    </div>
  );
}

function getPercentage(covered: number, total: number): number {
  return total === 0 ? 100 : +((covered * 100) / total).toFixed(2);
}
