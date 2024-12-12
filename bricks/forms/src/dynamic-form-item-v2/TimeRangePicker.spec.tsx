import React from "react";
import { mount } from "enzyme";
import { DatePicker } from "antd";
import { TimeRangePickerItem } from "./TimeRangePicker";
import moment from "moment";
const mockOnChange = jest.fn();
describe("TimeRangePicker", () => {
  it("should work", () => {
    const wrapper = mount(
      <TimeRangePickerItem
        rangeType="dateTime"
        value={{
          startTime: "2024-01-01 00:00:00",
          endTime: "2024-01-01 23:59:59",
        }}
        onChange={mockOnChange}
      />
    );
    expect(wrapper.find(DatePicker.RangePicker).length).toBe(1);

    wrapper.setProps({
      rangeType: "date",
    });
    wrapper.update();
    expect(wrapper.find(DatePicker.RangePicker).length).toBe(1);

    wrapper.setProps({
      rangeType: "time",
    });
    wrapper.update();
    expect(wrapper.find(DatePicker.RangePicker).length).toBe(1);

    wrapper.setProps({
      rangeType: "hmTime",
    });
    wrapper.update();
    expect(wrapper.find(DatePicker.RangePicker).length).toBe(1);

    wrapper.setProps({
      rangeType: "week",
    });
    wrapper.update();
    expect(wrapper.find(DatePicker.RangePicker).length).toBe(1);

    wrapper.setProps({
      rangeType: "month",
    });
    wrapper.update();
    expect(wrapper.find(DatePicker.RangePicker).length).toBe(1);

    wrapper.setProps({
      rangeType: "quarter",
    });
    wrapper.update();
    expect(wrapper.find(DatePicker.RangePicker).length).toBe(1);

    wrapper.setProps({
      rangeType: "year",
    });
    wrapper.update();
    expect(wrapper.find(DatePicker.RangePicker).length).toBe(1);

    wrapper.setProps({
      rangeType: "dateTime",
    });
    wrapper.update();
    // 模拟用户选择日期范围
    const rangePicker = wrapper.find(DatePicker.RangePicker);
    rangePicker.prop("onChange")([
      moment("2024-01-02 00:00:00"),
      moment("2024-01-02 23:59:59"),
    ]);
    expect(mockOnChange).toHaveBeenCalledWith({
      startTime: "2024-01-02 00:00:00",
      endTime: "2024-01-02 23:59:59",
    });
    rangePicker.prop("onChange")(undefined);
    expect(mockOnChange).toHaveBeenCalledWith(undefined);
  });
});
