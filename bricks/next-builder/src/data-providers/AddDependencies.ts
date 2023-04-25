import { createProviderClass } from "@next-core/brick-utils";
import {
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { PackageAloneApi_addDependencies } from "@next-sdk/next-builder-sdk";
import walk from "../utils/walk";
import DependCache from "./utils/dependCache";

export interface AddDependenciesParams {
  projectId: string;
  rootId: string;
}

export async function AddDependencies(
  params: AddDependenciesParams
): Promise<boolean> {
  const { projectId, rootId } = params;
  const usedBricksSet = new Set<string>();
  const hadWalkTemplateList: Array<string> = [];
  let hadFetchTemplate = false;
  let templatesList: Array<Record<string, unknown>> = [];
  const dependCache = new DependCache(projectId);

  const fetchTemplateList = async (): Promise<
    Array<Record<string, unknown>>
  > => {
    const result = await InstanceApi_getDetail("PROJECT_MICRO_APP", projectId, {
      fields: ["templates.templateId", "templates.id"].join(","),
    });
    hadFetchTemplate = true;
    return result.templates;
  };

  const getUsedBrick = async (
    rootId: string,
    set: Set<string>
  ): Promise<void> => {
    const graphData = await InstanceGraphApi_traverseGraphV2({
      object_id: "STORYBOARD_NODE",
      query: {
        id: rootId,
      },
      select_fields: [
        "brick",
        "properties",
        "events",
        "lifeCycle",
        "context",
        "state",
      ],
      child: [
        {
          child: [
            {
              depth: -1,
              parentOut: "children",
              select_fields: ["brick"],
            },
          ],
          depth: -1,
          parentOut: "children",
          select_fields: ["brick"],
        },
      ],
    });

    const walkNodeList = graphData.topic_vertices.concat(graphData.vertices);
    for (let i = 0; i < walkNodeList.length; i++) {
      const item = walkNodeList[i];
      if ((item.brick as string)?.startsWith("tpl-")) {
        if (!hadWalkTemplateList.includes(item.brick)) {
          hadWalkTemplateList.push(item.brick);
          if (!hadFetchTemplate) {
            const list = await fetchTemplateList();
            templatesList = templatesList.concat(list);
          }
          const tpl = templatesList.find(
            (tpl) => tpl?.templateId === item.brick
          );
          tpl && (await getUsedBrick(tpl.id as string, set));
        }
      } else {
        walk(
          {
            ...item,
            properties: item.properties ? JSON.parse(item.properties) : "",
            events: item.events ? JSON.parse(item.events) : "",
            lifeCycle: item.lifeCycle ? JSON.parse(item.lifeCycle) : "",
            state: item.state ? JSON.parse(item.state) : "",
          },
          (key, value) => {
            if (
              (key === "brick" && value?.includes(".")) ||
              (key === "useProvider" &&
                typeof value === "string" &&
                !value.includes("@"))
            ) {
              usedBricksSet.add(`${(value as string).split(".")[0]}-NB`);
            }
          }
        );
      }
    }
  };

  await getUsedBrick(rootId, usedBricksSet);

  if (usedBricksSet.size) {
    await dependCache.update();
    const hadInstallBrickPackage = dependCache.getList();

    const missPackage = [...usedBricksSet.values()].filter(
      (pack) => !hadInstallBrickPackage.includes(pack)
    );
    if (missPackage.length) {
      // miss brick package
      await PackageAloneApi_addDependencies(projectId, {
        dependencies: missPackage.map((pack) => ({
          name: pack,
          actualVersion: null,
          constraint: "*",
        })),
      });
      await dependCache.update();
    }
  }

  return true;
}

customElements.define(
  "next-builder.provider-add-dependencies",
  createProviderClass(AddDependencies)
);
