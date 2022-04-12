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
  layoutType?: LayoutEnums;
  layoutList?: string;
  pageTemplate?: pageTemplate;
  sourceProjectId?: string;
}

interface instaceBody {
  id: string;
  instanceId: string;
}
interface pageTemplate {
  snippet: instaceBody[];
  template: instaceBody[];
}

export enum LayoutEnums {
  SIDEBAR_THROUGH_HEADER = "sider-through-header",
  HEADER_THROUGH_SIDEBAR = "header-through-sider",
  HEADER = "header",
  SIDEBAR_LEFT = "sider-left",
  SIDEBAR_RIGHT = "sider-right",
  NULL = "null",
}

const EASY_VIEW_PROPERTY = {
  [LayoutEnums.SIDEBAR_THROUGH_HEADER]: {
    gridAreas: {
      header: [1, 2, 2, 3],
      sider: [1, 1, 3, 2],
      content: [2, 2, 3, 3],
    },
    gridTemplateColumns: ["auto", "1fr"],
    gridTemplateRows: ["var(--app-bar-height)", "auto"],
  },
  [LayoutEnums.HEADER_THROUGH_SIDEBAR]: {
    gridAreas: {
      header: [1, 1, 2, 3],
      sider: [2, 1, 3, 2],
      content: [2, 2, 3, 3],
    },
    gridTemplateColumns: ["auto", "1fr"],
    gridTemplateRows: ["var(--app-bar-height)", "auto"],
  },
  [LayoutEnums.HEADER]: {
    gridAreas: {
      header: [1, 1, 2, 3],
      content: [2, 1, 3, 3],
    },
    gridTemplateRows: ["var(--app-bar-height)", "auto"],
  },
  [LayoutEnums.SIDEBAR_LEFT]: {
    gridAreas: {
      sider: [1, 1, 3, 1],
      content: [1, 2, 3, 3],
    },
    gridTemplateColumns: ["auto", "1fr"],
  },
  [LayoutEnums.SIDEBAR_RIGHT]: {
    gridAreas: {
      content: [1, 1, 3, 1],
      sider: [1, 2, 3, 3],
    },
    gridTemplateColumns: ["auto", "1fr"],
  },
  [LayoutEnums.NULL]: {
    gridAreas: {
      content: [1, 1, 3, 3],
    },
  },
};

const STORYBOARD_BRICK = "STORYBOARD_BRICK";
const STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";
const STORYBOARD_SNIPPET = "STORYBOARD_SNIPPET";
const STORYBOARD_THEME_PAGE = "STORYBOARD_THEME_PAGE";

const getProxySlots = (
  layoutType: LayoutEnums
): Record<string, { ref: string; refSlot: string }> => {
  const layout = EASY_VIEW_PROPERTY[layoutType];
  return Object.fromEntries(
    Object.keys(layout.gridAreas).map((item) => [
      item,
      {
        ref: "view",
        refSlot: item,
      },
    ])
  );
};

export async function CreateThemePage({
  projectId,
  appId,
  pageTypeId,
  name,
  thumbnail,
  locales,
  layoutType,
  pageTemplate,
  sourceProjectId,
}: CreateThemePageParams): Promise<unknown> {
  const templateId = `tpl-page-${pageTypeId}`;
  // Currently, There is a bug when creating multiple instances of
  // sub-models which have the same parent which has an auto-increment field.
  // So we create the template and snippet in sequence.
  const createBricks = async ({
    templateInstanceId,
    snippetInstanceId,
  }: {
    templateInstanceId: string;
    snippetInstanceId: string;
  }): Promise<boolean> => {
    await Promise.all([
      InstanceApi_createInstance(STORYBOARD_BRICK, {
        appId,
        brick: templateId,
        type: "brick",
        mountPoint: "bricks",
        parent: snippetInstanceId,
      }),
      InstanceApi_createInstance(STORYBOARD_BRICK, {
        appId,
        brick: "basic-bricks.easy-view",
        properties: JSON.stringify(EASY_VIEW_PROPERTY[layoutType]),
        ref: "view",
        type: "brick",
        mountPoint: "bricks",
        parent: templateInstanceId,
      }),
    ]);
    return true;
  };

  const copyBricks = async ({
    templateId,
    snippetId,
    copyData,
  }: {
    templateId: string;
    snippetId: string;
    copyData: {
      theme: InstanceApi_GetDetailResponseBody;
      snippet: InstanceApi_GetDetailResponseBody;
    };
  }): Promise<boolean> => {
    const { theme = {}, snippet = {} } = copyData;
    const copyTemplateIds: instaceBody[] =
      theme.children?.map((item: Record<string, unknown>) => ({
        id: item.id,
        instanceId: item.instanceId,
      })) || [];
    const copySnippetIds: instaceBody[] =
      snippet.children?.map((item: Record<string, unknown>) => ({
        id: item.id,
        instanceId: item.instanceId,
      })) || [];

    await Promise.all(
      copyTemplateIds.map((item) =>
        PasteBricks({
          newAppId: appId,
          newProjectInstanceId: projectId,
          newParentBrickId: templateId,
          sourceBrickId: item.id,
          sourceProjectInstanceId: sourceProjectId,
          sourceBrickInstanceId: item.instanceId,
        })
      )
    );

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

  let proxy: string;
  let state: ContextConf[];
  let snippetContext: ContextConf[];
  let themeBaseData, snippetBaseData;
  if (pageTemplate) {
    [themeBaseData, snippetBaseData] = await Promise.all([
      pageTemplate.template[0]?.id &&
        InstanceApi_getDetail(
          "STORYBOARD_TEMPLATE",
          pageTemplate.template[0].instanceId,
          {
            fields: "proxy,state,children",
          }
        ),
      pageTemplate.snippet[0]?.id &&
        InstanceApi_getDetail(
          "STORYBOARD_SNIPPET",
          pageTemplate.snippet[0].instanceId,
          {
            fields: "context,children",
          }
        ),
    ]);
    proxy = themeBaseData?.proxy;
    state = themeBaseData?.state;
    snippetContext = snippetBaseData?.context;
  } else if (layoutType) {
    proxy = JSON.stringify({
      slots: getProxySlots(layoutType),
    });
  }

  const tpl = await InstanceApi_createInstance(STORYBOARD_TEMPLATE, {
    project: projectId,
    appId,
    templateId: templateId,
    proxy,
    state,
    type: "custom-template",
  });
  const snippet = await InstanceApi_createInstance(STORYBOARD_SNIPPET, {
    project: projectId,
    appId,
    snippetId: `page-${pageTypeId}`,
    type: "snippet",
    text: {
      en: name,
      zh: name,
    },
    layerType: "layout",
    context: snippetContext,
  });

  if (pageTemplate) {
    await copyBricks({
      templateId: tpl.id,
      snippetId: snippet.id,
      copyData: {
        theme: themeBaseData,
        snippet: snippetBaseData,
      },
    });
  } else {
    await createBricks({
      templateInstanceId: tpl.instanceId,
      snippetInstanceId: snippet.instanceId,
    });
  }

  await InstanceApi_createInstance(STORYBOARD_THEME_PAGE, {
    project: projectId,
    pageTypeId,
    name,
    thumbnail,
    locales,
    template: tpl.instanceId,
    snippet: snippet.instanceId,
    layoutType,
  });

  return true;
}

customElements.define(
  "next-builder.provider-create-theme-page",
  createProviderClass(CreateThemePage)
);
