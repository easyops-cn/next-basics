import React from "react";
import { shallow, mount } from "enzyme";
import { DatePicker } from "antd";
import moment from "moment";
import { install, InstalledClock } from "lolex";
import {
  GeneralDatePicker,
  InternalStateDatePicker,
} from "./GeneralDatePicker";
import { truncate } from "fs/promises";

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
    const handleOpenChange = jest.fn();

    const wrapper = shallow(
      <GeneralDatePicker
        name="date"
        label="hello"
        placeholder="when"
        value="2019-10-01"
        onChange={handleChange}
        onOk={handleOk}
        handleOpenChange={handleOpenChange}
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

    wrapper.find(InternalStateDatePicker).invoke("handleOpenChange")(true);
    expect(handleOpenChange).toHaveBeenCalled();
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
  it("should update picker=date", () => {
    const wrapper = mount(
      <GeneralDatePicker
        value="2023-08-29"
        picker="date"
        disabledFutureDate={true}
      />
    );
    expect(
      wrapper.find(InternalStateDatePicker).prop("value").format("YYYY-MM-DD")
    ).toBe("2023-08-29");
    expect(wrapper.find(".pre").length).toBe(0);

    wrapper.setProps({
      useFastSelectBtn: true,
    });
    wrapper.update();
    wrapper.find(".pre").simulate("click");
    expect(wrapper.find(DatePicker).prop("value").format("YYYY-MM-DD")).toBe(
      "2023-08-28"
    );
    wrapper.find(".next").simulate("click");
    expect(wrapper.find(DatePicker).prop("value").format("YYYY-MM-DD")).toBe(
      "2023-08-29"
    );
    wrapper.find(".current").simulate("click");
  });

  it("should update picker=week", () => {
    const wrapper = mount(
      <GeneralDatePicker
        value="2023-31周"
        picker="week"
        disabledFutureDate={true}
        useFastSelectBtn={true}
      />
    );
    expect(
      wrapper.find(InternalStateDatePicker).prop("value").format("gggg-ww周")
    ).toBe("2023-31周");

    wrapper.find(".pre").simulate("click");
    wrapper.find(".current").simulate("click");
    wrapper.find(".next").simulate("click");
  });
  it("should update picker=quarter", () => {
    const wrapper = mount(
      <GeneralDatePicker
        value="2023-第1季度"
        picker="quarter"
        disabledFutureDate={true}
        useFastSelectBtn={true}
      />
    );
    expect(
      wrapper.find(InternalStateDatePicker).prop("value").format("YYYY-第Q季度")
    ).toBe("2023-第1季度");
    expect(
      wrapper
        .find(DatePicker)
        .prop("dropdownClassName")
        .includes("quarterPicker")
    ).toBeTruthy();

    wrapper.find(".pre").simulate("click");
    wrapper.find(".current").simulate("click");
    wrapper.find(".next").simulate("click");
  });
  it("should update picker=month", () => {
    const wrapper = mount(
      <GeneralDatePicker
        value="2023-02"
        picker="month"
        disabledFutureDate={true}
        useFastSelectBtn={true}
      />
    );
    expect(
      wrapper.find(InternalStateDatePicker).prop("value").format("YYYY-MM月")
    ).toBe("2023-02月");

    wrapper.find(".pre").simulate("click");
    wrapper.find(".current").simulate("click");
    wrapper.find(".next").simulate("click");
  });

  it("should update picker=year", () => {
    const wrapper = mount(
      <GeneralDatePicker
        value="2023"
        picker="year"
        disabledFutureDate={true}
        useFastSelectBtn={true}
      />
    );
    expect(
      wrapper.find(InternalStateDatePicker).prop("value").format("YYYY")
    ).toBe("2023");

    wrapper.find(".pre").simulate("click");
    wrapper.find(".current").simulate("click");
    wrapper.find(".next").simulate("click");
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

  it("should render enabled date picker when disabledBeforeDate is not defined", () => {
    const datePicker = mount(
      <GeneralDatePicker
        name="datePicker"
        picker="date"
        disabledBeforeDate={undefined}
      />
    );
    const wrapper = mount(
      datePicker.find("PickerTrigger").prop("popupElement")
    );
    const disabled = wrapper.find(
      "td.ant-picker-cell-in-view.ant-picker-cell-disabled"
    );
    expect(disabled).toHaveLength(0);
  });
  it("should render disabled date picker when selected date is before or after disabledBeforeDate", () => {
    const datePicker = mount(
      <GeneralDatePicker
        name="datePicker"
        picker="date"
        disabledBeforeDate="2019-10-27" // 设定一个过去的日期
      />
    );
    const wrapper = mount(
      datePicker.find("PickerTrigger").prop("popupElement")
    );

    const disabled = wrapper.find(
      'td[title="2019-10-26"].ant-picker-cell-in-view.ant-picker-cell-disabled'
    );
    expect(disabled).toHaveLength(1);
    const noDisabledV1 = wrapper.find(
      'td[title="2019-10-27"].ant-picker-cell-in-view.ant-picker-cell-disabled'
    );
    expect(noDisabledV1).toHaveLength(0);
    const noDisabledV2 = wrapper.find(
      'td[title="2019-10-28"].ant-picker-cell-in-view.ant-picker-cell-disabled'
    );
    expect(noDisabledV2).toHaveLength(0);
  });
  it("should render disabled date picker when selected date is before or after disabledAfterDate", () => {
    const datePicker = mount(
      <GeneralDatePicker
        name="datePicker"
        picker="date"
        disabledAfterDate="2019-10-27"
      />
    );
    const wrapper = mount(
      datePicker.find("PickerTrigger").prop("popupElement")
    );

    const noDisabledV1 = wrapper.find(
      'td[title="2019-10-26"].ant-picker-cell-in-view.ant-picker-cell-disabled'
    );
    expect(noDisabledV1).toHaveLength(0);
    const noDisabledV2 = wrapper.find(
      'td[title="2019-10-27"].ant-picker-cell-in-view.ant-picker-cell-disabled'
    );
    expect(noDisabledV2).toHaveLength(0);
    const disabled = wrapper.find(
      'td[title="2019-10-28"].ant-picker-cell-in-view.ant-picker-cell-disabled'
    );
    expect(disabled).toHaveLength(1);
  });
});
