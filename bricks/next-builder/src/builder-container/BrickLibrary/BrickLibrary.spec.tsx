import React from "react";
import { mount } from "enzyme";
import { BrickLibrary } from "./BrickLibrary";
import { BrickItem } from "./BrickItem";

jest.mock("./BrickItem");
jest.mock("./../ToolboxPane/ToolboxPane");

jest.mock("../constants", () => ({
  brickSearchResultLimit: 20,
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

describe("BrickLibrary", () => {
  it("should work", () => {
    const wrapper = mount(
      <BrickLibrary
        brickList={[
          {
            type: "brick",
            name: "basic-bricks.micro-view",
          },
          {
            type: "brick",
            name: "forms.general-form",
          },
          {
            type: "brick",
            name: "forms.general-select",
          },
        ]}
      />
    );
    expect(wrapper.find(".groupList > li").length).toBe(2);
    expect(wrapper.find(".groupName").at(0).text()).toBe("basic-bricks");
    expect(wrapper.find(".groupName").at(1).text()).toBe("forms");
    expect(
      wrapper.find(".brickList").at(0).find(BrickItem).at(0).prop("brick")
        .shortName
    ).toBe("general-card");
    expect(
      wrapper.find(".brickList").at(1).find(BrickItem).at(0).prop("brick")
        .shortName
    ).toBe("general-form");
    expect(
      wrapper.find(".brickList").at(1).find(BrickItem).at(1).prop("brick")
        .shortName
    ).toBe("general-input");

    wrapper.find("SearchComponent").invoke("onSearch")("form");
    expect(wrapper.find(BrickItem).length).toBe(2);
    expect(wrapper.find(BrickItem).at(0).prop("brick").shortName).toBe(
      "general-form"
    );
    expect(wrapper.find(BrickItem).at(1).prop("brick").shortName).toBe(
      "general-select"
    );
  });
});
