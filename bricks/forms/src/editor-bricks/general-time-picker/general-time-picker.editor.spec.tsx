import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralTimePickerEditor } from "./general-time-picker.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralTimePickerEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-time-picker",
      alias: "my-brick",
      $$parsedProperties: {
        placeholder: "请选择时间",
      },
    });
    const wrapper = shallow(
      <GeneralTimePickerEditor nodeUid={1} brick="general-time-picker" />
    );
    expect(wrapper.find(".placeholder").text()).toBe("请选择时间");
    expect(wrapper.find(ClockCircleOutlined).length).toEqual(1);
  });
});
