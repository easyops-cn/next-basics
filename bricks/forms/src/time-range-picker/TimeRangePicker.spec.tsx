import React from "react";
import { shallow, mount } from "enzyme";
import { TimePicker, DatePicker } from "antd";
import {
  TimeRangePicker,
  RealTimeRangePicker,
  RefTimeRangePicker,
  presetRangeType,
} from "./TimeRangePicker";
import moment from "moment";

describe("TimeRangePicker", () => {
  it("should work", () => {
    const wrapper = mount(<TimeRangePicker format="HH:mm:ss" />);
    expect(wrapper.find(TimePicker)).toHaveLength(2);
  });

  it("should work with init value", () => {
    const wrapper = mount(
      <TimeRangePicker
        format="HH:mm:ss"
        value={{ startTime: "01:23:45", endTime: "12:34:56" }}
      />
    );
    expect(wrapper.find(TimePicker)).toHaveLength(2);
    let startTimePicker = wrapper.find(TimePicker).first();
    startTimePicker.invoke("onChange")(
      moment("00:24:00", "HH:mm:ss"),
      // eslint-disable-next-line
      // @ts-ignore
      "00:24:00"
    );
    startTimePicker = wrapper.find(TimePicker).first();
    expect(startTimePicker.prop("value").format("HH:mm:ss")).toBe("00:24:00");

    let endTimePicker = wrapper.find(TimePicker).last();
    endTimePicker.invoke("onChange")(
      moment("23:59:00", "HH:mm:ss"),
      // eslint-disable-next-line
      // @ts-ignore
      "23:59:00"
    );
    endTimePicker = wrapper.find(TimePicker).last();
    expect(endTimePicker.prop("value").format("HH:mm:ss")).toBe("23:59:00");
  });

  it("should update value", () => {
    const wrapper = mount(<TimeRangePicker format="HH:mm:ss" />);
    expect(wrapper.find(TimePicker).first().prop("value")).toBeUndefined();

    wrapper.setProps({
      value: { startTime: "01:23:45", endTime: "12:34:56" },
    });
    wrapper.update();
    expect(
      wrapper.find(TimePicker).first().prop("value").format("HH:mm:ss")
    ).toBe("01:23:45");
  });

  it("date range should work", () => {
    const fn = jest.fn();
    const wrapper = mount(
      <TimeRangePicker
        format="YYYY-MM-DD HH:mm:ss"
        rangeType="dateTime"
        onChange={fn}
        value={{
          startTime: "2020-03-16 01:23:45",
          endTime: "2020-03-16 12:34:56",
        }}
        emitChangeOnInit={true}
        presetRanges={[presetRangeType.Today, presetRangeType.ThisWeek]}
      />
    );
    expect(wrapper.find(DatePicker.RangePicker)).toHaveLength(1);
    const rangePicker = wrapper.find(DatePicker.RangePicker).first();
    rangePicker.invoke("onChange")([moment(), moment()], ["", ""]);
    rangePicker.invoke("onOk")([moment(), moment()]);
    rangePicker.invoke("onOpenChange")(true);
    rangePicker.invoke("onOpenChange")(false);
    expect(fn).toBeCalled();
  });

  it("date range should work when startTime or endTime undefined", () => {
    const fn = jest.fn();
    const wrapper = mount(
      <TimeRangePicker
        format="YYYY-MM-DD HH:mm:ss"
        rangeType="dateTime"
        onChange={fn}
        value={{
          startTime: undefined,
          endTime: undefined,
        }}
        selectNearDays={90}
      />
    );
    expect(wrapper.find(DatePicker.RangePicker)).toHaveLength(1);
    const rangePicker = wrapper.find(DatePicker.RangePicker).first();
    rangePicker.invoke("onChange")([moment(), moment()], ["", ""]);
    rangePicker.invoke("onOk")([moment(), moment()]);
    rangePicker.invoke("onOpenChange")(true);
    rangePicker.invoke("onOpenChange")(false);
    expect(fn).toBeCalled();
    expect(
      rangePicker.prop("disabledDate")(moment().subtract(100, "days"))
    ).toBe(true);
    expect(
      rangePicker.prop("disabledDate")(moment().subtract(10, "days"))
    ).toBe(false);
    expect(rangePicker.prop("disabledDate")(moment().add(10, "days"))).toBe(
      true
    );
  });

  it("date range should work when default value is null", () => {
    let mountValue;
    const fn = jest.fn((args) => (mountValue = args));
    const wrapper = mount(
      <TimeRangePicker
        rangeType="dateTime"
        format="YYYY-MM-DD HH:mm:ss"
        onChange={fn}
        value={null}
        emitChangeOnInit={true}
      />
    );
    expect(wrapper.find(DatePicker.RangePicker)).toHaveLength(1);
    expect(mountValue).toMatchObject({
      startTime: moment().format("YYYY-MM-DD ") + "00:00:00",
      endTime: moment().format("YYYY-MM-DD ") + "23:59:59",
    });
  });
});

describe("RefTimeRangePicker", () => {
  it("should work", () => {
    const changeFn = jest.fn();
    const wrapper = mount(
      <RefTimeRangePicker
        format="HH:mm:ss"
        onChange={changeFn}
        emitChangeOnInit={true}
      />
    );
    expect(wrapper.find(TimePicker)).toHaveLength(2);
    expect(changeFn).toBeCalled();

    let startTimePicker = wrapper.find(TimePicker).first();
    startTimePicker.invoke("onChange")(
      moment("00:24:00", "HH:mm:ss"),
      // eslint-disable-next-line
      // @ts-ignore
      "00:24:00"
    );
    startTimePicker = wrapper.find(TimePicker).first();

    let endTimePicker = wrapper.find(TimePicker).last();
    endTimePicker.invoke("onChange")(
      moment("23:59:00", "HH:mm:ss"),
      // eslint-disable-next-line
      // @ts-ignore
      "23:59:00"
    );
    endTimePicker = wrapper.find(TimePicker).last();
    expect(endTimePicker.prop("value")).toBeUndefined();

    wrapper.setProps({ value: { startTime: "01:23:45", endTime: "23:59:59" } });
  });
});

describe("TimeRangePicker placeholder", () => {
  it("should work with string placeholder for time range", () => {
    const wrapper = mount(
      <TimeRangePicker format="HH:mm:ss" rangePlaceholder="请选择时间" />
    );
    const timePickers = wrapper.find(TimePicker);
    expect(timePickers).toHaveLength(2);
    expect(timePickers.at(0).prop("placeholder")).toBe("请选择时间");
    expect(timePickers.at(1).prop("placeholder")).toBe("请选择时间");
  });

  it("should work with array placeholder for time range", () => {
    const wrapper = mount(
      <TimeRangePicker
        format="HH:mm:ss"
        rangePlaceholder={["开始时间", "结束时间"]}
      />
    );
    const timePickers = wrapper.find(TimePicker);
    expect(timePickers).toHaveLength(2);
    expect(timePickers.at(0).prop("placeholder")).toBe("开始时间");
    expect(timePickers.at(1).prop("placeholder")).toBe("结束时间");
  });

  it("should work without placeholder for time range", () => {
    const wrapper = mount(<TimeRangePicker format="HH:mm:ss" />);
    const timePickers = wrapper.find(TimePicker);
    expect(timePickers).toHaveLength(2);
    expect(timePickers.at(0).prop("placeholder")).toBeUndefined();
    expect(timePickers.at(1).prop("placeholder")).toBeUndefined();
  });

  it("should work with string placeholder for date range", () => {
    const wrapper = mount(
      <TimeRangePicker
        format="YYYY-MM-DD"
        // eslint-disable-next-line
        // @ts-ignore
        rangeType="date"
        rangePlaceholder="请选择日期"
      />
    );
    const rangePicker = wrapper.find(DatePicker.RangePicker);
    expect(rangePicker).toHaveLength(1);
    // 字符串会被转换为数组
    expect(rangePicker.prop("placeholder")).toEqual([
      "请选择日期",
      "请选择日期",
    ]);
  });

  it("should work with array placeholder for date range", () => {
    const wrapper = mount(
      <TimeRangePicker
        format="YYYY-MM-DD"
        // eslint-disable-next-line
        // @ts-ignore
        rangeType="date"
        rangePlaceholder={["开始日期", "结束日期"]}
      />
    );
    const rangePicker = wrapper.find(DatePicker.RangePicker);
    expect(rangePicker).toHaveLength(1);
    expect(rangePicker.prop("placeholder")).toEqual(["开始日期", "结束日期"]);
  });

  it("should work without placeholder for date range", () => {
    const wrapper = mount(
      <TimeRangePicker
        format="YYYY-MM-DD"
        // eslint-disable-next-line
        // @ts-ignore
        rangeType="date"
      />
    );
    const rangePicker = wrapper.find(DatePicker.RangePicker);
    expect(rangePicker).toHaveLength(1);
    expect(rangePicker.prop("placeholder")).toBeUndefined();
  });

  it("should work with placeholder for dateTime range", () => {
    const wrapper = mount(
      <TimeRangePicker
        format="YYYY-MM-DD HH:mm:ss"
        // eslint-disable-next-line
        // @ts-ignore
        rangeType="dateTime"
        rangePlaceholder={["开始时间", "结束时间"]}
      />
    );
    const rangePicker = wrapper.find(DatePicker.RangePicker);
    expect(rangePicker).toHaveLength(1);
    expect(rangePicker.prop("placeholder")).toEqual(["开始时间", "结束时间"]);
  });
});
