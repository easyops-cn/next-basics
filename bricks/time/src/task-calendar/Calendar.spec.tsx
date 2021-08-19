import React from "react";
import { mount } from "enzyme";
import moment from "moment";
import { Calendar } from "./Calendar";
import { Select, Radio } from "antd";
import { act } from "react-dom/test-utils";

// local: en, 周日为每个星期第一天
describe("Calendar", () => {
  it("should work", async () => {
    const dateRender = jest.fn();
    const onSelect = jest.fn((date) => date.format("YYYY-MM-DD"));
    const onPanelChange = jest.fn((date, mode) => {
      return {
        date: date.format("YYYY-MM-DD"),
        mode,
      };
    });
    const wrapper = mount(
      <Calendar
        dateFullCellRender={dateRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        defaultValue={moment("2021-08-15")}
      />
    );
    expect(wrapper.find("table tbody tr")).toHaveLength(5);
    expect(wrapper.find(".ant-picker-cell")).toHaveLength(35);
    expect(wrapper.find(".ant-picker-cell-in-view")).toHaveLength(31);

    // change year
    await act(async () => {
      wrapper.find(Select).at(0).invoke("onChange")(2020, null);
    });
    wrapper.update();
    expect(wrapper.find("table tbody tr")).toHaveLength(6);
    expect(onPanelChange).toHaveLastReturnedWith({
      date: "2020-08-15",
      mode: "month",
    });
    expect(onSelect).toHaveLastReturnedWith("2020-08-15");

    // change month
    await act(async () => {
      wrapper.find(Select).at(1).invoke("onChange")(12, null);
    });
    wrapper.update();
    expect(wrapper.find("table tbody tr")).toHaveLength(5);
    expect(onPanelChange).toHaveLastReturnedWith({
      date: "2020-12-15",
      mode: "month",
    });
    expect(onSelect).toHaveLastReturnedWith("2020-12-15");

    // change mode
    await act(async () => {
      wrapper.find(Radio.Group).invoke("onChange")({
        target: {
          value: "week",
        },
      });
    });
    wrapper.update();
    expect(wrapper.find("table tbody tr")).toHaveLength(1);
    expect(wrapper.find(".ant-picker-cell")).toHaveLength(7);
    expect(wrapper.find(".ant-picker-cell-in-view")).toHaveLength(7);
    expect(onPanelChange).toHaveLastReturnedWith({
      date: "2020-12-15",
      mode: "week",
    });

    // pre week
    await act(async () => {
      wrapper.find(".arrow").at(0).simulate("click");
    });
    wrapper.update();
    expect(wrapper.find("table tbody tr")).toHaveLength(1);
    expect(onPanelChange).toHaveLastReturnedWith({
      date: "2020-12-08",
      mode: "week",
    });
    expect(onSelect).toHaveLastReturnedWith("2020-12-08");

    // next week
    await act(async () => {
      wrapper.find(".arrow").at(1).simulate("click");
    });
    wrapper.update();
    expect(wrapper.find("table tbody tr")).toHaveLength(1);
    expect(onPanelChange).toHaveLastReturnedWith({
      date: "2020-12-15",
      mode: "week",
    });
    expect(onSelect).toHaveLastReturnedWith("2020-12-15");

    // click
    await act(async () => {
      await wrapper.find(Radio.Group).invoke("onChange")({
        target: {
          value: "month",
        },
      });
      wrapper.update();
      wrapper.find(".ant-picker-cell").last().simulate("click");
    });
    wrapper.update();
    expect(wrapper.find("table tbody tr")).toHaveLength(6);
    expect(onSelect).toHaveLastReturnedWith("2021-01-02");
  });
});
