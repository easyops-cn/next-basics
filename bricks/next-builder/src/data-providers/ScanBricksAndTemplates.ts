import { paramCase, snakeCase, pascalCase } from "change-case";
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
  contracts: ContractDeclaration[];
}

interface ContractDeclaration {
  contract: string;
  version: string;
}

export function ScanBricksAndTemplates({
  storyboard,
}: ScanBricksAndTemplatesParams): ScanBricksAndTemplatesResult {
  const processors = scanProcessorsInStoryboard(storyboard);
  const { bricks, customApis } = scanStoryboard(storyboard);
  const contracts: ContractDeclaration[] = [];

  for (const brick of bricks) {
    const match = brick.match(/^providers-of-([^.]+)\.(.+?)-api-(.+)$/);
    if (match) {
      contracts.push({
        contract: `easyops.api.${snakeCase(match[1])}.${snakeCase(
          match[2]
        )}.${pascalCase(match[3])}`,
        version: "*",
      });
    }
  }

  return {
    apis: mapCustomApisToNameAndNamespace(customApis),
    bricks,
    templates: scanTemplatesInStoryboard(storyboard),
    processors,
    processorPackages: uniq(
      // The package name should always be the param-case of processor's namespace.
      processors.map((item) => paramCase(item.split(".")[0]))
    ),
    contracts,
  };
}

customElements.define(
  "next-builder.provider-scan-bricks-and-templates",
  createProviderClass(ScanBricksAndTemplates)
);
