import React from "react";
import { mount } from "enzyme";
import { BrickRate } from "./BrickRate";
import { MenuIcon } from "@next-core/brick-types";
describe("BrickRate", () => {
  it("should work", () => {
    const wrapper = mount(<BrickRate />);
    expect(wrapper.find(".ant-rate").length).toEqual(1);
  });
  it("should render custom element", () => {
    const wrapper = mount(<BrickRate count={5} />);
    expect(wrapper.find(".ant-rate").children().length).toEqual(5);
  });
  it("should execute change method", async () => {
    const handleChange = jest.fn();
    const configProps = {
      count: 5,
      disabled: true,
      defaultValue: 1,
      allowHalf: true,
      rateStyle: {
        fontSize: "16px",
        color: "red",
      },
      type: "A",
    };
    const wrapper = mount(
      <BrickRate
        count={configProps.count}
        disabled={configProps.disabled}
        defaultValue={configProps.defaultValue}
        style={configProps.rateStyle}
        allowHalf={configProps.allowHalf}
        type={configProps.type}
        onChange={handleChange}
      ></BrickRate>
    );
    wrapper.find(BrickRate).invoke("onChange")(3 as any);
    await (global as any).flushPromises();
    expect(handleChange).toHaveBeenCalledWith(3);
  });
  it("should work width rateIcon", async () => {
    const configProps = {
      count: 5,
      disabled: false,
      value: 1,
      allowHalf: true,
      rateStyle: {
        fontSize: "16px",
        color: "red",
      },
      rateIcon: {
        icon: "heart",
        lib: "antd",
      },
    };
    const wrapper = mount(
      <BrickRate
        count={configProps.count}
        disabled={configProps.disabled}
        style={configProps.rateStyle}
        allowHalf={configProps.allowHalf}
        rateIcon={configProps.rateIcon as MenuIcon}
      />
    );

    const saveButtonIcon = wrapper.find("GeneralIcon").at(0);
    expect(saveButtonIcon.prop("icon")).toEqual(
      expect.objectContaining({
        icon: "heart",
        lib: "antd",
      })
    );
  });
});
