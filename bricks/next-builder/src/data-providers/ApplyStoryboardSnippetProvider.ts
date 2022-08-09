import { createProviderClass } from "@next-core/brick-utils";
import { ApplyStoryBoardSnippet } from "./ApplyStoryboardSnippet";

customElements.define(
  "next-builder.provider-apply-storyboard-snippet",
  createProviderClass(ApplyStoryBoardSnippet)
);
