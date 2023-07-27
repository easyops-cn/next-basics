import { createProviderClass } from "@next-core/brick-utils";
import {
  InstanceApi_createInstance,
  InstanceApi_getDetail,
  type InstanceApi_GetDetailResponseBody,
} from "@next-sdk/cmdb-sdk";
import { ContextConf } from "@next-core/brick-types";
import { PasteBricks } from "./PasteBricks";

export interface CreateThemePageParams {
  // Project instance ID.
  projectId: string;
  appId: string;
  pageTypeId: string;
  name: string;
  thumbnail?: string;
  locales?: unknown;
  pageTemplate?: pageTemplate;
  sourceProjectId?: string;
}

interface instaceBody {
  id: string;
  instanceId: string;
}
interface pageTemplate {
  snippet: instaceBody[];
}

const STORYBOARD_SNIPPET = "STORYBOARD_SNIPPET";
const STORYBOARD_THEME_PAGE = "STORYBOARD_THEME_PAGE";

export async function CreateThemePage({
  projectId,
  appId,
  pageTypeId,
  name,
  thumbnail,
  locales,
  pageTemplate,
  sourceProjectId,
}: CreateThemePageParams): Promise<unknown> {
  // Currently, There is a bug when creating multiple instances of
  // sub-models which have the same parent which has an auto-increment field.
  // So we create the template and snippet in sequence.

  const copyBricks = async ({
    snippetId,
    copyData,
  }: {
    snippetId: string;
    copyData: {
      snippet: InstanceApi_GetDetailResponseBody;
    };
  }): Promise<boolean> => {
    const { snippet = {} } = copyData;
    const copySnippetIds: instaceBody[] =
      snippet.children?.map((item: Record<string, unknown>) => ({
        id: item.id,
        instanceId: item.instanceId,
      })) || [];

    await Promise.all(
      copySnippetIds.map((item) =>
        PasteBricks({
          newAppId: appId,
          newProjectInstanceId: projectId,
          newParentBrickId: snippetId,
          sourceBrickId: item.id,
          sourceProjectInstanceId: sourceProjectId,
          sourceBrickInstanceId: item.instanceId,
        })
      )
    );

    return true;
  };

  let snippetContext: ContextConf[];
  let snippetBaseData;
  if (pageTemplate) {
    if (pageTemplate.snippet[0]?.id) {
      snippetBaseData = await InstanceApi_getDetail(
        "STORYBOARD_SNIPPET",
        pageTemplate.snippet[0].instanceId,
        {
          fields: "context,children",
        }
      );
    }
    snippetContext = snippetBaseData?.context;
  }

  const snippet = await InstanceApi_createInstance(STORYBOARD_SNIPPET, {
    project: projectId,
    appId,
    snippetId: `page-${pageTypeId}`,
    type: "snippet",
    text: {
      en: name,
      zh: name,
    },
    context: snippetContext,
  });

  if (pageTemplate) {
    await copyBricks({
      snippetId: snippet.id,
      copyData: {
        snippet: snippetBaseData,
      },
    });
  }

  await InstanceApi_createInstance(STORYBOARD_THEME_PAGE, {
    project: projectId,
    pageTypeId,
    name,
    thumbnail,
    locales,
    snippet: snippet.instanceId,
  });

  return true;
}

customElements.define(
  "next-builder.provider-create-theme-page",
  createProviderClass(CreateThemePage)
);
