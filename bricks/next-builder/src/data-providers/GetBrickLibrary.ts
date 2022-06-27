import { RequestCustomOptions } from "@next-core/brick-http";
import { getRuntime, i18nText } from "@next-core/brick-kit";
import { BrickConf, MenuIcon } from "@next-core/brick-types";
import { createProviderClass, pipes } from "@next-core/brick-utils";
import {
  InstanceApi_postSearchV3,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { BootstrapV2Api_brickPackageInfo } from "@next-sdk/api-gateway-sdk";
import { buildBricks } from "../shared/storyboard/buildStoryboardV2";
import { getBaseGraphParams } from "../shared/storyboard/getBaseGraphParams";
import { fetchFullData } from "./utils/fetchFullData";

export interface BrickLibraryItem {
  type: "brick" | "template" | "customTemplate" | "provider" | "snippet";
  id: string;
  title: string;
  isHostedSnippet?: boolean;
  bricks?: BrickConf[];
  category?: string;
  description?: string;
  icon?: MenuIcon;
  thumbnail?: string;
  editor?: string;
  editorProps?: Record<string, unknown>;
  nodeId?: string;
  $searchTextPool?: string[];
}

export interface GetBrickLibraryParams {
  // Project instanceId.
  projectId: string;
  ignoreSnippets?: boolean;
}

export async function GetBrickLibrary(
  { projectId, ignoreSnippets }: GetBrickLibraryParams,
  options?: RequestCustomOptions
): Promise<BrickLibraryItem[]> {
  const flags = getRuntime().getFeatureFlags();
  const installedBricksEnabled = flags["next-builder-installed-bricks"];

  const [
    brickPackageInfo,
    customTemplates,
    installedBricks,
    installedSnippets,
    hostedSnippets,
  ] = await Promise.all([
    BootstrapV2Api_brickPackageInfo(),
    InstanceApi_postSearchV3(
      "STORYBOARD_TEMPLATE",
      {
        fields: ["templateId", "id", "layerType"],
        page_size: 3000,
        query: {
          "project.instanceId": projectId,
          isExport: true,
        },
      },
      options
    ),
    installedBricksEnabled
      ? fetchFullData(
          "INSTALLED_BRICK_ATOM@EASYOPS",
          {
            fields: [
              "id",
              "text",
              "category",
              "description",
              "icon",
              "editor",
              "editorProps",
              "thumbnail",
              "layerType",
            ],
            page_size: 3000,
          },
          options
        )
      : { list: [] },
    !ignoreSnippets && installedBricksEnabled
      ? InstanceApi_postSearchV3(
          "INSTALLED_BRICK_SNIPPET@EASYOPS",
          {
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
          },
          options
        )
      : { list: [] },
    !ignoreSnippets && installedBricksEnabled
      ? InstanceGraphApi_traverseGraphV2(
          getBaseGraphParams({
            projectId,
            objectId: "STORYBOARD_SNIPPET",
          }),
          options
        )
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

  return brickPackageInfo.bricks
    .map<BrickLibraryItem>((name) => {
      if (name.startsWith("providers-of-")) {
        return {
          type: "provider",
          id: name,
          title: getBrickLastName(name),
          $searchTextPool: [name.toLowerCase()],
        };
      } else {
        const type = brickPackageInfo.providers?.includes(name)
          ? "provider"
          : "brick";
        const installedBrick =
          installedBricksEnabled &&
          type === "brick" &&
          installedBricksMap.get(name);
        return {
          type,
          id: name,
          ...(installedBrick
            ? {
                title: i18nText(installedBrick.text) || getBrickLastName(name),
                category: installedBrick.category,
                description: i18nText(installedBrick.description),
                layerType: installedBrick.layerType || "brick",
                thumbnail: installedBrick.thumbnail,
                icon: installedBrick.icon,
                editor: installedBrick.editor,
                editorProps: installedBrick.editorProps,
                $searchTextPool: (installedBrick.text
                  ? (Object.values(installedBrick.text) as string[]).filter(
                      Boolean
                    )
                  : []
                )
                  .concat(name)
                  .map((text) => text.toLocaleLowerCase()),
              }
            : {
                title: getBrickLastName(name),
                $searchTextPool: [name.toLowerCase()],
              }),
        };
      }
    })
    .concat(
      customTemplates.list.map<BrickLibraryItem>((item) => ({
        type: "customTemplate",
        id: item.templateId,
        title: item.templateId,
        nodeId: item.id,
        layerType: item.layerType,
        $searchTextPool: [item.templateId.toLowerCase()],
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
        $searchTextPool: (item.text
          ? (Object.values(item.text) as string[]).filter(Boolean)
          : []
        )
          .concat(item.id)
          .map((text) => text.toLocaleLowerCase()),
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
          isHostedSnippet: true,
          category: item.category,
          description: i18nText(item.description),
          thumbnail: item.thumbnail,
          bricks: buildBricks(item.children),
          layerType: item.layerType,
          nodeId: item.id,
          $searchTextPool: (item.text
            ? (Object.values(item.text) as string[]).filter(Boolean)
            : []
          )
            .concat(item.snippetId)
            .map((text) => text.toLocaleLowerCase()),
        })),
      brickPackageInfo.templates.map<BrickLibraryItem>((name) => ({
        type: "template",
        id: name,
        title: getBrickLastName(name),
        $searchTextPool: [name.toLowerCase()],
      }))
    );
}

function getBrickLastName(brickName: string): string {
  return brickName.split(".").pop();
}

customElements.define(
  "next-builder.provider-get-brick-library",
  createProviderClass(GetBrickLibrary)
);
