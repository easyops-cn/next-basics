import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralSearchEditor } from "./general-search.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("BrickGeneralSearchEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-general-search",
      alias: "my-brick",
      $$parsedProperties: {
        placeholder: "search in keyword",
      },
    });
    const wrapper = shallow(<GeneralSearchEditor nodeUid={1} />);
    expect(wrapper.find(".placeholder").text()).toBe("search in keyword");
  });
});
