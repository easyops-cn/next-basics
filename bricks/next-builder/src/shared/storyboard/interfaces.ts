import {
  RouteConf,
  CustomTemplateProxy,
  CustomTemplate,
  MetaI18n,
  BuilderRouteNode,
  BuilderBrickNode,
  StoryboardFunction,
  MockRule,
  CustomTemplateState,
  Contract,
  Mocks,
} from "@next-core/brick-types";
import { InstanceApi_GetDetailResponseBody } from "@next-sdk/cmdb-sdk";
import { MenuNode } from "@next-core/brick-utils";

export interface StoryboardAssemblyParamsBase {
  // The instanceId of a project.
  projectId: string;
  storyboardType?: StoryboardType;
  useTheme?: boolean;
}

export interface PreStoryboardAssemblyParams
  extends StoryboardAssemblyParamsBase {
  options?: PreStoryboardAssemblyOptions;
}

export interface PreStoryboardAssemblyOptions {
  /**
   * Whether to assemble minimal storyboard only, ignoring menus, i18n, etc,
   * It will ignore the request for project info if enabled.
   */
  minimal?: boolean;

  storyboardType?: StoryboardType;
}

export interface StoryboardAssemblyParams extends StoryboardAssemblyParamsBase {
  keepDeadConditions?: boolean;
  options?: BuildOptions;
  ignoreContract?: boolean;
}

export type StoryboardType = "micro-app" | "theme-template";

export interface StoryboardAssemblyResult {
  // The auto-incremental id of a project, such as `P-001`.
  projectId: string;

  storyboard: StoryboardToBuild;
}

export interface PreStoryboardAssemblyResult {
  minimalBuildInfo: Pick<BuildInfo, "routeList" | "templateList">;
  projectInfo?: InstanceApi_GetDetailResponseBody;
  mocks?: MockRule[];
}

export interface WorkflowField {
  name: string;
  id: string;
  appId: string;
  variables?: any[];
  triggerMethod: "manual" | "dataChanged" | "periodic";
  schedulerConfig?: {
    crontab: string;
    disable?: 0 | 1;
  };
  dataChangedConfig?: {
    objectId: string;
    triggerEvent: string;
  };
}

export interface UserGroup {
  name: string;
  description?: string;
}

export interface BuildInfo {
  routeList: BuilderRouteNode[];
  brickList: BuilderBrickNode[];
  templateList?: TemplateNode[];
  menus?: MenuNode[];
  workflows?: WorkflowField[];
  userGroups?: UserGroup[];
  i18n?: I18nNode[];
  dependsAll?: boolean;
  options?: BuildOptions;
  functions?: FunctionNode[];
  mocks?: Mocks;
  dependencies?: {
    name: string;
    constraint: string;
  }[];
  app?: {
    id: string;
    homepage: string;
    name: string;
  };
  ignoreContract?: boolean;
}

export type BuildInfoV2 = Omit<BuildInfo, "brickList">;

export interface FunctionNode {
  name: string;
  source: string;
  typescript?: boolean;
  description?: string;
}

export interface BuildOptions {
  /**
   * When `keepIds` is true, keep node ids as `Symbol.for("nodeId")`,
   * and node instance ids as `Symbol.for("nodeInstanceId")` in result.
   *
   * This is useful to let developers do something with node id
   * after found specific nodes in an assembled storyboard.
   */
  keepIds?: boolean;
}

export interface TemplateNode {
  templateId: string;
  id?: string;
  children?: BuilderBrickNode[];
  proxy?: CustomTemplateProxy;
  state?: CustomTemplateState[];
}

export interface StoryboardToBuild {
  routes: RouteConf[];
  meta: {
    customTemplates?: CustomTemplate[];
    menus?: Record<string, unknown>[];
    i18n?: MetaI18n;
    workflows?: WorkflowField[];
    userGroups?: UserGroup[];
    functions?: ProcessedStoryboardFunction[];
    mocks?: Mocks;
    contracts?: Contract[];
  };

  dependsAll?: boolean;
}

export type ProcessedStoryboardFunction = Pick<
  FunctionNode,
  "name" | "source" | "typescript"
> & {
  /** 依赖的其他函数 */
  deps?: string[];
  /** 是否调用了 `PERMISSIONS.check` */
  perm?: boolean;
};

export interface I18nNode {
  name: string;
  en: string;
  zh: string;
}

export interface ImageNode {
  name: string;
  url: string;
}

export interface FunctionNode extends StoryboardFunction {
  tests?: unknown[];
}
