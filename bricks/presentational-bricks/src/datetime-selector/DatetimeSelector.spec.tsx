import React from "react";
import { shallow } from "enzyme";
import i18next from "i18next";

import { DatetimeSelector, ResolutionProps } from "./DatetimeSelector";

jest.mock("antd/es/locale/en_US", () => ({}));
jest.mock("antd/es/locale/zh_CN", () => ({}));

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

    wrapper.find("DatetimeRange").invoke("onConfirm")({
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

  it("should use English locale when language is en", () => {
    const originalLanguage = i18next.language;
    Object.defineProperty(i18next, "language", {
      value: "en",
      writable: true,
    });

    const wrapper = shallow(<DatetimeSelector from="now-1d" />);
    const configProvider = wrapper.find("ConfigProvider");
    expect(configProvider.exists()).toBe(true);

    // Restore original language
    Object.defineProperty(i18next, "language", {
      value: originalLanguage,
      writable: true,
    });
  });

  it("should use Chinese locale when language is not en", () => {
    const originalLanguage = i18next.language;
    Object.defineProperty(i18next, "language", {
      value: "zh",
      writable: true,
    });

    const wrapper = shallow(<DatetimeSelector from="now-1d" />);
    const configProvider = wrapper.find("ConfigProvider");
    expect(configProvider.exists()).toBe(true);

    // Restore original language
    Object.defineProperty(i18next, "language", {
      value: originalLanguage,
      writable: true,
    });
  });

  it("should pass all props to DatetimeRange", () => {
    const wrapper = shallow(
      <DatetimeSelector
        from="now-1d"
        placement="bottomRight"
        size="large"
        selectNearDays={7}
        rangeDays={30}
        format="YYYY-MM-DD HH:mm:ss"
      />
    );
    const dateTimeRange = wrapper.find("DatetimeRange");

    expect(dateTimeRange.prop("placement")).toBe("bottomRight");
    expect(dateTimeRange.prop("size")).toBe("large");
    expect(dateTimeRange.prop("selectNearDays")).toBe(7);
    expect(dateTimeRange.prop("rangeDays")).toBe(30);
    expect(dateTimeRange.prop("format")).toBe("YYYY-MM-DD HH:mm:ss");
  });

  it("should handle onConfirm with datetimeSelected callback", () => {
    const handleConfirm = jest.fn();
    const wrapper = shallow(
      <DatetimeSelector from="now-1d" datetimeSelected={handleConfirm} />
    );

    wrapper.find("DatetimeRange").invoke("onConfirm")({
      type: "dateRange",
      value: "now-7d",
    });

    expect(handleConfirm).toHaveBeenCalledWith({
      type: "dateRange",
      value: "now-7d",
    });
  });

  it("should process resolution for ms", () => {
    const handleConfirm = jest.fn();
    const props = {
      resolution: "ms" as ResolutionProps,
      from: "1571673600000",
      to: "1571846399000",
      datetimeSelected: handleConfirm,
    };
    const wrapper = shallow(<DatetimeSelector {...props} />);

    wrapper.find("DatetimeRange").invoke("onConfirm")({
      type: "specifiedDate",
      value: {
        from: 1571673600000,
        to: 1571846399000,
      },
    });

    expect(handleConfirm).toHaveBeenCalled();
  });
});
