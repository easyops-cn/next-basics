import React, { createRef } from "react";
import { AgendaCalendar } from "./AgendaCalendar";
import { shallow, mount } from "enzyme";
import { Button, Tooltip } from "antd";
import { install, InstalledClock } from "lolex";

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}));
export const mockDayData = [
  {
    id: "event133",
    calendarId: "cal2",
    title: "Weekly mee6578979579690ting",
    start: "2022-10-09T12:00:00",
    end: "2022-10-09T13:29:00",
    task: {
      a: "1",
      b: "2",
    },
  },
  {
    id: "event1",
    calendarId: "cal2",
    title: "Weekly meeting",
    start: "2022-09-28T00:00:00",
    end: "2022-09-28T23:59:00",
    backgroundColor: "yellow",
    allDay: "true",
  },
  {
    id: "event2",
    calendarId: "cal2",
    title: "Weekly meeting1",
    start: "2022-09-28T00:00:00",
    end: "2022-09-28T10:08:00",
  },
  {
    id: "event3",
    calendarId: "cal2",
    title: "Weekly meeting9999999",
    start: "2022-09-28T09:00:00",
    end: "2022-09-28T10:00:00",
  },
  {
    id: "event35647678254789785376359789",
    calendarId: "cal2",
    title:
      "Weekly meeting5689467542603578ting56894675426035789ting56894675426035789ting56894675426035789ting56894675426035789980568307",
    start: "2022-09-18T00:00:00",
    end: "2022-09-30T00:00:00",
  },
];
export const mockHolidayData: any[] = [
  {
    start: "2022-09-28T00:00:00",
    end: "2022-09-28T20:10:09",
    name: "测试节日281",
  },
  {
    start: "2022-09-30",
    end: "2022-09-30",
    name: " 测试节日301",
  },
  {
    start: "2022-09-28T00:00:00",
    end: "2022-09-28T20:10:09",
    name: "测试节日282",
  },
  {
    start: "2022-09-30",
    end: "2022-09-30",
    name: " 测试节日302",
  },
  {
    start: "2022-09-28T00:00:00",
    end: "2022-09-28T20:10:09",
    name: "测试节日283",
  },
  {
    start: "2022-09-30",
    end: "2022-09-30",
    name: " 测试节日303",
  },
  {
    start: "2022-09-30",
    end: "2022-09-30",
    name: " 测试节日304",
  },
  {
    start: "2022-09-28T00:00:00",
    end: "2022-09-28T20:10:09",
    name: "测试节日205",
  },
  {
    start: "2022-09-30",
    end: "2022-09-30",
    name: " 测试节日305",
  },
];

describe("TestTest", () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = install({ now: +new Date("2022-10-10 17:20:00") });
  });
  afterEach(() => {
    clock.uninstall();
  });

  it("should work", () => {
    const calendaeRef = createRef<any>();
    const mockAgendaSelect = jest.fn();
    const mockDateSelect = jest.fn();
    const mockOnQuickSwitchDate = jest.fn();
    const wrapper = mount(
      <AgendaCalendar
        onAgendaSelect={mockAgendaSelect}
        onDateSelect={mockDateSelect}
        customHolidays={mockHolidayData}
        ref={calendaeRef}
        agendaData={mockDayData}
        showEventCount={true}
        agendaRandomColor={false}
        onQuickSwitchDate={mockOnQuickSwitchDate}
        afterTitleBrick={{
          useBrick: {
            brick: "span",
          },
        }}
        afterQuickSwitchBrick={{
          useBrick: {
            brick: "span",
          },
        }}
      />
    );
    Object.assign(window, { innerWidth: 300, innerHeight: 600 });
    const buttons = wrapper.find(Button);
    const titleDiv = wrapper.find(".headerTitle");
    expect(wrapper.find(Tooltip).length).toBe(2);
    buttons.at(0).simulate("click");
    expect(titleDiv.text()).toBe("2022年9月");
    buttons.at(2).simulate("click");
    expect(titleDiv.text()).toBe("2022年10月");
    buttons.at(1).simulate("click");
    expect(titleDiv.text()).toBe("2022年10月");
    wrapper.find(".eventCell").at(0).simulate("click");

    calendaeRef.current.getApi().changeView("customDay");
    calendaeRef.current.getApi().gotoDate(1665244800000);
    wrapper.update();
    wrapper.find(".customDayEventsDiv").at(0).simulate("click");
    wrapper.setProps({
      agendaRandomColor: true,
    });
    wrapper.unmount();
  });
});
