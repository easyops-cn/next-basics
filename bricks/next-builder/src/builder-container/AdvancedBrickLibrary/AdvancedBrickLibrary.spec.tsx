import React, { createRef } from "react";
import { act } from "react-dom/test-utils";
import { mount, shallow } from "enzyme";
import { Empty } from "antd";
import { getRuntime } from "@next-core/brick-kit";
import { AdvancedBrickLibrary } from "./AdvancedBrickLibrary";
import { BrickItem } from "./BrickItem";
import { useBuilderUIContext } from "../BuilderUIContext";
import { SearchComponent } from "../SearchComponent/SearchComponent";

jest.mock("@next-core/brick-kit");
jest.mock("@next-core/editor-bricks-helper");
jest.mock("../BuilderUIContext");
jest.mock("./BrickItem");

const mockGetFeatureFlags = jest.fn().mockReturnValue({
  "next-builder-installed-bricks": true,
});
(getRuntime as jest.Mock).mockReturnValue({
  getFeatureFlags: mockGetFeatureFlags,
});

jest.mock("../constants", () => ({
  brickSearchResultLimit: 20,
  frequentlyUsedBricks: [
    {
      type: "brick",
      id: "basic-bricks.general-card",
    },
    {
      type: "brick",
      id: "forms.general-form",
    },
    {
      type: "brick",
      id: "forms.general-input",
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
          title: "micro-view",
          id: "basic-bricks.micro-view",
        },
        {
          type: "brick",
          title: "general-timer",
          id: "forms.general-timer",
        },
        {
          type: "brick",
          title: "general-select",
          id: "forms.general-select",
        },
        {
          type: "brick",
          title: "general-card",
          id: "basic-bricks.general-card",
        },
        {
          type: "brick",
          title: "general-form",
          id: "forms.general-form",
        },
        {
          type: "brick",
          title: "general-input",
          id: "forms.general-input",
        },
      ],
    });
    const wrapper = mount(<AdvancedBrickLibrary />);
    expect(wrapper.find(".itemWrapper").length).toBe(6);

    expect(
      wrapper.find(".itemWrapper").at(0).find(BrickItem).at(0).prop("brick").id
    ).toBe("basic-bricks.general-card");
    expect(
      wrapper.find(".itemWrapper").at(1).find(BrickItem).at(0).prop("brick").id
    ).toBe("forms.general-form");
    expect(
      wrapper.find(".itemWrapper").at(2).find(BrickItem).at(0).prop("brick").id
    ).toBe("forms.general-input");

    wrapper.find(SearchComponent).invoke("onSearch")("form");
    expect(wrapper.find(BrickItem).length).toBe(4);
    expect(wrapper.find(BrickItem).at(0).prop("brick").id).toBe(
      "forms.general-form"
    );
    expect(wrapper.find(BrickItem).at(1).prop("brick").id).toBe(
      "forms.general-input"
    );
  });

  it("should show empty if no data", () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      appId: "my-app",
      brickList: undefined,
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
          id: "basic-bricks.general-card",
          title: "general-card",
          category: "card",
        },
        {
          type: "brick",
          id: "forms.general-form",
          title: "general-form",
          category: "form-input",
        },
        {
          type: "brick",
          id: "forms.general-input",
          title: "general-input",
          category: "form-input",
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
      wrapper.find(".itemWrapper").at(0).find(BrickItem).at(0).prop("brick").id
    ).toBe("forms.general-form");
    expect(
      wrapper.find(".itemWrapper").at(1).find(BrickItem).at(0).prop("brick").id
    ).toBe("forms.general-input");
  });
});
