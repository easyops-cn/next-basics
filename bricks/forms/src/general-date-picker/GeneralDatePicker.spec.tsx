import React from "react";
import { shallow, mount } from "enzyme";
import { DatePicker } from "antd";
import moment from "moment";
import { install, InstalledClock } from "lolex";
import { GeneralDatePicker } from "./GeneralDatePicker";

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

    const wrapper = shallow(
      <GeneralDatePicker
        name="date"
        label="hello"
        placeholder="when"
        value="2019-10-01"
        onChange={handleChange}
        onOk={handleOk}
        format="YYYY-MM-DD"
        picker={"date"}
      />
    );
    wrapper.find(DatePicker).invoke("onChange")(
      moment("2020-01-01", "YYYY-MM-DD"),
      "2020-01-01"
    );
    await Promise.resolve();
    expect(handleChange).toBeCalledWith("2020-01-01");

    wrapper.find(DatePicker).invoke("onOk")(moment("2020-02-01"));
    expect(handleOk).toBeCalledWith("2020-02-01");
  });

  it("should update value", () => {
    const wrapper = mount(
      <GeneralDatePicker value="2019-10-01" picker="date" />
    );
    expect(wrapper.find(DatePicker).prop("value").format("YYYY-MM-DD")).toBe(
      "2019-10-01"
    );

    wrapper.setProps({
      value: "2020-01-01",
    });
    wrapper.update();
    expect(wrapper.find(DatePicker).prop("value").format("YYYY-MM-DD")).toBe(
      "2020-01-01"
    );
  });
  it("should update value week", () => {
    const wrapper = mount(
      <GeneralDatePicker value="2019-10周" picker="week" />
    );
    expect(wrapper.find(DatePicker).prop("value").format("YYYY-ww周")).toBe(
      "2019-10周"
    );

    wrapper.setProps({
      value: "2020-20周",
    });
    wrapper.update();
    expect(wrapper.find(DatePicker).prop("value").format("YYYY-ww周")).toBe(
      "2020-20周"
    );
  });
});
