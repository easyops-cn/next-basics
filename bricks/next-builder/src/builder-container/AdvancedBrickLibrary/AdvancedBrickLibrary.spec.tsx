import React, { createRef } from "react";
import { mount, shallow } from "enzyme";
import { Empty } from "antd";
import { AdvancedBrickLibrary } from "./AdvancedBrickLibrary";
import { BrickItem } from "../BrickLibrary/BrickItem";
import { useBuilderUIContext } from "../BuilderUIContext";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { act } from "react-dom/test-utils";

jest.mock("../BuilderUIContext");
jest.mock("@next-core/editor-bricks-helper");
jest.mock("../BrickLibrary/BrickItem");

jest.mock("../constants", () => ({
  brickSearchResultLimit: 20,
  chartStory: [
    {
      category: "chart",
      storyId: "general-charts.statistic-card",
      type: "brick",
      text: {
        en: "statistic card",
        zh: "统计卡片",
      },
      icon: {
        lib: "fa",
        icon: "dolly",
      },
    },
  ],
  frequentlyUsedBricks: [
    {
      type: "brick",
      name: "basic-bricks.general-card",
    },
    {
      type: "brick",
      name: "forms.general-form",
    },
    {
      type: "brick",
      name: "forms.general-input",
    },
  ],
}));

(BrickItem as jest.MockedFunction<typeof BrickItem>).mockImplementation(() => {
  return <div>BrickItem</div>;
});

describe("AdvancedBrickLibrary", () => {
  it("should work", () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      appId: "my-app",
      brickList: [
        {
          type: "brick",
          name: "basic-bricks.micro-view",
        },
        {
          type: "brick",
          name: "forms.general-timer",
        },
        {
          type: "brick",
          name: "forms.general-select",
        },
      ],
      enabledInstalledBricks: true,
      stateOfInstalledBricks: {
        status: "ok",
        data: [],
      },
    });
    const wrapper = mount(<AdvancedBrickLibrary />);
    expect(wrapper.find(".itemWrapper").length).toBe(6);
    expect(
      wrapper.find(".itemWrapper").at(0).find(BrickItem).at(0).prop("brick")
        .shortName
    ).toBe("general-card");
    expect(
      wrapper.find(".itemWrapper").at(1).find(BrickItem).at(0).prop("brick")
        .shortName
    ).toBe("general-form");
    expect(
      wrapper.find(".itemWrapper").at(2).find(BrickItem).at(0).prop("brick")
        .shortName
    ).toBe("general-input");

    wrapper.find(SearchComponent).invoke("onSearch")("form");
    expect(wrapper.find(BrickItem).length).toBe(4);
    expect(wrapper.find(BrickItem).at(0).prop("brick").shortName).toBe(
      "general-form"
    );
    expect(wrapper.find(BrickItem).at(1).prop("brick").shortName).toBe(
      "general-input"
    );
  });

  it("should show empty if no data", () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      appId: "my-app",
      brickList: [],
    });
    const wrapper = shallow(<AdvancedBrickLibrary />);
    wrapper.find(SearchComponent).invoke("onSearch")("chart");
    wrapper.update();
    expect(wrapper.find(Empty).length).toEqual(1);
  });

  it("brick search", () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      appId: "my-app",
      brickList: [
        {
          type: "brick",
          name: "basic-bricks.general-card",
        },
        {
          type: "brick",
          name: "forms.general-form",
        },
        {
          type: "brick",
          name: "forms.general-input",
        },
      ],
      storyList: [
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
        {
          category: "form-input",
          icon: {
            icon: "draw-polygon",
            lib: "fa",
          },
          storyId: "forms.general-form",
          text: {
            en: "general form",
            zh: "普通表单",
          },
        },
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
        },
      ],
    });
    const ref = createRef<any>();
    const wrapper = mount(<AdvancedBrickLibrary ref={ref} />);
    act(() => {
      ref.current.handleSearchWithGroup("", "form-input");
    });
    wrapper.update();
    expect(
      wrapper.find(".itemWrapper").at(0).find(BrickItem).at(0).prop("brick")
        .shortName
    ).toBe("general-form");
    expect(
      wrapper.find(".itemWrapper").at(1).find(BrickItem).at(0).prop("brick")
        .shortName
    ).toBe("general-input");
  });
});
