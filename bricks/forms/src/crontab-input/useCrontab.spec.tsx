import React from "react";
import { mount } from "enzyme";
import crontab from "@next-libs/crontab";
import { useCrontab, validateCrontab } from "./useCrontab";

function HookWrapper(props: { value?: string }): React.ReactElement {
  const [crotabObj, setChange] = useCrontab(props.value);
  return (
    <div className="crontab-container" onChange={setChange}>
      {crontab.format(crotabObj)}
    </div>
  );
}

describe("useCrontab custom hook test", () => {
  it("should work with no value", () => {
    const wrapper = mount(<HookWrapper />);

    expect(wrapper.text()).toEqual("每分钟");
  });

  it("should work with change value", () => {
    const wrapper = mount(<HookWrapper value="5 2 * * *" />);

    expect(wrapper.text()).toEqual("在上午 02:05");

    const onChange = wrapper.find(".crontab-container").invoke("onChange");
    onChange("minute", "1");

    expect(wrapper.text()).toEqual("在上午 02:01");

    onChange("hour", "3");
    expect(wrapper.text()).toEqual("在上午 03:01");

    onChange("date", "6");
    expect(wrapper.text()).toEqual("在上午 03:01, 限每月 6 号");

    onChange("month", "6");
    expect(wrapper.text()).toEqual("在上午 03:01, 限每月 6 号, 仅于六月份");

    onChange("dow", "0");
    expect(wrapper.text()).toEqual(
      "在上午 03:01, 限每月 6 号, 并且为星期日, 仅于六月份"
    );

    expect(() => onChange("unknown", "9")).toThrow("Unknown Crontab Type");
  });
});

describe("validateCrontab", () => {
  const obj = {
    minute: "*",
    hour: "*",
    date: "6",
    month: "*",
    dow: "*",
  };

  const reulst = validateCrontab(obj);

  expect(reulst).toEqual(true);

  const reulst2 = validateCrontab({
    minute: "66",
    hour: "*",
    date: "6",
    month: "*",
    dow: "*",
  });

  expect(reulst2).toEqual(false);

  const reulst3 = validateCrontab({
    minute: "6",
    hour: "25",
    date: "6",
    month: "*",
    dow: "*",
  });

  expect(reulst3).toEqual(false);

  const reulst4 = validateCrontab({
    minute: "6",
    hour: "23",
    date: "6",
    month: "*",
    dow: "7",
  });

  expect(reulst4).toEqual(false);
});
