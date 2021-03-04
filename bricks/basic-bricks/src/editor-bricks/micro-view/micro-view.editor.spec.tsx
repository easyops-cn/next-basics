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

  it("should show page title with an I18N evaluation", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "micro-view",
      alias: "my-brick",
      $$parsedProperties: {
        pageTitle: "<% I18N('HELLO_WORLD') %>",
      },
    });
    const wrapper = shallow(<MicroViewEditor nodeUid={1} brick="micro-view" />);
    expect(wrapper.find(".pageTitle.untitled").length).toBe(0);
    expect(wrapper.find(".pageTitle").text()).toBe("HELLO_WORLD");
  });

  it("should show page title with an unknown evaluation", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "micro-view",
      alias: "my-brick",
      $$parsedProperties: {
        pageTitle: "<% CTX.pageTitle %>",
      },
    });
    const wrapper = shallow(<MicroViewEditor nodeUid={1} brick="micro-view" />);
    expect(wrapper.find(".pageTitle.untitled").length).toBe(0);
    expect(wrapper.find(".pageTitle").text()).toBe("<% … %>");
  });
});
