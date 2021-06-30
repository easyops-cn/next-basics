import { developHelper, getRuntime, i18nText } from "@next-core/brick-kit";
import { BrickConf } from "@next-core/brick-types";
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
  thumbnail?: string;
  customTemplateRawId?: string;
}

export interface GetBrickLibraryParams {
  // Project instanceId.
  projectId: string;
}

export async function GetBrickLibrary({
  projectId,
}: GetBrickLibraryParams): Promise<BrickLibraryItem[]> {
  const flags = getRuntime().getFeatureFlags();
  const installedSnippetsEnabled = flags["next-builder-installed-snippets"];
  const hostedSnippetsEnabled = flags["next-builder-hosted-snippets"];

  const [customTemplates, installedSnippets, hostedSnippets] =
    await Promise.all([
      InstanceApi_postSearchV3("STORYBOARD_TEMPLATE", {
        fields: ["templateId", "id", "layerType"],
        page_size: 3000,
        query: {
          "project.instanceId": projectId,
        },
      }),
      installedSnippetsEnabled
        ? InstanceApi_postSearchV3("INSTALLED_BRICK_SNIPPET@EASYOPS", {
            fields: [
              "id",
              "text",
              "category",
              "thumbnail",
              "bricks",
              "layerType",
            ],
            page_size: 3000,
          })
        : { list: [] },
      hostedSnippetsEnabled
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
  return developHelper
    .getBrickPackages()
    .flatMap<BrickLibraryItem>((pkg) =>
      pkg.filePath.startsWith("bricks/providers-of-")
        ? pkg.bricks.map((name) => ({
            type: "provider",
            id: name,
            title: getBrickLastName(name),
          }))
        : pkg.bricks.map((name) => ({
            type: pkg.providers?.includes(name) ? "provider" : "brick",
            id: name,
            title: getBrickLastName(name),
          }))
    )
    .concat(
      customTemplates.list.map<BrickLibraryItem>((item) => ({
        type: "customTemplate",
        id: item.templateId,
        title: item.templateId,
        customTemplateRawId: item.id,
        layerType: item.layerType,
      })),
      installedSnippets.list.map<BrickLibraryItem>((item) => ({
        type: "snippet",
        id: item.id,
        title: i18nText(item.text) || item.id,
        category: item.category,
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
          id: item.id,
          title: i18nText(item.text) || item.snippetId,
          isHostedSnippets: true,
          category: item.category,
          thumbnail: item.thumbnail,
          bricks: buildBricks(item.children),
          layerType: item.layerType,
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
