import { createProviderClass } from "@next-core/brick-utils";
import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";

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
}: CreateThemePageParams): Promise<unknown> {
  const templateId = `tpl-page-${pageTypeId}`;
  // Currently, There is a bug when creating multiple instances of
  // sub-models which have the same parent which has an auto-increment field.
  // So we create the template and snippet in sequence.
  const tpl = await InstanceApi_createInstance("STORYBOARD_TEMPLATE", {
    project: projectId,
    appId,
    templateId: templateId,
    proxy: JSON.stringify({
      slots: getProxySlots(layoutType),
    }),
    type: "custom-template",
  });
  const snippet = await InstanceApi_createInstance("STORYBOARD_SNIPPET", {
    project: projectId,
    appId,
    snippetId: `page-${pageTypeId}`,
    type: "snippet",
    text: {
      en: name,
      zh: name,
    },
    layerType: "layout",
  });
  const [, , layout] = await Promise.all([
    InstanceApi_createInstance("STORYBOARD_BRICK", {
      appId,
      brick: templateId,
      type: "brick",
      mountPoint: "bricks",
      parent: snippet.instanceId,
    }),
    InstanceApi_createInstance("STORYBOARD_BRICK", {
      appId,
      brick: "basic-bricks.easy-view",
      properties: JSON.stringify(EASY_VIEW_PROPERTY[layoutType]),
      ref: "view",
      type: "brick",
      mountPoint: "bricks",
      parent: tpl.instanceId,
    }),
    InstanceApi_createInstance("STORYBOARD_THEME_PAGE", {
      project: projectId,
      pageTypeId,
      name,
      thumbnail,
      locales,
      template: tpl.instanceId,
      snippet: snippet.instanceId,
      layoutType,
    }),
  ]);
  return layout;
}

customElements.define(
  "next-builder.provider-create-theme-page",
  createProviderClass(CreateThemePage)
);
