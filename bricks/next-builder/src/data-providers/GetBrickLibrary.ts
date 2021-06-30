import { developHelper, getRuntime, i18nText } from "@next-core/brick-kit";
import { BrickConf, MenuIcon } from "@next-core/brick-types";
import { createProviderClass, pipes } from "@next-core/brick-utils";
import {
  InstanceApi_postSearchV3,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { buildBricks } from "../shared/storyboard/buildStoryboard";

export interface BrickLibraryItem {
  type: "brick" | "template" | "customTemplate" | "provider" | "snippet";
  id: string;
  title: string;
  isHostedSnippets?: boolean;
  bricks?: BrickConf[];
  category?: string;
  description?: string;
  icon?: MenuIcon;
  thumbnail?: string;
  nodeId?: string;
}

export interface GetBrickLibraryParams {
  // Project instanceId.
  projectId: string;
}

export async function GetBrickLibrary({
  projectId,
}: GetBrickLibraryParams): Promise<BrickLibraryItem[]> {
  const flags = getRuntime().getFeatureFlags();
  const installedBricksEnabled = flags["next-builder-installed-bricks"];
  const installedSnippetsEnabled = flags["next-builder-installed-snippets"];
  const hostedSnippetsEnabled = flags["next-builder-hosted-snippets"];

  const [customTemplates, installedBricks, installedSnippets, hostedSnippets] =
    await Promise.all([
      InstanceApi_postSearchV3("STORYBOARD_TEMPLATE", {
        fields: ["templateId", "id", "layerType"],
        page_size: 3000,
        query: {
          "project.instanceId": projectId,
        },
      }),
      installedBricksEnabled
        ? InstanceApi_postSearchV3("INSTALLED_BRICK_ATOM@EASYOPS", {
            fields: ["id", "text", "category", "description", "icon"],
            page_size: 3000,
          })
        : { list: [] },
      installedBricksEnabled || installedSnippetsEnabled
        ? InstanceApi_postSearchV3("INSTALLED_BRICK_SNIPPET@EASYOPS", {
            fields: [
              "id",
              "text",
              "category",
              "description",
              "thumbnail",
              "bricks",
              "layerType",
            ],
            page_size: 3000,
          })
        : { list: [] },
      installedBricksEnabled || hostedSnippetsEnabled
        ? InstanceGraphApi_traverseGraphV2({
            child: [
              {
                child: [
                  {
                    depth: -1,
                    parentOut: "children",
                    select_fields: ["*"],
                  },
                ],
                depth: -1,
                parentOut: "children",
                select_fields: ["*"],
              },
            ],
            object_id: "STORYBOARD_SNIPPET",
            query: {
              "project.instanceId": projectId,
            },
            select_fields: ["*"],
          })
        : {
            topic_vertices: [],
            vertices: [],
            edges: [],
          },
    ]);

  const installedBricksMap = new Map<string, Record<string, any>>();

  for (const brick of installedBricks.list) {
    installedBricksMap.set(brick.id, brick);
  }

  return developHelper
    .getBrickPackages()
    .flatMap<BrickLibraryItem>((pkg) =>
      pkg.filePath.startsWith("bricks/providers-of-")
        ? pkg.bricks.map((name) => ({
            type: "provider",
            id: name,
            title: getBrickLastName(name),
          }))
        : pkg.bricks.map((name) => {
            const type = pkg.providers?.includes(name) ? "provider" : "brick";
            const installedBrick =
              installedBricksEnabled &&
              type === "brick" &&
              installedBricksMap.get(name);
            return {
              type,
              id: name,
              ...(installedBrick
                ? {
                    title: i18nText(installedBrick.text),
                    category: installedBrick.category,
                    description: i18nText(installedBrick.description),
                    icon: installedBrick.icon,
                  }
                : {
                    title: getBrickLastName(name),
                  }),
            };
          })
    )
    .concat(
      customTemplates.list.map<BrickLibraryItem>((item) => ({
        type: "customTemplate",
        id: item.templateId,
        title: item.templateId,
        nodeId: item.id,
        layerType: item.layerType,
      })),
      installedSnippets.list.map<BrickLibraryItem>((item) => ({
        type: "snippet",
        id: item.id,
        title: i18nText(item.text) || item.id,
        category: item.category,
        description: i18nText(item.description),
        thumbnail: item.thumbnail,
        bricks: item.bricks,
        layerType: item.layerType,
      })),
      pipes
        .graphTree(hostedSnippets as pipes.GraphData, {
          sort: {
            key: "sort",
            order: 1,
          },
        })
        .map<BrickLibraryItem>((item) => ({
          type: "snippet",
          id: item.snippetId,
          title: i18nText(item.text) || item.snippetId,
          isHostedSnippets: true,
          category: item.category,
          description: i18nText(item.description),
          thumbnail: item.thumbnail,
          bricks: buildBricks(item.children),
          layerType: item.layerType,
          nodeId: item.id,
        })),
      developHelper.getTemplatePackages().flatMap<BrickLibraryItem>((pkg) =>
        pkg.templates.map((name) => ({
          type: "template",
          id: name,
          title: getBrickLastName(name),
        }))
      )
    );
}

function getBrickLastName(brickName: string): string {
  return brickName.split(".").pop();
}

customElements.define(
  "next-builder.provider-get-brick-library",
  createProviderClass(GetBrickLibrary)
);
