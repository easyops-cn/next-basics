import React from "react";
import { shallow } from "enzyme";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { RootNodeSelect } from "./RootNodeSelect";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderNode: jest.fn(),
}));

const mockUseBuilderNode = useBuilderNode as jest.Mock;

describe("RootNodeSelect", () => {
  it("should work for bricks", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      alias: "my-brick",
    });
    const wrapper = shallow(<RootNodeSelect />);
    expect(wrapper.find(".rootNodeBox").find("span").text()).toBe("my-brick");
  });

  it("should work for custom templates", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "custom-template",
      templateId: "tpl-test",
    });
    const wrapper = shallow(<RootNodeSelect />);
    expect(wrapper.find(".rootNodeBox").find("span").text()).toBe("tpl-test");
  });

  it("should return null if no root node", () => {
    mockUseBuilderNode.mockReturnValueOnce(null);
    const wrapper = shallow(<RootNodeSelect />);
    expect(wrapper.html()).toBe(null);
  });
});
