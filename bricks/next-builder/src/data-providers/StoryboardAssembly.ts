import { createProviderClass } from "@next-core/brick-utils";
import { StoryboardAssembly } from "../shared/storyboard/StoryboardAssembly";

customElements.define(
  "next-builder.provider-storyboard-assembly",
  createProviderClass(StoryboardAssembly)
);
