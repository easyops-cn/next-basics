import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralConfirmEditor } from "./general-confirm.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("ModalConfirmEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "modal-confirm",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<GeneralConfirmEditor nodeUid={1} />);
    expect(wrapper.find(".title").length).toEqual(1);
    expect(wrapper.find(".cell").length).toBe(2);
  });
});
