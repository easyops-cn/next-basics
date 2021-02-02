import React from "react";
import { shallow } from "enzyme";
import { BrickHumanizeTime } from "./BrickHumanizeTime";
import { HumanizeTimeFormat } from "@next-libs/datetime";
import { install, InstalledClock } from "lolex";

describe("BrickHumanizeTime", () => {
  let clock: InstalledClock;
  beforeEach(() => {
    clock = install({ now: +new Date("2019-10-17 17:20:00") });
  });
  afterEach(() => {
    clock.uninstall();
  });

  it("should work", () => {
    const wrapper = shallow(
      <BrickHumanizeTime
        value={1563506779}
        formatter={HumanizeTimeFormat.accurate}
      />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ value: 0 });
    wrapper.update();
    expect(wrapper.find("span").text()).toBe("-");
  });

  it("should work, isCostTime", () => {
    const wrapper = shallow(
      <BrickHumanizeTime
        value={1563509000}
        isMicrosecond={true}
        isCostTime={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work, link props", () => {
    const wrapper = shallow(
      <BrickHumanizeTime value={1563509} link={{ url: "/a/b/c" }} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("inputFormat and outputFormat should work", () => {
    const wrapper = shallow(
      <BrickHumanizeTime value="2020-02-27 17:18" outputFormat="YYYY-MM-DD" />
    );
    expect(
      wrapper
        .find("span")
        .first()
        .text()
    ).toBe("2020-02-27");
  });
});
