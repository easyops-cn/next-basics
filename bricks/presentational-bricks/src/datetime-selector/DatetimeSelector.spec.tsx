import React from "react";
import { shallow } from "enzyme";

import { DatetimeSelector, ResolutionProps } from "./DatetimeSelector";

jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("DatetimeSelector", () => {
  beforeEach(() => {
    jest
      .spyOn(Date, "now")
      .mockImplementation(() => new Date("2019-10-01 08:00:00").getTime());
  });

  it("should work", () => {
    let wrapper = shallow(<DatetimeSelector from="now-1d" />);
    expect(wrapper.find("DatetimeRange").prop("initDateRange")).toEqual({
      type: "dateRange",
      value: "now-1d",
    });

    wrapper = shallow(
      <DatetimeSelector from="1571673600076" to="1571846399076" />
    );
    expect(wrapper.find("DatetimeRange").prop("initDateRange")).toEqual({
      type: "specifiedDate",
      value: { from: 1571673600076, to: 1571846399076 },
    });

    wrapper = shallow(<DatetimeSelector />);
    expect(wrapper.find("DatetimeRange").prop("initDateRange")).toEqual(null);
  });

  it("should render custom time range", () => {
    const customTimeRange = [
      {
        range: "now-30d",
        text: "近30天",
      },
      {
        range: "now-1y",
        text: "近1年",
      },
    ];
    const wrapper = shallow(
      <DatetimeSelector type="custom" customTimeRange={customTimeRange} />
    );
    const DatetimeRange = wrapper.find("DatetimeRange");

    expect(DatetimeRange.prop("type")).toEqual("custom");
    expect(DatetimeRange.prop("customTimeRange")).toEqual(customTimeRange);
  });

  it("should return specified resolution", () => {
    const handleConfirm = jest.fn();
    const props = {
      resolution: "s" as ResolutionProps,
      from: "1571673600",
      to: "1571846399",
      datetimeSelected: handleConfirm,
    };
    const wrapper = shallow(<DatetimeSelector {...props} />);

    wrapper.invoke("onConfirm")({
      type: "specifiedDate",
      value: {
        from: 1571672600123,
        to: 1571846299789,
      },
    });

    expect(handleConfirm).toHaveBeenCalledWith({
      type: "specifiedDate",
      value: {
        from: 1571672600,
        to: 1571846299,
      },
    });
  });
});
