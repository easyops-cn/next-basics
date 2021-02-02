import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { MicroViewEditor } from "./micro-view.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("MicroViewEditor", () => {
  it("should show untitled page", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "micro-view",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<MicroViewEditor nodeUid={1} brick="micro-view" />);
    expect(wrapper.find(".pageTitle.untitled").length).toBe(1);
  });

  it("should show page title", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "micro-view",
      alias: "my-brick",
      $$parsedProperties: {
        pageTitle: "Hello World",
      },
    });
    const wrapper = shallow(<MicroViewEditor nodeUid={1} brick="micro-view" />);
    expect(wrapper.find(".pageTitle.untitled").length).toBe(0);
    expect(wrapper.find(".pageTitle").text()).toBe("Hello World");
  });
});
