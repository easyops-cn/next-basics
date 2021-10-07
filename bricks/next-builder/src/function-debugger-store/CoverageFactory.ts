import { FunctionCoverageCollector } from "@next-core/brick-kit";
import { EstreeNode } from "@next-core/brick-utils";
import {
  FunctionCoverage,
  FunctionCoverageBranchName,
} from "./reducers/interfaces";

export function CoverageFactory(): {
  createCollector(fn: string): FunctionCoverageCollector;
  resetCoverageByFunction(fn: string): void;
  coverageByFunction: Map<string, FunctionCoverage>;
} {
  const coverageByFunction = new Map<string, FunctionCoverage>();
  function createCollector(fn: string): FunctionCoverageCollector {
    // These are maps of AST node to invocation count.
    const statements: FunctionCoverage["statements"] = new Map();
    const branches: FunctionCoverage["branches"] = new Map();
    const functions: FunctionCoverage["functions"] = new Map();

    // First, collect relevant nodes through the AST during function parse.
    function beforeVisit(node: EstreeNode): void {
      switch (node.type) {
        // Functions:
        case "ArrowFunctionExpression":
          if (node.expression) {
            statements.set(node.body, 0);
          }
        // eslint-disable-next-line no-fallthrough
        case "FunctionDeclaration":
        case "FunctionExpression":
          functions.set(node, 0);
          break;
        // Expressions:
        case "AssignmentPattern":
        case "LogicalExpression":
          // For a node contains ordinary branches, record the counts only,
          // since all branches are always exist, and the counts equal to how
          // many times the relevant nodes have been invoked.
          branches.set(node.right, 0);
          break;
        case "ConditionalExpression":
          branches.set(node.consequent, 0);
          branches.set(node.alternate, 0);
          break;
        // Statements:
        case "IfStatement":
          statements.set(node, 0);
          // For `IfStatement`, the alternate branch maybe not presented, so
          // we explicitly count them by each branch.
          branches.set(
            node,
            new Map([
              ["if", 0],
              ["else", 0],
            ])
          );
          break;
        case "SwitchCase":
          branches.set(node, 0);
          break;
        case "TryStatement":
          statements.set(node, 0);
          // Notice: we also treat the `catch` as a branch, although tools
          // like Jest treat it not.
          branches.set(node.handler, 0);
          break;
        case "VariableDeclaration":
          for (const declarator of node.declarations) {
            if (declarator.init) {
              statements.set(declarator.init, 0);
            }
          }
          break;
        case "BreakStatement":
        case "ContinueStatement":
        case "DoWhileStatement":
        case "ExpressionStatement":
        case "ForInStatement":
        case "ForOfStatement":
        case "ForStatement":
        case "ReturnStatement":
        case "SwitchStatement":
        case "ThrowStatement":
        case "WhileStatement":
          statements.set(node, 0);
      }
    }

    // Then, count invocations of these relevant AST nodes,
    // during function execution.
    function beforeEvaluate(node: EstreeNode): void {
      const statementCount = statements.get(node);
      if (statementCount !== undefined) {
        statements.set(node, statementCount + 1);
      }
      const branchCount = branches.get(node);
      if (typeof branchCount === "number") {
        branches.set(node, branchCount + 1);
      }
    }

    function beforeCall(node: EstreeNode): void {
      const functionCount = functions.get(node);
      if (functionCount !== undefined) {
        functions.set(node, functionCount + 1);
      }
      // Should never reach here.
    }

    function beforeBranch(
      node: EstreeNode,
      branchName: FunctionCoverageBranchName
    ): void {
      // Only special branches with a branch name will be here.
      const branch = branches.get(node);
      if (branch instanceof Map) {
        const branchCount = branch.get(branchName);
        branch.set(branchName, branchCount + 1);
      }
      // Should never reach here.
    }

    coverageByFunction.set(fn, {
      statements,
      branches,
      functions,
    });

    return {
      beforeVisit,
      beforeEvaluate,
      beforeCall,
      beforeBranch,
    };
  }

  // Every time before running tests, reset the coverage.
  // Notice: only reset the counts.
  function resetCoverageByFunction(fn: string): void {
    const coverage = coverageByFunction.get(fn);
    if (!coverage) {
      return;
    }
    for (const node of coverage.statements.keys()) {
      coverage.statements.set(node, 0);
    }
    for (const [node, state] of coverage.branches.entries()) {
      if (typeof state === "number") {
        coverage.branches.set(node, 0);
      } else {
        for (const branchName of state.keys()) {
          state.set(branchName, 0);
        }
      }
    }
    for (const node of coverage.functions.keys()) {
      coverage.functions.set(node, 0);
    }
  }

  return {
    createCollector,
    resetCoverageByFunction,
    coverageByFunction,
  };
}
