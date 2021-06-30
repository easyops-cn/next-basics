import { getRuntime, i18nText } from "@next-core/brick-kit";
import { Story } from "@next-core/brick-types";
import { filterBricks, processBricks, insertBricks } from "./filterBrick";
import { BrickOptionItem, LayerType } from "../interfaces";

jest.mock("@next-core/brick-kit");

const mockGetFeatureFlags = jest.fn().mockReturnValue({
  "next-builder-installed-bricks": true,
});
(getRuntime as jest.Mock).mockReturnValue({
  getFeatureFlags: mockGetFeatureFlags,
});

(i18nText as jest.Mock).mockImplementation((data) => data?.zh);

jest.mock("../constants.ts", () => ({
  brickSearchResultLimit: 24,
  LIB_ALL_CATEGORY: "all",
  frequentlyUsedBricks: [
    {
      type: "brick",
      id: "basic-bricks.micro-view",
    },
    {
      type: "brick",
      id: "basic-bricks.general-button",
    },
    {
      type: "brick",
      id: "basic-bricks.general-card",
    },
  ],
}));

describe("processor", () => {
  describe("process bricks", () => {
    it("should merge story data", () => {
      mockGetFeatureFlags.mockReturnValueOnce({});
      const brickList = [
        {
          type: "brick",
          title: "general-input",
          id: "forms.general-input",
          layerType: "brick",
        },
        {
          type: "brick",
          title: "general-card",
          id: "basic-bricks.general-card",
          layerType: "brick",
        },
        {
          type: "brick",
          title: "pie-chart",
          id: "chart-v2.pie-chart",
          layerType: "brick",
        },
      ] as BrickOptionItem[];

      const storyList = [
        {
          category: "form-input",
          icon: {
            icon: "pencil-alt",
            lib: "fa",
          },
          storyId: "forms.general-input",
          text: {
            en: "general input",
            zh: "普通输入框",
          },
          description: {
            en: "general input",
            zh: "普通输入框",
          },
        },
        {
          category: "card",
          icon: {
            icon: "chevron-down",
            lib: "fa",
          },
          storyId: "basic-bricks.general-card",
          text: {
            en: "general-card",
            zh: "卡片",
          },
        },
      ] as Partial<Story>[] as Story[];

      const result = processBricks(
        brickList,
        storyList,
        "my-app",
        "form-input",
        LayerType.BRICK
      );

      expect(result).toEqual([
        {
          category: "form-input",
          description: "普通输入框",
          icon: { icon: "pencil-alt", lib: "fa" },
          id: "forms.general-input",
          layerType: "brick",
          title: "普通输入框",
          type: "brick",
        },
      ]);
    });

    it("should show frequently bricks", () => {
      const brickList = [
        {
          type: "brick",
          title: "general-input",
          id: "forms.general-input",
          layerType: "brick",
        },
        {
          type: "brick",
          title: "general-card",
          id: "basic-bricks.general-card",
          layerType: "brick",
        },
        {
          type: "brick",
          title: "pie-chart",
          id: "chart-v2.pie-chart",
          layerType: "brick",
        },
        {
          type: "brick",
          title: "micro-view",
          id: "basic-bricks.micro-view",
          layerType: "brick",
        },
      ] as BrickOptionItem[];

      const result = processBricks(
        brickList,
        undefined,
        "my-app",
        undefined,
        LayerType.BRICK
      );
      expect(result).toEqual([
        {
          id: "basic-bricks.micro-view",
          layerType: "brick",
          title: "micro-view",
          type: "brick",
        },
        {
          id: "basic-bricks.general-card",
          title: "general-card",
          type: "brick",
          layerType: "brick",
        },
        {
          id: "forms.general-input",
          title: "general-input",
          type: "brick",
          layerType: "brick",
        },
        {
          id: "chart-v2.pie-chart",
          layerType: "brick",
          title: "pie-chart",
          type: "brick",
        },
      ]);
    });
  });

  describe("filter bricks", () => {
    it("return filter result", () => {
      const brickList: BrickOptionItem[] = [
        {
          type: "brick",
          title: "micro-view",
          id: "basic-bricks.micro-view",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          title: "general-input",
          id: "forms.general-input",
          layerType: LayerType.BRICK,
          category: "form-input",
        },
        {
          type: "brick",
          title: "general-card",
          id: "basic-bricks.general-card",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          title: "general-form",
          id: "forms.general-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "customTemplate",
          title: "tpl-create-form",
          id: "tpl-create-form",
          layerType: LayerType.BRICK,
        },
      ];

      const result = filterBricks({
        q: "",
        category: "all",
        brickList,
        storyList: undefined,
        appId: "my-app",
        layerType: LayerType.BRICK,
      });
      expect(result).toEqual([
        {
          id: "basic-bricks.micro-view",
          layerType: "brick",
          title: "micro-view",
          type: "brick",
        },
        {
          id: "basic-bricks.general-card",
          layerType: "brick",
          title: "general-card",
          type: "brick",
        },
        {
          id: "forms.general-input",
          layerType: "brick",
          title: "general-input",
          type: "brick",
          category: "form-input",
        },
        {
          id: "forms.general-form",
          layerType: "brick",
          title: "general-form",
          type: "brick",
        },
        {
          id: "tpl-create-form",
          layerType: "brick",
          title: "tpl-create-form",
          type: "customTemplate",
        },
      ]);

      const result2 = filterBricks({
        q: undefined,
        category: "form-input",
        brickList,
        storyList: undefined,
        appId: "my-app",
        layerType: LayerType.BRICK,
      });
      expect(result2).toEqual([
        {
          id: "forms.general-input",
          layerType: "brick",
          title: "general-input",
          type: "brick",
          category: "form-input",
        },
      ]);

      const result3 = filterBricks({
        q: "general-input",
        brickList,
        storyList: undefined,
        appId: "my-app",
        layerType: LayerType.BRICK,
      });
      expect(result3).toEqual([
        {
          id: "forms.general-input",
          layerType: "brick",
          title: "general-input",
          type: "brick",
          category: "form-input",
        },
      ]);

      const result4 = filterBricks({
        q: "general",
        brickList,
        storyList: undefined,
        appId: "my-app",
        limit: 2,
        layerType: LayerType.BRICK,
      });
      expect(result4).toEqual([
        {
          id: "basic-bricks.general-card",
          layerType: "brick",
          title: "general-card",
          type: "brick",
        },
        {
          id: "forms.general-input",
          layerType: "brick",
          title: "general-input",
          type: "brick",
          category: "form-input",
        },
      ]);

      const result5 = filterBricks({
        q: "",
        brickList,
        storyList: undefined,
        appId: "my-app",
        rootNode: {
          type: "custom-template",
          templateId: "tpl-create-form",
          id: "B-001",
        },
        layerType: LayerType.BRICK,
      });

      expect(result5).toEqual([
        {
          id: "basic-bricks.micro-view",
          layerType: "brick",
          title: "micro-view",
          type: "brick",
        },
        {
          id: "basic-bricks.general-card",
          layerType: "brick",
          title: "general-card",
          type: "brick",
        },
        {
          id: "forms.general-input",
          layerType: "brick",
          title: "general-input",
          type: "brick",
          category: "form-input",
        },
        {
          id: "forms.general-form",
          layerType: "brick",
          title: "general-form",
          type: "brick",
        },
      ]);
    });

    it("should return layout result", () => {
      const brickList: BrickOptionItem[] = [
        {
          type: "brick",
          id: "forms.general-input",
          title: "general-input",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          id: "basic-bricks.general-card",
          title: "general-card",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          id: "forms.general-form",
          title: "general-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "customTemplate",
          id: "tpl-create-form",
          title: "tpl-create-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[classic]",
          title: "easy-view[classic]",
          layerType: LayerType.LAYOUT,
          category: "layout",
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[basic]",
          title: "easy-view[basic]",
          layerType: LayerType.LAYOUT,
          category: "layout",
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[right-aligned-menu]",
          title: "easy-view[right-aligned-menu]",
          layerType: LayerType.LAYOUT,
          category: "layout",
        },
      ];

      const result = filterBricks({
        q: "",
        category: "layout",
        brickList,
        storyList: undefined,
        appId: "my-app",
        layerType: LayerType.LAYOUT,
      });

      expect(result).toEqual([
        {
          type: "snippet",
          id: "basic-bricks.easy-view[classic]",
          title: "easy-view[classic]",
          layerType: LayerType.LAYOUT,
          category: "layout",
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[basic]",
          title: "easy-view[basic]",
          layerType: LayerType.LAYOUT,
          category: "layout",
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[right-aligned-menu]",
          title: "easy-view[right-aligned-menu]",
          layerType: LayerType.LAYOUT,
          category: "layout",
        },
      ]);
    });

    it("should return snippets result", () => {
      const brickList: BrickOptionItem[] = [
        {
          type: "brick",
          id: "forms.general-input",
          title: "general-input",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          id: "basic-bricks.general-card",
          title: "general-card",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          id: "forms.general-form",
          title: "general-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "customTemplate",
          id: "tpl-create-form",
          title: "tpl-create-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[classic]",
          title: "easy-view[classic]",
          layerType: LayerType.WIDGET,
          category: "layout",
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[basic]",
          title: "easy-view[basic]",
          layerType: LayerType.WIDGET,
          category: "layout",
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[right-aligned-menu]",
          title: "easy-view[right-aligned-menu]",
          layerType: LayerType.WIDGET,
          category: "layout",
        },
      ];

      const result = filterBricks({
        q: "",
        category: "layout",
        brickList,
        storyList: undefined,
        appId: "my-app",
        layerType: LayerType.WIDGET,
      });

      expect(result).toEqual([
        {
          type: "snippet",
          id: "basic-bricks.easy-view[classic]",
          title: "easy-view[classic]",
          layerType: LayerType.WIDGET,
          category: "layout",
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[basic]",
          title: "easy-view[basic]",
          layerType: LayerType.WIDGET,
          category: "layout",
        },
        {
          type: "snippet",
          id: "basic-bricks.easy-view[right-aligned-menu]",
          title: "easy-view[right-aligned-menu]",
          layerType: LayerType.WIDGET,
          category: "layout",
        },
      ]);
    });
  });

  describe("insert Bricks", () => {
    it("should insert specified bricks", () => {
      const brickList: BrickOptionItem[] = [
        {
          type: "brick",
          title: "micro-view",
          id: "basic-bricks.micro-view",
        },
        {
          type: "brick",
          title: "general-button",
          id: "basic-bricks.general-button",
        },
        {
          type: "brick",
          title: "general-card",
          id: "basic-bricks.general-card",
        },
        {
          type: "brick",
          title: "grid-layout",
          id: "basic-bricks.grid-layout",
        },
        {
          type: "brick",
          title: "general-modal",
          id: "basic-bricks.general-modal",
        },
        {
          type: "brick",
          title: "general-drawer",
          id: "basic-bricks.general-drawer",
        },
        {
          type: "brick",
          title: "general-custom-buttons",
          id: "basic-bricks.general-custom-buttons",
        },
        {
          type: "brick",
          title: "popover-container",
          id: "basic-bricks.popover-container",
        },
        {
          type: "customTemplate",
          id: "tpl-my-template",
          title: "tpl-my-template",
        },
      ];

      const frequentlyUsedBricks: Pick<BrickOptionItem, "type" | "id">[] = [
        { type: "customTemplate", id: "tpl-my-template" },
        {
          type: "brick",
          id: "basic-bricks.popover-container",
        },
        {
          type: "brick",
          id: "basic-bricks.general-custom-buttons",
        },
        {
          type: "template",
          id: "general-list.general-card-list",
        },
        {
          type: "brick",
          id: "basic-bricks.general-drawer",
        },
      ];

      const result = insertBricks(brickList, frequentlyUsedBricks);

      expect(result).toEqual([
        {
          id: "tpl-my-template",
          title: "tpl-my-template",
          type: "customTemplate",
        },
        {
          id: "basic-bricks.popover-container",
          title: "popover-container",
          type: "brick",
        },
        {
          id: "basic-bricks.general-custom-buttons",
          title: "general-custom-buttons",
          type: "brick",
        },
        {
          id: "basic-bricks.general-drawer",
          title: "general-drawer",
          type: "brick",
        },
        {
          id: "basic-bricks.micro-view",
          title: "micro-view",
          type: "brick",
        },
        {
          id: "basic-bricks.general-button",
          title: "general-button",
          type: "brick",
        },
        {
          id: "basic-bricks.general-card",
          title: "general-card",
          type: "brick",
        },
        {
          id: "basic-bricks.grid-layout",
          title: "grid-layout",
          type: "brick",
        },
        {
          id: "basic-bricks.general-modal",
          title: "general-modal",
          type: "brick",
        },
      ]);
    });
  });
});
