import React from "react";
import { mount } from "enzyme";
import moment from "moment";
import { TaskCalendar } from "./TaskCalendar";

const briefList = [
  { date: "2021-05-01", text: "休" },
  { date: "2021-05-13", text: "休" },
  { date: "2021-05-14", text: "休" },
];

const taskList = [
  {
    date: "2021-05-01",
    task: [
      {
        OPT_CHANGE_NUMBER: "001",
        OPT_SUMMARY: "XBUS系统月度巡检",
        OPT_NOTIFICATION_TM: "2021-05-01 09:00:00",
        OPT_PRIORITY_ID: "3",
      },
      {
        OPT_CHANGE_NUMBER: "002",
        OPT_SUMMARY: "ESB系统月度巡检",
        OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
        OPT_PRIORITY_ID: "3",
      },
      {
        OPT_CHANGE_NUMBER: "003",
        OPT_SUMMARY: "新同城数据中心EBUS部署",
        OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
        OPT_PRIORITY_ID: "2",
      },
    ],
  },
  {
    date: "2021-05-02",
    task: [
      {
        OPT_CHANGE_NUMBER: "004",
        OPT_SUMMARY: "EBUS系统老中心WAS漏洞修复工作",
        OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
        OPT_PRIORITY_ID: "1",
      },
    ],
  },
  {
    date: "2021-05-03",
    task: [],
  },
];

const importantList = [
  {
    date: "2021-05-01",
    issues: ["发版"],
  },
  {
    date: "2021-05-02",
    issues: [],
  },
  {
    date: "2021-05-03",
    issues: ["人行窗口", "两会"],
  },
];

const taskSettings = {
  taskTitle: "task-title",
  fields: {
    priority: "OPT_PRIORITY_ID",
    summary: "OPT_SUMMARY",
    time: "OPT_NOTIFICATION_TM",
  },
  colorMap: {
    "0": "var(--theme-red-color)",
    "1": "var(--theme-orange-color)",
    "2": "var(--theme-purple-color)",
    "3": "var(--theme-green-color)",
  },
};

const importanceSettings = {
  priority: ["发版", "两会", "人行窗口"],
  colorMap: {
    发版: "yellow",
    两会: "green",
    人行窗口: "yellow",
  },
};

describe("TaskCalendar", () => {
  it("should work", () => {
    const wrapper = mount(
      <TaskCalendar
        taskList={taskList}
        briefList={briefList}
        importantList={importantList}
        taskSettings={taskSettings}
        importanceSettings={importanceSettings}
        value={"2021-05-10"}
        defaultSelectedDate={"2021-05-02"}
        dateCellHeight={40}
      />
    );
    expect(wrapper.find(".today .dateNumber").text()).toEqual("10");
    expect(wrapper.find(".taskItem")).toHaveLength(1);
    expect(wrapper.find(".importantItem")).toHaveLength(0);

    expect(wrapper.find(".taskPoint")).toHaveLength(2);
    expect(
      wrapper.find(".taskPoint").at(0).prop("style").backgroundColor
    ).toEqual("var(--theme-purple-color)");
    expect(
      wrapper.find(".taskPoint").at(1).prop("style").backgroundColor
    ).toEqual("var(--theme-orange-color)");

    expect(wrapper.find(".briefText")).toHaveLength(3);

    expect(wrapper.find(".importantDay")).toHaveLength(2);
    expect(
      wrapper.find(".importantDay").at(0).prop("style").backgroundColor
    ).toEqual("yellow");
    expect(
      wrapper.find(".importantDay").at(1).prop("style").backgroundColor
    ).toEqual("green");

    expect(wrapper.find(".dateContainer").at(0).prop("style").height).toEqual(
      40
    );
  });

  it("events should work", () => {
    const onSelect = jest.fn();
    const onPanelChange = jest.fn();
    const wrapper = mount(
      <TaskCalendar
        taskList={taskList}
        briefList={briefList}
        importantList={importantList}
        taskSettings={taskSettings}
        importanceSettings={importanceSettings}
        onDateSelect={onSelect}
        onPickerPanelChange={onPanelChange}
        value={"2021-05-10"}
      />
    );
    wrapper.find("Calendar").invoke("onSelect")(moment("2021-05-01"));
    expect(wrapper.find(".taskItem")).toHaveLength(3);
    expect(wrapper.find(".importantItem")).toHaveLength(1);
    expect(onSelect).lastCalledWith({
      date: "2021-05-01",
      data: {
        task: [
          {
            OPT_CHANGE_NUMBER: "001",
            OPT_SUMMARY: "XBUS系统月度巡检",
            OPT_NOTIFICATION_TM: "2021-05-01 09:00:00",
            OPT_PRIORITY_ID: "3",
          },
          {
            OPT_CHANGE_NUMBER: "002",
            OPT_SUMMARY: "ESB系统月度巡检",
            OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
            OPT_PRIORITY_ID: "3",
          },
          {
            OPT_CHANGE_NUMBER: "003",
            OPT_SUMMARY: "新同城数据中心EBUS部署",
            OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
            OPT_PRIORITY_ID: "2",
          },
        ],
        importance: ["发版"],
        brief: "休",
      },
    });

    wrapper.find("Calendar").invoke("onPanelChange")(
      moment("2021-04-01"),
      "date"
    );
    expect(onPanelChange).lastCalledWith({ date: "2021-04-01", mode: "date" });
  });
});
