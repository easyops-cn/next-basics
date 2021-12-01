import { I18nData, Storyboard } from "@next-core/brick-types";
import { createProviderClass, scanStoryboard } from "@next-core/brick-utils";

export interface LintStoryboardParams {
  storyboard: Storyboard;
}

export type StoryboardErrorCode = "SCRIPT_BRICK";

export interface StoryboardError {
  type?: "warn" | "error";
  code: StoryboardErrorCode;
  message: I18nData;
}

export function LintStoryboard({
  storyboard,
}: LintStoryboardParams): StoryboardError[] {
  const { bricks } = scanStoryboard(storyboard);
  const errors: StoryboardError[] = [];
  if (bricks.includes("basic-bricks.script-brick")) {
    errors.push({
      code: "SCRIPT_BRICK",
      message: {
        zh: "您正在使用 `basic-bricks.script-brick`，而它被认为不可维护、兼容性差。请使用微应用函数或自定义处理函数来代替。",
        en: "You're using `basic-bricks.script-brick` which is considered unmaintainable and poorly compatible. Please use storyboard functions or custom processors instead.",
      },
    });
  }
  return errors;
}

customElements.define(
  "next-builder.provider-lint-storyboard",
  createProviderClass(LintStoryboard)
);
