import { RawCoverage, ProcessedCoverage } from "./interfaces";

export function getProcessedCoverage(
  rawCoverage: RawCoverage
): ProcessedCoverage {
  if (rawCoverage.status === "failed") {
    return rawCoverage;
  }
  const { statements, branches, functions } = rawCoverage;
  const lines = new Map<
    number,
    {
      startColumn: number;
      endColumn: number;
      isWholeLine: boolean;
      count: number;
    }
  >();
  for (const [stmt, count] of statements.entries()) {
    const lineNumber = stmt.loc.start.line;
    const line = lines.get(lineNumber);
    const isWholeLine = line?.isWholeLine || stmt.loc.end.line > lineNumber;
    if (line) {
      lines.set(lineNumber, {
        // A line starts with its first statements.
        startColumn: Math.min(line.startColumn, stmt.loc.start.column + 1),
        // A line ends with its last statements.
        endColumn: isWholeLine
          ? line.endColumn
          : Math.max(line.endColumn, stmt.loc.end.column + 1),
        isWholeLine,
        // The count of a line is the maximum count among its statements.
        count: Math.max(line.count, count),
      });
    } else {
      lines.set(lineNumber, {
        startColumn: stmt.loc.start.column + 1,
        endColumn: stmt.loc.end.column + 1,
        isWholeLine,
        count,
      });
    }
  }

  const flatBranches = Array.from(branches.entries()).flatMap(([node, count]) =>
    // For an ordinary branch, the `count` is a number.
    typeof count === "number"
      ? {
          node,
          branch: undefined,
          count,
        }
      : // For a special branch, the `count` is a map of branch name to count.
        Array.from(count.entries()).map(([branch, cnt]) => ({
          node,
          branch,
          count: cnt,
        }))
  );

  return {
    statements: {
      total: statements.size,
      covered: Array.from(statements.values()).filter((count) => count > 0)
        .length,
      uncovered: Array.from(statements.entries())
        .filter((entry) => entry[1] === 0)
        .map(([node]) => ({
          startLineNumber: node.loc.start.line,
          startColumn: node.loc.start.column + 1,
          endLineNumber: node.loc.end.line,
          endColumn: node.loc.end.column + 1,
        })),
    },
    branches: {
      total: flatBranches.length,
      covered: flatBranches.filter((item) => item.count > 0).length,
      uncovered: flatBranches
        .filter((item) => item.count === 0)
        .map(({ node, branch }) => ({
          startLineNumber: node.loc.start.line,
          startColumn: node.loc.start.column + 1,
          ...(node.type === "SwitchCase"
            ? node.test
              ? {
                  endLineNumber: node.test.loc.end.line,
                  // Expand the range to include `:`.
                  endColumn: node.test.loc.end.column + 2,
                }
              : {
                  endLineNumber: node.loc.start.line,
                  // `default:`
                  endColumn: node.loc.start.column + 9,
                }
            : node.type === "CatchClause"
            ? {
                endLineNumber: node.loc.start.line,
                // Set the range to `catch`.
                endColumn: node.loc.start.column + 6,
              }
            : {
                endLineNumber: node.loc.end.line,
                endColumn: node.loc.end.column + 1,
              }),
          branch,
        })),
    },
    functions: {
      total: functions.size,
      covered: Array.from(functions.values()).filter((count) => count > 0)
        .length,
      uncovered: Array.from(functions.entries())
        .filter((entry) => entry[1] === 0)
        .map(([node]) => ({
          startLineNumber: node.loc.start.line,
          startColumn: node.loc.start.column + 1,
          endLineNumber: node.loc.end.line,
          endColumn: node.loc.end.column + 1,
        })),
    },
    lines: {
      total: lines.size,
      covered: Array.from(lines.values()).filter((line) => line.count > 0)
        .length,
      counts: lines,
    },
  };
}
