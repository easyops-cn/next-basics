import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { StatisticCardEditor } from "./statistic-card.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("StatisticCardEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "statistic-card",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<StatisticCardEditor nodeUid={1} />);
    expect(wrapper.find(".valuePlaceholder").length).toBe(1);
    expect(wrapper.find(".titlePlaceholder").length).toBe(1);
  });

  it("should show card title", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "statistic-card",
      alias: "my-brick",
      $$parsedProperties: {
        cardTitle: "Hello World",
      },
    });
    const wrapper = shallow(<StatisticCardEditor nodeUid={1} />);
    expect(wrapper.find(".title").text()).toBe("Hello World");
  });

  it("should show value", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "statistic-card",
      alias: "my-brick",
      $$parsedProperties: {
        value: 99,
      },
    });
    const wrapper = shallow(<StatisticCardEditor nodeUid={1} />);
    expect(wrapper.find(".value").text()).toBe("99");
  });
});
