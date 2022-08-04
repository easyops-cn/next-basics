import { groupItem } from "./constants";
import { adjustBrickSort } from "./processor";

describe("processor", () => {
  it.each([
    [
      [
        {
          key: "layout",
          text: "布局",
          children: [],
        },
      ],
      undefined,
      [
        {
          key: "layout",
          text: "布局",
          children: [],
        },
      ],
    ],
    [
      [
        {
          children: [
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
            {
              type: "brick",
              id: "basic-bricks.easy-view",
            },
            {
              type: "brick",
              id: "basic-bricks.general-modal",
            },
            {
              type: "brick",
              id: "basic-bricks.general-drawer",
            },
          ],
          key: "suggest",
          text: "推荐",
        },
        {
          key: "layout",
          text: "布局",
          children: [
            {
              category: "layout",
              id: "basic-bricks.grid-layout",
              layerType: "brick",
              title: "网格布局",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.micro-view",
              layerType: "brick",
              title: "通用页面视图容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advanced-list-container",
              layerType: "brick",
              title: "动态构件列表容器v2",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advance-list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "container-brick.search-bar",
              layerType: "brick",
              title: "搜索框容器",
              type: "brick",
            },
          ],
        },
        {
          key: "form-input",
          text: "表单输入",
          children: [
            {
              category: "form-input",
              id: "code.vs-code-editor",
              layerType: "brick",
              title: "VS Code代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code-bricks.code-editor",
              layerType: "brick",
              title: "代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-form",
              layerType: "brick",
              title: "普通表单",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-input",
              layerType: "brick",
              title: "普通输入框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-time-picker",
              layerType: "brick",
              title: "普通时间选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-date-picker",
              layerType: "brick",
              title: "普通日期选择框",
              type: "brick",
            },
          ],
        },
      ],
      [
        {
          group: "form-input",
          position: [
            "code.vs-code-editor",
            "code-bricks.code-editor",
            "forms.general-form",
            "forms.general-input",
            "forms.general-time-picker",
            "forms.general-date-picker",
          ],
        },
      ],
      [
        {
          children: [
            {
              category: "form-input",
              id: "code.vs-code-editor",
              layerType: "brick",
              title: "VS Code代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code-bricks.code-editor",
              layerType: "brick",
              title: "代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-form",
              layerType: "brick",
              title: "普通表单",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-input",
              layerType: "brick",
              title: "普通输入框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-time-picker",
              layerType: "brick",
              title: "普通时间选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-date-picker",
              layerType: "brick",
              title: "普通日期选择框",
              type: "brick",
            },
          ],
          key: "form-input",
          text: "表单输入",
        },
        {
          children: [
            { id: "basic-bricks.micro-view", type: "brick" },
            { id: "basic-bricks.general-button", type: "brick" },
            { id: "basic-bricks.general-card", type: "brick" },
            { id: "basic-bricks.easy-view", type: "brick" },
            { id: "basic-bricks.general-modal", type: "brick" },
            { id: "basic-bricks.general-drawer", type: "brick" },
          ],
          key: "suggest",
          text: "推荐",
        },
        {
          children: [
            {
              category: "layout",
              id: "basic-bricks.grid-layout",
              layerType: "brick",
              title: "网格布局",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.micro-view",
              layerType: "brick",
              title: "通用页面视图容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advanced-list-container",
              layerType: "brick",
              title: "动态构件列表容器v2",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advance-list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "container-brick.search-bar",
              layerType: "brick",
              title: "搜索框容器",
              type: "brick",
            },
          ],
          key: "layout",
          text: "布局",
        },
      ],
    ],
    [
      [
        {
          children: [
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
            {
              type: "brick",
              id: "basic-bricks.easy-view",
            },
            {
              type: "brick",
              id: "basic-bricks.general-modal",
            },
            {
              type: "brick",
              id: "basic-bricks.general-drawer",
            },
          ],
          key: "suggest",
          text: "推荐",
        },
        {
          key: "layout",
          text: "布局",
          children: [
            {
              category: "layout",
              id: "basic-bricks.grid-layout",
              layerType: "brick",
              title: "网格布局",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.micro-view",
              layerType: "brick",
              title: "通用页面视图容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advanced-list-container",
              layerType: "brick",
              title: "动态构件列表容器v2",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advance-list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "container-brick.search-bar",
              layerType: "brick",
              title: "搜索框容器",
              type: "brick",
            },
          ],
        },
        {
          key: "form-input",
          text: "表单输入",
          children: [
            {
              category: "form-input",
              id: "code.vs-code-editor",
              layerType: "brick",
              title: "VS Code代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code-bricks.code-editor",
              layerType: "brick",
              title: "代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-form",
              layerType: "brick",
              title: "普通表单",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-input",
              layerType: "brick",
              title: "普通输入框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-time-picker",
              layerType: "brick",
              title: "普通时间选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-date-picker",
              layerType: "brick",
              title: "普通日期选择框",
              type: "brick",
            },
          ],
        },
      ],
      [
        {
          group: "form-input",
          position: [
            "forms.general-date-picker",
            "forms.general-time-picker",
            "forms.general-input",
            "forms.general-form",
            "code-bricks.code-editor",
            "code.vs-code-editor",
          ],
        },
        {
          group: "test",
          position: ["test.hello-word"],
        },
        {
          group: "suggest",
          position: ["test.hello-work", "basic-bricks.general-modal"],
        },
      ],
      [
        {
          children: [
            {
              category: "form-input",
              id: "forms.general-date-picker",
              layerType: "brick",
              title: "普通日期选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-time-picker",
              layerType: "brick",
              title: "普通时间选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-input",
              layerType: "brick",
              title: "普通输入框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-form",
              layerType: "brick",
              title: "普通表单",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code-bricks.code-editor",
              layerType: "brick",
              title: "代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code.vs-code-editor",
              layerType: "brick",
              title: "VS Code代码编辑构件",
              type: "brick",
            },
          ],
          key: "form-input",
          text: "表单输入",
        },
        {
          children: [
            { id: "basic-bricks.general-modal", type: "brick" },
            { id: "basic-bricks.micro-view", type: "brick" },
            { id: "basic-bricks.general-button", type: "brick" },
            { id: "basic-bricks.general-card", type: "brick" },
            { id: "basic-bricks.easy-view", type: "brick" },
            { id: "basic-bricks.general-drawer", type: "brick" },
          ],
          key: "suggest",
          text: "推荐",
        },
        {
          children: [
            {
              category: "layout",
              id: "basic-bricks.grid-layout",
              layerType: "brick",
              title: "网格布局",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.micro-view",
              layerType: "brick",
              title: "通用页面视图容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advanced-list-container",
              layerType: "brick",
              title: "动态构件列表容器v2",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advance-list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "container-brick.search-bar",
              layerType: "brick",
              title: "搜索框容器",
              type: "brick",
            },
          ],
          key: "layout",
          text: "布局",
        },
      ],
    ],
  ])("adjustBrickSort should work %#", (group, sortTemplates, result) => {
    expect(adjustBrickSort(group as groupItem[], sortTemplates)).toEqual(
      result
    );
  });
});
