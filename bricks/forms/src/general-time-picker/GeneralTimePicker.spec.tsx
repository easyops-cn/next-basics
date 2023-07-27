import React from "react";
import { shallow, mount } from "enzyme";
import { TimePicker } from "antd";
import moment from "moment";
import { install, InstalledClock } from "lolex";
import { GeneralTimePicker } from "./GeneralTimePicker";

describe("GeneralTimePicker", () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = install({ now: +new Date("2019-10-17 17:20:00") });
  });
  afterEach(() => {
    clock.uninstall();
  });

  it("should work", async () => {
    const handleChange = jest.fn();
    const handleOpenChange = jest.fn();

    const wrapper = shallow(
      <GeneralTimePicker
        name="time"
        label="hello"
        placeholder="when"
        value="09:14:30"
        onChange={handleChange}
        onOpenChange={handleOpenChange}
      />
    );
    wrapper.find(TimePicker).invoke("onChange")(
      moment("18:01:00", "HH:mm:ss"),
      "18:01:00"
    );
    await Promise.resolve();
    expect(handleChange).toBeCalledWith("18:01:00");

    wrapper.setProps({ value: "18:01:00" });
    wrapper.find(TimePicker).invoke("onOpenChange")(true);

    expect(handleOpenChange).toBeCalledWith(true, "18:01:00");
  });

  it("should update value", () => {
    const wrapper = mount(<GeneralTimePicker value="09:14:30" />);
    expect(
      wrapper
        .find(TimePicker)
        .prop("value")
        .format("HH:mm:ss")
    ).toBe("09:14:30");

    wrapper.setProps({
      value: "18:01:00"
    });
    wrapper.update();
    expect(
      wrapper
        .find(TimePicker)
        .prop("value")
        .format("HH:mm:ss")
    ).toBe("18:01:00");
  });
});
