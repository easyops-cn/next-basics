import React from "react";
import { mount, shallow } from "enzyme";
import { ValidationRule } from "@ant-design/compatible/lib/form";
import { FormItemWrapper } from "@next-libs/forms";

jest.mock("i18next", () => ({
  addResourceBundle: jest.fn(),
  language: "zh-CN",
  t: jest.fn().mockImplementation((title) => {
    switch (title) {
      case "forms:CORRECT_CRONT_MSG":
        return "请填写正确的时间格式";
      default:
        return "unknown";
    }
  }),
}));

import { CrontabInput, CrontabInputWrapper } from "./CrontabInput";

describe("CrontabInput", () => {
  it("should execute validator", () => {
    const validatorFn = jest.fn();

    const wrapper = shallow(<CrontabInput />);

    (
      wrapper.find(FormItemWrapper).prop("validator") as Pick<
        ValidationRule,
        "validator" | "message"
      >[]
    )[0].validator([], "6 * * * *", validatorFn);

    expect(validatorFn).toHaveBeenCalled();

    (
      wrapper.find(FormItemWrapper).prop("validator") as Pick<
        ValidationRule,
        "validator" | "message"
      >[]
    )[0].validator([], "d * * * *", validatorFn);

    expect(validatorFn).toHaveBeenCalledWith("请填写正确的时间格式");
  });

  it("should work", () => {
    const wrapper = mount(<CrontabInput value="6 * * * *" />);

    expect(wrapper.find(".formatText").text()).toEqual("在每小时的第 6 分钟");

    wrapper.find("Input").at(0).invoke("onChange")({
      target: {
        value: "unkown value",
        name: "minute",
      },
    });

    expect(wrapper.find(".formatText").text()).toEqual("");
  });

  it("should trigger change event", () => {
    const changeFn = jest.fn();
    const wrapper = mount(
      <CrontabInputWrapper onChange={changeFn} value="3 2 * * *" />
    );

    wrapper.find("Input[name='date']").invoke("onChange")({
      target: {
        value: "5",
        name: "date",
      },
    });

    expect(changeFn).toHaveBeenCalledWith("3 2 5 * *");
  });
});
