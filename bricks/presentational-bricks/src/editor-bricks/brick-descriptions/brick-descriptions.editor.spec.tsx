import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { BrickDescriptionsEditor } from "./brick-descriptions.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("BrickDescriptionsEditor", () => {
  it("should work", () => {
    mockUseBuilderNode
      .mockReturnValueOnce({
        type: "brick",
        id: "B-001",
        brick: "brick-descriptions",
        alias: "my-brick",
        $$parsedProperties: {},
      })
      .mockReturnValueOnce({
        type: "brick",
        id: "B-001",
        brick: "brick-descriptions",
        alias: "my-brick",
        $$parsedProperties: {
          column: 2,
        },
      });

    const wrapper = shallow(<BrickDescriptionsEditor nodeUid={1} />);
    expect(wrapper.find(".item").length).toBe(6);

    wrapper.setProps({
      nodeUid: 1,
    });

    expect(wrapper.find(".item").length).toBe(4);
  });
});
