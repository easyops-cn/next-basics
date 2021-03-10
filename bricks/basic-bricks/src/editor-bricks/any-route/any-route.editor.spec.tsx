import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { AnyRouteEditor } from "./any-route.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("AnyRouteEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "any-route",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<AnyRouteEditor nodeUid={1} />);
    expect(wrapper.find(".name").text()).toBe("my-brick");
  });
});
