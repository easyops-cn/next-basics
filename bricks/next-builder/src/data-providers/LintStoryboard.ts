import { Storyboard } from "@next-core/brick-types";
import { createProviderClass } from "@next-core/brick-utils";
import type { StoryboardError } from "./chunks/doLintStoryboard";

export interface LintStoryboardParams {
  storyboard: Storyboard;
  brickNextVersion?: number;
}

export async function LintStoryboard({
  storyboard,
  brickNextVersion,
}: LintStoryboardParams): Promise<StoryboardError[]> {
  // `require("crypto").createHash("sha1").update(packageName).digest("hex").substr(0, 4)`
  // returns "2a2a" when `packageName` is "next-builder".
  const { doLintStoryboard } = await import(
    /* webpackChunkName: "chunks/lintStoryboard.2a2a" */
    "./chunks/doLintStoryboard"
  );
  return doLintStoryboard(storyboard, brickNextVersion);
}

customElements.define(
  "next-builder.provider-lint-storyboard",
  createProviderClass(LintStoryboard)
);
