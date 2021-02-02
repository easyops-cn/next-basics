import React from "react";
import { shallow } from "enzyme";
import { CalendarOutlined } from "@ant-design/icons";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralDatePickerEditor } from "./general-date-picker.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralDatePickerEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-date-picker",
      alias: "my-brick",
      $$parsedProperties: {
        placeholder: "请选择日期",
      },
    });
    const wrapper = shallow(
      <GeneralDatePickerEditor nodeUid={1} brick="general-date-picker" />
    );
    expect(wrapper.find(".placeholder").text()).toBe("请选择日期");
    expect(wrapper.find(CalendarOutlined).length).toEqual(1);
  });
});
