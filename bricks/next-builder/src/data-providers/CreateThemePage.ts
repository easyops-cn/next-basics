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
  layoutType?: "UI5.0" | "UI8.0";
  layoutList?: string;
}

interface GridProps {
  gridAreas: Record<string, unknown>;
  gridTemplateColumns: string[];
  gridTemplateRows: string[];
}

const UI_5_PROPERTY: GridProps = {
  gridAreas: {
    header: [1, 2, 2, 3],
    sider: [1, 1, 3, 2],
    content: [2, 2, 3, 3],
  },
  gridTemplateColumns: ["var(--sub-menu-bar-width)", "auto"],
  gridTemplateRows: ["var(--app-bar-height)", "auto"],
};
const UI_8_PROPERTY: GridProps = {
  gridAreas: {
    header: [1, 1, 2, 3],
    sider: [2, 1, 3, 2],
    content: [2, 2, 3, 3],
  },
  gridTemplateColumns: ["var(--sub-menu-bar-width)", "auto"],
  gridTemplateRows: ["var(--app-bar-height)", "auto"],
};

const EASY_VIEW_PROPERTY = {
  "UI5.0": UI_5_PROPERTY,
  "UI8.0": UI_8_PROPERTY,
};

const filterView = (girdWrapper: GridProps, showList: string[]): GridProps => {
  if (girdWrapper?.gridAreas) {
    if (showList.length > 0) {
      if (showList.includes("header") && showList.includes("sider")) {
        return girdWrapper;
      } else if (!showList.includes("header") && showList.includes("sider")) {
        girdWrapper.gridAreas = {
          sider: [1, 1, 3, 2],
          content: [1, 2, 3, 3],
        };
      } else if (showList.includes("header") && !showList.includes("sider")) {
        girdWrapper.gridAreas = {
          header: [1, 1, 2, 3],
          content: [2, 1, 3, 3],
        };
      }
    } else {
      girdWrapper.gridAreas = {
        content: [1, 1, 3, 3],
      };
    }
  }
  return girdWrapper;
};

const filterProxySlots = (
  filterList: string[] = []
): Record<string, { ref: string; refSlot: string }> => {
  const slotsProxy = {
    header: {
      ref: "view",
      refSlot: "header",
    },
    sider: {
      ref: "view",
      refSlot: "sider",
    },
    content: {
      ref: "view",
      refSlot: "content",
    },
  };
  if (!filterList.includes("header")) delete slotsProxy.header;
  if (!filterList.includes("sider")) delete slotsProxy.sider;
  return slotsProxy;
};

export async function CreateThemePage({
  projectId,
  appId,
  pageTypeId,
  name,
  thumbnail,
  locales,
  layoutList = "",
  layoutType,
}: CreateThemePageParams): Promise<unknown> {
  const templateId = `tpl-page-${pageTypeId}`;
  const filterLayoutList = layoutList.split(",").filter(Boolean);
  // Currently, There is a bug when creating multiple instances of
  // sub-models which have the same parent which has an auto-increment field.
  // So we create the template and snippet in sequence.
  const tpl = await InstanceApi_createInstance("STORYBOARD_TEMPLATE", {
    project: projectId,
    appId,
    templateId: templateId,
    proxy: JSON.stringify({
      slots: filterProxySlots(filterLayoutList),
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
      properties: JSON.stringify(
        filterView(EASY_VIEW_PROPERTY[layoutType], filterLayoutList)
      ),
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
      layoutList,
    }),
  ]);
  return layout;
}

customElements.define(
  "next-builder.provider-create-theme-page",
  createProviderClass(CreateThemePage)
);
