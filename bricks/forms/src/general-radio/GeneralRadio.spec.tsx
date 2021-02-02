import React from "react";
import { shallow, mount } from "enzyme";
import { Radio } from "antd";
import { formatOptions } from "@next-libs/forms";
import { GeneralRadio } from "./GeneralRadio";

describe("GeneralRadio", () => {
  it("should work", () => {
    const wrapper = shallow(
      <GeneralRadio
        options={[
          {
            label: "上海",
            value: "Shanghai",
          },
          {
            label: "北京",
            value: "Beijing",
          },
          {
            label: "成都",
            value: "Chengdu",
          },
        ]}
        name="city"
        label="城市"
      />
    );

    wrapper
      .find(Radio.Group)
      .simulate("change", { target: { value: "Shanghai" } });
    expect(wrapper).toBeTruthy();

    wrapper.setProps({ type: "button" });
    wrapper.update();
    expect(wrapper).toBeTruthy();
  });

  it("should execute change method", async () => {
    const handleChange = jest.fn();

    const wrapper = shallow(
      <GeneralRadio
        options={[
          {
            label: "上海",
            value: "Shanghai",
          },
          {
            label: "北京",
            value: "Beijing",
          },
          {
            label: "成都",
            value: "Chengdu",
          },
        ]}
        name="city"
        label="城市"
        onChange={handleChange}
      />
    );

    wrapper.find(Radio.Group).invoke("onChange")({
      target: { value: "Chengdu" },
    } as any);
    await (global as any).flushPromises();
    expect(handleChange).toHaveBeenCalled();
  });

  it("should update value", () => {
    const wrapper = mount(
      <GeneralRadio options={formatOptions(["good", "better"])} value="good" />
    );
    expect(wrapper.find(Radio.Group).prop("value")).toBe("good");

    wrapper.setProps({
      value: "better",
    });
    wrapper.update();
    expect(wrapper.find(Radio.Group).prop("value")).toBe("better");
  });
});
