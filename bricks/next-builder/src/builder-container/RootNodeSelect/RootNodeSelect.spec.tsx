import React from "react";
import { shallow, mount } from "enzyme";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { RootNodeSelect } from "./RootNodeSelect";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderNode: jest.fn(),
}));

jest.mock("../RoutesView/RoutesView", () => ({
  RoutesView() {
    return <div>RoutesView</div>;
  },
}));

const mockUseBuilderNode = useBuilderNode as jest.Mock;

describe("RootNodeSelect", () => {
  it("should work for bricks", async () => {
    mockUseBuilderNode.mockReturnValue({
      type: "brick",
      alias: "my-brick",
    });
    const wrapper = mount(<RootNodeSelect />);
    expect(wrapper.find(".alias").text()).toBe("my-brick");
    expect(wrapper.find("RoutesView").length).toBe(0);
    wrapper.find(".rootNodeWrapper").at(0).simulate("click");
    wrapper.find("RoutesView").invoke("handleRouteSelect")();
    expect(wrapper.find("RoutesView").length).toBe(1);
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
