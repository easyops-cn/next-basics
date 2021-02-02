import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralFormEditor } from "./general-form.editor";
import { wrap } from "lodash";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralFormEditor", () => {
  it("should work with vertical layout", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-form",
      alias: "my-brick",
      $$parsedProperties: {
        layout: "vertical",
      },
    });
    const wrapper = shallow(
      <GeneralFormEditor nodeUid={1} brick="general-form" />
    );
    expect(wrapper.find(".form").hasClass("formEditorVertical")).toEqual(true);
  });

  it("should work with horizontal layout", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-form",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(
      <GeneralFormEditor nodeUid={1} brick="general-form" />
    );
    expect(wrapper.find(".form").hasClass("formEditorHorizontal")).toEqual(
      true
    );
  });

  it("should work with inline layout", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-form",
      alias: "my-brick",
      $$parsedProperties: {
        layout: "inline",
      },
    });
    const wrapper = shallow(
      <GeneralFormEditor nodeUid={1} brick="general-form" />
    );
    expect(wrapper.find(".form").hasClass("formEditorInline")).toEqual(true);
  });
});
