import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralSwitchEditor } from "./general-switch.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralSwitchEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-switch",
      alias: "my-brick",
      $$parsedProperties: {
        label: "是否启用",
      },
    });
    const wrapper = shallow(<GeneralSwitchEditor nodeUid={1} />);
    expect(wrapper.find(".formLabel").text()).toBe("是否启用");
  });
});
