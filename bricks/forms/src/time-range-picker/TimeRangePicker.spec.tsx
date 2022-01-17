import React from "react";
import { shallow, mount } from "enzyme";
import { TimePicker, DatePicker } from "antd";
import {
  TimeRangePicker,
  RealTimeRangePicker,
  RefTimeRangePicker,
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
