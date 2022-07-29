import { ScanBricksAndTemplates } from "./ScanBricksAndTemplates";
import { createProviderClass } from "@next-core/brick-utils";

customElements.define(
  "next-builder.provider-scan-bricks-and-templates",
  createProviderClass(ScanBricksAndTemplates)
);
