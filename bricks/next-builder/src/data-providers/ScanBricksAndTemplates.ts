import { paramCase } from "change-case";
import { uniq } from "lodash";
import { JSON_SCHEMA, safeDump } from "js-yaml";
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
  version?: string;
  dependencies?: {
    name: string;
    constraint: string;
  }[];
}

interface ScanBricksAndTemplatesResult {
  bricks: string[];
  apis: CustomApiInfo[];
  templates: string[];
  processors: string[];
  processorPackages: string[];
  contractData?: string;
}

interface ImplementedContract extends ContractBase {
  type: "route";
  path: string;
  deps?: DependContract[];
}

export type DependContract =
  | DependContractOfApi
  | DependContractOfBrick
  | DependContractOfTemplate;

export interface DependContractOfApi extends ContractBase {
  type: "contract";
  contract: string;
}

interface DependContractOfBrick extends ContractBase {
  type: "brick";
  brick: string;
}

interface DependContractOfTemplate extends ContractBase {
  type: "template";
  template: string;
}

interface ContractBase {
  version: string;
}

export function ScanBricksAndTemplates({
  storyboard,
  version,
  dependencies,
}: ScanBricksAndTemplatesParams): ScanBricksAndTemplatesResult {
  const processors = scanProcessorsInStoryboard(storyboard);
  const { bricks, customApis } = scanStoryboard(storyboard);
  const templates = scanTemplatesInStoryboard(storyboard);

  const legacyCustomApis: string[] = [];
  const flowApis: string[] = [];

  for (const api of customApis) {
    (api.includes(":") ? flowApis : legacyCustomApis).push(api);
  }

  let contractData: string;
  if (version && storyboard.app) {
    const dependenciesMap = new Map(
      dependencies?.map(({ name, constraint }) => [name, constraint]) ?? []
    );

    const deps: DependContract[] = [];
    for (const api of flowApis) {
      const [contract, v] = api.split(":");
      deps.push({
        type: "contract",
        contract: contract.replace("@", "."),
        version: v,
      });
    }

    for (const brick of bricks) {
      deps.push({
        type: "brick",
        brick,
        version: dependenciesMap.get(`${brick.split(".")[0]}-NB`) ?? "*",
      });
    }

    for (const template of templates) {
      deps.push({
        type: "template",
        template,
        version: dependenciesMap.get(`${template.split(".")[0]}-NT`) ?? "*",
      });
    }

    const contracts: ImplementedContract[] = [
      {
        type: "route",
        path: storyboard.app.homepage,
        version,
        deps,
      },
    ];
    contractData = safeDump(
      { contracts },
      {
        indent: 2,
        schema: JSON_SCHEMA,
        skipInvalid: true,
        noRefs: true,
        noCompatMode: true,
      }
    );
  }

  return {
    apis: mapCustomApisToNameAndNamespace(legacyCustomApis),
    bricks,
    templates,
    processors,
    processorPackages: uniq(
      // The package name should always be the param-case of processor's namespace.
      processors.map((item) => paramCase(item.split(".")[0]))
    ),
    contractData,
  };
}

customElements.define(
  "next-builder.provider-scan-bricks-and-templates",
  createProviderClass(ScanBricksAndTemplates)
);
