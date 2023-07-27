import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { PageTitleEditor } from "./page-title.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("PageTitleEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "page-title",
      alias: "my-brick",
      $$parsedProperties: {
        pageTitle: "Hello World",
      },
    });
    const wrapper = shallow(<PageTitleEditor nodeUid={1} />);
    expect(wrapper.find("div").text()).toBe("Hello World");
    expect(wrapper.find("div").hasClass("untitled")).toBe(false);
  });

  it("should work when pageTitle is not given", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "page-title",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<PageTitleEditor nodeUid={1} />);
    expect(wrapper.find("div").text()).toBe("Untitled Page");
    expect(wrapper.find("div").hasClass("untitled")).toBe(true);
  });
});
