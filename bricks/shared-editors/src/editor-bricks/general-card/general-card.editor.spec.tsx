import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralCardEditor } from "./general-card.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralCardEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValue({
      type: "brick",
      id: "B-001",
      brick: "brick-general-search",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(
      <GeneralCardEditor nodeUid={1} editorProps={{ hasHeader: true }} />
    );
    expect(wrapper.find(".header").length).toBe(1);

    wrapper.setProps({
      editorProps: {
        hasIcon: true,
      },
    });
    wrapper.update();
    expect(wrapper.find(".icon").length).toBe(1);

    wrapper.setProps({
      editorProps: {
        slots: ["content", "title"],
      },
    });
    wrapper.update();
    expect(wrapper.find(helper.SlotContainer).length).toBe(2);
  });
});
