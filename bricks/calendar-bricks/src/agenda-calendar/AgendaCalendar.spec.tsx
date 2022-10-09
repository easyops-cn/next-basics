import React, { createRef } from "react";
import { AgendaCalendar } from "./AgendaCalendar";
import { shallow, mount } from "enzyme";
import { Button, Tooltip } from "antd";
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}));
export const mockDayData = [
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
    title: "Weekly meeting",
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
  it("should work", () => {
    const calendaeRef = createRef<any>();
    const mockAgendaSelect = jest.fn();
    const mockDateSelect = jest.fn();
    const wrapper = mount(
      <AgendaCalendar
        onAgendaSelect={mockAgendaSelect}
        onDateSelect={mockDateSelect}
        customHolidays={mockHolidayData}
        ref={calendaeRef}
        agendaData={mockDayData}
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
    wrapper.unmount();
  });
});
