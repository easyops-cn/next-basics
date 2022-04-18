import React from "react";
import { shallow, mount } from "enzyme";
import { WorkbenchQuickEntry } from "./WorkbenchQuickEntry";
import { GeneralIcon, Link } from "@next-libs/basic-components";

const mockData = [
  {
    id: "1",
    name: "访问记录1",
    count: 2,
    visitedAt: "2019-05-17T11:06:20+08:00",
  },
  {
    id: "2",
    name: "访问记录2",
    count: 2,
    visitedAt: "2019-05-17T11:06:20+08:00",
  },
];
jest.mock("@next-libs/visit-history", () => {
  return {
    VisitHistory: jest.fn(() => ({
      latest: jest.fn(() => mockData),
      all: jest.fn(() => mockData),
      remove: jest.fn(() => mockData.splice(0, 1)),
    })),
  };
});

const mockMoreClickFn = jest.fn();

describe("WorkbenchQuickEntry", () => {
  it("should work", () => {
    const wrapper = shallow(
      <WorkbenchQuickEntry
        entryTitle="快速入口"
        entryList={[
          {
            text: "入口一",
            to: "/page-1",
          },
          {
            text: "入口二",
            to: "/page-2",
            icon: {
              lib: "antd",
              icon: "copy",
              theme: "outlined",
            },
          },
        ]}
      />
    );

    expect(wrapper.find(".title").at(0).text()).toBe("快速入口");
    expect(wrapper.find(Link).children().at(0).text()).toBe("入口一");
    expect(wrapper.find(Link).length).toBe(2);
    expect(wrapper.find(GeneralIcon).length).toBe(1);
  });

  it("should hidden more button", () => {
    const wrapper = mount(
      <WorkbenchQuickEntry
        entryTitle="最近访问"
        isShowMoreButton
        moreButtonText="更多"
        onMoreButtonClick={mockMoreClickFn}
        history={{
          namespace: "myspace",
          property: "id",
          fields: {
            label: "name",
          },
        }}
      />
    );

    expect(wrapper.find(Link).children().at(0).text()).toBe("访问记录1");

    expect(mockMoreClickFn).toBeCalledTimes(0);
    wrapper.find(".moreButton").at(0).simulate("click");
    expect(mockMoreClickFn).toBeCalledTimes(1);
  });

  it("should delete item", () => {
    const wrapper = mount(
      <WorkbenchQuickEntry
        entryTitle="最近访问"
        history={{
          namespace: "myspace",
          property: "id",
          fields: {
            label: "name",
            compareSourceProperty: "id",
          },
          compareSource: [
            {
              id: "2",
            },
          ],
        }}
      />
    );

    expect(wrapper.find(Link).children().at(0).text()).toBe("访问记录2");
  });
});
