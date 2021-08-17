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

    wrapper.setProps({ type: "button", uiType: "dashboard" });
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find(".dashboardRadio").length).toBe(1);
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
  it("should type=icon", () => {
    const wrapper = mount(
      <GeneralRadio
        options={[
          {
            icon: {
              icon: "area-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "area-chart",
            label: "area-chart",
          },
          {
            icon: {
              icon: "bar-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "bar-chart",
            label: "bar-chart",
          },
        ]}
        type="icon"
        name="icon"
        label="icon选择"
        value="bar-chart"
      />
    );
    expect(wrapper.find('input[id="bar-chart"]').prop("checked")).toBe(true);
  });
});
