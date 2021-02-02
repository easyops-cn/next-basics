import { paramCase } from "param-case";
import { uniq } from "lodash";
import {
  createProviderClass,
  scanTemplatesInStoryboard,
  scanStoryboard,
  mapCustomApisToNameAndNamespace,
  scanProcessorsInStoryboard,
  CustomApiInfo,
} from "@next-core/brick-utils";
import { Storyboard } from "@next-core/brick-types";

export interface ScanBricksAndTemplatesParams {
  storyboard: Storyboard;
}

interface ScanBricksAndTemplatesResult {
  bricks: string[];
  apis: CustomApiInfo[];
  templates: string[];
  processors: string[];
  processorPackages: string[];
}

export function ScanBricksAndTemplates({
  storyboard,
}: ScanBricksAndTemplatesParams): ScanBricksAndTemplatesResult {
  const processors = scanProcessorsInStoryboard(storyboard);
  const { bricks, customApis } = scanStoryboard(storyboard);
  return {
    apis: mapCustomApisToNameAndNamespace(customApis),
    bricks,
    templates: scanTemplatesInStoryboard(storyboard),
    processors,
    processorPackages: uniq(
      // The package name should always be the param-case of processor's namespace.
      processors.map((item) => paramCase(item.split(".")[0]))
    ),
  };
}

customElements.define(
  "next-builder.provider-scan-bricks-and-templates",
  createProviderClass(ScanBricksAndTemplates)
);
