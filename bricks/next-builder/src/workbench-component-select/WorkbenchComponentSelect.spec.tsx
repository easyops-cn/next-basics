import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as brickKit from "@next-core/brick-kit";
import { WorkbenchComponentSelect } from "./WorkbenchComponentSelect";

jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  getCurrentApp: jest.fn(() => ({
    config: { brickLibrarySort: [] },
  })),
});

describe("WorkbenchComponentSelect", () => {
  const brickList = [
    {
      type: "provider",
      id: "assets-inventory.filter-device-list",
      title: "filter-device-list",
      $searchTextPool: ["assets-inventory.filter-device-list"],
    },
    {
      type: "brick",
      id: "basic-bricks.fold-brick-v2",
      title: "折叠容器V2",
      category: "description",
      description: "折叠容器，只折叠单个内容，支持slot",
      layerType: "brick",
      icon: {
        icon: "chevron-down",
        lib: "fa",
      },
      $searchTextPool: [
        "fold brick",
        "折叠容器v2",
        "basic-bricks.fold-brick-v2",
      ],
    },
    {
      type: "brick",
      id: "forms.general-select",
      title: "普通下拉选择框",
      category: "form-input",
      layerType: "brick",
      icon: {
        icon: "pen",
        lib: "fa",
      },
      $searchTextPool: [
        "general select",
        "普通下拉选择框",
        "forms.general-select",
      ],
    },
    {
      type: "brick",
      id: "forms.general-date-picker",
      title: "普通日期选择框",
      category: "form-input",
      layerType: "brick",
      icon: {
        icon: "calendar",
        lib: "fa",
      },
      $searchTextPool: [
        "general date picker",
        "普通日期选择框",
        "forms.general-date-picker",
      ],
    },
    {
      type: "brick",
      id: "forms.cmdb-instance-select",
      title: "cmdb 实例下拉框",
      category: "form-input",
      description: "通过拉取 cmdb 实例数据作为数据源的下拉框",
      layerType: "brick",
      icon: {
        icon: "pen",
        lib: "fa",
      },
      $searchTextPool: [
        "cmdb instance select",
        "cmdb 实例下拉框",
        "forms.cmdb-instance-select",
      ],
    },
    {
      type: "brick",
      id: "forms.general-input-number",
      title: "普通数字输入框",
      category: "form-input",
      description: "通用的数字输入框",
      layerType: "brick",
      icon: {
        icon: "pen",
        lib: "fa",
      },
      $searchTextPool: [
        "general input number",
        "普通数字输入框",
        "forms.general-input-number",
      ],
    },
    {
      type: "snippet",
      id: "basic-bricks-widgets.fold-brick-v2-normal",
      title: "基本折叠容器V2",
      category: "详情描述",
      description: "基本折叠容器V2",
      bricks: [
        {
          brick: "basic-bricks.fold-brick-v2",
          iid: "5e2a21f321387",
          injectDeep: true,
          portal: false,
          properties: {
            dataset: {
              testid: "fold-brick-v2",
            },
            foldName: "查看",
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "div",
                  iid: "5e2a227c2a20f",
                  injectDeep: true,
                  portal: false,
                  properties: {
                    textContent: "123",
                  },
                },
              ],
              type: "bricks",
            },
          },
        },
      ],
      layerType: "brick",
      $searchTextPool: [
        "基本折叠容器v2",
        "basic-bricks-widgets.fold-brick-v2-normal",
      ],
    },
  ];

  const storyList = [
    {
      category: "form-input",
      description: {},
      text: {
        en: "General Select",
        zh: "普通下拉选择框",
      },
      type: "brick",
      useWidget: [],
      storyId: "forms.general-select",
    },
    {
      category: "form-input",
      description: {},
      text: {
        en: "General Date Picker",
        zh: "普通日期选择框",
      },
      type: "brick",
      useWidget: [],
      storyId: "forms.general-date-picker",
    },
    {
      category: "form-input",
      description: {
        en: "select CMDB instances by instance-list-modal",
        zh: "通过 instance-list-modal 选择 CMDB 实例",
      },
      text: {
        en: "CMDB Instance Select Panel",
        zh: "CMDB 实例选择",
      },
      type: "brick",
      useWidget: [],
      storyId: "forms.cmdb-instance-select-panel",
    },
    {
      category: "form-input",
      description: {
        en: "General Input Number",
        zh: "通用的数字输入框",
      },
      text: {
        en: "General Input Number",
        zh: "普通数字输入框",
      },
      type: "brick",
      useWidget: [],
      storyId: "forms.general-input-number",
    },
    {
      category: "form-input",
      description: {},
      text: {
        en: "General Form Item",
        zh: "普通表单项",
      },
      type: "brick",
      useWidget: [],
      storyId: "forms.general-form-item",
    },
  ];
  it("should work", async () => {
    render(
      <WorkbenchComponentSelect brickList={brickList} storyList={storyList} />
    );

    const brickElement = screen.getByTitle(
      "折叠容器，只折叠单个内容，支持slot"
    );

    expect(brickElement.querySelector(".name").textContent).toEqual(
      "折叠容器V2"
    );

    fireEvent.mouseOver(screen.getByText("折叠容器V2"));

    fireEvent.click(brickElement.parentElement.querySelectorAll(".badge")[1]);

    expect(screen.getByText(/基本折叠容器v2/i)).toBeInTheDocument();
  });
});
