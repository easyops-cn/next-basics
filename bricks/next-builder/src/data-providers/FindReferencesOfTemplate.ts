import {
  BrickConf,
  RouteConf,
  RouteConfOfBricks,
} from "@next-core/brick-types";
import { createProviderClass } from "@next-core/brick-utils";
import {
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "../shared/storyboard/buildStoryboard";
import { minimalStoryboardAssembly } from "../shared/storyboard/minimalStoryboardAssembly";

export interface FindReferencesOfTemplateParams {
  templateId: string;
  templateList: TemplateWithProject[];
  projectInstanceId: string;
}

export interface TemplateWithProject {
  templateId: string;
  project: PartialMicroAppProjectInfo[];
}

export interface TemplateReference {
  project: PartialMicroAppProjectInfo;
  parentType: "route" | "customTemplate";
  parentId: string;
  parentDisplayName: string;
  brickInstanceId: string;
  brickDisplayName: string;
}

export type TemplateReferenceParentPartial = Pick<
  TemplateReference,
  "parentType" | "parentId" | "parentDisplayName"
>;

export interface PartialMicroAppProjectInfo {
  appId: string;
  instanceId: string;
  name: string;
}

export async function FindReferencesOfTemplate({
  templateId,
  templateList,
  projectInstanceId,
}: FindReferencesOfTemplateParams): Promise<TemplateReference[]> {
  const projects = templateList.find(
    (item) => item.templateId === templateId
  )?.project;

  // Returns early if no templates were found.
  if (!projects?.length) {
    return [];
  }

  const storyboardsWithProject = await Promise.all(
    projects
      .slice()
      .sort(
        // Put current project before any other projects.
        (a, b) =>
          Number(b.instanceId === projectInstanceId) -
          Number(a.instanceId === projectInstanceId)
      )
      .map(async (project) => ({
        project,
        storyboard: await minimalStoryboardAssembly({
          projectId: project.instanceId,
          options: { keepIds: true },
        }),
      }))
  );

  const collections: TemplateReference[] = [];

  for (const item of storyboardsWithProject) {
    collectReferencesInRouteConfs(
      item.storyboard.routes,
      templateId,
      collections,
      item.project
    );
    for (const tpl of item.storyboard.meta.customTemplates ?? []) {
      collectReferencesInBrickConfs(
        tpl.bricks,
        templateId,
        collections,
        item.project,
        {
          parentType: "customTemplate",
          parentId: (tpl as any)[symbolForNodeId],
          parentDisplayName: tpl.name,
        }
      );
    }
  }

  return collections;
}

function collectReferencesInRouteConfs(
  routes: RouteConf[],
  templateId: string,
  collections: TemplateReference[],
  project: PartialMicroAppProjectInfo
): void {
  if (Array.isArray(routes)) {
    for (const routeConf of routes) {
      if (routeConf.type === "routes") {
        collectReferencesInRouteConfs(
          routeConf.routes,
          templateId,
          collections,
          project
        );
      } else {
        collectReferencesInBrickConfs(
          (routeConf as RouteConfOfBricks).bricks,
          templateId,
          collections,
          project,
          {
            parentType: "route",
            parentId: (routeConf as any)[symbolForNodeId],
            parentDisplayName: routeConf.alias || routeConf.path,
          }
        );
      }
    }
  }
}

function collectReferencesInBrickConfs(
  bricks: BrickConf[],
  templateId: string,
  collections: TemplateReference[],
  project: PartialMicroAppProjectInfo,
  parentPartial: TemplateReferenceParentPartial
): void {
  if (Array.isArray(bricks)) {
    for (const brickConf of bricks) {
      collectReferencesInBrickConf(
        brickConf,
        templateId,
        collections,
        project,
        parentPartial
      );
    }
  }
}

function collectReferencesInBrickConf(
  brickConf: BrickConf,
  templateId: string,
  collections: TemplateReference[],
  project: PartialMicroAppProjectInfo,
  parentPartial: TemplateReferenceParentPartial
): void {
  if (brickConf.brick === templateId) {
    collections.push({
      ...parentPartial,
      project,
      brickInstanceId: (brickConf as any)[symbolForNodeInstanceId],
      brickDisplayName: (brickConf as any).alias || brickConf.brick,
    });
  }
  if (brickConf.slots) {
    for (const slotConf of Object.values(brickConf.slots)) {
      if (slotConf.type === "routes") {
        collectReferencesInRouteConfs(
          slotConf.routes,
          templateId,
          collections,
          project
        );
      } else {
        collectReferencesInBrickConfs(
          slotConf.bricks,
          templateId,
          collections,
          project,
          parentPartial
        );
      }
    }
  }
}

customElements.define(
  "next-builder.provider-find-references-of-template",
  createProviderClass(FindReferencesOfTemplate)
);
