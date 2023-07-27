import React from "react";
import { mount } from "enzyme";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickTimeline, BrickTimelineProps } from "./BrickTimeline";

jest.mock("@next-core/brick-kit", () => {
  return {
    __esModule: true,
    BrickAsComponent(): React.ReactElement {
      return <div>BrickAsComponent</div>;
    },
    getHistory: () => {
      return {
        location: {},
        createHref: jest.fn(),
      };
    },
  };
});

describe("BrickTimeline", () => {
  const itemList = [
    {
      title: "easyops",
      description: '编辑了"publicDev_1"属性：服务信息',
      time: 1554861661000,
      status: "success",
      link: "#abc",
    },
    {
      title: "default",
      description: '编辑了"publicDev_1"属性：服务信息、agent版本',
      status: "warn",
      time: 1554892201000,
      link: "#def",
    },
    {
      title: "jack",
      description: '编辑了"publicDev_1"属性：服务信息',
      status: "running",
      time: 1555032601000,
      link: "#ghi",
    },
    {
      title: "goodman",
      description: '编辑了"publicDev_1"属性：服务信息',
      status: "normal",
      time: 1555050451000,
      link: "#jkl",
    },
    {
      title: "easyops",
      description: '编辑了"publicDev_1"属性：服务信息',
      status: "warn",
      time: 1557666471000,
      link: "#mno",
    },
  ];

  it("should render custom element", () => {
    const useBrick: UseBrickConf = {
      brick: "custom-timeline-card",
      properties: {
        id: "custom-element",
        textContent: "自定义构件",
        mapValueToField: "dataSource",
      },
      transform: {
        dataSource: "@{item}",
      },
    };

    const wrapper = mount(
      <BrickTimeline itemList={itemList} useBrick={useBrick} />
    );
    expect(wrapper.find("BrickAsComponent").at(0).prop("data")).toEqual({
      item: itemList[0],
      index: 0,
      list: itemList,
    });
  });

  it("should render base type timeline with second ", () => {
    const props: Partial<BrickTimelineProps> = {
      type: "base",
      showCard: true,
      statusMap: {
        warn: "red",
        running: "blue",
        success: "green",
        normal: "gray",
      },
    };

    const wrapper = mount(<BrickTimeline itemList={itemList} {...props} />);

    const fistItem = wrapper.find("TimelineItem").at(0);
    expect(fistItem.find(".title").text()).toEqual("easyops");
    expect(fistItem.find(".description").text()).toEqual(
      '编辑了"publicDev_1"属性：服务信息'
    );
    expect(fistItem.find(".dateTime").text()).toEqual("2019/04/10 10:01");

    wrapper.setProps({
      fields: {
        title: "name",
        description: "text",
        status: "status",
        timeConfig: {
          type: "second",
          value: "ctime",
        },
      },
      dataSource: [
        {
          name: "easyops",
          text: '编辑了"publicDev_1"属性：服务信息',
          ctime: 1554861661,
          status: "success",
          instanceId: "abc",
        },
      ],
    });

    wrapper.update();

    expect(fistItem.find(".dateTime").text()).toEqual("2019/04/10 10:01");
  });

  it("should extension base type timeline with second", () => {
    const props: BrickTimelineProps = {
      type: "extension",
      showCard: false,
      statusMap: {
        warn: "red",
        running: "blue",
        success: "green",
        normal: "gray",
      },
      timeType: "second",
      itemList: [
        {
          title: "easyops",
          description: '编辑了"publicDev_1"属性：服务信息',
          time: 1554861661,
          status: "success",
        },
        {
          title: "default",
          description: '编辑了"publicDev_1"属性：服务信息、agent版本',
          status: "warn",
          time: 1554892201,
        },
      ],
    };

    const wrapper = mount(<BrickTimeline {...props} />);

    expect(wrapper.find(".month").at(0).text()).toEqual("4月");
    expect(wrapper.find(".day").at(0).text()).toEqual("10");

    expect(wrapper.find(".dateContainer").length).toEqual(1);
  });
});
