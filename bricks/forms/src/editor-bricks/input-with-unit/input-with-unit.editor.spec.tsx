import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { InputWithUnitEditor } from "./input-with-unit.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("InputWithUnitEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "input-with-unit",
      alias: "my-brick",
      $$parsedProperties: {
        placeholder: "please input",
        label: "time",
      },
    });
    const wrapper = shallow(<InputWithUnitEditor nodeUid={1} />);
    expect(wrapper.find(".placeholder").text()).toBe("please input");
    expect(wrapper.find(".formLabel").text()).toBe("time");
  });
});
