import { RequestCustomOptions } from "@next-core/brick-http";
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

  const [customTemplates, installedBricks, installedSnippets, hostedSnippets] =
    await Promise.all([
      InstanceApi_postSearchV3(
        "STORYBOARD_TEMPLATE",
        {
          fields: ["templateId", "id", "layerType"],
          page_size: 3000,
          query: {
            "project.instanceId": projectId,
          },
        },
        options
      ),
      installedBricksEnabled
        ? InstanceApi_postSearchV3(
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
            {
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
            },
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

  return developHelper
    .getBrickPackages()
    .flatMap<BrickLibraryItem>((pkg) =>
      pkg.filePath.startsWith("bricks/providers-of-")
        ? pkg.bricks.map((name) => ({
            type: "provider",
            id: name,
            title: getBrickLastName(name),
            $searchTextPool: [name.toLowerCase()],
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
                    title:
                      i18nText(installedBrick.text) || getBrickLastName(name),
                    category: installedBrick.category,
                    description: i18nText(installedBrick.description),
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
          })
    )
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
      developHelper.getTemplatePackages().flatMap<BrickLibraryItem>((pkg) =>
        pkg.templates.map((name) => ({
          type: "template",
          id: name,
          title: getBrickLastName(name),
          $searchTextPool: [name.toLowerCase()],
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
