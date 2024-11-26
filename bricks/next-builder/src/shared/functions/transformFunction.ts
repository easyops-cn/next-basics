import { StoryboardFunction } from "@next-core/brick-types";
import { precookFunction } from "@next-core/brick-utils";

const NativeMode = "native mode";

/**
 * 编译后的函数
 */
export interface TransformedFunction {
  /** 编译后的 JS 代码 */
  source: string;
  /** 要访问的全局对象列表 */
  globals: string[];
}

export type FunctionToBeTransformed = Pick<
  StoryboardFunction,
  "name" | "source" | "typescript"
>;

export async function transformFunction(
  fn: FunctionToBeTransformed
): Promise<TransformedFunction | undefined> {
  if (fn.source.includes(NativeMode)) {
    try {
      const result = precookFunction(fn.source, {
        cacheKey: fn,
        typescript: fn.typescript,
      });

      let hasUseNative = false;
      for (const stmt of result.function.body.body as any[]) {
        if (
          stmt.type === "ExpressionStatement" &&
          stmt.expression.type === "Literal" &&
          typeof stmt.expression.value === "string"
        ) {
          if (stmt.expression.value === NativeMode) {
            hasUseNative = true;
            break;
          }
        } else {
          break;
        }
      }

      if (hasUseNative) {
        return transform(fn, result.attemptToVisitGlobals);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Parse storyboard function "${fn.name}" failed:`, error);
    }
  }
}

async function transform(
  fn: FunctionToBeTransformed,
  attemptToVisitGlobals: Set<string>
): Promise<TransformedFunction> {
  const babel = await import("@babel/standalone");
  const result = babel.transform(fn.source, {
    ast: true,
    filename: `${fn.name}.${fn.typescript ? "ts" : "js"}`,
    inputSourceMap: false,
    sourceType: "script",
    presets: [
      [
        "env",
        {
          targets: {
            chrome: "79",
            firefox: "71",
            safari: "13",
          },
          modules: false,
          ignoreBrowserslistConfig: true,
        },
      ],
      ...(fn.typescript ? ["typescript"] : []),
    ],
  });

  if (
    !/^\s*function\s+/.test(result.code) ||
    result.ast.program.body.length !== 1
  ) {
    throw new Error(`Unexpected transformed function: ${result.code}`);
  }

  attemptToVisitGlobals.delete("undefined");
  return {
    source: result.code,
    globals: [...attemptToVisitGlobals],
  };
}
