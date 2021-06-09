import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralMenuEditor } from "./general-menu.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralMenuEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-menu",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(
      <GeneralMenuEditor nodeUid={1} editorProps={{ showSearch: true }} />
    );
    expect(wrapper.find(".title").length).toEqual(1);
    expect(wrapper.find(".search").length).toEqual(1);
  });
});
