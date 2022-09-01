import React from "react";
import { shallow, mount } from "enzyme";
import { DatePicker } from "antd";
import moment from "moment";
import { install, InstalledClock } from "lolex";
import {
  GeneralDatePicker,
  InternalStateDatePicker,
} from "./GeneralDatePicker";

describe("GeneralDatePicker", () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = install({ now: +new Date("2019-10-17 17:20:00") });
  });
  afterEach(() => {
    clock.uninstall();
  });

  it("should work", async () => {
    const handleChange = jest.fn();
    const handleOk = jest.fn();

    const wrapper = shallow(
      <GeneralDatePicker
        name="date"
        label="hello"
        placeholder="when"
        value="2019-10-01"
        onChange={handleChange}
        onOk={handleOk}
        format="YYYY-MM-DD"
        picker={"date"}
      />
    );
    wrapper.find(InternalStateDatePicker).invoke("onChange")(
      moment("2020-01-01", "YYYY-MM-DD"),
      "2020-01-01"
    );
    await Promise.resolve();
    expect(handleChange).toBeCalledWith("2020-01-01");

    wrapper.find(InternalStateDatePicker).invoke("onOk")(moment("2020-02-01"));
    expect(handleOk).toBeCalledWith("2020-02-01");
  });

  it("should update value", () => {
    const wrapper = mount(
      <GeneralDatePicker value="2019-10-01" picker="date" />
    );
    expect(
      wrapper.find(InternalStateDatePicker).prop("value").format("YYYY-MM-DD")
    ).toBe("2019-10-01");

    wrapper.setProps({
      value: "2020-01-01",
    });
    wrapper.update();
    expect(
      wrapper.find(InternalStateDatePicker).prop("value").format("YYYY-MM-DD")
    ).toBe("2020-01-01");
  });
  it("should update value week", () => {
    const wrapper = mount(
      <GeneralDatePicker value="2019-10周" picker="week" />
    );
    expect(
      wrapper.find(InternalStateDatePicker).prop("value").format("YYYY-ww周")
    ).toBe("2019-10周");

    wrapper.setProps({
      value: "2020-20周",
    });
    wrapper.update();
    expect(
      wrapper.find(InternalStateDatePicker).prop("value").format("YYYY-ww周")
    ).toBe("2020-20周");
  });
  it("should work with onOk ", () => {
    const handleOk = jest.fn();
    const handleChange = jest.fn();
    const wrapper = mount(
      <GeneralDatePicker
        picker="date"
        format="YYYY-MM-DD"
        onOk={handleOk}
        onChange={handleChange}
      />
    );
    wrapper.find(DatePicker).invoke("onOk")(moment("2020-09-01"));
    expect(handleChange).toBeCalledWith("2020-09-01");
    expect(handleOk).toBeCalledWith("2020-09-01");
  });

  describe("test disabled", () => {
    const datePicker = mount(
      <GeneralDatePicker
        value="2019-10-01 00:00:00"
        format="YYYY-MM-DD HH:mm:ss "
        showTime={true}
        picker="date"
        disabledDate={{}}
      />
    );
    let wrapper = mount(datePicker.find("PickerTrigger").prop("popupElement"));

    it("while not set disabledDate", () => {
      expect(
        wrapper.find(".ant-picker-cell-in-view.ant-picker-cell-disabled")
      ).toHaveLength(0);
      expect(wrapper.find(".ant-picker-time-panel-cell-disabled")).toHaveLength(
        0
      );
    });

    it("while disabledDate is object", () => {
      datePicker.setProps({
        disabledDate: {
          weekday: 4,
        },
      });
      datePicker.update();
      wrapper = mount(datePicker.find("PickerTrigger").prop("popupElement"));
      expect(
        wrapper.find(".ant-picker-cell-in-view.ant-picker-cell-disabled")
      ).toHaveLength(5);
      expect(wrapper.find(".ant-picker-time-panel-cell-disabled")).toHaveLength(
        0
      );
    });

    it("while disabledDate is array", () => {
      datePicker.setProps({
        disabledDate: [
          {
            weekday: 4,
            month: "1-12",
          },
          {
            date: "1-2,3",
          },
          {
            date: "1-5,4-7,3-10,10",
            year: "1970",
          },
        ],
      });
      datePicker.update();
      wrapper = mount(datePicker.find("PickerTrigger").prop("popupElement"));
      expect(
        wrapper.find(".ant-picker-cell-in-view.ant-picker-cell-disabled")
      ).toHaveLength(7);
      expect(wrapper.find(".ant-picker-time-panel-cell-disabled")).toHaveLength(
        0
      );
    });

    it("while disabledDate set time", () => {
      datePicker.setProps({
        disabledDate: [
          {
            date: 1,
            second: "10-14,15-19",
          },
          {
            date: 1,
            hour: "10",
            minute: "10-15,13",
            second: "22-23,20-25",
          },
          {
            date: 2,
            second: "0-59",
          },
        ],
        value: "2019-10-01 10:11:00",
      });
      datePicker.update();
      wrapper = mount(datePicker.find("PickerTrigger").prop("popupElement"));
      const hourColumn = wrapper.find(".ant-picker-time-panel-column").at(0);
      const minuteColumn = wrapper.find(".ant-picker-time-panel-column").at(1);
      const secondColumn = wrapper.find(".ant-picker-time-panel-column").at(2);
      expect(
        wrapper.find(".ant-picker-cell-in-view.ant-picker-cell-disabled")
      ).toHaveLength(0);
      expect(
        hourColumn.find(".ant-picker-time-panel-cell-disabled")
      ).toHaveLength(0);
      expect(
        minuteColumn.find(".ant-picker-time-panel-cell-disabled")
      ).toHaveLength(0);
      expect(
        secondColumn.find(".ant-picker-time-panel-cell-disabled")
      ).toHaveLength(16);
    });

    it("test confirmDisabled", () => {
      datePicker.setProps({
        disabledDate: [
          {
            month: "1-12",
          },
        ],
      });
      datePicker.update();
      expect(
        datePicker
          .find(DatePicker)
          .prop("dropdownClassName")
          .includes("confirmDisabled")
      ).toBeFalsy();
    });
  });
});
