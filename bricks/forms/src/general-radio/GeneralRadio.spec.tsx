import React from "react";
import { shallow, mount } from "enzyme";
import { Radio } from "antd";
import { formatOptions } from "@next-libs/forms";
import { GeneralRadio } from "./GeneralRadio";
import { GeneralIcon } from "@next-libs/basic-components";

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
  it("should type=icon", async () => {
    const handleChange = jest.fn();
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
        onChange={handleChange}
      />
    );
    expect(wrapper.find(".iconRadio").length).toBe(2);
    expect(wrapper.find('input[id="bar-chart"]').prop("checked")).toBe(true);
    wrapper.find('input[id="area-chart"]').invoke("onChange")({
      target: { value: "area-chart" },
    } as any);
    await (global as any).flushPromises();
    expect(handleChange).toHaveBeenCalled();
  });
  it("should type=illustration", async () => {
    const handleChange = jest.fn();
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
        type="illustration"
        name="icon"
        label="icon选择"
        value="bar-chart"
        useBrick={{
          brick: "tpl-card-list-base-item-of-illustration",
          properties: {
            detail: true,
            background: "blue",
          },
        }}
        onChange={handleChange}
      />
    );
    expect(wrapper.find(".customRadio").length).toBe(2);
    expect(wrapper.find('input[id="bar-chart"]').prop("checked")).toBe(true);
    wrapper.find('input[id="area-chart"]').invoke("onChange")({
      target: { value: "area-chart" },
    } as any);
    await (global as any).flushPromises();
    expect(handleChange).toHaveBeenCalled();
  });
  it("should type is icon-circle", async () => {
    const handleChange = jest.fn();
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
        type="icon-circle"
        name="icon"
        label="icon选择"
        value="bar-chart"
        onChange={handleChange}
      />
    );
    expect(wrapper.find(".specialIconRadio").length).toBe(2);
    expect(wrapper.find('input[id="bar-chart"]').prop("checked")).toBe(true);
    wrapper.find('input[id="area-chart"]').invoke("onChange")({
      target: { value: "area-chart" },
    } as any);
    await (global as any).flushPromises();
    expect(handleChange).toHaveBeenCalled();
  });

  it("should type is icon-square", async () => {
    const handleChange = jest.fn();
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
        type="icon-square"
        name="icon"
        label="icon选择"
        value="bar-chart"
        onChange={handleChange}
      />
    );
    expect(wrapper.find(".specialIconRadio").length).toBe(2);
    expect(wrapper.find('input[id="bar-chart"]').prop("checked")).toBe(true);
    wrapper.find('input[id="area-chart"]').invoke("onChange")({
      target: { value: "area-chart" },
    } as any);
    await (global as any).flushPromises();
    expect(handleChange).toHaveBeenCalled();
  });

  it("should render general-icon for default radio", () => {
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
          {
            icon: {
              imgSrc:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            },
            label: "pie-chart",
            value: "pie-chart",
          },
        ]}
        type="default"
      />
    );
    expect(wrapper.find(GeneralIcon).length).toEqual(3);
  });

  it("should render general-icon for button radio", () => {
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
          {
            icon: {
              imgSrc:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            },
            label: "pie-chart",
            value: "pie-chart",
          },
        ]}
        type="button"
      />
    );
    expect(wrapper.find(GeneralIcon).length).toEqual(3);
  });
});
